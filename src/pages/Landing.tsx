import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  Lock,
  Play,
  Scale,
} from 'lucide-react';
import { getAcademicLevels, getSiteContent, type AcademicLevelData, type FaqData, type TestimonialData } from '@/lib/data';
import { usePageContent, useCatalogCounts } from '@/lib/content';
import logoLight from '@/assets/ref3.png';

export default function Landing() {
  const content = usePageContent('home');
  const counts = useCatalogCounts();
  const FEATURE_ITEMS: { title: string; description: string }[] = content.features || [];
  const STEPS: { step: string; title: string; description: string }[] = (content.steps || []).map((item: any, index: number) => ({ ...item, step: String(index + 1).padStart(2, '0') }));

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [levels, setLevels] = useState<AcademicLevelData[]>([]);
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);

  useEffect(() => {
    getAcademicLevels().then(setLevels);
    getSiteContent<FaqData>('home', 'faqs').then(setFaqs);
    getSiteContent<TestimonialData>('home', 'testimonials').then(setTestimonials);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative overflow-hidden bg-[var(--primary)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,166,77,0.18),transparent_28%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_52%)] lg:block" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 top-8 h-80 w-80 rounded-full border border-white/60" />
          <div className="absolute -right-8 top-20 h-52 w-52 rounded-full border border-white/50" />
          <div className="absolute bottom-0 left-1/4 h-full w-px bg-white/30" />
        </div>

        <div className="container-shell relative pb-12 pt-8 md:pb-16 md:pt-10 lg:pb-20 lg:pt-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-sm text-white/85 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>3-Day Free Trial · No Credit Card Required</span>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">The Digital Law School</p>
                <h1 className="max-w-[620px] text-[clamp(3.1rem,5vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.04em] text-white">
                  {content.heading || 'SJ Law Academy'}
                </h1>
              </div>

              <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-white/76 md:text-lg">
                {content.introduction}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/signup" className="btn btn-primary">
                  Start Free Trial
                  <ArrowRight size={16} />
                </Link>
                <Link to="/academic-levels" className="btn btn-secondary border-white/30 bg-white/5 text-white hover:bg-white/8 hover:text-white">
                  Explore Academic Levels
                </Link>
                <Link to="/login" className="btn btn-ghost border-transparent bg-transparent px-3 text-white/80 hover:text-white">
                  Sign In
                  <ChevronRight size={16} />
                </Link>
              </div>


            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[490px]">
                <div className="absolute -inset-7 rounded-[2.3rem] bg-[radial-gradient(circle,rgba(212,166,77,0.22),transparent_54%)] blur-3xl" />

                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-4 shadow-[0_40px_120px_rgba(4,8,18,0.3)] backdrop-blur-md md:p-5">
                  <div className="rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4 md:p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                        <img src={logoLight} alt="SJ Law Academy" className="h-10 w-auto" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                        Live
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">{[['Academic levels', counts.levels], ['Courses', counts.courses], ['Topics', counts.topics], ['Cases', counts.cases]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/5 p-4"><p className="font-serif text-3xl">{value ?? '—'}</p><p className="text-sm text-white/70">{label}</p></div>)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 md:py-20">
        <div className="container-shell">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <span className="gold-line mx-auto" />
            <h2 className="mt-4 text-[clamp(2.4rem,4vw,4rem)] text-[var(--primary)]">Everything you need to excel in law</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
              SJ Law Academy brings together every resource a serious law student needs — structured, searchable and built around the Nigerian legal curriculum.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {FEATURE_ITEMS.map((feature) => {
              const Icon = BookOpen;

              return (
                <article
                  key={feature.title}
                  className="group rounded-[1.5rem] border border-[var(--border)] bg-white p-6 shadow-[0_16px_40px_rgba(13,31,76,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(13,31,76,0.08)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/8 text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-2 text-[1.45rem] font-semibold text-[var(--primary)]">{feature.title}</h3>
                  <p className="text-[0.98rem] leading-relaxed text-[var(--muted-foreground)]">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--secondary)] py-16 md:py-20">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="gold-line" />
              <h2 className="mt-4 max-w-xl text-[clamp(2.3rem,3vw,3.5rem)] text-[var(--primary)]">Five academic levels. One powerful platform.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)]">
                Each level is structured independently so you can subscribe to what you need and focus on the content that matters most.
              </p>
            </div>

            <Link to="/academic-levels" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--accent)]">
              View all levels
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-4 md:grid md:grid-cols-2 xl:grid-cols-5">
              {levels.map((level, index) => (
                <article
                  key={level.level}
                  className="flex w-[280px] flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-white shadow-[0_16px_38px_rgba(13,31,76,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(13,31,76,0.08)] md:w-auto"
                >
                  <div className="h-1.5 bg-[var(--accent)]" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-[var(--primary)]/30">{level.shortName}</span>
                      {index === 0 ? <CheckCircle size={16} className="text-emerald-500" /> : <Lock size={16} className="text-[var(--muted-foreground)]" />}
                    </div>

                    <h3 className="text-[1.6rem] font-semibold text-[var(--primary)]">{level.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{level.description}</p>

                    <div className="mt-5 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                      <span>{level.courses} Courses</span>
                      <span>{level.topics} Topics</span>
                    </div>

                    <div className="mt-4 border-t border-[var(--border)] pt-4">
                      <p className="font-mono text-base font-semibold text-[var(--accent)]">₦{level.price.toLocaleString()} / {level.duration}</p>
                    </div>

                    <Link
                      to={`/academic-levels#level-${level.level}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--muted)] px-3 py-2.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)]/15 hover:bg-[var(--primary)] hover:text-white"
                    >
                      {index === 0 ? 'Explore Level' : 'View Level'}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-shell">
          <div className="grid items-center gap-11 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="gold-line" />
              <h2 className="mt-4 text-[clamp(2.3rem,3.2vw,3.8rem)] text-[var(--primary)]">Start learning in minutes</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
                Getting started is simple. Sign up, choose your level, and begin studying with a structure designed to keep you focused and consistent.
              </p>

              <div className="mt-10 space-y-7">
                {STEPS.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] font-mono text-sm font-bold text-[var(--accent)]">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="mb-1 text-[1.45rem] font-semibold text-[var(--primary)]">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 space-y-4">{levels.map(level => <Link key={level.id} to="/academic-levels" className="block rounded-xl bg-[var(--secondary)] p-4"><h3 className="font-serif text-xl">{level.name}</h3><p className="text-sm text-[var(--muted-foreground)]">{level.description}</p><p className="text-xs mt-2">{level.courses} courses · {level.topics} topics</p></Link>)}</div>
          </div>
        </div>
      </section>



      <section className="py-16 md:py-20">
        <div className="container-shell">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="gold-line mx-auto" />
            <h2 className="mt-4 text-[clamp(2.3rem,3.5vw,3.8rem)] text-[var(--primary)]">Students are seeing the difference</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_48px_rgba(13,31,76,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[var(--secondary)] text-sm font-semibold text-[var(--primary)]">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--primary)]">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted-foreground)]">{testimonial.level}</p>
                  </div>
                </div>
                <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)]">“{testimonial.quote}”</p>
                <div className="mt-5 border-t border-[var(--border)] pt-4 text-sm text-[var(--muted-foreground)]">
                  {testimonial.university}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--secondary)] py-16 md:py-20">
        <div className="container-shell">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="gold-line mx-auto" />
            <h2 className="mt-4 text-[clamp(2.3rem,3.5vw,3.8rem)] text-[var(--primary)]">Frequently asked questions</h2>
          </div>

          <div className="mx-auto max-w-4xl rounded-[1.6rem] border border-[var(--border)] bg-white p-2 shadow-[0_20px_48px_rgba(13,31,76,0.04)]">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={item.question} className={`border-b border-[var(--border)] last:border-b-0 ${isOpen ? 'bg-[var(--muted)]' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-[var(--primary)] md:text-lg">{item.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[var(--primary)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--muted-foreground)] md:px-6 md:text-base">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-shell">
          <div className="rounded-[2rem] bg-[var(--primary)] px-6 py-10 text-center text-white shadow-[0_35px_90px_rgba(13,31,76,0.16)] md:px-10 md:py-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">Join the platform</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(2.2rem,4vw,4rem)] leading-[1.03] tracking-[-0.04em] text-white">
              Study smarter. Understand the law. Prepare with confidence.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Bring your notes, cases, lessons and practice questions into one structured learning platform built for Nigerian law students.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/signup" className="btn btn-primary">
                Start Free Trial
                <ArrowRight size={16} />
              </Link>
              <Link to="/academic-levels" className="btn btn-secondary border-white/30 bg-white/5 text-white hover:bg-white/8 hover:text-white">
                Explore Academic Levels
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[110px]">
      <p className="font-serif text-[2.05rem] font-bold leading-none tracking-[-0.04em] text-white md:text-[2.5rem]">{value}</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/65">{label}</p>
    </div>
  );
}
