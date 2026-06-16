import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, Calendar, Tag, ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { StructuredData } from "@/components/structured-data";
import { staticArticles, useArticle, useArticles } from "@/lib/articles";
import { articleSchema, breadcrumbSchema, toIsoDate } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";

export default function InsightDetail() {
  const { slug } = useParams<{ slug: string }>();
  const articleQuery = useArticle(slug);
  const articlesQuery = useArticles();
  const article = articleQuery.data;

  usePageMeta(
    article ? article.seoTitle ?? article.title : "Insight",
    article ? article.seoDescription ?? article.excerpt : "Technical insights from AICORE Technologies.",
    article ? `/insights/${article.slug}` : "/insights",
    article
      ? {
          type: "article",
          publishedTime: article.publishedAt ?? toIsoDate(article.date),
          modifiedTime: article.updatedAt ?? article.publishedAt ?? toIsoDate(article.date),
          author: article.author,
        }
      : {},
  );

  if (articleQuery.isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
        <Header />
        <main className="pt-40 px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 animate-pulse">
            <div className="h-5 w-32 bg-slate-200 rounded mb-8" />
            <div className="h-8 w-4/5 bg-slate-200 rounded mb-4" />
            <div className="h-4 w-full bg-slate-100 rounded mb-2" />
            <div className="h-4 w-2/3 bg-slate-100 rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    const fallbackArticles = (articlesQuery.data ?? staticArticles).slice(0, 3);
    return (
      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Article not available</h1>
            <p className="text-[#64748B] mb-6">
              This article is not available right now. You can return to the insights library or keep reading from the saved articles below.
            </p>
            <Link href="/insights">
              <button className="rounded-xl bg-[#1E5BFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a50e0]">
                Back to Insights
              </button>
            </Link>
          </div>
          {fallbackArticles.length > 0 ? (
            <div className="max-w-3xl mx-auto mt-8 grid gap-4 sm:grid-cols-3">
              {fallbackArticles.map((item) => (
                <Link key={item.slug} href={`/insights/${item.slug}`}>
                  <div className="h-full cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand/40">
                    <p className="text-xs font-semibold text-brand">{item.category}</p>
                    <h2 className="mt-2 text-sm font-bold leading-snug text-[#0F172A]">{item.title}</h2>
                    <p className="mt-2 text-xs text-[#94A3B8]">{item.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </main>
        <Footer />
      </div>
    );
  }

  const related = (articlesQuery.data ?? staticArticles).filter((a) => a.slug !== slug && a.category === article.category).slice(0, 2);

  const headings = article.body.map((s) => s.heading);
  const ctaByCategory: Record<string, { heading: string; button: string }> = {
    "AI for Business": { heading: "Discuss an AI Workflow", button: "Discuss AI Workflow" },
    "IoT & Embedded Systems": { heading: "Discuss an IoT System", button: "Discuss IoT System" },
    "Smart Energy Monitoring": { heading: "Discuss Energy Monitoring", button: "Discuss Energy Monitoring" },
    "Robotics & STEM": { heading: "Discuss Robotics Training", button: "Discuss Robotics Training" },
    "Business Automation": { heading: "Discuss Automation", button: "Discuss Automation" },
    "Developer Tools": { heading: "Discuss Engineering Tools", button: "Discuss Developer Tools" },
  };
  const cta = ctaByCategory[article.category] ?? { heading: "Discuss a Project", button: "Discuss a Project" };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <StructuredData
        id={`article-${article.slug}`}
        data={[
          articleSchema(article),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path: `/insights/${article.slug}` },
          ]),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-14" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#475569] mb-8">
            <Link href="/insights">
              <span className="hover:text-white transition-colors cursor-pointer">Insights</span>
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#94A3B8] truncate max-w-xs">{article.title}</span>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: "#1E5BFF20", color: "#1E5BFF" }}>
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-[#64748B] text-sm">
            <span className="flex items-center gap-1.5"><Tag size={13} /> {article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Article body */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8 sm:p-10">
                <p className="text-[#475569] text-lg leading-relaxed mb-10 border-b border-slate-100 pb-8 italic">
                  {article.excerpt}
                </p>
                <div className="space-y-10">
                  {article.body.map((section, i) => (
                    <div key={i} id={`section-${i}`}>
                      <h2 className="text-xl font-bold text-[#0F172A] mb-4">{section.heading}</h2>
                      <p className="text-[#475569] leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Link href="/insights">
                  <span className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-semibold hover:gap-3 transition-all cursor-pointer text-sm">
                    <ArrowLeft size={14} /> Back to Insights
                  </span>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
              {/* Table of contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                  <h3 className="font-bold text-[#0F172A] text-sm mb-4 uppercase tracking-wide">In This Article</h3>
                  <nav className="space-y-2">
                    {headings.map((h, i) => (
                      <a
                        key={i}
                        href={`#section-${i}`}
                        className="block text-sm text-[#64748B] hover:text-brand transition-colors leading-snug py-1 border-l-2 border-transparent hover:border-brand pl-3"
                      >
                        {h}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Related articles */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                  <h3 className="font-bold text-[#0F172A] text-sm mb-4 uppercase tracking-wide">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/insights/${r.slug}`}>
                        <div className="cursor-pointer group">
                          <span className="text-xs text-brand font-semibold">{r.category}</span>
                          <p className="text-sm font-semibold text-[#0F172A] leading-snug mt-1 group-hover:text-brand transition-colors">
                            {r.title}
                          </p>
                          <span className="text-xs text-[#94A3B8] mt-1 block">{r.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl p-6" style={{ background: "#07111F" }}>
                <h3 className="font-bold text-white mb-2">{cta.heading}</h3>
                <p className="text-[#64748B] text-sm mb-5 leading-relaxed">
                  We implement practical systems like the ones described in our articles. Let's talk about your workflow, data, or deployment context.
                </p>
                <Link href="/contact">
                  <button className="w-full py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 bg-[#1E5BFF]">
                    {cta.button}
                  </button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
