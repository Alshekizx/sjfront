import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Lock, CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import { getAcademicLevels, type AcademicLevelData } from '@/lib/data';

export default function Checkout() {
  const { levelId } = useParams();
  const [levels, setLevels] = useState<AcademicLevelData[]>([]);
  const [loadingLevels, setLoadingLevels] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getAcademicLevels().then(data => { if (active) setLevels(data); }).catch(() => { if (active) setError('Unable to load this subscription. Please try again.'); }).finally(() => { if (active) setLoadingLevels(false); });
    return () => { active = false; };
  }, []);

  const level = levels.find((l) => l.level === Number(levelId));

  if (loadingLevels) return <p role="status" className="min-h-screen p-20 text-center">Loading subscription…</p>;

  if (!level) return <div className="min-h-screen pt-20 flex items-center justify-center"><p>Level not found.</p></div>;

  async function handlePay() {
    // A payment is only recorded after Paystack calls the verified webhook in
    // adminWebsite/supabase/functions/server. Never create a fake payment or subscription from the browser.
    setLoading(false);
    setError('Paystack checkout has not been configured yet. No payment or subscription has been created.');
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <Link to="/academic-levels" className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-8">
          <ArrowLeft size={15} /> Back to Academic Levels
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order summary */}
          <div>
            <h1 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6">Subscription Checkout</h1>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 mb-4">
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-[var(--border)]">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[var(--primary)]">{level.name} Subscription</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{level.courses} courses · {level.topics} topics · {level.duration} access</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xl font-bold text-[var(--primary)]">₦{level.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                {[`Full ${level.name} curriculum`, 'Course notes & videos', 'Case law library', 'Practice questions & MCQs', 'Mock examinations', 'Progress tracking'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                    <CheckCircle size={14} className="text-[var(--accent)] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-mono font-bold text-[var(--primary)]">₦{level.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] p-3 bg-[var(--muted)] rounded-lg">
              <Lock size={12} />
              <span>Payments are processed securely by Paystack. Your payment details are never stored on our servers.</span>
            </div>
          </div>

          {/* Payment */}
          <div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6">
              <h2 className="font-serif text-lg font-semibold text-[var(--primary)] mb-4">Pay with Paystack</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                Clicking the button below will redirect you to Paystack's secure payment page where you can pay via debit card, bank transfer, or USSD.
              </p>

              <div className="p-4 bg-[var(--muted)] rounded-xl mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--muted-foreground)]">Subscription</span>
                  <span className="font-medium">{level.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--muted-foreground)]">Duration</span>
                  <span className="font-medium">{level.duration}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[var(--border)] mt-2">
                  <span>Amount</span>
                  <span className="font-mono text-[var(--primary)]">₦{level.price.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full py-4 bg-[var(--primary)] text-white font-semibold rounded-xl hover:bg-[#0a1840] transition-colors disabled:opacity-60 flex items-center justify-center gap-3 text-base"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Processing Payment…</>
                ) : (
                  <><CreditCard size={18} /> Pay ₦{level.price.toLocaleString()} with Paystack</>
                )}
              </button>
              {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}

              <div className="flex items-center justify-center gap-4 mt-4">
                {['Verve', 'Visa', 'Mastercard', 'Bank Transfer'].map((method) => (
                  <span key={method} className="text-[10px] text-[var(--muted-foreground)] font-medium">{method}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
