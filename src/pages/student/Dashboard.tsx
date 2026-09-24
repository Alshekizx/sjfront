import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Clock, BarChart3, Bell, ChevronRight, Play,
  AlertTriangle, CheckCircle, Lock, ArrowRight, Star, TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getCourses, getNotifications, type CourseData, type NotificationData } from '@/lib/data';

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    getCourses(user?.id).then(setCourses);
    getNotifications(user?.id).then(setNotifications);
  }, [user?.id]);

  if (!user) return null;

  const trialSub = user.subscriptions.find((s) => s.status === 'trial');
  const activeSub = user.subscriptions.find((s) => s.status === 'active');
  const trialDaysLeft = trialSub
    ? Math.max(0, Math.ceil((new Date(trialSub.expiryDate).getTime() - Date.now()) / 86400000))
    : null;

  const firstName = user.name.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const overallProgress = courses.length
    ? Math.round(courses.reduce((sum, c) => sum + (c.completedTopics / Math.max(c.topics, 1)) * 100, 0) / courses.length)
    : 0;
  const completedTopics = courses.reduce((sum, course) => sum + course.completedTopics, 0);
  const totalTopics = courses.reduce((sum, course) => sum + course.topics, 0);
  const activeCourses = courses.filter(course => course.topics > 0).length;
  const continueCourse = courses.find(course => course.completedTopics < course.topics) ?? courses[0];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container-shell py-8">
        {/* Trial warning */}
        {trialSub && trialDaysLeft !== null && trialDaysLeft <= 1 && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">
                {trialDaysLeft === 0 ? 'Your trial expires today' : `Your trial expires in ${trialDaysLeft} day`}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">Subscribe now to continue accessing {trialSub.levelName} content without interruption.</p>
            </div>
            <Link to={`/checkout/${trialSub?.level || user.academicLevel}`} className="shrink-0 px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors">
              Subscribe Now
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--primary)]">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-[var(--muted-foreground)] mt-1">{user.university} · {user.academicLevel * 100} Level</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/notifications" className="relative p-2.5 bg-white border border-[var(--border)] rounded-lg hover:shadow-sm transition-shadow">
              <Bell size={18} />
              {user.unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {user.unreadNotifications}
                </span>
              )}
            </Link>
            <Link to={continueCourse ? `/courses/${continueCourse.id}` : '/courses'} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[#0a1840] transition-colors">
              <Play size={14} fill="currentColor" /> Continue Learning
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<BookOpen size={20} />} label="Courses Active" value={String(activeCourses)} sub={`${user.academicLevel * 100} Level`} />
          <StatCard icon={<CheckCircle size={20} />} label="Topics Completed" value={String(completedTopics)} sub={`of ${totalTopics} total`} />
          <StatCard icon={<BarChart3 size={20} />} label="Overall Progress" value={`${overallProgress}%`} sub="this semester" />
          <StatCard icon={<TrendingUp size={20} />} label="Practice Score" value="—" sub="complete a practice quiz" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-[var(--border)] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-bold text-[var(--primary)]">Continue Learning</h2>
                <Link to="/courses" className="text-xs font-medium text-[var(--primary)] flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {courses.filter((c) => c.completedTopics > 0 && c.completedTopics < c.topics).map((course) => {
                  const pct = Math.round((course.completedTopics / course.topics) * 100);
                  return (
                    <Link key={course.id} to={`/courses/${course.id}`} className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-[var(--muted)] transition-colors group">
                      {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-16 h-12 rounded-lg object-cover bg-[var(--muted)] shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--foreground)] truncate">{course.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{course.code} · {course.completedTopics}/{course.topics} topics</p>
                        <div className="mt-2 h-1.5 bg-[var(--muted)] rounded-full">
                          <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-[var(--primary)]">{pct}%</p>
                        <ChevronRight size={14} className="text-[var(--muted-foreground)] ml-auto mt-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Subscriptions */}
            <div className="bg-white border border-[var(--border)] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-bold text-[var(--primary)]">My Subscriptions</h2>
                <Link to="/account/subscriptions" className="text-xs font-medium text-[var(--primary)] flex items-center gap-1">
                  Manage <ChevronRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {user.subscriptions.map((sub) => (
                  <div key={sub.level} className="flex items-center justify-between p-3.5 bg-[var(--muted)] rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{sub.levelName}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Expires {new Date(sub.expiryDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <SubStatusBadge status={sub.status} />
                      <Link to="/courses" className="text-xs text-[var(--primary)] font-medium">Continue →</Link>
                    </div>
                  </div>
                ))}
                <Link to="/academic-levels" className="flex items-center justify-center gap-2 p-3 border border-dashed border-[var(--border)] rounded-xl text-sm text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                  + Subscribe to another level
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-[var(--border)] rounded-xl p-6">
              <h2 className="font-serif text-lg font-bold text-[var(--primary)] mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {courses.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--muted)] p-4 text-sm text-[var(--muted-foreground)]">
                    Activity will appear here after courses are added to the live database.
                  </div>
                ) : (
                  courses.map((course, i) => (
                    <div key={course.id || i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--foreground)]">
                          <span className="text-[var(--muted-foreground)]">Course update</span> {course.title}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">{course.completedTopics}/{course.topics} completed</p>
                      </div>
                      <span className="text-xs text-[var(--muted-foreground)] shrink-0">{Math.round((course.completedTopics / Math.max(course.topics, 1)) * 100)}%</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Quick actions */}
            <div className="bg-white border border-[var(--border)] rounded-xl p-5">
              <h3 className="font-serif text-base font-bold text-[var(--primary)] mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Practice MCQs', to: '/practice', icon: <Star size={16} /> },
                  { label: 'Case Law', to: '/case-law', icon: <BookOpen size={16} /> },
                  { label: 'Progress', to: '/progress', icon: <BarChart3 size={16} /> },
                  { label: 'My Library', to: '/library', icon: <CheckCircle size={16} /> },
                ].map((action) => (
                  <Link key={action.label} to={action.to} className="flex flex-col items-center gap-1.5 p-3 bg-[var(--muted)] rounded-xl hover:bg-[var(--primary)] hover:text-white transition-colors group text-center">
                    <span className="text-[var(--primary)] group-hover:text-white">{action.icon}</span>
                    <span className="text-xs font-medium">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-base font-bold text-[var(--primary)]">Notifications</h3>
                <Link to="/notifications" className="text-xs text-[var(--primary)]">View all</Link>
              </div>
              <div className="space-y-3">
                {notifications.filter((n) => !n.read).slice(0, 3).map((n) => (
                  <div key={n.id} className="p-3 bg-[var(--muted)] rounded-lg">
                    <p className="text-xs font-semibold text-[var(--foreground)]">{n.title}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5 line-clamp-2">{n.message}</p>
                    {n.action && (
                      <Link to={n.actionPath!} className="text-xs text-[var(--primary)] font-medium mt-1.5 block">{n.action} →</Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Profile card */}
            <div className="bg-[var(--primary)] text-white rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center font-semibold text-[var(--primary)] text-lg">
                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-white/60">{user.university}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-white/70">
                <div className="flex justify-between"><span>Academic Level</span><span className="text-white font-medium">{user.academicLevel * 100} Level</span></div>
                <div className="flex justify-between"><span>Courses Active</span><span className="text-white font-medium">{activeCourses}</span></div>
                <div className="flex justify-between"><span>Topics Done</span><span className="text-white font-medium">{completedTopics} / {totalTopics}</span></div>
              </div>
              <Link to="/account/profile" className="mt-4 block text-center py-2 text-xs font-semibold border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                Manage Account →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/8 flex items-center justify-center text-[var(--primary)]">{icon}</div>
        <span className="text-xs text-[var(--muted-foreground)] font-medium">{label}</span>
      </div>
      <p className="font-serif text-2xl font-bold text-[var(--primary)]">{value}</p>
      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{sub}</p>
    </div>
  );
}

function SubStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    trial: 'bg-blue-100 text-blue-700',
    expired: 'bg-red-100 text-red-600',
  };
  const labels: Record<string, string> = { active: 'Active', trial: 'Trial', expired: 'Expired' };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[status]}`}>{labels[status]}</span>
  );
}
