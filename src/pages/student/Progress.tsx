import { useEffect, useState } from 'react';
import { getCourses, getLearningActivity, type CourseData } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
export default function Progress() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [activity, setActivity] = useState<Awaited<ReturnType<typeof getLearningActivity>> | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!user) return;
    Promise.all([getCourses(user.id), getLearningActivity(user.id)]).then(([courses, activity]) => { setCourses(courses); setActivity(activity); }).catch(() => setError('Unable to load your progress. Please try again.'));
  }, [user?.id]);
  const completed = courses.reduce((sum, course) => sum + course.completedTopics, 0);
  const total = courses.reduce((sum, course) => sum + course.topics, 0);
  const attempts = activity?.attempts || [];
  const accuracy = attempts.length ? `${Math.round(attempts.filter(item => item.is_correct).length / attempts.length * 100)}%` : '—';
  const timeline = [
    ...attempts.map((item: any) => ({ id: item.id, title: item.questions?.question || 'Practice question', action: item.is_correct ? 'Answered correctly' : 'Practice attempt', date: item.submitted_at })),
    ...(activity?.progress || []).map((item: any, index) => ({ id: `lesson-${index}`, title: item.lessons?.title || 'Lesson', action: 'Completed lesson', date: item.completed_at })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 20);
  return <div className="page-shell py-10 space-y-8">
    <h1 className="font-serif text-3xl text-[var(--primary)]">My Progress</h1>
    {error && <p role="alert" className="text-red-600">{error}</p>}
    {!activity && !error && <p role="status">Loading progress…</p>}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{[
      ['Published courses', courses.length], ['Topics completed', `${completed} / ${total}`], ['Practice accuracy', accuracy], ['Courses completed', courses.filter(course => course.topics > 0 && course.completedTopics === course.topics).length],
    ].map(([label, value]) => <div key={label} className="rounded-xl border bg-white p-5"><p className="text-2xl font-semibold">{value}</p><p className="text-sm text-[var(--muted-foreground)]">{label}</p></div>)}</div>
    <section className="rounded-xl border bg-white p-6 space-y-4"><h2 className="font-serif text-xl">Course progress</h2>{courses.map(course => { const percent = course.topics ? Math.round(course.completedTopics / course.topics * 100) : 0; return <div key={course.id}><div className="flex justify-between text-sm mb-2"><span>{course.title}</span><span>{percent}%</span></div><div className="h-2 bg-slate-100 rounded"><div className="h-2 bg-[var(--primary)] rounded" style={{ width: `${percent}%` }} /></div></div>; })}{!courses.length && <p>No published courses yet.</p>}</section>
    <section className="rounded-xl border bg-white p-6 space-y-4"><h2 className="font-serif text-xl">Recent learning activity</h2>{timeline.map(item => <div key={item.id} className="border-b pb-3"><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-[var(--muted-foreground)]">{item.action} · {new Date(item.date).toLocaleString()}</p></div>)}{activity && !timeline.length && <p>No learning activity yet.</p>}</section>
  </div>;
}
