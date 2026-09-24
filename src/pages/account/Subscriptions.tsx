import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Lock, CreditCard, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAcademicLevels, type AcademicLevelData } from '@/lib/data';

export default function Subscriptions() {
  const { user } = useAuth();
  const [levels, setLevels] = useState<AcademicLevelData[]>([]);

  useEffect(() => {
    getAcademicLevels().then(setLevels);
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-5">
      <div className="bg-white border border-[var(--border)] rounded-xl p-6">
        <h2 className="font-serif text-xl font-semibold text-[var(--primary)] mb-1">My Subscriptions</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-6">Manage your active subscriptions and explore other academic levels</p>

        <div className="space-y-4 mb-6">
          {user.subscriptions.map((sub) => (
            <div key={sub.level} className={`p-4 rounded-xl border ${sub.status === 'active' ? 'border-green-200 bg-green-50' : sub.status === 'trial' ? 'border-blue-200 bg-blue-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[var(--primary)]">{sub.levelName}</h3>
                    <SubBadge status={sub.status} />
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)] space-y-0.5">
                    <p>Started: {new Date(sub.startDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p>Expires: {new Date(sub.expiryDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p>Reference: <span className="font-mono">{sub.reference}</span></p>
                    {sub.price > 0 && <p>Amount Paid: <strong>₦{sub.price.toLocaleString()}</strong></p>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {(sub.status === 'active' || sub.status === 'trial') && (
                    <Link to="/courses" className="px-3 py-1.5 bg-[var(--primary)] text-white text-xs font-semibold rounded-lg hover:bg-[#0a1840] transition-colors text-center">
                      Continue Learning
                    </Link>
                  )}
                  <Link to={`/checkout/${sub.level}`} className="px-3 py-1.5 border border-[var(--border)] text-xs font-medium rounded-lg hover:bg-white transition-colors text-center">
                    {sub.status === 'expired' ? 'Renew' : 'Upgrade'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
            <Lock size={14} className="text-[var(--muted-foreground)]" /> Unlock Another Level
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {levels.filter((l) => !user.subscriptions.some((s) => s.level === l.level)).map((level) => (
              <Link key={level.level} to={`/checkout/${level.level}`} className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-xl hover:bg-[var(--secondary)] transition-colors group">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{level.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{level.courses} courses · ₦{level.price.toLocaleString()}</p>
                </div>
                <ArrowRight size={16} className="text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    trial: 'bg-blue-100 text-blue-700',
    expired: 'bg-red-100 text-red-600',
  };
  const labels: Record<string, string> = { active: 'Active', trial: '3-Day Trial', expired: 'Expired' };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[status]}`}>{labels[status]}</span>
  );
}
