import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const cases = [
  { id: 1, name: 'Donoghue v Stevenson', citation: '[1932] AC 562', year: 1932, court: 'House of Lords (UK)', subject: 'Law of Torts', principle: 'Neighbour principle  --  duty of care in negligence', significance: 'Landmark', bookmarked: true },
  { id: 2, name: 'Hadley v Baxendale', citation: '(1854) 9 Exch 341', year: 1854, court: 'Court of Exchequer (UK)', subject: 'Contract Law', principle: 'Remoteness of damage in contract', significance: 'Landmark', bookmarked: false },
  { id: 3, name: 'Carlill v Carbolic Smoke Ball Co', citation: '[1892] 1 QB 256', year: 1892, court: 'Court of Appeal (UK)', subject: 'Contract Law', principle: 'Offer to the world; unilateral contracts', significance: 'Landmark', bookmarked: true },
  { id: 4, name: 'Ransome v Nigerian Maritime Admn', citation: '[2010] LPELR-2941', year: 2010, court: 'Supreme Court of Nigeria', subject: 'Constitutional Law', principle: 'Right to fair hearing under s.36 CFRN', significance: 'Leading', bookmarked: false },
  { id: 5, name: 'Attorney-General Federation v Abubakar', citation: '[2007] 10 NWLR Pt 1041', year: 2007, court: 'Supreme Court of Nigeria', subject: 'Constitutional Law', principle: 'Acting President  --  constitutional succession', significance: 'Leading', bookmarked: false },
  { id: 6, name: 'Rylands v Fletcher', citation: '(1868) LR 3 HL 330', year: 1868, court: 'House of Lords (UK)', subject: 'Law of Torts', principle: 'Strict liability for escape of dangerous things', significance: 'Landmark', bookmarked: false },
];

export default function CaseLawPage() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const filtered = cases.filter(c => {
    if (subject !== 'all' && c.subject !== subject) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.principle.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const subjects = Array.from(new Set(cases.map(c => c.subject)));

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-[#0F2044]">Case Law Library</h1>
        <p className="text-[#6B7280] mt-2 text-sm">Searchable database of landmark cases with facts, ratios, and legal principles explained clearly.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cases, principles…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]"
          />
        </div>
        <select
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="px-4 py-2.5 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044]"
        >
          <option value="all">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-[#DDD8CC] overflow-hidden hover:border-[#C9A84C] transition-colors"
          >
            <button
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              className="w-full text-left p-5 flex items-start gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-serif font-bold text-[#0F2044]">{c.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${c.significance === 'Landmark' ? 'bg-[#C9A84C]/15 text-[#8a6d1e]' : 'bg-blue-50 text-blue-700'}`}>
                    {c.significance}
                  </span>
                </div>
                <div className="text-xs text-[#6B7280] mb-2">{c.citation}  -  {c.court}</div>
                <p className="text-sm text-[#1A1A2E]">{c.principle}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:block text-xs bg-[#F5F3EE] text-[#6B7280] px-2.5 py-1 rounded-full">{c.subject}</span>
                <svg
                  className={`w-4 h-4 text-[#6B7280] transition-transform ${expanded === c.id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {expanded === c.id && (
              <div className="px-5 pb-5 border-t border-[#F5F3EE] pt-4">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-[#0F2044] mb-1">Court</div>
                    <p className="text-[#6B7280]">{c.court}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F2044] mb-1">Year Decided</div>
                    <p className="text-[#6B7280]">{c.year}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="font-semibold text-[#0F2044] mb-1">Legal Principle</div>
                    <p className="text-[#6B7280] leading-relaxed">{c.principle}. This case is foundational to the study of {c.subject} and is frequently examined in Nigerian law school assessments.</p>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="font-semibold text-[#0F2044] mb-1">Significance</div>
                    <p className="text-[#6B7280] leading-relaxed">This is a {c.significance.toLowerCase()} case in Nigerian legal education and represents core doctrine that every law student at this level must understand thoroughly.</p>
                  </div>
                </div>
                <button className="mt-4 flex items-center gap-2 text-xs text-[#C9A84C] font-semibold hover:text-[#0F2044] transition-colors">
                  🔖 {c.bookmarked ? 'Remove Bookmark' : 'Bookmark Case'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">⚖️</div>
          <div className="font-serif font-bold text-[#0F2044] mb-2">No cases found</div>
          <p className="text-sm text-[#6B7280]">Try a different search term or subject filter.</p>
        </div>
      )}
    </div>
  );
}
