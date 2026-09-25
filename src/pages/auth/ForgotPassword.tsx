import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
      if (error) throw error;
      setSent(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to send reset instructions. Please try again.');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-8">
          <ArrowLeft size={15} /> Back to sign in
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-2">Check your email</h2>
            <p className="text-[var(--muted-foreground)] text-sm mb-6">
              If an account exists for <strong>{email}</strong>, you'll receive a password reset link within a few minutes.
            </p>
            <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors text-sm">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-3xl font-bold text-[var(--primary)] mb-2">Reset Password</h1>
            <p className="text-[var(--muted-foreground)] mb-8 text-sm">Enter your email address and we'll send you instructions to reset your password.</p>

            {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email Address</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu.ng"
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : 'Send Reset Instructions'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
