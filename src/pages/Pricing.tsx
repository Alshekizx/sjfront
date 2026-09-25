import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePageContent } from '@/lib/content';
import { getAcademicLevels, getSiteContent, type AcademicLevelData, type FaqData } from '@/lib/data';

export default function Pricing() {
  const content = usePageContent('pricing');
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [levels, setLevels] = useState<AcademicLevelData[]>([]);
  const [faqs, setFaqs] = useState<FaqData[]>([]);

  useEffect(() => {
    getAcademicLevels().then(setLevels).finally(() => setLoading(false));
    getSiteContent<FaqData>('pricing', 'faqs').then(setFaqs);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="container-shell text-center">
          <span className="block w-12 h-0.5 bg-[var(--accent)] mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Transparent, Level-Based Pricing</h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            {content.introduction}
          </p>
        </div>
      </section>

      {/* Trial banner */}
      <div className="bg-[var(--accent)] py-3">
        <p className="text-center text-sm font-semibold text-[var(--primary)]">
          🎓 Start with a 3-day free trial — no payment required. Explore any level at no cost.
        </p>
      </div>

      {/* Pricing cards */}
      <section className="py-16">
        <div className="container-shell">
          <p role="status" className="text-center text-[var(--muted-foreground)]">{loading ? 'Loading levels and prices…' : levels.length === 0 ? 'No subscription plans are available right now. Please try again later.' : ''}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {levels.map((level, i) => (
              <div
                key={level.level}
                className={`relative bg-white border rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${
                  i === 1 ? 'border-[var(--primary)] shadow-lg' : 'border-[var(--border)]'
                }`}
              >
                {i === 1 && (
                  <div className="absolute top-0 left-0 right-0 bg-[var(--primary)] py-1.5 text-center text-xs text-white font-semibold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className={`p-6 ${i === 1 ? 'pt-10' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full">{level.shortName}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[var(--primary)] mb-1">{level.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mb-5 leading-relaxed">{level.description.slice(0, 70)}…</p>

                  <div className="mb-6">
                    <p className="font-mono text-3xl font-bold text-[var(--primary)]">₦{level.price.toLocaleString()}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">per {level.duration}</p>
                  </div>

                  <ul className="space-y-2 mb-6 text-xs">
                    {[`${level.courses} courses`, `${level.topics} topics`, 'Notes & videos', 'Case law library', 'Practice questions', 'Mock exams', 'Progress tracking'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[var(--foreground)]">
                        <CheckCircle size={12} className="text-[var(--accent)] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={isAuthenticated ? `/checkout/${level.level}` : '/signup'}
                    className={`block text-center py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                      i === 1
                        ? 'bg-[var(--primary)] text-white hover:bg-[#0a1840]'
                        : 'border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
                    }`}
                  >
                    {isAuthenticated ? 'Subscribe' : 'Start Free Trial'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-[var(--muted)] rounded-xl border border-[var(--border)] text-center max-w-2xl mx-auto">
            <p className="text-sm text-[var(--muted-foreground)]">
              <strong className="text-[var(--foreground)]">Independent subscriptions:</strong> Each level is purchased separately. Purchasing 100 Level does not include 200 Level content — this ensures you only pay for what you need.
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 bg-[var(--secondary)]">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-10">Every Subscription Includes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(content.benefits || []).map((item: any) => [item.title, item.description]).map(([title, desc]: string[]) => (
              <div key={title} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[var(--border)]">
                <CheckCircle size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-[var(--foreground)] pr-4">{faq.question}</span>
                  <HelpCircle size={16} className={`shrink-0 mt-0.5 transition-colors ${openFaq === i ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--primary)] text-white">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-white/70 mb-8">Create your account today and receive 3 days of free access — no payment required.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-[var(--primary)] font-semibold rounded-lg hover:bg-[#D4A830] transition-colors">
            Start Free Trial <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
