import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      setReady(!error && !!data.session);
      setChecking(false);
    }).catch(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') || '');
    setError('');
    if (password.length < 8) { setError('Use at least 8 characters.'); return; }
    if (password !== form.get('confirm')) { setError('The passwords do not match.'); return; }
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSaved(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to update your password. Please try again.');
    } finally { setSaving(false); }
  }

  return <div className="min-h-screen flex items-center justify-center px-6">
    <div className="w-full max-w-[420px] space-y-5">
      <h1 className="font-serif text-3xl font-bold text-[var(--primary)]">Choose a new password</h1>
      {checking ? <p role="status">Checking your reset link…</p> : saved ? <>
        <p role="status">Your password has been updated.</p>
        <Link to="/login" className="block underline">Continue to your account</Link>
      </> : !ready ? <>
        <p role="alert">This reset link is invalid or has expired. Request a new link to continue.</p>
        <Link to="/forgot-password" className="block underline">Request a new reset link</Link>
      </> : <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <label className="block text-sm">New password
          <input name="password" type="password" autoComplete="new-password" minLength={8} required className="mt-2 w-full border rounded-lg px-4 py-3" />
        </label>
        <label className="block text-sm">Confirm new password
          <input name="confirm" type="password" autoComplete="new-password" minLength={8} required className="mt-2 w-full border rounded-lg px-4 py-3" />
        </label>
        <button disabled={saving} className="w-full py-3 rounded-lg bg-[var(--primary)] text-white disabled:opacity-60">{saving ? 'Updating…' : 'Update password'}</button>
      </form>}
    </div>
  </div>;
}
