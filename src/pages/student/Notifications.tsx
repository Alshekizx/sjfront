import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CreditCard, BookOpen, Award, Megaphone, CheckCheck } from 'lucide-react';
import { getNotifications, markNotificationsRead, type NotificationData } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';

const ICONS: Record<string, React.ReactNode> = {
  subscription: <CreditCard size={16} />,
  content: <BookOpen size={16} />,
  exam: <Award size={16} />,
  payment: <CreditCard size={16} />,
  announcement: <Megaphone size={16} />,
};

const COLORS: Record<string, string> = {
  subscription: 'bg-amber-100 text-amber-600',
  content: 'bg-blue-100 text-blue-600',
  exam: 'bg-purple-100 text-purple-600',
  payment: 'bg-green-100 text-green-600',
  announcement: 'bg-[var(--primary)]/10 text-[var(--primary)]',
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getNotifications(user?.id).then(setNotifications);
  }, [user?.id]);

  async function markAllRead() {
    if (!user) return;
    await markNotificationsRead(user.id, notifications.filter(n => !n.read).map(n => n.id));
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="page-shell max-w-[800px] py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--primary)]">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-[var(--muted-foreground)] mt-1 text-sm">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 text-xs font-medium text-[var(--primary)] hover:underline">
              <CheckCheck size={14} /> Mark all read
            </button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white border rounded-xl p-4 transition-colors ${!n.read ? 'border-[var(--primary)]/20 shadow-sm' : 'border-[var(--border)]'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${COLORS[n.type] || 'bg-[var(--muted)] text-[var(--muted-foreground)]'}`}>
                  {ICONS[n.type] || <Bell size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'}`}>{n.title}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      {!n.read && <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />}
                      <span className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">{n.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-relaxed">{n.message}</p>
                  {n.action && n.actionPath && (
                    <Link to={n.actionPath} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] mt-2 hover:underline">
                      {n.action} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
