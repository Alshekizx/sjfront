import { useEffect, useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { reportDataError } from '@/lib/content';
import { supabase } from '@/lib/supabase';

type Transaction = { id: string; reference: string; plan?: string; amount: number; status: string; paid_at?: string; created_at: string };

export default function PaymentHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => { if (user) supabase.from('payments').select('*').eq('student_id', user.id).order('created_at', { ascending: false }).then(({ data, error }) => { if (error) reportDataError('Unable to load payment history.'); else setTransactions(data || []); }); }, [user]);
  if (!user) return null;

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-6">
      <h2 className="font-serif text-xl font-semibold text-[var(--primary)] mb-1">Payment History</h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">All your subscription payment transactions</p>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <CreditCard size={40} className="text-[var(--muted-foreground)] mx-auto mb-3" />
          <p className="text-[var(--muted-foreground)] text-sm">No payment transactions yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Reference', 'Level', 'Amount', 'Status', 'Date', 'Method'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="py-3 pr-4">
                    <span className="font-mono text-xs bg-[var(--muted)] px-2 py-1 rounded">{tx.reference}</span>
                  </td>
                  <td className="py-3 pr-4 font-medium">{tx.plan || 'Subscription'}</td>
                  <td className="py-3 pr-4 font-mono font-semibold text-[var(--primary)]">₦{tx.amount.toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                      <CheckCircle size={13} /> {tx.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-[var(--muted-foreground)] text-xs">
                    {new Date(tx.paid_at || tx.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3 text-[var(--muted-foreground)] text-xs">Paystack</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
