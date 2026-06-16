import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ArticleCoverPlaceholder } from "@/components/article/article-cover-placeholder";
import { NewsletterWidget } from "@/components/newsletter-widget";
import { staticArticles, useArticles } from "@/lib/articles";
import { usePageMeta } from "@/lib/use-page-meta";

export default function Insights() {
  usePageMeta(
    "Insights — Technical Articles from AICORE",
    "Practical technical articles on AI for business, IoT, embedded systems, robotics, automation, and smart energy from the AICORE technical team.",
    "/insights",
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const articlesQuery = useArticles();
  const allInsights = articlesQuery.data ?? staticArticles;
  const allCategories = ["All", ...Array.from(new Set(allInsights.map((article) => article.category)))];

  const filtered = activeCategory === "All"
    ? allInsights
    : allInsights.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Insights</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Technical Insights from the Field
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
            Practical thinking on AI systems, embedded development, IoT, automation, and intelligent system design — written by the team that builds them.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="no-scrollbar -mx-4 mb-10 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
            {allCategories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-insight-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#1E5BFF] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-[#1E5BFF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          </div>

          {articlesQuery.isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading articles">
              {[0, 1, 2].map((item) => (
                <div key={item} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 min-h-56 animate-pulse">
                  <div className="h-4 w-24 bg-slate-200 rounded mb-8" />
                  <div className="h-5 w-4/5 bg-slate-200 rounded mb-4" />
                  <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`}>
                  <div
                  className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden hover:border-brand/40 hover:shadow-md transition-all group cursor-pointer flex flex-col h-full"
                  data-testid={`card-article-${article.title.substring(0, 20).toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <ArticleCoverPlaceholder category={article.category} />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold mb-4 text-[#1E5BFF] bg-[#1E5BFF]/8 self-start">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-[#0F172A] leading-snug mb-3 flex-1">{article.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 bg-slate-50 px-6 py-4">
                    <span className="text-[#94A3B8] text-xs">{article.readTime}</span>
                    <span className="text-brand group-hover:text-brand-hover text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ArrowRight size={12} className="shrink-0" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">No articles available</h2>
              <p className="text-[#64748B] text-sm">Published website articles will appear here once GrowthOS content is released.</p>
            </div>
          )}
          {articlesQuery.isError ? (
            <p className="mt-6 text-sm text-[#64748B]">Showing saved website articles while the publishing API is unavailable.</p>
          ) : null}
        </div>
      </section>

      {/* Newsletter-style CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Stay Updated</h2>
          <p className="text-[#64748B] mb-6 text-sm">New technical articles published regularly on AI, automation, IoT, and intelligent systems.</p>
          <div className="max-w-md mx-auto">
            <NewsletterWidget />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
