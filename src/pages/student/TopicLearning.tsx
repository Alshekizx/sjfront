import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, CheckCircle, BookOpen, Play, List,
  X, Bookmark, BookmarkCheck, Menu,
} from 'lucide-react';
import { getTopics, type TopicData } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { youtubeEmbedUrl } from '@/lib/video';
import { safeWebUrl } from '@/lib/content';
import { supabase } from '@/lib/supabase';

export default function TopicLearning() {
  const { courseId, topicId } = useParams();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState<'notes' | 'video'>('notes');
  const [bookmarked, setBookmarked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [topics, setTopics] = useState<TopicData[]>([]);

  useEffect(() => {
    getTopics(courseId, user?.id).then(setTopics);
  }, [courseId, user?.id]);

  const currentTopicIndex = topics.findIndex((t) => t.id === topicId);
  const currentTopic = topics[currentTopicIndex];
  useEffect(() => {
    setActiveTab(currentTopic?.hasVideo && !currentTopic.hasNotes ? 'video' : 'notes');
    setError('');
  }, [currentTopic?.id, currentTopic?.hasVideo, currentTopic?.hasNotes]);

  const prevTopic = currentTopicIndex > 0 ? topics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < topics.length - 1 ? topics[currentTopicIndex + 1] : null;
  const saveProgress = async (changes: { bookmarked?: boolean; completed_at?: string | null }) => {
    if (!user || !currentTopic || saving) return;
    setSaving(true); setError('');
    const { error } = await supabase.from('student_lesson_progress').upsert({ student_id: user.id, lesson_id: topicId, ...changes }, { onConflict: 'student_id,lesson_id' });
    setSaving(false);
    if (error) { setError('Unable to save your progress. Please try again.'); return; }
    if (changes.bookmarked !== undefined) setBookmarked(changes.bookmarked);
    if ('completed_at' in changes) setCompleted(Boolean(changes.completed_at));
    setTopics(prev => prev.map(topic => topic.id === topicId ? { ...topic, ...('completed_at' in changes ? { completed: Boolean(changes.completed_at) } : {}), ...(changes.bookmarked !== undefined ? { bookmarked: changes.bookmarked } : {}) } : topic));
  };

  useEffect(() => {
    setCompleted(Boolean(currentTopic?.completed));
    setBookmarked(Boolean(currentTopic?.bookmarked));
  }, [currentTopic?.id, currentTopic?.completed, currentTopic?.bookmarked]);

  useEffect(() => {
    let active = true;
    setVideoUrl('');
    const value = currentTopic?.videoUrl;
    if (value?.startsWith('media:')) supabase.storage.from('media').createSignedUrl(value.slice(6), 3600).then(({ data, error }) => { if (!active) return; if (error) setError('Unable to load the lesson video.'); else setVideoUrl(data?.signedUrl || ''); });
    else setVideoUrl(safeWebUrl(value) || '');
    return () => { active = false; };
  }, [currentTopic?.videoUrl]);

  const embedUrl = youtubeEmbedUrl(videoUrl);

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden bg-white border-r border-[var(--border)] flex flex-col`}>
        <div className="p-4 border-b border-[var(--border)]">
          <Link to={`/courses/${courseId}`} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-2">
            <ChevronLeft size={14} /> Back to course
          </Link>
          <h3 className="font-serif text-sm font-semibold text-[var(--primary)]">{currentTopic?.courseTitle || 'Course lessons'}</h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{topics.filter((t) => t.completed).length} / {topics.length} completed</p>
          <div className="mt-2 h-1.5 bg-[var(--muted)] rounded-full">
            <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${topics.length ? (topics.filter((t) => t.completed).length / topics.length) * 100 : 0}%` }} />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {topics.map((topic, i) => {
            const isActive = topic.id === topicId;
            return (
              <Link
                key={topic.id}
                to={`/courses/${courseId}/topic/${topic.id}`}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive ? 'bg-[var(--primary)]/8 text-[var(--primary)] font-medium border-r-2 border-[var(--primary)]' : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-mono ${
                  topic.completed ? 'bg-green-500 border-green-500 text-white' : isActive ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--border)] text-[var(--muted-foreground)]'
                }`}>
                  {topic.completed ? <CheckCircle size={10} /> : i + 1}
                </div>
                <span className="truncate leading-snug">{topic.title}</span>
                {topic.hasVideo && <Play size={13} className="shrink-0" aria-label="Video tutorial available" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="bg-white border-b border-[var(--border)] px-4 py-3 flex flex-wrap items-center gap-3">
          <button aria-label="Toggle lesson list" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors">
            <Menu size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--muted-foreground)]">{currentTopic?.courseTitle || 'Course'} · Topic {currentTopicIndex + 1}</p>
            <p className="text-sm font-semibold text-[var(--foreground)] truncate">{currentTopic?.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-[var(--muted)] rounded-lg p-0.5">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'notes' ? 'bg-white shadow-sm text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
              >
                <BookOpen size={13} /> Notes
              </button>
              <button
                onClick={() => setActiveTab('video')}
                aria-pressed={activeTab === 'video'}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'video' ? 'bg-white shadow-sm text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
              >
                <Play size={13} /> Video Tutorial
              </button>
            </div>
            <button
              disabled={saving || !currentTopic} onClick={() => { const next = !bookmarked; saveProgress({ bookmarked: next }); }}
              className={`p-2 rounded-lg transition-colors ${bookmarked ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'}`}
            >
              {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
            <button
              disabled={saving || !currentTopic} onClick={() => { const next = !completed; saveProgress({ completed_at: next ? new Date().toISOString() : null }); }}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                completed ? 'bg-green-500 text-white' : 'bg-[var(--primary)] text-white hover:bg-[#0a1840]'
              }`}
            >
              <CheckCircle size={13} />
              {completed ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {error && <p role="alert" className="p-4 text-red-600">{error}</p>}
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'notes' ? (
            <div className="max-w-3xl mx-auto px-6 py-10">
              {currentTopic?.hasVideo && <div className="mb-6 rounded-xl border border-[var(--border)] bg-white p-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm">This lesson includes a video tutorial.</p>
                <button onClick={() => setActiveTab('video')} className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"><Play size={16} /> Watch Tutorial</button>
              </div>}
              <NotesRenderer content={currentTopic?.content || 'No notes have been published for this lesson yet.'} />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-6 py-10">
              <h2 className="font-serif text-xl mb-4">{currentTopic?.title}</h2>
              {videoUrl ? <>{embedUrl ? <iframe key={embedUrl} src={embedUrl} title={currentTopic?.title || 'Tutorial video'} className="w-full aspect-video rounded-xl" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <video key={videoUrl} src={videoUrl} controls preload="metadata" className="w-full rounded-xl" onError={() => setError('This video link cannot be played here. Use the link below to open it.')} />}<a href={videoUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 underline">{embedUrl ? 'Watch on YouTube' : 'Open video'}</a></> : <p>No video has been published for this lesson.</p>}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white border-t border-[var(--border)] px-6 py-4 flex items-center justify-between">
          {prevTopic ? (
            <Link
              to={`/courses/${courseId}/topic/${prevTopic.id}`}
              className="flex items-center gap-2 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <ChevronLeft size={16} />
              <div className="text-left hidden sm:block">
                <p className="text-xs text-[var(--muted-foreground)]">Previous</p>
                <p className="font-medium truncate max-w-[200px]">{prevTopic.title}</p>
              </div>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : <div />}

          <div className="text-xs text-[var(--muted-foreground)] font-mono">
            {topics.length ? currentTopicIndex + 1 : 0} / {topics.length}
          </div>

          {nextTopic ? (
            <Link
              to={`/courses/${courseId}/topic/${nextTopic.id}`}
              className="flex items-center gap-2 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs text-[var(--muted-foreground)]">Next</p>
                <p className="font-medium truncate max-w-[200px]">{nextTopic.title}</p>
              </div>
              <span className="sm:hidden">Next</span>
              <ChevronRight size={16} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

function NotesRenderer({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-serif text-2xl font-bold text-[var(--primary)] mt-8 mb-4 first:mt-0">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-serif text-xl font-semibold text-[var(--primary)] mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-[var(--accent)] pl-4 py-1 my-4 bg-[var(--accent)]/5 rounded-r-lg">
          <p className="text-sm text-[var(--foreground)] italic">{renderInline(line.slice(2))}</p>
        </blockquote>
      );
    } else if (line.startsWith('| ')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('| ')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split('|').filter(Boolean).map((s) => s.trim());
      const rows = tableLines.slice(2).map((l) => l.split('|').filter(Boolean).map((s) => s.trim()));
      elements.push(
        <div key={i} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--primary)] text-white">
                {headers.map((h, j) => <th key={j} className="px-4 py-2.5 text-left text-xs font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-[var(--muted)]'}>
                  {row.map((cell, k) => <td key={k} className="px-4 py-2.5 text-xs border-t border-[var(--border)]">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="my-3 space-y-1.5 ml-5 list-decimal text-sm text-[var(--foreground)]">
          {listItems.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
        </ol>
      );
      continue;
    } else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="my-3 space-y-1.5 ml-5 list-disc text-sm text-[var(--foreground)]">
          {listItems.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    } else if (line.trim() !== '') {
      elements.push(
        <p key={i} className="text-sm text-[var(--foreground)] leading-7 my-3">
          {renderInline(line)}
        </p>
      );
    }
    i++;
  }

  return <div className="prose-custom">{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-[var(--primary)]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="font-mono text-xs bg-[var(--muted)] px-1.5 py-0.5 rounded text-[var(--primary)]">{part.slice(1, -1)}</code>;
    }
    return <span key={i}>{part}</span>;
  });
}
