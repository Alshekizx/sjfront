import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, ChevronRight, Play } from 'lucide-react';
import { getCourses, type CourseData } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    getCourses(user?.id).then(setCourses);
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="page-shell py-10">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-3">
            <Link to="/dashboard" className="hover:text-[var(--primary)]">Dashboard</Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">My Courses</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-[var(--primary)]">My Courses</h1>
          <p className="text-[var(--muted-foreground)] mt-1">{user?.academicLevel ? `${user.academicLevel * 100} Level · ` : ''}{courses.length} courses</p>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted-foreground)]">
            No published courses are available yet.
          </div>
        ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {courses.map((course) => {
            const pct = Math.round((course.completedTopics / Math.max(1, course.topics)) * 100);
            const isComplete = pct === 100;
            return (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div className="relative h-44 overflow-hidden bg-[var(--muted)]">
                  {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-xs bg-white/90 text-[var(--primary)] px-2.5 py-1 rounded-full">{course.code}</span>
                  </div>
                  {isComplete && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1 text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                        <CheckCircle size={11} /> Complete
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <Play size={12} className="text-white" />
                      <span className="text-xs text-white font-medium">
                        {course.completedTopics > 0 ? 'Continue' : 'Start learning'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-[var(--primary)] mb-1">{course.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] mb-4">
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {course.topics} topics</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {course.instructor}</span>
                    <span className="flex items-center gap-1"><CheckCircle size={12} /> {course.completedTopics} done</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-[var(--muted-foreground)]">Progress</span>
                      <span className="text-xs font-semibold text-[var(--primary)]">{pct}%</span>
                    </div>
                    <div className="h-2 bg-[var(--muted)] rounded-full">
                      <div
                        className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-[var(--primary)]'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
