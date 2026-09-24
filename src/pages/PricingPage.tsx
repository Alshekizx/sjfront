import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const plans = [
  {
    code: '100L',
    label: '100 Level',
    subtitle: 'Foundation',
    price: 15000,
    courses: 8,
    topics: 96,
    popular: false,
  },
  {
    code: '200L',
    label: '200 Level',
    subtitle: 'Intermediate I',
    price: 20000,
    courses: 10,
    topics: 120,
    popular: false,
  },
  {
    code: '300L',
    label: '300 Level',
    subtitle: 'Intermediate II',
    price: 20000,
    courses: 11,
    topics: 132,
    popular: true,
  },
  {
    code: '400L',
    label: '400 Level',
    subtitle: 'Advanced',
    price: 25000,
    courses: 12,
    topics: 144,
    popular: false,
  },
  {
    code: '500L',
    label: '500 Level',
    subtitle: 'Final Year',
    price: 25000,
    courses: 10,
    topics: 120,
    popular: false,
  },
];

const included = [
  'Comprehensive law notes for all courses',
  'Video lectures and explanations',
  'Searchable case law library',
  'MCQ, problem & past questions',
  'Timed mock examinations with results',
  'Progress tracking & learning analytics',
  'Bookmarks & personal library',
  'Notes reader with navigation',
  'Secure Paystack payment processing',
  'Instant access on payment verification',
];

const faqs = [
  {
    q: 'Does purchasing one level give me access to other levels?',
    a: 'No. Each academic level is an independent subscription. Purchasing 300 Level gives you access only to 300 Level courses. To access 200 Level you would need a separate 200 Level subscription.',
  },
  {
    q: 'How does the 3-day free trial work?',
    a: 'When you create your account, you receive 3 days of free access to explore the platform. No payment is required to start your trial. After the trial ends, you can subscribe to the specific academic level you need.',
  },
  {
    q: 'How is payment processed?',
    a: 'All payments are processed securely through Paystack, Nigeria\'s leading payment gateway. Your payment is verified through our secure server-side system and access is granted instantly upon successful verification.',
  },
  {
    q: 'What happens if my subscription expires?',
    a: 'When your subscription expires, your access to that level\'s content becomes locked. Your account and all your progress, bookmarks, and history are preserved. You can renew at any time to regain access.',
  },
  {
    q: 'Can I access the platform on my mobile device?',
    a: 'Yes. SJ Law is fully responsive and optimised for desktop, tablet, and mobile browsers. You can read notes, watch videos, and practise questions on any device.',
  },
];

export default function PricingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12">
      <div className="text-center mb-14">
        <div className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">Simple, Transparent Pricing</div>
        <h1 className="text-5xl font-serif font-bold text-[var(--primary)] mb-4">Choose Your Level</h1>
        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
          Each academic level is priced independently. Pay only for the year you're studying  --  no bundles, no hidden fees, full access to that level's complete curriculum.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--primary)] text-sm px-4 py-2.5 rounded-full font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          All new accounts receive a 3-day free trial  --  no payment required
        </div>
      </div>

      {/* Plans */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
        {plans.map(plan => (
          <div
            key={plan.code}
            className={`relative bg-white rounded-2xl border overflow-hidden transition-shadow hover:shadow-xl
              ${plan.popular ? 'border-[#C9A84C] shadow-lg shadow-[#C9A84C]/10' : 'border-[#DDD8CC]'}`}
          >
            {plan.popular && (
              <div className="bg-[#C9A84C] text-[#0F2044] text-xs font-bold text-center py-1.5 tracking-wide">
                MOST POPULAR
              </div>
            )}
            <div className={`p-5 ${plan.popular ? 'navy-gradient' : 'bg-[#F5F3EE]'}`}>
              <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${plan.popular ? 'text-[#C9A84C]' : 'text-[#6B7280]'}`}>
                {plan.label}
              </div>
              <div className={`font-serif font-bold text-xl ${plan.popular ? 'text-white' : 'text-[#0F2044]'}`}>
                {plan.subtitle}
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <span className="text-3xl font-serif font-bold text-[#0F2044]">
                  \u20A6{plan.price.toLocaleString()}
                </span>
                <span className="text-xs text-[#6B7280]">/year</span>
              </div>
              <div className="space-y-2 mb-5 text-xs text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {plan.courses} law courses
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {plan.topics} topics
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All features included
                </div>
              </div>
              <Link
                to={isAuthenticated ? `/checkout/${plan.code}` : '/signup'}
                className={`block w-full text-center py-3 rounded-lg text-sm font-semibold transition-colors
                  ${plan.popular ? 'bg-[#C9A84C] text-[#0F2044] hover:bg-[#d4b862]' : 'bg-[#0F2044] text-white hover:bg-[#1a3666]'}`}
              >
                {isAuthenticated ? 'Subscribe' : 'Start Free Trial'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* What's included */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <div className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">Every Subscription Includes</div>
          <h2 className="text-3xl font-serif font-bold text-[var(--primary)] mb-6">Everything you need to succeed</h2>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {included.map(item => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-[var(--foreground)]">
                <div className="w-5 h-5 rounded-full bg-[var(--accent)]/15 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[var(--primary)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="relative">
            <div className="text-[#C9A84C] font-serif italic text-xl mb-4">Start free, subscribe when ready.</div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Create your account and explore the platform for 3 days at no cost. When your trial ends, subscribe to the specific academic level you're studying  --  nothing more, nothing less.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0F2044] font-bold rounded-lg hover:bg-[#d4b862] transition-colors text-sm"
            >
              Start Free Trial
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-[var(--primary)] text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map(faq => (
            <div key={faq.q} className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h3 className="font-serif font-semibold text-[var(--primary)] mb-2">{faq.q}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
