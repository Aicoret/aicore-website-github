import { Link } from "wouter";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { caseStudies } from "@/lib/data";
import { usePageMeta } from "@/lib/use-page-meta";

export default function CaseStudies() {
  usePageMeta(
    "Case Studies — Real Results from AICORE Projects",
    "Explore AICORE Technologies case studies — real-world deployments of AI, IoT, automation, and embedded systems delivering measurable results for clients.",
    "/case-studies",
  );

  const published = caseStudies.filter((c) => c.status === "published");
  const coming = caseStudies.filter((c) => c.status === "coming-soon");

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Case Studies</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Real Projects. Measurable Results.
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
            Every engagement starts with a specific challenge. These are the outcomes we achieved for clients across manufacturing, logistics, energy, and education.
          </p>
        </div>
      </section>

      {/* Case study cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {published.map((cs) => (
              <div
                key={cs.slug}
                className="bg-white rounded-2xl border border-slate-300 shadow-sm p-7 hover:border-brand/40 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold text-[#1E5BFF] bg-[#1E5BFF]/8">
                    {cs.industry}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                    <Clock size={12} /> {cs.duration}
                  </span>
                </div>

                <h3 className="font-bold text-[#0F172A] text-lg leading-snug mb-3">{cs.client}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                  {cs.challenge}
                </p>

                {/* Key outcome highlight */}
                {cs.outcome[0] && (
                  <div className="flex items-start gap-2 bg-[#00B894]/8 rounded-xl px-4 py-3 mb-5">
                    <TrendingUp size={16} className="text-[#00B894] flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-[#00B894]">{cs.outcome[0]}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cs.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md text-xs text-[#475569] bg-slate-100 border border-slate-200">
                      {t}
                    </span>
                  ))}
                  {cs.technologies.length > 4 && (
                    <span className="px-2 py-1 rounded-md text-xs text-[#94A3B8] bg-slate-100 border border-slate-200">
                      +{cs.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <Link href={`/case-studies/${cs.slug}`}>
                  <button className="w-full py-2.5 rounded-xl border border-[#1E5BFF]/30 text-[#1E5BFF] text-sm font-semibold hover:bg-[#1E5BFF] hover:text-white transition-all flex items-center justify-center gap-2 group">
                    Read Case Study <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </div>
            ))}

            {/* Coming soon cards */}
            {coming.map((cs) => (
              <div
                key={cs.slug}
                className="bg-white rounded-2xl border border-slate-300 shadow-sm p-7 opacity-60 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold text-[#94A3B8] bg-slate-100">
                    {cs.industry}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-[#475569] bg-slate-100">
                    Coming Soon
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg mb-3">New Case Study</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed flex-1">
                  A detailed case study for this engagement is being prepared and will be published shortly.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Want results like these?</h2>
          <p className="text-[#64748B] mb-6 text-sm leading-relaxed">
            Every case study started with a conversation. Tell us your challenge and we'll outline what's possible.
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all text-sm">
              Start a Conversation
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
