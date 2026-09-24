import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoDark from '../assets/logo-dark.png';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Learn',
    href: '/dashboard',
    auth: true,
    dropdown: [
      { label: 'My Dashboard', href: '/dashboard' },
      { label: 'Continue Learning', href: '/courses' },
      { label: 'My Progress', href: '/account/progress' },
    ],
  },
  {
    label: 'Academic Levels',
    href: '/levels',
    dropdown: [
      { label: '100 Level  --  Foundation', href: '/levels/100' },
      { label: '200 Level  --  Intermediate I', href: '/levels/200' },
      { label: '300 Level  --  Intermediate II', href: '/levels/300' },
      { label: '400 Level  --  Advanced', href: '/levels/400' },
      { label: '500 Level  --  Final Year', href: '/levels/500' },
    ],
  },
  {
    label: 'Courses',
    href: '/courses',
    dropdown: [
      { label: 'Browse All Courses', href: '/courses' },
      { label: 'Constitutional Law', href: '/courses/constitutional-law' },
      { label: 'Criminal Law', href: '/courses/criminal-law' },
      { label: 'Contract Law', href: '/courses/contract-law' },
      { label: 'Law of Torts', href: '/courses/torts' },
    ],
  },
  {
    label: 'Practice',
    href: '/practice',
    dropdown: [
      { label: 'MCQ Questions', href: '/practice/mcq' },
      { label: 'Past Questions', href: '/practice/past' },
      { label: 'Mock Examinations', href: '/practice/mock' },
      { label: 'Problem Questions', href: '/practice/problem' },
    ],
  },
  { label: 'Case Law', href: '/case-law' },
  {
    label: 'Resources',
    href: '/resources',
    dropdown: [
      { label: 'Study Materials', href: '/resources/materials' },
      { label: 'Legal Dictionary', href: '/resources/dictionary' },
      { label: 'Statutes & Acts', href: '/resources/statutes' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    dropdown: [
      { label: 'About SJ Law', href: '/about' },
      { label: 'Our Approach', href: '/about#approach' },
      { label: 'Pricing & Plans', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setProfileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-white border-b border-[#DDD8CC] shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoDark} alt="SJ Law" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-[#0F2044] text-lg leading-tight">SJ Law</div>
              <div className="text-[10px] text-[#C9A84C] font-medium tracking-widest uppercase">Learning Platform</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => {
              if (item.auth && !isAuthenticated) return null;
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              return (
                <div key={item.label} className="relative">
                  <button
                    onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                    onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                    onClick={() => !hasDropdown && navigate(item.href)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors
                      ${isActive ? 'text-[#C9A84C]' : 'text-[#1A1A2E] hover:text-[#0F2044]'}`}
                  >
                    {item.label}
                    {hasDropdown && (
                      <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  {hasDropdown && openDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-0 w-52 bg-white border border-[#DDD8CC] rounded-lg shadow-lg py-1 z-50"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.dropdown!.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className="block px-4 py-2.5 text-sm text-[#1A1A2E] hover:bg-[#F5F3EE] hover:text-[#0F2044] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search courses, topics, cases…"
                    className="border border-[#DDD8CC] rounded-lg px-3 py-1.5 text-sm w-56 bg-[#F5F3EE] focus:outline-none focus:border-[#C9A84C]"
                    onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  />
                  <button onClick={() => setSearchOpen(false)} className="ml-1 p-1.5 text-[#6B7280] hover:text-[#0F2044]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 text-[#6B7280] hover:text-[#0F2044] transition-colors rounded-lg hover:bg-[#F5F3EE]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-[#6B7280] hover:text-[#0F2044] transition-colors rounded-lg hover:bg-[#F5F3EE]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A84C] rounded-full" />
                </button>

                {/* Help */}
                <button className="hidden md:flex p-2 text-[#6B7280] hover:text-[#0F2044] transition-colors rounded-lg hover:bg-[#F5F3EE]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#DDD8CC] hover:border-[#C9A84C] transition-colors bg-white"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#0F2044] flex items-center justify-center text-white text-xs font-bold">
                      {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-[#0F2044]">{user?.name.split(' ')[0]}</span>
                    <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#DDD8CC] rounded-xl shadow-xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-[#DDD8CC]">
                        <div className="font-semibold text-[#0F2044]">{user?.name}</div>
                        <div className="text-xs text-[#6B7280]">{user?.email}</div>
                        <div className="mt-1 inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Trial  --  3 days remaining
                        </div>
                      </div>
                      {[
                        { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
                        { label: 'My Learning', href: '/courses', icon: '📚' },
                        { label: 'My Subscriptions', href: '/account/subscriptions', icon: '💳' },
                        { label: 'Progress', href: '/account/progress', icon: '📊' },
                        { label: 'Bookmarks', href: '/account/bookmarks', icon: '🔖' },
                        { label: 'Notifications', href: '/account/notifications', icon: '🔔' },
                        { label: 'Account Settings', href: '/account', icon: '⚙️' },
                      ].map(item => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1A1A2E] hover:bg-[#F5F3EE] transition-colors"
                        >
                          <span>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-[#DDD8CC] mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-[#0F2044] hover:text-[#C9A84C] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-[#0F2044] text-white rounded-lg hover:bg-[#1a3666] transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 text-[#6B7280] hover:text-[#0F2044] rounded-lg"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-[#DDD8CC] bg-white">
          <div className="max-w-[1400px] mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => {
              if (item.auth && !isAuthenticated) return null;
              return (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className="block px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F5F3EE] rounded-lg"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && item.dropdown.map(sub => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="block pl-6 pr-3 py-2 text-sm text-[#6B7280] hover:text-[#0F2044] hover:bg-[#F5F3EE] rounded-lg"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              );
            })}
            {!isAuthenticated && (
              <div className="pt-2 border-t border-[#DDD8CC] space-y-2">
                <Link to="/login" className="block px-3 py-2.5 text-sm font-medium text-[#0F2044]">Sign In</Link>
                <Link to="/signup" className="block px-3 py-2.5 text-sm font-semibold bg-[#0F2044] text-white rounded-lg text-center">
                  Start Free Trial
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
