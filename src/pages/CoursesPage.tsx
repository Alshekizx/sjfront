import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const courses = [
  { id: 'law-301', title: 'Constitutional Law', code: 'LAW 301', level: '300L', topics: 12, progress: 72, description: 'A comprehensive study of the 1999 Constitution of the Federal Republic of Nigeria, fundamental rights, federalism, separation of powers, and constitutional conventions.', unlocked: true },
  { id: 'law-302', title: 'Criminal Law & Procedure', code: 'LAW 302', level: '300L', topics: 14, progress: 45, description: 'Study criminal liability, defences, specific offences under the Criminal Code and Penal Code, and criminal procedure in Nigerian courts.', unlocked: true },
  { id: 'law-303', title: 'Law of Evidence', code: 'LAW 303', level: '300L', topics: 11, progress: 28, description: 'Examine the rules governing admissibility, relevance, and weight of evidence in Nigerian civil and criminal proceedings.', unlocked: true },
  { id: 'law-201', title: 'Contract Law', code: 'LAW 201', level: '200L', topics: 13, progress: 100, description: 'Master offer and acceptance, consideration, privity, terms, vitiating factors, discharge, and remedies for breach of contract.', unlocked: true },
  { id: 'law-202', title: 'Law of Torts', code: 'LAW 202', level: '200L', topics: 12, progress: 80, description: 'Understand negligence, occupiers liability, nuisance, defamation, trespass, and economic torts in Nigerian law.', unlocked: true },
  { id: 'law-304', title: 'Equity & Trusts', code: 'LAW 304', level: '300L', topics: 10, progress: 0, description: 'Study the principles of equity, express and implied trusts, fiduciary duties, and equitable remedies.', unlocked: false },
  { id: 'law-305', title: 'Family Law', code: 'LAW 305', level: '300L', topics: 9, progress: 0, description: 'Examine marriage, divorce, custody, maintenance, and matrimonial property under Nigerian statutory and customary law.', unlocked: false },
  { id: 'law-401', title: 'Company Law', code: 'LAW 401', level: '400L', topics: 15, progress: 0, description: 'Study incorporation, corporate governance, shares, directors duties, winding up, and the Companies and Allied Matters Act.', unlocked: false },
];

const topics = [
  { id: 1, title: 'Introduction to Constitutional Law', completed: true, duration: '45 min' },
  { id: 2, title: 'Historical Development of the Nigerian Constitution', completed: true, duration: '60 min' },
  { id: 3, title: 'Fundamental Rights  --  Chapter IV', completed: true, duration: '90 min' },
  { id: 4, title: 'Separation of Powers', completed: true, duration: '75 min' },
  { id: 5, title: 'Federalism and the Federal Structure', completed: false, duration: '80 min' },
  { id: 6, title: 'The Legislature  --  National Assembly', completed: false, duration: '60 min' },
  { id: 7, title: 'The Executive  --  President and Governors', completed: false, duration: '65 min' },
  { id: 8, title: 'The Judiciary  --  Independence and Powers', completed: false, duration: '70 min' },
  { id: 9, title: 'Constitutional Amendments', completed: false, duration: '45 min' },
  { id: 10, title: 'Citizenship and Fundamental Objectives', completed: false, duration: '55 min' },
  { id: 11, title: 'Emergency Powers', completed: false, duration: '40 min' },
  { id: 12, title: 'Judicial Review', completed: false, duration: '80 min' },
];

function CourseDetailPage({ id }: { id: string }) {
  const course = courses.find(c => c.id === id);
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('topics');

  if (!course) return <div className="p-8 text-center text-[#6B7280]">Course not found.</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
        <Link to="/courses" className="hover:text-[#0F2044]">Courses</Link>
        <span>/</span>
        <span className="text-[#0F2044] font-medium">{course.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#0F2044] text-[#C9A84C] text-xs font-bold px-2.5 py-1 rounded">{course.code}</span>
            <span className="text-xs text-[#6B7280] bg-[#F5F3EE] px-2.5 py-1 rounded-full border border-[#DDD8CC]">{course.level}</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#0F2044] mb-3">{course.title}</h1>
          <p className="text-[#6B7280] leading-relaxed mb-6">{course.description}</p>

          {/* Progress bar */}
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-4 mb-6 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-[#0F2044]">Your Progress</span>
                <span className="font-bold text-[#C9A84C]">{course.progress}%</span>
              </div>
              <div className="h-2 bg-[#EAE6DC] rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
            <div className="text-center shrink-0">
              <div className="font-bold text-[#0F2044]">{topics.filter(t => t.completed).length}/{topics.length}</div>
              <div className="text-xs text-[#6B7280]">Topics done</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#DDD8CC] mb-6">
            {['topics', 'resources', 'cases', 'practice'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors -mb-px
                  ${activeTab === tab ? 'border-[#C9A84C] text-[#0F2044]' : 'border-transparent text-[#6B7280] hover:text-[#0F2044]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'topics' && (
            <div className="space-y-2">
              {topics.map(topic => (
                <div
                  key={topic.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group
                    ${topic.completed ? 'border-green-200 bg-green-50/50 hover:border-green-300' : 'border-[#DDD8CC] bg-white hover:border-[#C9A84C]'}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0
                    ${topic.completed ? 'border-green-500 bg-green-500' : 'border-[#DDD8CC]'}`}>
                    {topic.completed && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${topic.completed ? 'text-[#6B7280]' : 'text-[#0F2044]'}`}>
                      {topic.id}. {topic.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span>{topic.duration}</span>
                    <svg className="w-4 h-4 text-[#DDD8CC] group-hover:text-[#C9A84C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab !== 'topics' && (
            <div className="text-center py-12 text-[#6B7280]">
              <div className="text-4xl mb-3">
                {activeTab === 'resources' ? '📄' : activeTab === 'cases' ? '⚖️' : '✎'}
              </div>
              <div className="font-medium text-[#0F2044] mb-1">
                {activeTab === 'resources' ? 'Learning Resources' : activeTab === 'cases' ? 'Case Law' : 'Practice Questions'}
              </div>
              <p className="text-sm">Content for this section is available once you begin the course.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6 sticky top-20">
            <Link
              to={`/learn/${course.id}/topic/5`}
              className="block w-full text-center py-3.5 bg-[#0F2044] text-white font-semibold rounded-xl hover:bg-[#1a3666] transition-colors mb-4"
            >
              {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
            </Link>
            <div className="space-y-3 text-sm">
              {[
                ['Topics', `${course.topics} topics`],
                ['Level', course.level],
                ['Course Code', course.code],
                ['Access', course.unlocked ? 'Unlocked' : 'Subscription Required'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#6B7280]">{k}</span>
                  <span className="font-medium text-[#0F2044]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const { id } = useParams<{ id?: string }>();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  if (id) return <CourseDetailPage id={id} />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  const filtered = courses.filter(c => {
    if (filter === 'unlocked' && !c.unlocked) return false;
    if (filter === 'locked' && c.unlocked) return false;
    if (filter === 'inprogress' && (c.progress === 0 || c.progress === 100)) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#0F2044]">My Courses</h1>
          <p className="text-[#6B7280] mt-1 text-sm">Browse and continue your enrolled courses.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses…"
              className="pl-9 pr-4 py-2 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]"
            />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[['all', 'All Courses'], ['unlocked', 'Unlocked'], ['inprogress', 'In Progress'], ['locked', 'Locked']].map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${filter === val ? 'bg-[#0F2044] text-white' : 'bg-white border border-[#DDD8CC] text-[#6B7280] hover:border-[#0F2044] hover:text-[#0F2044]'}`}
          >
            {lbl}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(course => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className={`group bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg
              ${course.unlocked ? 'border-[#DDD8CC] hover:border-[#C9A84C]' : 'border-[#DDD8CC] opacity-80'}`}
          >
            <div className="navy-gradient p-5 relative">
              {!course.unlocked && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="text-[#C9A84C] text-xs font-bold">{course.code}</div>
              <div className="text-white/50 text-xs mt-0.5">{course.level}</div>
            </div>
            <div className="p-5">
              <h3 className="font-serif font-bold text-[#0F2044] mb-2 group-hover:text-[#1a3666] transition-colors">{course.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4 line-clamp-2">{course.description}</p>
              {course.unlocked ? (
                <>
                  <div className="flex justify-between text-xs text-[#6B7280] mb-1.5">
                    <span>Progress</span>
                    <span className="font-medium text-[#0F2044]">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-[#EAE6DC] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${course.progress}%`, backgroundColor: course.progress === 100 ? '#22c55e' : '#C9A84C' }}
                    />
                  </div>
                  <div className="mt-3 text-xs text-[#6B7280]">{course.topics} topics</div>
                </>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Subscription required  -  {course.level}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📚</div>
          <div className="font-serif font-bold text-[#0F2044] mb-2">No courses found</div>
          <p className="text-sm text-[#6B7280]">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
