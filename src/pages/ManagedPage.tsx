import { usePageContent } from '@/lib/content';
export default function ManagedPage({ slug, title }: { slug: string; title: string }) {
  const content = usePageContent(slug);
  return <div className="min-h-screen"><section className="bg-[var(--primary)] text-white py-16"><div className="container-shell"><h1 className="font-serif text-4xl">{content.heading || title}</h1>{content.introduction && <p className="mt-5 text-white/75 max-w-3xl whitespace-pre-wrap">{content.introduction}</p>}</div></section><div className="page-shell py-12 space-y-8">
    {(content.sections || []).map((section: any, index: number) => <section key={index}><h2 className="font-serif text-2xl mb-3">{section.title}</h2><p className="whitespace-pre-wrap leading-relaxed text-[var(--muted-foreground)]">{section.text}</p></section>)}
    {(content.benefits || []).map((benefit: string, index: number) => <p key={index}>{benefit}</p>)}
    {(content.faqs || []).map((faq: any, index: number) => <details key={index} className="rounded-xl border bg-white p-5"><summary className="cursor-pointer font-medium">{faq.question}</summary><p className="whitespace-pre-wrap mt-3">{faq.answer}</p></details>)}
    {!Object.keys(content).length && <p className="text-[var(--muted-foreground)]">No content has been published for this page yet.</p>}
  </div></div>;
}
