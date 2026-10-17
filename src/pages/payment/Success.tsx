import { paymentRequest } from '@/lib/payments';
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
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true); setPayment(null); setError('');
    if (!reference || !user) { setLoading(false); return; }
    (async () => {
      try {
        const verification = await paymentRequest('verify', { reference });
        if (verification.status !== 'success') throw new Error('Payment is still pending or was not successful. You can check again below.');
        const { data, error } = await supabase.from('payments').select('reference,amount,currency,status,paid_at,subscriptions(status,expires_at,academic_levels(name))').eq('reference', reference).eq('student_id', user.id).maybeSingle();
        if (error) throw new Error('Payment verified, but details could not be loaded. Please check again.');
        if (active) setPayment(data);
      } catch (error) { if (active) setError(error instanceof Error ? error.message : 'Unable to verify payment.'); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [reference, user?.id, attempt]);
  const success = payment?.status === 'success';
  return <div className="page-shell py-16 max-w-xl"><section className="bg-white rounded-2xl border p-8 space-y-5"><h1 className="font-serif text-3xl">{loading ? 'Checking payment…' : success ? 'Payment confirmed' : 'Payment not confirmed'}</h1>
    {error && <p role="alert" className="text-red-600">{error}</p>}
    {!loading && !payment && !error && <p>No confirmed payment was found for this reference. Check your payment history for updates.</p>}
    {payment && <dl className="space-y-3">{[['Reference', payment.reference], ['Status', payment.status], ['Amount', `${payment.currency} ${Number(payment.amount).toLocaleString()}`], ['Level', payment.subscriptions?.academic_levels?.name || '—'], ['Subscription status', payment.subscriptions?.status || '—'], ['Expiry date', payment.subscriptions?.expires_at ? new Date(payment.subscriptions.expires_at).toLocaleDateString() : '—']].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
    {!loading && !success && reference && <button className="underline" onClick={() => setAttempt(value => value + 1)}>Check payment again</button>}
    <Link className="block underline" to="/account/payments">View payment history</Link>{success && <a className="block underline" href="/courses">Browse courses</a>}
  </section></div>;
}
