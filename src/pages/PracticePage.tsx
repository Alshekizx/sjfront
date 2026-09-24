import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const categories = [
  { id: 'mcq', title: 'MCQ Questions', icon: '✎', desc: 'Multiple choice questions across all subscribed levels and courses.', count: 840 },
  { id: 'past', title: 'Past Questions', icon: '📚', desc: 'Past examination questions from Nigerian law schools.', count: 320 },
  { id: 'mock', title: 'Mock Examinations', icon: '📋', desc: 'Timed mock exams with real examination conditions.', count: 24 },
  { id: 'problem', title: 'Problem Questions', icon: '💡', desc: 'Scenario-based problem questions with model answers.', count: 180 },
];

const sampleQuestions = [
  {
    id: 1,
    question: 'Which of the following is an essential element for the formation of a valid contract under Nigerian law?',
    options: [
      'A. Consideration, offer, acceptance, and intention to create legal relations',
      'B. Offer, acceptance, and consideration only',
      'C. Offer, acceptance, and written agreement',
      'D. Consideration and written agreement only',
    ],
    correct: 0,
    explanation: 'Under Nigerian contract law (based on English common law), a valid contract requires: (1) Offer, (2) Acceptance, (3) Consideration, (4) Intention to create legal relations, and (5) Capacity of parties. All four elements in option A are essential elements.',
    course: 'Contract Law',
  },
  {
    id: 2,
    question: 'In Donoghue v Stevenson [1932], the House of Lords established the modern law of negligence. Which of the following best states the ratio decidendi of that case?',
    options: [
      'A. Manufacturers owe a duty of care only to immediate purchasers of their products',
      'B. A manufacturer owes a duty of care to the ultimate consumer who has no opportunity to inspect the product',
      'C. Negligence can only be established where there is a contractual relationship',
      'D. A duty of care exists between all persons in society',
    ],
    correct: 1,
    explanation: 'The ratio in Donoghue v Stevenson established the "neighbour principle"  --  a manufacturer owes a duty of care to the ultimate consumer where the product reaches the consumer in the form it left the manufacturer, and where the consumer has no reasonable opportunity to inspect the product.',
    course: 'Law of Torts',
  },
  {
    id: 3,
    question: 'Under the 1999 Constitution of the Federal Republic of Nigeria, which chapter contains the Fundamental Rights provisions?',
    options: [
      'A. Chapter II',
      'B. Chapter III',
      'C. Chapter IV',
      'D. Chapter V',
    ],
    correct: 2,
    explanation: 'Chapter IV of the 1999 Constitution (ss. 33-46) contains the Fundamental Rights provisions, including the right to life (s.33), right to dignity (s.34), right to personal liberty (s.35), right to fair hearing (s.36), and right to private and family life (s.37).',
    course: 'Constitutional Law',
  },
];

function MCQPractice() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(sampleQuestions.length).fill(null));

  const q = sampleQuestions[current];
  const isLast = current === sampleQuestions.length - 1;

  const handleSubmitAnswer = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    if (selected === q.correct) setScore(s => s + 1);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (isLast) return;
    setCurrent(c => c + 1);
    setSelected(answers[current + 1]);
    setSubmitted(answers[current + 1] !== null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-[#EAE6DC] rounded-full overflow-hidden">
          <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${((current + 1) / sampleQuestions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-medium text-[#0F2044]">{current + 1} / {sampleQuestions.length}</span>
        <span className="text-sm text-[#6B7280]">Score: {score}</span>
      </div>

      <div className="bg-white rounded-2xl border border-[#DDD8CC] p-8">
        <div className="text-xs font-medium text-[#C9A84C] mb-2">{q.course}</div>
        <h3 className="font-serif font-bold text-[#0F2044] text-lg leading-relaxed mb-6">
          Q{q.id}. {q.question}
        </h3>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all
                ${submitted
                  ? i === q.correct
                    ? 'border-green-400 bg-green-50 text-green-800'
                    : i === selected && selected !== q.correct
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : 'border-[#DDD8CC] text-[#6B7280]'
                  : selected === i
                    ? 'border-[#0F2044] bg-[#F5F3EE] text-[#0F2044]'
                    : 'border-[#DDD8CC] hover:border-[#0F2044] hover:bg-[#F5F3EE]'
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {submitted && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className={`font-semibold text-sm mb-2 ${selected === q.correct ? 'text-green-700' : 'text-red-600'}`}>
              {selected === q.correct ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <p className="text-sm text-[#1A1A2E] leading-relaxed">{q.explanation}</p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {!submitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selected === null}
              className="px-6 py-2.5 bg-[#0F2044] text-white text-sm font-semibold rounded-lg hover:bg-[#1a3666] transition-colors disabled:opacity-40"
            >
              Submit Answer
            </button>
          ) : !isLast ? (
            <button onClick={handleNext} className="px-6 py-2.5 bg-[#0F2044] text-white text-sm font-semibold rounded-lg hover:bg-[#1a3666] transition-colors">
              Next Question →
            </button>
          ) : (
            <div className="text-sm font-semibold text-green-700 bg-green-50 px-5 py-2.5 rounded-lg border border-green-200">
              Practice Complete! Score: {score}/{sampleQuestions.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PracticePage() {
  const { type } = useParams<{ type?: string }>();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (type === 'mcq') {
    return (
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
          <Link to="/practice" className="hover:text-[#0F2044]">Practice</Link>
          <span>/</span>
          <span className="text-[#0F2044] font-medium">MCQ Questions</span>
        </nav>
        <h1 className="text-3xl font-serif font-bold text-[#0F2044] mb-8">MCQ Practice</h1>
        <MCQPractice />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-[#0F2044]">Practice Centre</h1>
        <p className="text-[#6B7280] mt-2 text-sm">Sharpen your legal knowledge with targeted practice questions and mock examinations.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/practice/${cat.id}`}
            className="group bg-white rounded-2xl border border-[#DDD8CC] p-6 hover:border-[#C9A84C] hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-4">{cat.icon}</div>
            <h3 className="font-serif font-bold text-[#0F2044] mb-2 group-hover:text-[#1a3666]">{cat.title}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{cat.desc}</p>
            <div className="text-xs font-medium text-[#C9A84C]">{cat.count} available →</div>
          </Link>
        ))}
      </div>
      <div className="bg-[#0F2044] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-white text-lg mb-1">Ready for exam conditions?</h3>
          <p className="text-white/60 text-sm">Take a full timed mock examination and review your performance in detail.</p>
        </div>
        <Link to="/practice/mock" className="shrink-0 px-6 py-3 bg-[#C9A84C] text-[#0F2044] font-bold rounded-lg hover:bg-[#d4b862] transition-colors text-sm">
          Start Mock Exam
        </Link>
      </div>
    </div>
  );
}
