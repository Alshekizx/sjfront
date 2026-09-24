import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
export default function PaymentSuccess() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const reference = params.get('reference') || params.get('trxref');
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    setLoading(true); setPayment(null); setError('');
    if (!reference || !user) { setLoading(false); return; }
    supabase.from('payments').select('reference,amount,currency,status,paid_at,subscriptions(status,expires_at,academic_levels(name))').eq('reference', reference).eq('student_id', user.id).maybeSingle().then(({ data, error }) => { if (!active) return; if (error) setError('Unable to check this payment. Please try again.'); else setPayment(data); setLoading(false); });
    return () => { active = false; };
  }, [reference, user?.id]);
  const success = payment?.status === 'success';
  return <div className="page-shell py-16 max-w-xl"><section className="bg-white rounded-2xl border p-8 space-y-5"><h1 className="font-serif text-3xl">{loading ? 'Checking payment…' : success ? 'Payment confirmed' : 'Payment not confirmed'}</h1>
    {error && <p role="alert" className="text-red-600">{error}</p>}
    {!loading && !payment && !error && <p>No confirmed payment was found for this reference. Check your payment history for updates.</p>}
    {payment && <dl className="space-y-3">{[['Reference', payment.reference], ['Status', payment.status], ['Amount', `${payment.currency} ${Number(payment.amount).toLocaleString()}`], ['Level', payment.subscriptions?.academic_levels?.name || '—'], ['Subscription status', payment.subscriptions?.status || '—'], ['Expiry date', payment.subscriptions?.expires_at ? new Date(payment.subscriptions.expires_at).toLocaleDateString() : '—']].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
    <Link className="block underline" to="/account/payments">View payment history</Link>{success && <Link className="block underline" to="/courses">Browse courses</Link>}
  </section></div>;
}
