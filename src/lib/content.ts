import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export function reportDataError(message: string) {
  window.dispatchEvent(new CustomEvent('content-load-error', { detail: message }));
}
export function usePageContent(slug: string) {
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    let active = true;
    setContent({});
    supabase.from('site_pages').select('content').in('slug', slug === 'home' ? ['home', '/'] : [slug, `/${slug}`]).eq('status', 'published').order('updated_at', { ascending: false }).limit(1)
      .then(({ data, error }) => { if (!active) return; if (error) reportDataError('Unable to load page content. Please try again.'); else setContent(data?.[0]?.content || {}); });
    return () => { active = false; };
  }, [slug]);
  return content;
}
export function useCatalogCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => { supabase.rpc('published_catalog_counts').then(({ data, error }) => { if (error) reportDataError('Unable to load catalog totals. Please try again.'); else setCounts(data || {}); }); }, []);
  return counts;
}
export function safeWebUrl(value: string | undefined) {
  try { const url = new URL(value || ''); return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}
