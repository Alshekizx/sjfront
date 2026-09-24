import { useState, FormEvent } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Profile() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(() => ({ name: user?.name || '', phone: user?.phone || '', university: user?.university || '', academicLevel: user?.academicLevel || 1 }));

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    if (!user) return;
    const { error } = await supabase.from('student_profiles').update({ full_name: form.name, phone: form.phone, university: form.university, academic_level: `${form.academicLevel}00L` }).eq('id', user.id);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!user) return null;

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-6">
      <h2 className="font-serif text-xl font-semibold text-[var(--primary)] mb-1">Profile Information</h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">Manage your personal and academic information</p>

      {saved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
          <CheckCircle size={16} /> Profile updated successfully.
        </div>
      )}
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4 pb-5 border-b border-[var(--border)]">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xl font-semibold">
            {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <button type="button" className="text-xs text-[var(--primary)] hover:underline mt-1">Change profile photo</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} onChange={(value) => setForm(f => ({ ...f, name: value }))} />
          <Field label="Email Address" value={user.email} type="email" disabled />
          <Field label="Phone Number" value={form.phone} type="tel" onChange={(value) => setForm(f => ({ ...f, phone: value }))} />
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Current Academic Level</label>
            <select className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-white" value={form.academicLevel} onChange={e => setForm(f => ({ ...f, academicLevel: Number(e.target.value) }))}>
              {[1,2,3,4,5].map((l) => <option key={l} value={l}>{l * 100} Level</option>)}
            </select>
          </div>
          <Field label="University / Institution" value={form.university} onChange={(value) => setForm(f => ({ ...f, university: value }))} className="sm:col-span-2" />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[#0a1840] transition-colors disabled:opacity-60"
          >
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, type = 'text', className = '', onChange, disabled = false }: { label: string; value?: string; type?: string; className?: string; onChange?: (value: string) => void; disabled?: boolean }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{label}</label>
      <input
        type={type}
        value={value || ''}
        disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] bg-white transition-colors"
      />
    </div>
  );
}
