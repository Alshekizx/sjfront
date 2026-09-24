import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const recentCourses = [
  { title: 'Constitutional Law', code: 'LAW 301', level: '300L', progress: 72, lastAccessed: '2 hours ago', color: '#0F2044' },
  { title: 'Criminal Law & Procedure', code: 'LAW 302', level: '300L', progress: 45, lastAccessed: 'Yesterday', color: '#1a3666' },
  { title: 'Law of Evidence', code: 'LAW 303', level: '300L', progress: 28, lastAccessed: '3 days ago', color: '#2a4a7a' },
  { title: 'Contract Law', code: 'LAW 201', level: '200L', progress: 100, lastAccessed: '1 week ago', color: '#C9A84C' },
];

const upcomingExams = [
  { title: 'Constitutional Law Mock Exam', date: 'Sep 25, 2026', duration: '3 hrs', questions: 60 },
  { title: 'Criminal Law MCQ Test', date: 'Oct 3, 2026', duration: '1 hr', questions: 40 },
];

const notifications = [
  { type: 'info', text: 'Your 3-day free trial expires in 3 days. Subscribe to continue learning.', time: 'Just now' },
  { type: 'success', text: 'You completed "Introduction to Constitutional Law"  --  well done!', time: '2 hrs ago' },
  { type: 'info', text: 'New content added to Criminal Law: Mens Rea and Actus Reus.', time: 'Yesterday' },
];

const quickStats = [
  { label: 'Topics Completed', value: '34', icon: '✓', color: 'text-green-600' },
  { label: 'Practice Questions', value: '218', icon: '✎', color: 'text-blue-600' },
  { label: 'Avg. Score', value: '74%', icon: '◎', color: 'text-[#C9A84C]' },
  { label: 'Study Hours', value: '42h', icon: '⏱', color: 'text-[#0F2044]' },
];

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const trialEnd = user ? new Date(user.trialExpiryDate) : new Date();
  const today = new Date('2026-09-20');
  const daysLeft = user ? Math.max(0, Math.ceil((trialEnd.getTime() - today.getTime()) / 86400000)) : 0;

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
      {/* Trial banner */}
      {daysLeft <= 3 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-amber-800 text-sm">Free Trial  --  {daysLeft} day{daysLeft !== 1 ? 's' : ''} remaining</div>
              <div className="text-xs text-amber-700">Subscribe to keep your access and all your progress.</div>
            </div>
          </div>
          <Link
            to="/pricing"
            className="shrink-0 px-4 py-2 bg-[#0F2044] text-white text-sm font-semibold rounded-lg hover:bg-[#1a3666] transition-colors"
          >
            View Plans
          </Link>
        </div>
      )}

      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#0F2044]">
            Good morning, {user?.name.split(' ')[0]} 👋
          </h1>
          <p className="text-[#6B7280] mt-1 text-sm">{user?.university}  -  {user ? `${user.academicLevel} Level` : ''}</p>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F2044] text-white text-sm font-semibold rounded-lg hover:bg-[#1a3666] transition-colors"
        >
          Continue Learning
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#DDD8CC] p-5">
            <div className={`text-2xl mb-1 ${s.color}`}>{s.icon}</div>
            <div className="text-2xl font-serif font-bold text-[#0F2044]">{s.value}</div>
            <div className="text-xs text-[#6B7280] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue learning */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-xl text-[#0F2044]">Continue Learning</h2>
            <Link to="/courses" className="text-sm text-[#C9A84C] hover:text-[#0F2044] font-medium transition-colors">View all</Link>
          </div>
          <div className="space-y-3">
            {recentCourses.map(course => (
              <Link
                key={course.code}
                to={`/courses/${course.code.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-4 bg-white rounded-xl border border-[#DDD8CC] p-4 hover:border-[#C9A84C] hover:shadow-md transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-serif font-bold text-sm shrink-0"
                  style={{ backgroundColor: course.color }}
                >
                  {course.code.replace('LAW ', '')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#0F2044] text-sm truncate">{course.title}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 h-1.5 bg-[#EAE6DC] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${course.progress}%`, backgroundColor: course.progress === 100 ? '#22c55e' : '#C9A84C' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#6B7280] shrink-0">{course.progress}%</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-[#6B7280]">{course.lastAccessed}</div>
                  <div className="text-xs font-medium text-[#C9A84C] mt-1">{course.level}</div>
                </div>
                <svg className="w-4 h-4 text-[#DDD8CC] group-hover:text-[#C9A84C] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Upcoming exams */}
          <div className="mt-6">
            <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-4">Upcoming Examinations</h2>
            <div className="space-y-3">
              {upcomingExams.map(exam => (
                <div key={exam.title} className="bg-white rounded-xl border border-[#DDD8CC] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F3EE] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#0F2044]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0F2044]">{exam.title}</div>
                      <div className="text-xs text-[#6B7280]">{exam.date}  -  {exam.duration}  -  {exam.questions} questions</div>
                    </div>
                  </div>
                  <Link to="/practice/mock" className="text-xs font-semibold text-[#C9A84C] hover:text-[#0F2044] transition-colors">Prepare →</Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Subscription status */}
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-5">
            <h3 className="font-serif font-bold text-[#0F2044] mb-4">My Subscriptions</h3>
            <div className="space-y-2.5">
              {['100 Level', '200 Level'].map(l => (
                <div key={l} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-[#1A1A2E]">{l}</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
              ))}
              {['300 Level', '400 Level', '500 Level'].map(l => (
                <div key={l} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#DDD8CC]" />
                    <span className="text-sm text-[#6B7280]">{l}</span>
                  </div>
                  <span className="text-xs text-[#6B7280] font-medium bg-[#F5F3EE] px-2 py-0.5 rounded-full">Locked</span>
                </div>
              ))}
            </div>
            <Link
              to="/pricing"
              className="mt-4 w-full block text-center py-2.5 border border-[#0F2044] text-[#0F2044] text-sm font-semibold rounded-lg hover:bg-[#0F2044] hover:text-white transition-colors"
            >
              Subscribe to More Levels
            </Link>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-[#0F2044]">Notifications</h3>
              <Link to="/account/notifications" className="text-xs text-[#C9A84C]">View all</Link>
            </div>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-1.5 rounded-full shrink-0 ${n.type === 'success' ? 'bg-green-500' : 'bg-[#C9A84C]'}`} />
                  <div>
                    <p className="text-xs text-[#1A1A2E] leading-relaxed">{n.text}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-5">
            <h3 className="font-serif font-bold text-[#0F2044] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Practice MCQs', href: '/practice/mcq', emoji: '✎' },
                { label: 'Case Law', href: '/case-law', emoji: '⚖' },
                { label: 'My Bookmarks', href: '/account/bookmarks', emoji: '🔖' },
                { label: 'Mock Exam', href: '/practice/mock', emoji: '📋' },
              ].map(a => (
                <Link
                  key={a.href}
                  to={a.href}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-[#DDD8CC] hover:border-[#C9A84C] hover:bg-[#F5F3EE] transition-all text-center"
                >
                  <span className="text-lg">{a.emoji}</span>
                  <span className="text-xs font-medium text-[#0F2044]">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
