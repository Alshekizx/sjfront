import { Link } from 'react-router-dom';
import logoParchment from '../assets/logo-parchment.png';

const levels = [
  {
    code: '100L',
    label: '100 Level',
    subtitle: 'Foundation',
    courses: 8,
    price: '₦15,000',
    description:
      'Introduction to law, Nigerian legal system, legal method, constitutional foundations.',
  },
  {
    code: '200L',
    label: '200 Level',
    subtitle: 'Intermediate I',
    courses: 10,
    price: '₦20,000',
    description:
      'Contract law, law of torts, criminal law, property law fundamentals.',
  },
  {
    code: '300L',
    label: '300 Level',
    subtitle: 'Intermediate II',
    courses: 11,
    price: '₦20,000',
    description:
      'Equity & trusts, commercial law, evidence, family law, administrative law.',
  },
  {
    code: '400L',
    label: '400 Level',
    subtitle: 'Advanced',
    courses: 12,
    price: '₦25,000',
    description:
      'Company law, labour law, international law, conflict of laws, tax law.',
  },
  {
    code: '500L',
    label: '500 Level',
    subtitle: 'Final Year',
    courses: 10,
    price: '₦25,000',
    description:
      'Professional ethics, clinical legal education, jurisprudence, law of banking.',
  },
];

const features = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: 'Comprehensive Notes',
    desc: 'Professionally written, barrister-quality law notes covering every topic with definitions, case references, and key principles.',
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    title: 'Video Lectures',
    desc: 'High-quality video explanations of complex legal concepts, statutes, and landmark cases by experienced legal educators.',
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: 'Practice Questions',
    desc: 'MCQs, problem questions, past exam questions, and timed mock examinations with detailed explanations and model answers.',
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    title: 'Case Law Library',
    desc: 'Searchable database of landmark Nigerian and international cases with facts, ratios, decisions, and legal principles explained simply.',
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: 'Progress Tracking',
    desc: 'Visual dashboards showing your learning progress, practice performance, completed topics, and examination history.',
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: 'Secure & Independent',
    desc: 'Each academic level is an independent subscription -- pay only for what you need, with secure Paystack payment processing.',
  },
];

const testimonials = [
  {
    name: 'Chidinma Eze',
    school: 'University of Nigeria, Nsukka',
    level: '300 Level',
    quote:
      'SJ Law transformed how I study. The notes are comprehensive, the case law section saved me hours of research, and the mock exams helped me ace my semester.',
  },
  {
    name: 'Babatunde Adeyemi',
    school: 'Obafemi Awolowo University',
    level: '400 Level',
    quote:
      'The practice questions are exactly like what comes in exams. I improved from a C to an A in Constitutional Law after just three weeks on the platform.',
  },
  {
    name: 'Fatima Al-Hassan',
    school: 'Ahmadu Bello University',
    level: '200 Level',
    quote:
      "As a 200 Level student, SJ Law made contract law and torts finally click. The video explanations are brilliant and the notes are better than anything I've found elsewhere.",
  },
];

const steps = [
  {
    n: '01',
    title: 'Create Your Account',
    desc: 'Sign up with your details, verify your email, and receive 3 days of free platform access.',
  },
  {
    n: '02',
    title: 'Explore Your Level',
    desc: "Browse the Academic Levels page, review course listings, and see what's waiting for you.",
  },
  {
    n: '03',
    title: 'Subscribe & Unlock',
    desc: 'Choose your academic level, pay securely via Paystack, and get immediate access.',
  },
  {
    n: '04',
    title: 'Start Learning',
    desc: 'Read notes, watch videos, study cases, practise questions, and track your progress.',
  },
];

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden bg-white text-[#0F2044]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0F2044] pt-20">
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Decorative gold glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />

        <div className="container-shell relative">
          <div className="grid min-h-[620px] items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">

            {/* Hero content */}
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-xs font-medium text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                3-Day Free Trial
                <span className="text-white/35">•</span>
                No Credit Card Required
              </div>

              <h1 className="mb-6 font-serif text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-white">
                Nigeria's Premier
                <span className="mt-1 block text-[#C9A84C] italic">
                  Digital Law School
                </span>
              </h1>

              <p className="mb-8 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                Structured, subscription-based legal education for law students
                at every academic level -- comprehensive notes, video lectures,
                case law, and practice examinations.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-7 text-sm font-bold text-[#0F2044] shadow-lg shadow-black/10 transition-all hover:bg-[#D4B862] hover:-translate-y-0.5"
                >
                  Start Free Trial
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  to="/levels"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.06] px-7 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Explore Levels
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-white/10 pt-7 sm:gap-x-10">
                {[
                  ['2,400+', 'Students Enrolled'],
                  ['51+', 'Law Courses'],
                  ['5', 'Academic Levels'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="font-serif text-2xl font-bold text-white">
                      {value}
                    </div>
                    <div className="mt-0.5 text-xs text-white/45">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:flex lg:justify-center">
              <div className="relative w-full max-w-[430px]">

                <div className="relative mx-auto flex aspect-square max-w-[350px] items-center justify-center rounded-full border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20">
                  <div className="absolute inset-7 rounded-full border border-[#C9A84C]/15" />

                  <img
                    src={logoParchment}
                    alt="SJ Law"
                    className="relative z-10 h-56 w-56 object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Trial badge */}
                <div className="absolute right-0 top-5 rounded-xl border border-[#E5E0D5] bg-white px-4 py-3 shadow-xl">
                  <div className="text-sm font-bold text-[#0F2044]">
                    Trial Active
                  </div>
                  <div className="mt-0.5 text-xs text-[#6B7280]">
                    3 days remaining
                  </div>
                </div>

                {/* Progress badge */}
                <div className="absolute bottom-5 left-0 w-56 rounded-xl border border-[#E5E0D5] bg-white px-4 py-3 shadow-xl">
                  <div className="mb-2 text-xs text-[#6B7280]">
                    Progress -- Criminal Law
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EAE6DC]">
                      <div className="h-full w-2/3 rounded-full bg-[#C9A84C]" />
                    </div>

                    <span className="text-xs font-bold text-[#0F2044]">
                      67%
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACADEMIC LEVELS
      ========================================================= */}
      <section className="bg-[#F5F3EE] py-16 sm:py-20">
        <div className="container-shell">

          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              5 Academic Levels
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#0F2044] sm:text-4xl">
              One Platform, Every Year of Law School
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
              Each level is an independent subscription -- access exactly the
              year of law school you're studying, at a price that makes sense.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((level) => (
              <Link
                key={level.code}
                to={`/levels/${level.code.replace('L', '')}`}
                className="group flex min-h-[245px] flex-col rounded-xl border border-[#DDD8CC] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#C9A84C] hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between gap-2">
                  <span className="rounded bg-[#0F2044] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {level.label}
                  </span>

                  <span className="text-[11px] text-[#6B7280]">
                    {level.courses} courses
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0F2044]">
                  {level.subtitle}
                </h3>

                <p className="mt-2 flex-1 text-xs leading-5 text-[#6B7280]">
                  {level.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#EEEAE2] pt-4">
                  <span className="font-bold text-[#C9A84C]">
                    {level.price}
                    <span className="ml-1 text-[10px] font-normal text-[#6B7280]">
                      /yr
                    </span>
                  </span>

                  <svg
                    className="h-4 w-4 text-[#C9A84C] transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-shell">

          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Everything You Need
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#0F2044] sm:text-4xl">
              A Complete Legal Learning Environment
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-[#DDD8CC] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#C9A84C]/60 hover:shadow-lg"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#0F2044] text-[#C9A84C] transition-colors group-hover:bg-[#C9A84C] group-hover:text-[#0F2044]">
                  {feature.icon}
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0F2044]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="bg-[#F5F3EE] py-16 sm:py-20">
        <div className="container-shell">

          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Getting Started
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#0F2044] sm:text-4xl">
              Begin Your Legal Education in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.n} className="relative">

                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(100%-4px)] top-10 hidden h-px w-8 bg-[#D8D2C6] lg:block" />
                )}

                <div className="relative z-10 h-full rounded-xl border border-[#DDD8CC] bg-white p-6">
                  <div className="mb-3 font-serif text-4xl font-bold leading-none text-[#C9A84C]/35">
                    {step.n}
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0F2044]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0F2044] py-16 sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="container-shell relative">
          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto mb-7 h-px w-12 bg-[#C9A84C]" />

            <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              3 Days Free.
              <span className="block text-[#C9A84C] italic">
                No strings attached.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
              Create your account today and explore everything SJ Law has to
              offer -- no payment required. When your trial ends, choose the
              academic level that matches your year.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-8 text-sm font-bold text-[#0F2044] transition-all hover:bg-[#D4B862] hover:-translate-y-0.5"
              >
                Start Free Trial

                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                to="/pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-shell">

          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Student Stories
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#0F2044] sm:text-4xl">
              What Law Students Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex h-full flex-col rounded-xl border border-[#DDD8CC] bg-[#F5F3EE] p-7"
              >
                <div className="mb-5 flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="h-4 w-4 text-[#C9A84C]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="flex-1 text-sm italic leading-6 text-[#1A1A2E]">
                  "{testimonial.quote}"
                </p>

                <div className="mt-7 border-t border-[#DDD8CC] pt-5">
                  <div className="font-semibold text-[#0F2044]">
                    {testimonial.name}
                  </div>

                  <div className="mt-1 text-xs leading-5 text-[#6B7280]">
                    {testimonial.school} -- {testimonial.level}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}