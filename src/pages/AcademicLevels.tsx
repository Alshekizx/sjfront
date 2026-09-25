import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Lock, CheckCircle, ArrowRight, Clock, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAcademicLevels, type AcademicLevelData } from '@/lib/data';

export default function AcademicLevels() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState<AcademicLevelData[]>([]);

  useEffect(() => {
    getAcademicLevels().then(setLevels).finally(() => setLoading(false));
  }, []);

  function getLevelStatus(levelNum: number) {
    if (!isAuthenticated) return 'locked';
    const sub = user?.subscriptions.find((s) => s.level === levelNum);
    if (!sub) return 'locked';
    return sub.status;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-[var(--primary)] text-white py-16 md:py-20">
        <div className="container-shell">
          <div className="max-w-2xl">
            <span className="block w-12 h-0.5 bg-[var(--accent)] mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Academic Levels</h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Five independent subscription levels covering the full Nigerian law degree curriculum — from foundational 100 Level principles to advanced 500 Level practice.
            </p>
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-16">
        <div className="container-shell space-y-8">
          <p role="status" className="text-center text-[var(--muted-foreground)]">{loading ? 'Loading academic levels…' : levels.length === 0 ? 'No academic levels are available right now. Please try again later.' : ''}</p>
          {levels.map((level) => {
            const status = getLevelStatus(level.level);
            const subscribed = status === 'active' || status === 'trial';

            return (
              <div
                key={level.level}
                id={`level-${level.level}`}
                className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid lg:grid-cols-3">
                  {/* Main info */}
                  <div className="lg:col-span-2 p-8 border-r border-[var(--border)]">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {level.shortName}
                          </span>
                          <StatusBadge status={status} />
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--primary)] mt-2">{level.name}</h2>
                      </div>
                      {!subscribed && <Lock size={20} className="text-[var(--muted-foreground)] mt-1" />}
                      {subscribed && <CheckCircle size={20} className="text-green-500 mt-1" />}
                    </div>

                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">{level.description}</p>

                    <div className="mb-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">Learning Objectives</h4>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {level.objectives.map((obj) => (
                          <li key={obj} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                            <CheckCircle size={14} className="text-[var(--accent)] mt-0.5 shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1.5"><BookOpen size={14} /> {level.courses} Courses</span>
                      <span className="flex items-center gap-1.5"><Star size={14} /> {level.topics} Topics</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {level.duration}</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="p-8 bg-[var(--muted)] flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)] mb-1 font-medium uppercase tracking-wider">Subscription Price</p>
                      <p className="font-mono text-3xl font-bold text-[var(--primary)]">₦{level.price.toLocaleString()}</p>
                      <p className="text-sm text-[var(--muted-foreground)] mb-6">per {level.duration}</p>

                      <div className="space-y-2 text-sm mb-8">
                        {[
                          `${level.courses} full courses`,
                          `${level.topics} study topics`,
                          'Notes, videos & case law',
                          'Practice questions & MCQs',
                          'Mock examinations',
                          'Progress tracking',
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-[var(--foreground)]">
                            <CheckCircle size={13} className="text-[var(--accent)] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {status === 'active' && (
                        <Link
                          to="/courses"
                          className="block text-center py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Continue Learning →
                        </Link>
                      )}
                      {status === 'trial' && (
                        <>
                          <Link
                            to="/courses"
                            className="block text-center py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors"
                          >
                            Continue Trial →
                          </Link>
                          <Link
                            to={`/checkout/${level.level}`}
                            className="block text-center py-3 border border-[var(--accent)] text-[var(--accent)] font-semibold rounded-lg hover:bg-[var(--accent)] hover:text-white transition-colors"
                          >
                            Subscribe — ₦{level.price.toLocaleString()}
                          </Link>
                        </>
                      )}
                      {status === 'expired' && (
                        <Link
                          to={`/checkout/${level.level}`}
                          className="block text-center py-3 bg-[var(--accent)] text-[var(--primary)] font-semibold rounded-lg hover:bg-[#D4A830] transition-colors"
                        >
                          Renew Subscription
                        </Link>
                      )}
                      {status === 'locked' && (
                        <Link
                          to={isAuthenticated ? `/checkout/${level.level}` : '/signup'}
                          className="block text-center py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors"
                        >
                          {isAuthenticated ? `Subscribe — ₦${level.price.toLocaleString()}` : 'Start Free Trial'}
                        </Link>
                      )}
                      {!isAuthenticated && (
                        <p className="text-xs text-center text-[var(--muted-foreground)]">3-day free trial available on sign up</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="py-16 bg-[var(--secondary)]">
          <div className="max-w-[600px] mx-auto px-6 text-center">
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-3">Not Sure Where to Start?</h2>
            <p className="text-[var(--muted-foreground)] mb-6">Create a free account and explore any level for 3 days at no cost. No payment required.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[#0a1840] transition-colors">
              Start Free Trial <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    trial: 'bg-blue-100 text-blue-700',
    expired: 'bg-red-100 text-red-600',
    locked: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
  };
  const labels: Record<string, string> = {
    active: 'Active',
    trial: '3-Day Trial',
    expired: 'Expired',
    locked: 'Locked',
  };
  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${styles[status] || styles.locked}`}>
      {labels[status] || 'Locked'}
    </span>
  );
}
