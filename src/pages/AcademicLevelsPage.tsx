import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const levelsData = [
  {
    code: '100',
    label: '100 Level',
    subtitle: 'Foundation of Law',
    price: '\u20A615,000',
    duration: '12 months',
    courses: 8,
    topics: 96,
    description: 'Begin your legal education with the fundamental principles that underpin Nigerian and common law. This level introduces you to the legal system, legal reasoning, and foundational doctrines across eight key courses.',
    objectives: [
      'Understand the structure of the Nigerian legal system',
      'Apply legal reasoning and statutory interpretation',
      'Identify the sources of Nigerian law',
      'Analyse the Nigerian constitution at a foundational level',
      'Understand the basics of criminal and private law',
    ],
    courseList: [
      { title: 'Nigerian Legal System', code: 'LAW 101' },
      { title: 'Legal Method', code: 'LAW 102' },
      { title: 'Constitutional Law I', code: 'LAW 103' },
      { title: 'Introduction to Criminal Law', code: 'LAW 104' },
      { title: 'Law of Persons', code: 'LAW 105' },
      { title: 'Legal Writing & Research', code: 'LAW 106' },
      { title: 'Introduction to Contract', code: 'LAW 107' },
      { title: 'Introduction to Torts', code: 'LAW 108' },
    ],
  },
  {
    code: '200',
    label: '200 Level',
    subtitle: 'Intermediate I',
    price: '\u20A620,000',
    duration: '12 months',
    courses: 10,
    topics: 120,
    description: 'Build on your foundation with deeper study of core private law subjects, criminal liability, and property law. You will develop the analytical skills needed to tackle complex legal problems.',
    objectives: [
      'Apply the law of contract to complex fact patterns',
      'Analyse tortious liability across key areas',
      'Understand criminal liability, defences, and sentencing',
      'Apply land law and property concepts',
      'Critically evaluate legal arguments across disciplines',
    ],
    courseList: [
      { title: 'Contract Law', code: 'LAW 201' },
      { title: 'Law of Torts', code: 'LAW 202' },
      { title: 'Criminal Law & Procedure', code: 'LAW 203' },
      { title: 'Land Law I', code: 'LAW 204' },
      { title: 'Constitutional Law II', code: 'LAW 205' },
      { title: 'Commercial Law I', code: 'LAW 206' },
      { title: 'Introduction to Equity', code: 'LAW 207' },
      { title: 'Law of Evidence I', code: 'LAW 208' },
      { title: 'Legal Drafting I', code: 'LAW 209' },
      { title: 'Human Rights Law', code: 'LAW 210' },
    ],
  },
  {
    code: '300',
    label: '300 Level',
    subtitle: 'Intermediate II',
    price: '\u20A620,000',
    duration: '12 months',
    courses: 11,
    topics: 132,
    description: 'Advance to specialist areas of law including equity & trusts, evidence, family law, and administrative law. You will deepen your ability to synthesise legal doctrine with practical application.',
    objectives: [
      'Apply equity and trust law principles comprehensively',
      'Analyse the law of evidence in civil and criminal proceedings',
      'Apply family law in Nigerian and comparative contexts',
      'Understand administrative law and judicial review',
      'Apply commercial and company law at an intermediate level',
    ],
    courseList: [
      { title: 'Constitutional Law III', code: 'LAW 301' },
      { title: 'Criminal Law & Procedure II', code: 'LAW 302' },
      { title: 'Law of Evidence II', code: 'LAW 303' },
      { title: 'Equity & Trusts', code: 'LAW 304' },
      { title: 'Family Law', code: 'LAW 305' },
      { title: 'Administrative Law', code: 'LAW 306' },
      { title: 'Land Law II', code: 'LAW 307' },
      { title: 'Commercial Law II', code: 'LAW 308' },
      { title: 'Labour Law I', code: 'LAW 309' },
      { title: 'Law of Succession', code: 'LAW 310' },
      { title: 'Conflict of Laws I', code: 'LAW 311' },
    ],
  },
  {
    code: '400',
    label: '400 Level',
    subtitle: 'Advanced',
    price: '\u20A625,000',
    duration: '12 months',
    courses: 12,
    topics: 144,
    description: 'Engage with advanced corporate, international, and procedural law. Develop professional-level competency across twelve specialist courses aligned with the demands of legal practice.',
    objectives: [
      'Apply company law in Nigerian commercial contexts',
      'Analyse complex international law issues',
      'Apply civil procedure rules in Nigerian courts',
      'Understand advanced labour and employment law',
      'Apply Nigerian tax law to diverse factual situations',
    ],
    courseList: [
      { title: 'Company Law', code: 'LAW 401' },
      { title: 'Labour Law II', code: 'LAW 402' },
      { title: 'International Law I', code: 'LAW 403' },
      { title: 'Civil Procedure', code: 'LAW 404' },
      { title: 'Conflict of Laws II', code: 'LAW 405' },
      { title: 'Tax Law', code: 'LAW 406' },
      { title: 'Intellectual Property Law', code: 'LAW 407' },
      { title: 'Banking & Finance Law', code: 'LAW 408' },
      { title: 'Environmental Law', code: 'LAW 409' },
      { title: 'International Trade Law', code: 'LAW 410' },
      { title: 'ADR & Arbitration', code: 'LAW 411' },
      { title: 'Legal Drafting II', code: 'LAW 412' },
    ],
  },
  {
    code: '500',
    label: '500 Level',
    subtitle: 'Final Year',
    price: '\u20A625,000',
    duration: '12 months',
    courses: 10,
    topics: 120,
    description: 'Complete your legal education with jurisprudence, professional ethics, clinical legal education, and specialist practice areas. Graduate ready for the Nigerian Law School examination.',
    objectives: [
      'Apply professional ethics in legal practice',
      'Analyse jurisprudential theories and their application',
      'Apply clinical legal skills in simulated practice contexts',
      'Understand and apply criminal practice and procedure',
      'Integrate knowledge across five years of legal study',
    ],
    courseList: [
      { title: 'Jurisprudence & Legal Theory', code: 'LAW 501' },
      { title: 'Professional Ethics & Conduct', code: 'LAW 502' },
      { title: 'Clinical Legal Education', code: 'LAW 503' },
      { title: 'Criminal Practice & Procedure', code: 'LAW 504' },
      { title: 'Islamic Law in Nigeria', code: 'LAW 505' },
      { title: 'Law of Banking', code: 'LAW 506' },
      { title: 'International Human Rights', code: 'LAW 507' },
      { title: 'Law Reform & Legislation', code: 'LAW 508' },
      { title: 'Dissertation / Research Project', code: 'LAW 509' },
      { title: 'Nigerian Law School Prep', code: 'LAW 510' },
    ],
  },
];

function LevelCard({ lvl, isUnlocked }: { lvl: typeof levelsData[0]; isUnlocked: boolean }) {
  return (
    <Link
      to={`/levels/${lvl.code}`}
      className="group bg-white rounded-2xl border border-[#DDD8CC] overflow-hidden hover:border-[#C9A84C] hover:shadow-xl transition-all"
    >
      <div className="navy-gradient p-6 relative">
        <div className="absolute top-3 right-3">
          {isUnlocked ? (
            <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Active</span>
          ) : (
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Locked
            </span>
          )}
        </div>
        <div className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2">{lvl.label}</div>
        <h3 className="text-white font-serif font-bold text-2xl mb-1">{lvl.subtitle}</h3>
        <div className="flex gap-4 mt-3">
          <div className="text-white/60 text-xs">{lvl.courses} courses</div>
          <div className="text-white/60 text-xs">{lvl.topics} topics</div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-[#6B7280] leading-relaxed mb-5 line-clamp-3">{lvl.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-serif font-bold text-[#0F2044]">{lvl.price}</div>
            <div className="text-xs text-[#6B7280]">per year  -  {lvl.duration}</div>
          </div>
          <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
            ${isUnlocked
              ? 'bg-[#F5F3EE] text-[#0F2044] group-hover:bg-[#0F2044] group-hover:text-white'
              : 'bg-[#0F2044] text-white group-hover:bg-[#C9A84C] group-hover:text-[#0F2044]'
            }`}>
            {isUnlocked ? 'Continue Learning' : 'Subscribe'}
          </div>
        </div>
      </div>
    </Link>
  );
}

function LevelDetailPage({ code }: { code: string }) {
  const { user, isAuthenticated } = useAuth();
  const lvl = levelsData.find(l => l.code === code);
  if (!lvl) return <div className="p-8 text-center text-[#6B7280]">Level not found.</div>;

  const isUnlocked = isAuthenticated && !!user?.subscriptions.some((subscription) => subscription.level.toString() === code);

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
        <Link to="/levels" className="hover:text-[#0F2044]">Academic Levels</Link>
        <span>/</span>
        <span className="text-[#0F2044] font-medium">{lvl.label}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 bg-[#0F2044] text-[#C9A84C] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            {lvl.label}
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#0F2044] mb-3">{lvl.subtitle}</h1>
          <p className="text-[#6B7280] leading-relaxed mb-8">{lvl.description}</p>

          <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-4">Learning Objectives</h2>
          <ul className="space-y-2.5 mb-8">
            {lvl.objectives.map(obj => (
              <li key={obj} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-[#1A1A2E]">{obj}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-4">Courses in this Level</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {lvl.courseList.map(course => (
              <div
                key={course.code}
                className={`flex items-center gap-3 p-4 rounded-xl border ${isUnlocked ? 'border-[#DDD8CC] bg-white hover:border-[#C9A84C] cursor-pointer' : 'border-[#DDD8CC] bg-[#F5F3EE] opacity-70'}`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#0F2044] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {course.code.replace('LAW ', '')}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#0F2044]">{course.title}</div>
                  <div className="text-xs text-[#6B7280]">{course.code}</div>
                </div>
                {!isUnlocked && (
                  <svg className="w-4 h-4 text-[#DDD8CC] ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6 sticky top-20">
            <div className="text-3xl font-serif font-bold text-[#0F2044] mb-1">{lvl.price}</div>
            <div className="text-sm text-[#6B7280] mb-5">Annual subscription  -  {lvl.duration}</div>
            <div className="space-y-2.5 mb-6">
              {[
                `${lvl.courses} comprehensive law courses`,
                `${lvl.topics} structured learning topics`,
                'Full notes, videos & case law',
                'Practice questions & mock exams',
                'Progress tracking & bookmarks',
                'Paystack secure payment',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-[#1A1A2E]">
                  <svg className="w-4 h-4 text-[#C9A84C] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
            {isUnlocked ? (
              <Link to="/courses" className="block w-full text-center py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                Continue Learning
              </Link>
            ) : (
              <Link to={isAuthenticated ? `/checkout/${lvl.code}` : '/signup'} className="block w-full text-center py-3.5 bg-[#0F2044] text-white font-semibold rounded-xl hover:bg-[#C9A84C] hover:text-[#0F2044] transition-colors">
                {isAuthenticated ? `Subscribe  --  ${lvl.price}` : 'Start Free Trial'}
              </Link>
            )}
            <p className="text-xs text-center text-[#6B7280] mt-3">Secure payment via Paystack. Instant access on verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AcademicLevelsPage() {
  const { code } = useParams<{ code?: string }>();
  const { user, isAuthenticated } = useAuth();

  if (code) return <LevelDetailPage code={code} />;

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10">
      <div className="text-center mb-12">
        <div className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-3">5 Independent Levels</div>
        <h1 className="text-5xl font-serif font-bold text-[#0F2044] mb-4">Academic Levels</h1>
        <p className="text-[#6B7280] max-w-xl mx-auto leading-relaxed">
          Each academic level is an independent subscription package. Subscribe to any level you need  --  access is enforced at the database level for complete security.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {levelsData.map(lvl => (
          <LevelCard
            key={lvl.code}
            lvl={lvl}
            isUnlocked={isAuthenticated && !!user?.subscriptions.some((subscription) => subscription.level.toString() === lvl.code)}
          />
        ))}
      </div>

      <div className="mt-10 bg-[#F5F3EE] rounded-2xl border border-[#DDD8CC] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-serif font-bold text-[#0F2044] text-lg">Not sure where to start?</div>
          <div className="text-sm text-[#6B7280] mt-1">Sign up for a free 3-day trial and explore all levels before subscribing.</div>
        </div>
        <Link to="/signup" className="shrink-0 px-6 py-3 bg-[#0F2044] text-white font-semibold rounded-lg hover:bg-[#C9A84C] hover:text-[#0F2044] transition-colors text-sm">
          Start Free Trial
        </Link>
      </div>
    </div>
  );
}
