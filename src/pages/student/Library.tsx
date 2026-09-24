import { useEffect, useState } from 'react';
import { Bookmark, Scale, BookOpen, Play, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { openResource, getCaseLaw, getResources, getTopics, type CaseData, type ResourceData, type TopicData } from '@/lib/data';

export default function Library() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [opening, setOpening] = useState<string | null>(null);
  const openFile = async (resource: ResourceData) => { setOpening(resource.id); setError(''); try { const url = await openResource(resource.storagePath); window.location.assign(url); } catch { setError('Unable to open this file. Please try again.'); } finally { setOpening(null); } };
  const [bookmarkedCases, setBookmarkedCases] = useState<CaseData[]>([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<TopicData[]>([]);
  const [resources, setResources] = useState<ResourceData[]>([]);

  useEffect(() => {
    getCaseLaw(user?.id).then((items) => setBookmarkedCases(items.filter((item) => item.bookmarked)));
    getTopics(undefined, user?.id).then((items) => setBookmarkedTopics(items.filter((item) => item.bookmarked)));
    getResources().then(setResources);
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="page-shell py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[var(--primary)]">My Library</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Saved notes, cases, topics and resources</p>
        </div>

        {error && <p role="alert" className="text-red-600 mb-4">{error}</p>}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bookmarked cases */}
          <div className="bg-white border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Scale size={18} className="text-[var(--accent)]" />
              <h2 className="font-serif text-lg font-semibold text-[var(--primary)]">Saved Cases</h2>
              <span className="ml-auto font-mono text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full">{bookmarkedCases.length}</span>
            </div>
            <div className="space-y-3">
              {bookmarkedCases.map((c) => (
                <div key={c.id} className="p-3.5 bg-[var(--muted)] rounded-xl hover:bg-[var(--secondary)] transition-colors">
                  <p className="text-sm font-semibold text-[var(--primary)]">{c.name}</p>
                  <p className="font-mono text-xs text-[var(--muted-foreground)] mt-0.5">{c.citation}</p>
                  <p className="text-xs text-[var(--foreground)] mt-1.5 line-clamp-2">{c.principle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-white text-[var(--muted-foreground)] px-2 py-0.5 rounded-full">{c.topic}</span>
                  </div>
                </div>
              ))}
              <Link to="/case-law" className="block text-center py-3 border border-dashed border-[var(--border)] rounded-xl text-xs font-medium text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                Browse case library →
              </Link>
            </div>
          </div>

          {/* Bookmarked topics */}
          <div className="bg-white border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark size={18} className="text-[var(--accent)]" />
              <h2 className="font-serif text-lg font-semibold text-[var(--primary)]">Saved Topics</h2>
              <span className="ml-auto font-mono text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full">{bookmarkedTopics.length}</span>
            </div>
            <div className="space-y-3">
              {bookmarkedTopics.map((t) => (
                <Link key={t.id} to={`/courses/${t.courseId}/topic/${t.id}`} className="flex items-center gap-3 p-3.5 bg-[var(--muted)] rounded-xl hover:bg-[var(--secondary)] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/8 flex items-center justify-center">
                    <FileText size={16} className="text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{t.title}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{t.courseTitle}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    {t.hasVideo && <Play size={12} className="text-[var(--muted-foreground)]" />}
                    {t.hasNotes && <BookOpen size={12} className="text-[var(--muted-foreground)]" />}
                  </div>
                </Link>
              ))}
              <Link to="/courses" className="block text-center py-3 border border-dashed border-[var(--border)] rounded-xl text-xs font-medium text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                Browse courses →
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[var(--border)] rounded-xl p-6 mt-6">
          <div className="flex items-center gap-2 mb-4"><FileText size={18} className="text-[var(--accent)]" /><h2 className="font-serif text-lg font-semibold text-[var(--primary)]">Study Resources</h2></div>
          {resources.length ? <div className="grid sm:grid-cols-2 gap-3">{resources.map(resource => <div key={resource.id} className="p-3.5 bg-[var(--muted)] rounded-xl"><p className="text-sm font-semibold text-[var(--primary)]">{resource.title}</p><p className="text-xs text-[var(--muted-foreground)] mt-1">{resource.description || 'Published study resource'}</p><button disabled={opening !== null} onClick={() => openFile(resource)} className="mt-3 text-sm underline">{opening === resource.id ? 'Opening…' : 'Open file'}</button></div>)}</div> : <p className="text-sm text-[var(--muted-foreground)]">No published resources yet.</p>}
        </div>
      </div>
    </div>
  );
}
