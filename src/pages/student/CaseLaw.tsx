import { useEffect, useState } from 'react';
import { Search, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Scale } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { setCaseBookmark, getCaseLaw, type CaseData } from '@/lib/data';

export default function CaseLaw() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const toggleBookmark = async (id: string) => { if (!user) return; const saved = !bookmarked.includes(id); try { await setCaseBookmark(user.id, id, saved); setBookmarked(prev => saved ? [...prev, id] : prev.filter(value => value !== id)); } catch { setError('Unable to save this case. Please try again.'); } };
  const [cases, setCases] = useState<CaseData[]>([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  useEffect(() => {
    getCaseLaw(user?.id).then((next) => {
      setCases(next);
      setBookmarked(next.filter((item) => item.bookmarked).map((item) => item.id));
    });
  }, [user?.id]);

  const filtered = cases.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.principle.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="page-shell py-10">
        {error && <p role="alert" className="text-red-600">{error}</p>}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[var(--primary)] mb-1">Case Law Library</h1>
          <p className="text-[var(--muted-foreground)]">Searchable collection of cases for your authorised academic levels</p>
        </div>

        {/* Search & filters */}
        <div className="bg-white border border-[var(--border)] rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cases, principles, topics…"
              className="w-full pl-9 pr-4 py-2.5 bg-[var(--muted)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>
          <div className="flex gap-2">
            <FilterChip label="All Courses" />
            <FilterChip label="Contract" active />
            <FilterChip label="Torts" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted-foreground)]">
            No case law records are available yet. Add cases in the admin dashboard to populate the library.
          </div>
        ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const isExpanded = expanded === c.id;
            const isBookmarked = bookmarked.includes(c.id);
            return (
              <div key={c.id} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : c.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Scale size={14} className="text-[var(--accent)] shrink-0" />
                        <h3 className="font-serif text-base font-semibold text-[var(--primary)]">{c.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-2 flex-wrap">
                        <span className="font-mono bg-[var(--muted)] px-2 py-0.5 rounded">{c.citation}</span>
                        <span>{c.court}</span>
                        <span>{c.year}</span>
                      </div>
                      <p className="text-sm text-[var(--foreground)] font-medium leading-relaxed">{c.principle}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[10px] bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full">{c.topic}</span>
                        <span className="text-[10px] bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full">{c.course}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(c.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${isBookmarked ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'}`}
                      >
                        {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>
                      {isExpanded ? <ChevronUp size={16} className="text-[var(--muted-foreground)]" /> : <ChevronDown size={16} className="text-[var(--muted-foreground)]" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-[var(--border)] pt-4 bg-[var(--muted)]/30">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">Decision & Significance</h4>
                        <p className="text-sm text-[var(--foreground)] leading-relaxed">{c.significance}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">Legal Principle</h4>
                        <p className="text-sm text-[var(--foreground)] leading-relaxed font-medium">{c.principle}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${active ? 'bg-[var(--primary)] text-white' : 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]'}`}>
      {label}
    </button>
  );
}
