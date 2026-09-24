import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  GraduationCap,
  FileText,
  BarChart3,
  Bookmark,
  Settings,
  LogOut,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import logoDark from '@/assets/ref2.png';

const LEVELS = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level'];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrolled();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setProfileOpen(false);
  }, [location.pathname]);

  const navBg = isScrolled || mobileOpen ? 'bg-white/95 shadow-[0_20px_50px_rgba(13,31,76,0.08)]' : 'bg-white/80 backdrop-blur-xl';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${navBg} border-b border-[var(--border)]`}>
      <div className="container-shell" ref={navRef}>
        <div className="flex h-[var(--navbar-height)] items-center gap-3 lg:gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-3 rounded-full transition-opacity hover:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]/10">
              <img src={logoDark} alt="SJ Law Academy" className="h-8 w-auto" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="block font-serif text-[1.05rem] font-bold tracking-[-0.04em] text-[var(--primary)]">SJ Law Academy</span>
              <span className="mt-1 block text-[9px] font-mono uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Digital Law School</span>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            <NavItem label="Home" to="/" />
            {isAuthenticated && (
              <DropdownItem
                label="Learn"
                isOpen={activeDropdown === 'learn'}
                onToggle={() => setActiveDropdown(activeDropdown === 'learn' ? null : 'learn')}
              >
                <div className="grid w-[520px] grid-cols-2 gap-4 p-4">
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Active Courses</p>
                    <Link to="/courses" className="mb-2 flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--muted)]">
                      <BookOpen size={16} className="text-[var(--primary)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">Law of Contract I</p>
                        <p className="text-xs text-[var(--muted-foreground)]">200 Level · 67% complete</p>
                      </div>
                    </Link>
                    <Link to="/courses" className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--muted)]">
                      <BookOpen size={16} className="text-[var(--primary)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">Law of Torts</p>
                        <p className="text-xs text-[var(--muted-foreground)]">200 Level · 31% complete</p>
                      </div>
                    </Link>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Continue Learning</p>
                    <Link to="/courses/c001/topic/t005" className="mb-2 flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--muted)]">
                      <FileText size={16} className="text-[var(--accent)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">Terms of a Contract</p>
                        <p className="text-xs text-[var(--muted-foreground)]">Last studied · Resume</p>
                      </div>
                    </Link>
                    <Link to="/practice" className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--muted)]">
                      <BarChart3 size={16} className="text-[var(--accent)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">Practice Questions</p>
                        <p className="text-xs text-[var(--muted-foreground)]">48 questions available</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </DropdownItem>
            )}

            <DropdownItem
              label="Academic Levels"
              isOpen={activeDropdown === 'levels'}
              onToggle={() => setActiveDropdown(activeDropdown === 'levels' ? null : 'levels')}
            >
              <div className="w-[360px] p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Choose Your Level</p>
                <div className="space-y-1">
                  {LEVELS.map((level, i) => {
                    const subscribed = isAuthenticated && user?.subscriptions.some((s) => s.level === i + 1 && s.status !== 'expired');
                    return (
                      <Link
                        key={level}
                        to={`/academic-levels#level-${i + 1}`}
                        className="flex items-center justify-between rounded-xl px-2.5 py-2.5 transition-colors hover:bg-[var(--muted)]"
                      >
                        <div className="flex items-center gap-2.5">
                          <GraduationCap size={15} className="text-[var(--primary)]" />
                          <span className="text-sm font-medium text-[var(--foreground)]">{level}</span>
                        </div>
                        {subscribed ? (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Active</span>
                        ) : (
                          <span className="rounded-full bg-[var(--muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--muted-foreground)]">Locked</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </DropdownItem>

            <NavItem label="Courses" to="/courses" />
            <NavItem label="Practice" to="/practice" />
            <NavItem label="Case Law" to="/case-law" />
            <NavItem label="Resources" to="/resources" />
            <NavItem label="About" to="/about" />
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]">
                  <Bell size={18} />
                  {user && user.unreadNotifications > 0 && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                      {user.unreadNotifications}
                    </span>
                  )}
                </Link>

                <Link to="/contact" className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] sm:flex">
                  <HelpCircle size={18} />
                </Link>

                <div className="relative ml-1" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-1.5 pr-2.5 py-1 transition-colors hover:border-[var(--primary)]/25"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-semibold text-white">
                      {user?.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="hidden text-sm font-medium text-[var(--foreground)] sm:block">{user?.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`text-[var(--muted-foreground)] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_24px_60px_rgba(13,31,76,0.12)]">
                      <div className="border-b border-[var(--border)] px-4 py-3">
                        <p className="truncate text-sm font-semibold text-[var(--foreground)]">{user?.name}</p>
                        <p className="truncate text-xs text-[var(--muted-foreground)]">{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <ProfileMenuItem icon={<BookOpen size={14} />} label="Dashboard" to="/dashboard" />
                        <ProfileMenuItem icon={<GraduationCap size={14} />} label="My Learning" to="/courses" />
                        <ProfileMenuItem icon={<CreditCard size={14} />} label="My Subscriptions" to="/account/subscriptions" />
                        <ProfileMenuItem icon={<BarChart3 size={14} />} label="Progress" to="/progress" />
                        <ProfileMenuItem icon={<Bookmark size={14} />} label="Bookmarks" to="/library" />
                        <ProfileMenuItem icon={<Bell size={14} />} label="Notifications" to="/notifications" />
                        <div className="mt-1 border-t border-[var(--border)] pt-1">
                          <ProfileMenuItem icon={<Settings size={14} />} label="Account Settings" to="/account/profile" />
                          <button
                            onClick={() => {
                              logout();
                              navigate('/');
                            }}
                            className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                          >
                            <LogOut size={14} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link to="/login" className="btn btn-ghost px-4 py-2.5 text-sm">Sign In</Link>
                <Link to="/signup" className="btn btn-primary px-4 py-2.5 text-sm">Start Free Trial</Link>
              </div>
            )}

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-[var(--border)] py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, cases, topics, notes..."
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--muted)] py-2.5 pl-9 pr-12 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]/20 focus:ring-4 focus:ring-[var(--ring)]"
              />
              <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-[var(--border)] bg-white px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)] sm:block">ESC</kbd>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="space-y-1 border-t border-[var(--border)] py-4 lg:hidden">
            <MobileNavItem label="Home" to="/" />
            {isAuthenticated && <MobileNavItem label="Dashboard" to="/dashboard" />}
            {isAuthenticated && <MobileNavItem label="My Courses" to="/courses" />}
            <MobileNavItem label="Academic Levels" to="/academic-levels" />
            <MobileNavItem label="Practice" to="/practice" />
            <MobileNavItem label="Case Law" to="/case-law" />
            <MobileNavItem label="About" to="/about" />
            <MobileNavItem label="Pricing" to="/pricing" />
            {!isAuthenticated && (
              <div className="mt-3 space-y-2 border-t border-[var(--border)] pt-3">
                <Link to="/login" className="btn btn-ghost w-full text-sm">Sign In</Link>
                <Link to="/signup" className="btn btn-primary w-full text-sm">Start Free Trial</Link>
              </div>
            )}
            {isAuthenticated && (
              <div className="mt-3 border-t border-[var(--border)] pt-3">
                <button onClick={() => { logout(); navigate('/'); }} className="btn btn-ghost w-full text-sm text-red-600">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function NavItem({ label, to }: { label: string; to: string }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? 'bg-[var(--muted)] text-[var(--primary)] shadow-sm' : 'text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--primary)]'
      }`}
    >
      {label}
    </Link>
  );
}

function DropdownItem({ label, children, isOpen, onToggle }: { label: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--primary)]"
      >
        <span>{label}</span>
        <ChevronDown size={14} className={`text-[var(--muted-foreground)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-1 shadow-[0_20px_50px_rgba(13,31,76,0.12)]">
          {children}
        </div>
      )}
    </div>
  );
}

function ProfileMenuItem({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]">
      <span className="text-[var(--muted-foreground)]">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({ label, to }: { label: string; to: string }) {
  return (
    <Link to={to} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--primary)]">
      {label}
    </Link>
  );
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return scrolled;
}
