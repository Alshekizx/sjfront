import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { reportDataError } from '@/lib/content';
import { supabase } from '@/lib/supabase';
import { getNotifications, getStudentSubscriptions } from '@/lib/data';

export interface Subscription {
  level: number;
  levelName: string;
  status: 'active' | 'trial' | 'expired';
  startDate: string;
  expiryDate: string;
  price: number;
  reference: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  academicLevel: number;
  avatar?: string;
  trialStartDate: string;
  trialExpiryDate: string;
  subscriptions: Subscription[];
  unreadNotifications: number;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<boolean>;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  university: string;
  academicLevel: number;
  phone: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const generation = useRef(0);
  const hydrate = useCallback(async (authUser: any) => {
    const request = ++generation.current;
    setLoading(true);
    try {
      const { data: profile, error } = await supabase.from('student_profiles').select('*').eq('id', authUser.id).maybeSingle();
      if (error) throw error;
      const [subscriptions, notifications] = await Promise.all([getStudentSubscriptions(authUser.id), getNotifications(authUser.id)]);
      if (request !== generation.current) return;
      const metadata = authUser.user_metadata || {};
      const rawLevel = Number(String(profile?.academic_level || metadata.academicLevel || 1).replace(/\D/g, ''));
      const trial = subscriptions.find(item => item.status === 'trial');
      setUser({ id: authUser.id, name: profile?.full_name || metadata.name || '', email: profile?.email || authUser.email || '', phone: profile?.phone || '', university: profile?.university || '', academicLevel: rawLevel >= 100 ? rawLevel / 100 : rawLevel, trialStartDate: trial?.startDate || '', trialExpiryDate: trial?.expiryDate || '', subscriptions, unreadNotifications: notifications.filter(item => !item.read).length });
    } catch {
      if (request === generation.current) { setUser(null); reportDataError('Unable to load your account. Please try again.'); }
    } finally { if (request === generation.current) setLoading(false); }
  }, []);
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data, error }) => { if (!active) return; if (error) { reportDataError('Unable to restore your session.'); setLoading(false); } else if (data.session?.user) void hydrate(data.session.user); else setLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { setTimeout(() => { if (active) void hydrate(session.user); }, 0); }
      else { ++generation.current; setUser(null); setLoading(false); }
    });
    return () => { active = false; ++generation.current; listener.subscription.unsubscribe(); };
  }, [hydrate]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setLoading(false); throw error; }
    if (data.user) await hydrate(data.user);
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
  };

  const signup = async (data: SignupData) => {
    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          university: data.university,
          academicLevel: `${data.academicLevel * 100}L`,
          phone: data.phone,
        },
      },
    });

    if (error) {
      throw new Error(error.message || 'Unable to create account');
    }
    return !!result.session;
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
