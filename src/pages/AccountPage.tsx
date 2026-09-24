import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const subscriptions = [
  { level: '100 Level', status: 'active', startDate: 'Mar 1, 2026', expiryDate: 'Mar 1, 2027', price: '\u20A615,000', ref: 'PSK-2026-0301-A' },
  { level: '200 Level', status: 'active', startDate: 'May 15, 2026', expiryDate: 'May 15, 2027', price: '\u20A620,000', ref: 'PSK-2026-0515-B' },
];

const payments = [
  { ref: 'PSK-2026-0515-B', level: '200 Level', amount: '\u20A620,000', status: 'success', date: 'May 15, 2026' },
  { ref: 'PSK-2026-0301-A', level: '100 Level', amount: '\u20A615,000', status: 'success', date: 'Mar 1, 2026' },
];

const bookmarks = [
  { type: 'note', title: 'Mens Rea  --  Criminal Law', course: 'Criminal Law & Procedure', date: 'Sep 18, 2026' },
  { type: 'case', title: 'Donoghue v Stevenson [1932]', course: 'Law of Torts', date: 'Sep 15, 2026' },
  { type: 'note', title: 'Offer and Acceptance  --  Contract', course: 'Contract Law', date: 'Sep 10, 2026' },
  { type: 'video', title: 'Introduction to Constitutional Law', course: 'Constitutional Law', date: 'Sep 5, 2026' },
];

const notifications = [
  { type: 'warning', title: 'Trial Expiring Soon', body: 'Your 3-day free trial expires on September 23, 2026. Subscribe to continue accessing your courses.', time: '2 hours ago', unread: true },
  { type: 'success', title: 'Topic Completed', body: 'You completed "Fundamental Rights  --  Chapter IV" in Constitutional Law.', time: '5 hours ago', unread: true },
  { type: 'info', title: 'New Content Added', body: 'New topic added to Criminal Law: Strict Liability Offences.', time: 'Yesterday', unread: false },
  { type: 'success', title: 'Payment Confirmed', body: 'Your payment of \u20A620,000 for 200 Level has been verified. Access is now active.', time: 'May 15, 2026', unread: false },
];

const sidebarLinks = [
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'subscriptions', label: 'My Subscriptions', icon: '💳' },
  { key: 'payments', label: 'Payment History', icon: '📄' },
  { key: 'progress', label: 'Learning Progress', icon: '📊' },
  { key: 'bookmarks', label: 'Bookmarks', icon: '🔖' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
  { key: 'security', label: 'Security', icon: '🔒' },
  { key: 'preferences', label: 'Preferences', icon: '⚙️' },
  { key: 'help', label: 'Help & Support', icon: '❓' },
  { key: 'terms', label: 'Terms & Privacy', icon: '📋' },
];

export default function AccountPage({ section: propSection }: { section?: string }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const urlSection = location.pathname.split('/').pop();
  const section = propSection || (urlSection !== 'account' ? urlSection : 'profile');

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '+234 801 234 5678',
    university: user?.university || '',
    level: user ? `${user.academicLevel} Level` : '',
  });
  const [saved, setSaved] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-3xl font-serif font-bold text-[#0F2044] mb-6">My Account</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#DDD8CC] overflow-hidden">
            <div className="p-5 border-b border-[#DDD8CC] text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F2044] text-white flex items-center justify-center text-2xl font-bold font-serif mx-auto mb-2">
                {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="font-semibold text-[#0F2044]">{user?.name}</div>
              <div className="text-xs text-[#6B7280]">{user ? `${user.academicLevel} Level` : ''}</div>
            </div>
            <nav className="p-2">
              {sidebarLinks.map(link => (
                <Link
                  key={link.key}
                  to={link.key === 'profile' ? '/account' : `/account/${link.key}`}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors
                    ${(section === link.key || (!section && link.key === 'profile'))
                      ? 'bg-[#F5F3EE] text-[#0F2044] font-medium'
                      : 'text-[#6B7280] hover:text-[#0F2044] hover:bg-[#F5F3EE]'
                    }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Profile */}
          {(!section || section === 'profile') && (
            <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6">
              <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-6">Personal Information</h2>
              {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-5">
                  Profile updated successfully.
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Full Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F5F3EE] border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Email Address</label>
                  <input
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-3 bg-[#EAE6DC] border border-[#DDD8CC] rounded-lg text-sm text-[#6B7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F5F3EE] border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2044] mb-1.5">University / Institution</label>
                  <input
                    value={form.university}
                    onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F5F3EE] border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Academic Level</label>
                  <select
                    value={form.level}
                    onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F5F3EE] border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]"
                  >
                    {['100 Level', '200 Level', '300 Level', '400 Level', '500 Level'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="mt-6 px-6 py-3 bg-[#0F2044] text-white font-semibold rounded-lg hover:bg-[#1a3666] transition-colors text-sm"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Subscriptions */}
          {section === 'subscriptions' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6">
                <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-6">My Subscriptions</h2>
                <div className="space-y-4">
                  {subscriptions.map(sub => (
                    <div key={sub.ref} className="border border-green-200 bg-green-50/30 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#0F2044]">{sub.level}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
                        </div>
                        <div className="text-xs text-[#6B7280]">Ref: {sub.ref}</div>
                        <div className="text-xs text-[#6B7280]">Started: {sub.startDate}  -  Expires: {sub.expiryDate}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold text-[#0F2044]">{sub.price}</div>
                          <div className="text-xs text-[#6B7280]">paid</div>
                        </div>
                        <Link to={`/courses`} className="px-4 py-2 text-xs font-semibold bg-[#0F2044] text-white rounded-lg hover:bg-[#1a3666] transition-colors">
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[#DDD8CC]">
                  <h3 className="font-medium text-[#0F2044] mb-3">Available Levels</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {['300 Level', '400 Level', '500 Level'].map(l => (
                      <Link
                        key={l}
                        to="/pricing"
                        className="p-3 rounded-xl border border-[#DDD8CC] flex items-center justify-between hover:border-[#C9A84C] transition-colors"
                      >
                        <span className="text-sm text-[#6B7280]">{l}</span>
                        <span className="text-xs text-[#C9A84C] font-semibold">Subscribe →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment history */}
          {section === 'payments' && (
            <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6">
              <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-6">Payment History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#DDD8CC]">
                      {['Reference', 'Level', 'Amount', 'Status', 'Date'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(p => (
                      <tr key={p.ref} className="border-b border-[#F5F3EE] hover:bg-[#F5F3EE]/50">
                        <td className="py-3.5 px-3 font-mono text-xs text-[#6B7280]">{p.ref}</td>
                        <td className="py-3.5 px-3 font-medium text-[#0F2044]">{p.level}</td>
                        <td className="py-3.5 px-3 font-bold text-[#0F2044]">{p.amount}</td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-[#6B7280]">{p.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookmarks */}
          {section === 'bookmarks' && (
            <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6">
              <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-6">My Bookmarks</h2>
              <div className="space-y-3">
                {bookmarks.map(bm => (
                  <div key={bm.title} className="flex items-center gap-4 p-4 rounded-xl border border-[#DDD8CC] hover:border-[#C9A84C] transition-colors cursor-pointer">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm
                      ${bm.type === 'note' ? 'bg-blue-50 text-blue-600' : bm.type === 'case' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'}`}>
                      {bm.type === 'note' ? '📄' : bm.type === 'case' ? '⚖️' : '▶️'}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#0F2044]">{bm.title}</div>
                      <div className="text-xs text-[#6B7280]">{bm.course}  -  {bm.date}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${bm.type === 'note' ? 'bg-blue-50 text-blue-600' : bm.type === 'case' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'}`}>
                      {bm.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {section === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6">
              <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-6">Notifications</h2>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition-colors
                      ${n.unread ? 'border-[#C9A84C]/30 bg-amber-50/30' : 'border-[#DDD8CC] bg-white'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0
                        ${n.type === 'warning' ? 'bg-amber-400' : n.type === 'success' ? 'bg-green-500' : 'bg-blue-400'}`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-[#0F2044] mb-0.5">{n.title}</div>
                        <p className="text-sm text-[#6B7280] leading-relaxed">{n.body}</p>
                        <div className="text-xs text-[#6B7280] mt-1.5">{n.time}</div>
                      </div>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-[#C9A84C] shrink-0 mt-2" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress */}
          {section === 'progress' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6">
                <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-6">Learning Progress</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[['34', 'Topics Completed'], ['218', 'Questions Answered'], ['74%', 'Avg. Score'], ['42h', 'Total Study Time']].map(([val, lbl]) => (
                    <div key={lbl} className="text-center p-4 bg-[#F5F3EE] rounded-xl">
                      <div className="text-2xl font-serif font-bold text-[#0F2044]">{val}</div>
                      <div className="text-xs text-[#6B7280] mt-1">{lbl}</div>
                    </div>
                  ))}
                </div>
                <h3 className="font-medium text-[#0F2044] mb-3">Course Progress</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Constitutional Law', progress: 72 },
                    { name: 'Criminal Law & Procedure', progress: 45 },
                    { name: 'Law of Evidence', progress: 28 },
                    { name: 'Contract Law', progress: 100 },
                    { name: 'Law of Torts', progress: 80 },
                  ].map(c => (
                    <div key={c.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-[#0F2044] font-medium">{c.name}</span>
                        <span className={`font-bold ${c.progress === 100 ? 'text-green-600' : 'text-[#C9A84C]'}`}>{c.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#EAE6DC] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${c.progress}%`, backgroundColor: c.progress === 100 ? '#22c55e' : '#C9A84C' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {section === 'security' && (
            <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6">
              <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-6">Security Settings</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium text-[#0F2044] mb-3">Change Password</h3>
                  <div className="space-y-3 max-w-sm">
                    {['Current Password', 'New Password', 'Confirm New Password'].map(lbl => (
                      <div key={lbl}>
                        <label className="block text-sm text-[#6B7280] mb-1.5">{lbl}</label>
                        <input type="password" className="w-full px-4 py-3 bg-[#F5F3EE] border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]" />
                      </div>
                    ))}
                    <button className="px-5 py-2.5 bg-[#0F2044] text-white text-sm font-semibold rounded-lg hover:bg-[#1a3666] transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other sections */}
          {section && !['profile', 'subscriptions', 'payments', 'progress', 'bookmarks', 'notifications', 'security'].includes(section) && (
            <div className="bg-white rounded-2xl border border-[#DDD8CC] p-6 text-center py-16">
              <div className="text-4xl mb-3">🚧</div>
              <h2 className="font-serif font-bold text-xl text-[#0F2044] mb-2">Coming Soon</h2>
              <p className="text-sm text-[#6B7280]">This section is being built. Check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
