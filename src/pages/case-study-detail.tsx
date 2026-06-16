import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle, Clock, ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { StructuredData } from "@/components/structured-data";
import { caseStudies } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);

  usePageMeta(
    cs ? `Case Study: ${cs.client}` : "Case Study",
    cs ? `How AICORE helped a ${cs.industry} client: ${cs.challenge.slice(0, 120)}...` : "AICORE Technologies case studies.",
    cs ? `/case-studies/${cs.slug}` : "/case-studies",
    { noindex: cs?.status === "coming-soon" },
  );

  if (!cs) {
    return (
      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
        <Header />
        <div className="pt-40 text-center px-4">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Case study not found</h1>
          <Link href="/case-studies">
            <button className="text-[#1E5BFF] font-semibold hover:underline">Back to Case Studies</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (cs.status === "coming-soon") {
    return (
      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
        <Header />
        <div className="pt-40 text-center px-4">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Coming Soon</h1>
          <p className="text-[#64748B] mb-6">This case study is being prepared and will be published shortly.</p>
          <Link href="/case-studies">
            <button className="text-[#1E5BFF] font-semibold hover:underline">Back to Case Studies</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = caseStudies.filter((c) => c.slug !== slug && c.status === "published" && c.industry === cs.industry).slice(0, 1);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <StructuredData
        id={`case-study-${cs.slug}`}
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: cs.client, path: `/case-studies/${cs.slug}` },
        ])}
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-14" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#475569] mb-8">
            <Link href="/case-studies">
              <span className="hover:text-white transition-colors cursor-pointer">Case Studies</span>
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#94A3B8] truncate max-w-xs">{cs.client}</span>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 text-[#00B894] bg-[#00B894]/15">
            {cs.industry}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 max-w-3xl leading-tight">
            {cs.client}
          </h1>
          <div className="flex items-center gap-2 text-[#64748B] text-sm">
            <Clock size={13} />
            <span>Project duration: {cs.duration}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main narrative */}
            <div className="lg:col-span-2 space-y-8">
              {/* Challenge */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 rounded-full bg-[#FF4444]" />
                  <h2 className="text-lg font-bold text-[#0F172A]">The Challenge</h2>
                </div>
                <p className="text-[#475569] leading-relaxed">{cs.challenge}</p>
              </div>

              {/* Solution */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 rounded-full bg-[#1E5BFF]" />
                  <h2 className="text-lg font-bold text-[#0F172A]">The Solution</h2>
                </div>
                <p className="text-[#475569] leading-relaxed">{cs.solution}</p>
              </div>

              {/* Outcomes */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-6 rounded-full bg-[#00B894]" />
                  <h2 className="text-lg font-bold text-[#0F172A]">The Outcomes</h2>
                </div>
                <div className="space-y-3">
                  {cs.outcome.map((o, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#00B894]/5 border border-[#00B894]/15">
                      <CheckCircle size={16} className="text-[#00B894] flex-shrink-0 mt-0.5" />
                      <span className="text-[#0F172A] text-sm font-medium leading-relaxed">{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <h2 className="text-lg font-bold text-[#0F172A] mb-5">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {cs.technologies.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/case-studies">
                <span className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-semibold cursor-pointer text-sm hover:gap-3 transition-all">
                  <ArrowLeft size={14} /> All Case Studies
                </span>
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project info */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] text-sm mb-4 uppercase tracking-wide">Project Info</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Industry</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{cs.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Duration</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{cs.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Client</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{cs.client}</p>
                  </div>
                </div>
              </div>

              {/* Key result */}
              {cs.outcome[0] && (
                <div className="rounded-2xl p-6" style={{ background: "#00B894" }}>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-2">Key Result</p>
                  <p className="text-white font-bold text-lg leading-snug">{cs.outcome[0]}</p>
                </div>
              )}

              {/* Related */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                  <h3 className="font-bold text-[#0F172A] text-sm mb-4 uppercase tracking-wide">Related Case Study</h3>
                  {related.map((r) => (
                    <Link key={r.slug} href={`/case-studies/${r.slug}`}>
                      <div className="cursor-pointer group">
                        <span className="text-xs text-[#1E5BFF] font-semibold">{r.industry}</span>
                        <p className="text-sm font-semibold text-[#0F172A] leading-snug mt-1 group-hover:text-[#1E5BFF] transition-colors">
                          {r.client}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl p-6" style={{ background: "#07111F" }}>
                <h3 className="font-bold text-white mb-2">Similar challenge?</h3>
                <p className="text-[#64748B] text-sm mb-5 leading-relaxed">
                  We'd be glad to discuss what a similar engagement could deliver for your business.
                </p>
                <Link href="/contact">
                  <button className="w-full py-2.5 rounded-xl font-semibold text-white text-sm bg-[#1E5BFF] hover:opacity-90 transition-all">
                    Discuss Your Project
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
