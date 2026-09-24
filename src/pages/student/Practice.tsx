import { useEffect, useRef, useState } from 'react';
import { getPracticeQuestions, getMockExams, getLearningActivity, type PracticeQuestionData, type ExamData } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function Practice() {
  const { user } = useAuth();
  const [bank, setBank] = useState<PracticeQuestionData[]>([]);
  const [exams, setExams] = useState<ExamData[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [questions, setQuestions] = useState<PracticeQuestionData[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [mode, setMode] = useState<'home' | 'quiz' | 'results'>('home');
  const [title, setTitle] = useState('Practice');
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const submitting = useRef(false);
  const autoSubmitted = useRef(false);
  const submitRef = useRef<() => Promise<void>>(async () => {});
  useEffect(() => {
    if (!user) return;
    Promise.all([getPracticeQuestions(), getMockExams(), getLearningActivity(user.id)]).then(([questions, exams, activity]) => { setBank(questions); setExams(exams); setHistory(activity.attempts); }).catch(() => setError('Unable to load practice content. Please try again.')).finally(() => setLoading(false));
  }, [user?.id]);
  const mcqs = bank.filter(question => question.type === 'MCQ');
  const essays = bank.filter(question => question.type !== 'MCQ');
  function start(exam?: ExamData) {
    const now = Date.now();
    if (exam && ((exam.opens_at && Date.parse(exam.opens_at) > now) || (exam.closes_at && Date.parse(exam.closes_at) <= now))) { setError('This exam is not open now.'); return; }
    const chosen = exam ? exam.questionIds.map(id => mcqs.find(question => question.id === id)).filter((question): question is PracticeQuestionData => Boolean(question)) : mcqs;
    if (!chosen.length || (exam && chosen.length !== exam.questionIds.length)) { setError('This exam does not have a complete set of published questions yet.'); return; }
    setQuestions(chosen); setAnswers(chosen.map(() => -1)); setTitle(exam?.title || 'Multiple-choice practice'); setError('');
    const ends = [exam?.duration_minutes ? now + exam.duration_minutes * 60000 : Infinity, exam?.closes_at ? Date.parse(exam.closes_at) : Infinity];
    const end = Math.min(...ends);
    setDeadline(Number.isFinite(end) ? end : null); setRemaining(Number.isFinite(end) ? Math.max(0, Math.ceil((end - now) / 1000)) : null);
    autoSubmitted.current = false; setMode('quiz');
  }
  async function submit() {
    if (submitting.current || !user || !questions.length) return;
    submitting.current = true; setSaving(true); setError('');
    try {
      const { error } = await supabase.from('practice_attempts').insert(questions.map((question, index) => ({ student_id: user.id, question_id: question.id, selected_option: answers[index] >= 0 ? answers[index] : null, is_correct: answers[index] >= 0 && answers[index] === question.correctOption })));
      if (error) throw error;
      setMode('results'); setDeadline(null);
      getLearningActivity(user.id).then(activity => setHistory(activity.attempts)).catch(() => {});
    } catch { setError('Your answers could not be saved. Please try submitting again.'); }
    finally { submitting.current = false; setSaving(false); }
  }
  submitRef.current = submit;
  useEffect(() => {
    if (mode !== 'quiz' || !deadline) return;
    const tick = () => { const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); setRemaining(seconds); if (!seconds && !autoSubmitted.current) { autoSubmitted.current = true; void submitRef.current(); } };
    const timer = window.setInterval(tick, 1000); tick();
    return () => window.clearInterval(timer);
  }, [deadline, mode]);
  return <div className="page-shell py-10 space-y-6">
    <h1 className="font-serif text-3xl text-[var(--primary)]">{mode === 'home' ? 'Practice & Examinations' : title}</h1>
    {error && <p role="alert" className="text-red-600">{error}</p>}
    {loading && <p role="status">Loading practice content…</p>}
    {mode === 'home' && <>
      <section className="bg-white border rounded-xl p-6"><h2 className="font-serif text-xl">Multiple-choice practice</h2><p className="text-sm mt-2">{mcqs.length} published questions</p><button disabled={!mcqs.length} onClick={() => start()} className="mt-4 bg-[var(--primary)] text-white rounded-lg px-4 py-2 disabled:opacity-50">Start practice</button></section>
      <section className="space-y-3"><h2 className="font-serif text-xl">Mock examinations</h2>{exams.map(exam => <div key={exam.id} className="bg-white border rounded-xl p-5"><h3 className="font-semibold">{exam.title}</h3><p className="text-sm mt-2">{exam.description}</p><p className="text-xs mt-2">{exam.questionIds.length} questions{exam.duration_minutes ? ` · ${exam.duration_minutes} minutes` : ''}</p>{exam.opens_at && <p className="text-xs">Opens: {new Date(exam.opens_at).toLocaleString()}</p>}{exam.closes_at && <p className="text-xs">Closes: {new Date(exam.closes_at).toLocaleString()}</p>}<button onClick={() => start(exam)} className="mt-3 underline">Start exam</button></div>)}{!loading && !exams.length && <p>No exams have been published yet.</p>}</section>
      <section className="space-y-3"><h2 className="font-serif text-xl">Essay and problem questions</h2>{essays.map(question => <div key={question.id} className="bg-white border rounded-xl p-5"><p className="whitespace-pre-wrap">{question.question}</p><p className="text-xs my-2">{question.course} · {question.difficulty}</p><details><summary className="cursor-pointer text-sm">View model answer</summary><p className="whitespace-pre-wrap mt-3">{question.explanation || 'No model answer has been published yet.'}</p></details></div>)}{!loading && !essays.length && <p>No essay questions have been published yet.</p>}</section>
      <section className="space-y-3"><h2 className="font-serif text-xl">Recent practice</h2>{history.slice(0, 10).map(item => <div key={item.id} className="bg-white border rounded-xl p-4"><p className="text-sm">{item.questions?.question || 'Practice question'}</p><p className="text-xs text-[var(--muted-foreground)]">{item.is_correct ? 'Correct answer' : 'Incorrect or unanswered'} · {new Date(item.submitted_at).toLocaleString()}</p></div>)}{!loading && !history.length && <p>No saved attempts yet.</p>}</section>
    </>}
    {mode !== 'home' && <>
      {mode === 'quiz' && remaining !== null && <p role="timer" className="sticky top-0 bg-white border p-3 rounded">Time left: {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</p>}
      {mode === 'results' && <p className="text-xl font-semibold">Score: {questions.filter((question, index) => answers[index] >= 0 && answers[index] === question.correctOption).length} / {questions.length}</p>}
      {questions.map((question, index) => <fieldset key={question.id} disabled={mode === 'results' || saving || remaining === 0} className="bg-white border rounded-xl p-5 space-y-3"><legend className="sr-only">Question {index + 1}</legend><p className="font-medium whitespace-pre-wrap">{index + 1}. {question.question}</p>{question.options.map((option, optionIndex) => <label key={optionIndex} className="flex items-center gap-3 text-sm"><input type="radio" name={question.id} checked={answers[index] === optionIndex} onChange={() => setAnswers(prev => prev.map((value, i) => i === index ? optionIndex : value))} />{option}</label>)}{mode === 'results' && <div className="border-t pt-3"><p>Correct answer: {question.options[question.correctOption] || 'Not provided'}</p><p className="whitespace-pre-wrap text-sm mt-2">{question.explanation}</p></div>}</fieldset>)}
      {mode === 'quiz' ? <button disabled={saving} onClick={submit} className="bg-[var(--primary)] text-white px-5 py-3 rounded-lg disabled:opacity-50">{saving ? 'Saving answers…' : 'Submit answers'}</button> : <button onClick={() => setMode('home')} className="underline">Back to practice</button>}
    </>}
  </div>;
}
