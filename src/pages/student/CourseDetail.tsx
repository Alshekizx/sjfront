import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, CheckCircle, Play, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import { getCourses, getTopics, type CourseData, type TopicData } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';

export default function CourseDetail() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [topics, setTopics] = useState<TopicData[]>([]);

  useEffect(() => {
    getCourses(user?.id).then(setCourses);
    getTopics(courseId, user?.id).then(setTopics);
  }, [courseId, user?.id]);

  const course = courses.find((c) => c.id === courseId);
  const pct = course ? Math.round((course.completedTopics / Math.max(course.topics, 1)) * 100) : 0;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {!course ? (
        <div className="page-shell py-12">
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted-foreground)]">
            This course is unavailable. Please choose another course.
          </div>
        </div>
      ) : (
      <>
      {/* Header */}
      <div className="bg-[var(--primary)] text-white pt-8 pb-12">
        <div className="page-shell">
          <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-4">
            <ArrowLeft size={14} /> My Courses
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="font-mono text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-full mb-3 inline-block">{course.code}</span>
              <h1 className="font-serif text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-white/70 mb-4">{course.description}</p>
              {course.instructor && <p className="text-sm text-white/50">Instructor: {course.instructor}</p>}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white/60">Progress</span>
                <span className="font-mono font-semibold">{pct}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mb-4">
                <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div>
                  <p className="font-bold">{course.topics}</p>
                  <p className="text-white/50 text-xs">Topics</p>
                </div>
                <div>
                  <p className="font-bold">{course.completedTopics}</p>
                  <p className="text-white/50 text-xs">Done</p>
                </div>
                <div>
                  <p className="font-bold">{course.topics - course.completedTopics}</p>
                  <p className="text-white/50 text-xs">Remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="page-shell py-10">
        <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6">Course Topics</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {topics.map((topic, i) => (
            <Link
              key={topic.id}
              to={`/courses/${topic.courseId}/topic/${topic.id}`}
              className="flex items-center gap-4 bg-white border border-[var(--border)] rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-mono shrink-0 ${topic.completed ? 'bg-green-500 border-green-500 text-white' : 'border-[var(--border)] text-[var(--muted-foreground)]'}`}>
                {topic.completed ? <CheckCircle size={16} /> : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--foreground)] truncate">{topic.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  {topic.hasNotes && <span className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]"><FileText size={10} /> Notes</span>}
                  {topic.hasVideo && <span className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]"><Play size={10} /> Video tutorial available</span>}
                </div>
              </div>
              <ChevronRight size={16} className="text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
      </>
      )}
    </div>
  );
}
