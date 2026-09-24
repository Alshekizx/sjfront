import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import logoDark from '@/assets/ref2.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--primary)] flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoDark} alt="SJ Law Academy" className="h-10 w-auto brightness-0 invert" />
          <div>
            <p className="font-serif font-semibold text-white text-lg leading-none">SJ Law Academy</p>
            <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-0.5">Digital Law School</p>
          </div>
        </Link>
        <div>
          <blockquote className="font-serif text-3xl text-white/90 italic leading-relaxed mb-6">
            "The study of law is the gateway to justice. Excellence in preparation is the key to that gateway."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">SJ</div>
            <div>
              <p className="text-sm font-medium text-white">SJ Law Academy</p>
              <p className="text-xs text-white/50">Nigeria's Premier Digital Law School</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-white/40 text-xs">
          <span>2,400+ Students</span>
          <span>·</span>
          <span>45+ Courses</span>
          <span>·</span>
          <span>500+ Cases</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-[var(--primary)] mb-2">Welcome back</h1>
            <p className="text-[var(--muted-foreground)]">Sign in to continue your legal studies</p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu.ng"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-colors bg-white"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[var(--foreground)]">Password</label>
                <Link to="/forgot-password" className="text-xs text-[var(--primary)] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-10 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-colors bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[var(--primary)] font-semibold hover:underline">Start free trial</Link>
          </div>

          <div className="mt-6 p-3.5 bg-[var(--muted)] rounded-lg border border-[var(--border)] text-xs text-[var(--muted-foreground)] text-center">
            <strong className="text-[var(--foreground)]">Demo:</strong> Enter any email and password to log in as a demo student.
          </div>
        </div>
      </div>
    </div>
  );
}
