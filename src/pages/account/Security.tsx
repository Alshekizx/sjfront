import { useState, FormEvent } from 'react';
import { Shield, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Security() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get('new-password') || '');
    const confirm = String(form.get('confirm-password') || '');
    if (password !== confirm) { setError('The new passwords do not match.'); return; }
    setSaving(true); setError('');
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (updateError) { setError(updateError.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <Shield size={18} className="text-[var(--primary)]" />
        <h2 className="font-serif text-xl font-semibold text-[var(--primary)]">Security</h2>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">Manage your password and account security settings</p>

      {saved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
          <CheckCircle size={16} /> Password updated successfully.
        </div>
      )}
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Change Password</h3>
        {(['current', 'new', 'confirm'] as const).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              {field === 'current' ? 'Current Password' : field === 'new' ? 'New Password' : 'Confirm New Password'}
            </label>
            <div className="relative">
              <input
                name={field === 'new' ? 'new-password' : field === 'confirm' ? 'confirm-password' : 'current-password'}
                type={show[field] ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 pr-10 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white"
              />
              <button type="button" onClick={() => setShow((s) => ({ ...s, [field]: !s[field] }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                {show[field] ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        ))}
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[#0a1840] transition-colors disabled:opacity-60">
          {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Update Password'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Active Sessions</h3>
        <div className="p-4 bg-[var(--muted)] rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Chrome on Windows</p>
              <p className="text-xs text-[var(--muted-foreground)]">Lagos, Nigeria · Current session</p>
            </div>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
