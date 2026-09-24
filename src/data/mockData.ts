export const ACADEMIC_LEVELS = [
  {
    level: 1,
    name: '100 Level',
    shortName: '100L',
    description:
      'Foundation of Nigerian legal system, constitutional law, legal methods and the principles that underpin all areas of law.',
    courses: 8,
    topics: 124,
    price: 12000,
    duration: '6 months',
    objectives: [
      'Understand the Nigerian legal system and its institutions',
      'Master foundational constitutional law principles',
      'Develop legal research and writing skills',
      'Grasp the basics of criminal and civil law',
    ],
    color: '#1B4F72',
  },
  {
    level: 2,
    name: '200 Level',
    shortName: '200L',
    description:
      'Contract law, law of torts, property law fundamentals, and introduction to Nigerian procedural law.',
    courses: 9,
    topics: 148,
    price: 14000,
    duration: '6 months',
    objectives: [
      'Master the elements and vitiating factors of a valid contract',
      'Understand tortious liability and negligence',
      'Grasp real property and land law basics',
      'Understand civil and criminal procedure foundations',
    ],
    color: '#1A5276',
  },
  {
    level: 3,
    name: '300 Level',
    shortName: '300L',
    description:
      'Advanced property law, equity and trusts, company law, evidence and the law of succession.',
    courses: 10,
    topics: 162,
    price: 16000,
    duration: '6 months',
    objectives: [
      'Apply equitable principles and trusts law',
      'Understand corporate structures and company law',
      'Master the law of evidence and its application',
      'Understand succession, wills and estate administration',
    ],
    color: '#154360',
  },
  {
    level: 4,
    name: '400 Level',
    shortName: '400L',
    description:
      'Commercial law, banking law, intellectual property, taxation, and international law principles.',
    courses: 10,
    topics: 175,
    price: 18000,
    duration: '6 months',
    objectives: [
      'Navigate commercial transactions and banking regulations',
      'Protect intellectual property rights under Nigerian law',
      'Understand taxation principles and tax planning',
      'Apply international law in Nigerian legal practice',
    ],
    color: '#0E3460',
  },
  {
    level: 5,
    name: '500 Level',
    shortName: '500L',
    description:
      'Clinical legal education, law of arbitration, advanced constitutional law, professional ethics and bar examinations preparation.',
    courses: 8,
    topics: 136,
    price: 20000,
    duration: '6 months',
    objectives: [
      'Apply legal knowledge in real-world clinical settings',
      'Master arbitration and alternative dispute resolution',
      'Understand advanced constitutional law and human rights',
      'Prepare comprehensively for the Nigerian Bar Examinations',
    ],
    color: '#0D2B4E',
  },
];

export const MOCK_COURSES = [
  {
    id: 'c001',
    level: 2,
    code: 'LAW 211',
    title: 'Law of Contract I',
    description: 'Formation, terms, and vitiating factors of contracts under Nigerian law',
    topics: 18,
    completedTopics: 12,
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=340&fit=crop&auto=format',
    instructor: 'Prof. Emeka Eze',
  },
  {
    id: 'c002',
    level: 2,
    code: 'LAW 212',
    title: 'Law of Torts',
    description: 'Negligence, nuisance, defamation, and other tortious liabilities',
    topics: 16,
    completedTopics: 5,
    thumbnail: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=600&h=340&fit=crop&auto=format',
    instructor: 'Dr. Ngozi Adeyemi',
  },
  {
    id: 'c003',
    level: 2,
    code: 'LAW 213',
    title: 'Constitutional Law I',
    description: 'Nigerian constitutional framework, fundamental rights and governance',
    topics: 14,
    completedTopics: 14,
    thumbnail: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=340&fit=crop&auto=format',
    instructor: 'Prof. Abiodun Fashola',
  },
  {
    id: 'c004',
    level: 2,
    code: 'LAW 214',
    title: 'Land Law',
    description: 'Land tenure system, Land Use Act and Nigerian property law',
    topics: 20,
    completedTopics: 0,
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=340&fit=crop&auto=format',
    instructor: 'Dr. Chidinma Obi',
  },
];

export const MOCK_TOPICS = [
  { id: 't001', courseId: 'c001', title: 'Offer and Acceptance', completed: true, hasVideo: true, hasNotes: true },
  { id: 't002', courseId: 'c001', title: 'Consideration', completed: true, hasVideo: true, hasNotes: true },
  { id: 't003', courseId: 'c001', title: 'Intention to Create Legal Relations', completed: true, hasVideo: false, hasNotes: true },
  { id: 't004', courseId: 'c001', title: 'Capacity to Contract', completed: true, hasVideo: true, hasNotes: true },
  { id: 't005', courseId: 'c001', title: 'Terms of a Contract', completed: false, hasVideo: true, hasNotes: true },
  { id: 't006', courseId: 'c001', title: 'Misrepresentation', completed: false, hasVideo: false, hasNotes: true },
  { id: 't007', courseId: 'c001', title: 'Mistake', completed: false, hasVideo: true, hasNotes: true },
  { id: 't008', courseId: 'c001', title: 'Duress and Undue Influence', completed: false, hasVideo: false, hasNotes: true },
];

export const MOCK_CASES = [
  {
    id: 'cs001',
    name: 'Carlill v Carbolic Smoke Ball Co',
    citation: '[1893] 1 QB 256',
    year: 1893,
    court: 'Court of Appeal, England',
    topic: 'Offer and Acceptance',
    course: 'Law of Contract I',
    principle: 'A general offer to the world at large can constitute a valid offer in contract law',
    significance: 'Landmark case establishing that advertisements can constitute binding offers when they are sufficiently specific and promise a reward.',
    bookmarked: true,
  },
  {
    id: 'cs002',
    name: 'Donoghue v Stevenson',
    citation: '[1932] AC 562',
    year: 1932,
    court: 'House of Lords',
    topic: 'Negligence',
    course: 'Law of Torts',
    principle: 'The neighbour principle establishing the general duty of care in negligence',
    significance: 'The foundational case of modern tort law, establishing that manufacturers owe a duty of care to end consumers.',
    bookmarked: false,
  },
  {
    id: 'cs003',
    name: 'Pharmaceutical Society of Great Britain v Boots Cash Chemists',
    citation: '[1953] 1 QB 401',
    year: 1953,
    court: 'Court of Appeal, England',
    topic: 'Offer and Acceptance',
    course: 'Law of Contract I',
    principle: 'Display of goods in a shop is an invitation to treat, not an offer',
    significance: 'Distinguished between offers and invitations to treat, clarifying when a contract is formed in retail transactions.',
    bookmarked: true,
  },
  {
    id: 'cs004',
    name: 'Olowofoyeku v Attorney-General of Kwara State',
    citation: '[1990] 2 NWLR Pt. 132',
    year: 1990,
    court: 'Supreme Court of Nigeria',
    topic: 'Constitutional Law',
    course: 'Constitutional Law I',
    principle: 'The right to fair hearing under section 36 of the 1999 Constitution is fundamental and cannot be ousted',
    significance: 'Landmark Nigerian Supreme Court decision on the right to fair hearing and principles of natural justice.',
    bookmarked: false,
  },
];

export const MOCK_PRACTICE_QUESTIONS = [
  {
    id: 'q001',
    type: 'MCQ',
    course: 'Law of Contract I',
    topic: 'Offer and Acceptance',
    difficulty: 'Medium',
    question:
      'In Carlill v Carbolic Smoke Ball Co [1893], the Court of Appeal held that the advertisement constituted a valid offer because:',
    options: [
      'A. The company had deposited £1,000 in a bank as evidence of sincerity',
      'B. The offer was addressed to the world at large and was sufficiently definite',
      'C. The claimant had prior notice of the advertisement',
      'D. Both A and B',
    ],
    correctOption: 3,
    explanation:
      'The court held that the advertisement was an offer to the world at large because it was sufficiently definite, and the deposit of £1,000 in the bank showed sincerity. Both elements were important to the decision.',
  },
  {
    id: 'q002',
    type: 'MCQ',
    course: 'Law of Contract I',
    topic: 'Consideration',
    difficulty: 'Easy',
    question: 'Which of the following is NOT a valid consideration in Nigerian contract law?',
    options: [
      'A. Past consideration',
      'B. A promise to perform an existing contractual duty',
      'C. A promise to perform an existing public duty',
      'D. All of the above',
    ],
    correctOption: 3,
    explanation:
      'Past consideration, a promise to perform an existing contractual duty, and a promise to perform an existing public duty are all generally not valid considerations under Nigerian contract law as it follows common law principles.',
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'n001',
    type: 'subscription',
    title: 'Trial Ending Soon',
    message: 'Your 3-day free trial for 200 Level ends in 1 day. Subscribe now to continue learning.',
    time: '2 hours ago',
    read: false,
    action: 'Subscribe Now',
    actionPath: '/checkout/2',
  },
  {
    id: 'n002',
    type: 'content',
    title: 'New Case Study Added',
    message: 'A new case study on Hadley v Baxendale has been added to Law of Contract I.',
    time: '1 day ago',
    read: false,
    action: 'View Case',
    actionPath: '/case-law',
  },
  {
    id: 'n003',
    type: 'exam',
    title: 'Mock Examination Available',
    message: 'The September 2026 mock examination for Law of Contract is now available.',
    time: '2 days ago',
    read: false,
    action: 'Start Exam',
    actionPath: '/practice',
  },
  {
    id: 'n004',
    type: 'payment',
    title: 'Payment Confirmed',
    message: 'Your payment of ₦12,000 for 100 Level subscription has been confirmed. Reference: PSK_REF_001_20260801.',
    time: '3 weeks ago',
    read: true,
    action: null,
    actionPath: null,
  },
];

export const MOCK_ACTIVITY = [
  { date: '2026-09-20', action: 'Studied', item: 'Terms of a Contract', course: 'Law of Contract I', duration: '45 min' },
  { date: '2026-09-19', action: 'Completed', item: 'Capacity to Contract', course: 'Law of Contract I', duration: '30 min' },
  { date: '2026-09-18', action: 'Watched', item: 'Consideration (Video)', course: 'Law of Contract I', duration: '22 min' },
  { date: '2026-09-17', action: 'Completed', item: 'Consideration', course: 'Law of Contract I', duration: '55 min' },
  { date: '2026-09-16', action: 'Practised', item: '10 MCQs', course: 'Law of Contract I', duration: '20 min' },
];

export const TESTIMONIALS = [
  {
    name: 'Chukwuemeka Nwosu',
    university: 'University of Nigeria, Nsukka',
    level: '300 Level',
    quote:
      'SJ Law Academy completely transformed how I study. The structured notes, case law references and practice questions gave me the confidence to excel in my examinations. I passed my Contract Law exam with distinction.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Fatimah Abdullahi',
    university: 'Ahmadu Bello University',
    level: '200 Level',
    quote:
      'The academic level subscription model is brilliant. I only pay for what I need. The 3-day trial convinced me immediately — the quality of the notes and the case law library is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Oluwaseun Adeyinka',
    university: 'Obafemi Awolowo University',
    level: '400 Level',
    quote:
      'As a 400 Level student, I needed a resource that matched the depth of my studies. SJ Law Academy delivered exactly that. The mock examinations are particularly excellent for bar exam preparation.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What is SJ Law Academy?',
    answer:
      'SJ Law Academy is a premium subscription-based digital learning platform designed specifically for Nigerian law students. We provide comprehensive notes, video lessons, case law resources, and practice examinations for all five academic levels (100–500 Level).',
  },
  {
    question: 'How does the 3-day free trial work?',
    answer:
      'When you create an account, you automatically receive 3 days of free access to explore the platform. During this period, you can access course content, read notes, watch videos and browse case law for your selected academic level. No payment details are required to start your trial.',
  },
  {
    question: 'How is the subscription structured?',
    answer:
      'Each academic level (100L–500L) is an independent 6-month subscription. You purchase access to the specific level you need, and each level is priced separately. Purchasing 100 Level does not grant access to 200 Level content and vice versa.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We process all payments securely through Paystack, which accepts bank transfers, debit cards (Verve, Mastercard, Visa) and USSD payments. All Nigerian bank cards and accounts are supported.',
  },
  {
    question: 'Can I access content after my subscription expires?',
    answer:
      'Once your subscription expires, access to that level\'s content is locked until you renew. Your progress, bookmarks, and account information are preserved and will be available again once you renew your subscription.',
  },
  {
    question: 'Is the content updated regularly?',
    answer:
      'Yes. Our academic team continuously updates notes, adds new cases, and creates additional practice questions to reflect changes in Nigerian law, new Supreme Court decisions, and examination patterns.',
  },
];
