import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import logoDark from '@/assets/ref2.png';

const LEVELS = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level'];

function passwordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
  return { score, label: labels[score - 1] || '', color: colors[score - 1] || 'bg-red-400' };
}

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', university: '', academicLevel: 1, terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = passwordStrength(form.password);

  function update(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.terms) { setError('Please accept the Terms of Service and Privacy Policy to continue.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setError('');
    setLoading(true);
    try {
      await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password, university: form.university, academicLevel: form.academicLevel });
      navigate('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-[var(--primary)] flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoDark} alt="SJ Law Academy" className="h-10 w-auto brightness-0 invert" />
          <div>
            <p className="font-serif font-semibold text-white text-lg leading-none">SJ Law Academy</p>
            <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-0.5">Digital Law School</p>
          </div>
        </Link>
        <div>
          <h2 className="font-serif text-2xl text-white font-bold mb-6">Your 3-day free trial includes:</h2>
          <ul className="space-y-3">
            {[
              'Full access to your chosen academic level',
              'Comprehensive course notes and outlines',
              'Video lessons for all topics',
              'Case law library with Nigerian cases',
              'Practice questions and MCQs',
              'Progress tracking and bookmarks',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                <CheckCircle size={16} className="text-[var(--accent)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-white/40 text-xs">No payment required · Cancel anytime</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[480px]">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-[var(--primary)] mb-2">Create Your Account</h1>
            <p className="text-[var(--muted-foreground)]">Start with 3 days free — no payment required</p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Full Name</label>
                <input
                  type="text" required value={form.name} onChange={(e) => update('name', e.target.value)}
                  placeholder="Adaeze Okafor"
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Phone Number</label>
                <input
                  type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email Address</label>
              <input
                type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
                placeholder="you@university.edu.ng"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">University / Institution</label>
              <input
                type="text" required value={form.university} onChange={(e) => update('university', e.target.value)}
                placeholder="University of Lagos"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Current Academic Level</label>
              <select
                value={form.academicLevel}
                onChange={(e) => update('academicLevel', Number(e.target.value))}
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
              >
                {LEVELS.map((l, i) => <option key={l} value={i + 1}>{l}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-3 pr-10 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : 'bg-[var(--border)]'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">Password strength: <span className="font-medium">{strength.label}</span></p>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox" checked={form.terms}
                onChange={(e) => update('terms', e.target.checked)}
                className="mt-0.5 rounded border-[var(--border)] accent-[var(--primary)]"
              />
              <span className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-[var(--primary)] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-[var(--primary)] hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account…</> : 'Create Account & Start Trial'}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-[var(--muted-foreground)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--primary)] font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
