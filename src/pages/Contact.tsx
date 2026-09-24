import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { usePageContent } from '@/lib/content';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const content = usePageContent('contact');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) { setError('Please sign in before sending a support request.'); return; }
    const form = new FormData(e.currentTarget);
    setLoading(true); setError('');
    const { error: submitError } = await supabase.from('support_tickets').insert({
      student_id: user.id,
      subject: String(form.get('subject') || 'General support'),
      category: String(form.get('subject') || 'General'),
      message: String(form.get('message') || ''),
    });
    setLoading(false);
    if (submitError) { setError(submitError.message); return; }
    setSent(true);
  }

  return (
    <div className="min-h-screen">
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="container-shell">
          <span className="block w-12 h-0.5 bg-[var(--accent)] mb-6" />
          <h1 className="font-serif text-4xl font-bold mb-3">Contact & Support</h1>
          <p className="text-white/70 max-w-lg">{content.introduction}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6">Get in Touch</h2>
              {sent ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                  <CheckCircle size={40} className="text-green-600 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 text-sm">{content.response_message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Name</label>
                      <input required type="text" defaultValue={user?.name || ''} className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email</label>
                      <input required type="email" defaultValue={user?.email || ''} className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Subject</label>
                    <select name="subject" className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-white">
                      <option>Subscription / Payment</option>
                      <option>Account Issue</option>
                      <option>Technical Problem</option>
                      <option>Content Question</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Message</label>
                    <textarea name="message" required rows={5} className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-white resize-none" />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors disabled:opacity-60">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[var(--primary)] mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { icon: <Mail size={16} />, label: 'Email', value: content.email },
                    { icon: <Phone size={16} />, label: 'Phone', value: content.phone },
                    { icon: <MapPin size={16} />, label: 'Location', value: content.location },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/8 flex items-center justify-center text-[var(--primary)]">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[var(--muted)] rounded-xl p-5">
                <h4 className="font-semibold text-sm mb-2">Support Hours</h4>
                <p className="text-xs text-[var(--muted-foreground)] whitespace-pre-wrap">{content.support_hours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
