import { Link, useLocation, Outlet } from 'react-router-dom';
import { User, CreditCard, BarChart3, Shield, Settings, HelpCircle, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { label: 'Profile', to: '/account/profile', icon: <User size={16} /> },
  { label: 'My Subscriptions', to: '/account/subscriptions', icon: <CreditCard size={16} /> },
  { label: 'Payment History', to: '/account/payments', icon: <BarChart3 size={16} /> },
  { label: 'Security', to: '/account/security', icon: <Shield size={16} /> },
  { label: 'Preferences', to: '/account/preferences', icon: <Settings size={16} /> },
  { label: 'Help & Support', to: '/contact', icon: <HelpCircle size={16} /> },
  { label: 'Terms & Privacy', to: '/terms', icon: <FileText size={16} /> },
];

export default function AccountLayout() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="page-shell py-10">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-[var(--primary)]">Account Settings</h1>
          <p className="text-[var(--muted-foreground)] text-sm mt-0.5">{user.name} · {user.email}</p>
        </div>
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold">
                    {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">{user.university}</p>
                  </div>
                </div>
              </div>
              <nav className="py-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      location.pathname === item.to
                        ? 'bg-[var(--primary)]/8 text-[var(--primary)] font-medium border-r-2 border-[var(--primary)]'
                        : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                    }`}
                  >
                    <span className="text-[var(--muted-foreground)]">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          {/* Content */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
