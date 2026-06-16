import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { caseStudies } from "@/lib/data";

export function CaseStudyHighlights() {
  const featured = caseStudies.slice(0, 3);

  return (
    <section className="py-24 bg-white" data-testid="case-study-highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[#1E5BFF] text-xs font-bold tracking-widest uppercase mb-3">Case Studies</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
                Real Problems,<br />Working Solutions
              </h2>
            </div>
            <Link href="/case-studies">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:border-[#1E5BFF]/40 hover:text-[#1E5BFF] transition-all whitespace-nowrap">
                View All Case Studies <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 90}>
              <Link href={`/case-studies/${cs.slug}`}>
                <div
                  className="rounded-2xl border border-slate-300 shadow-sm p-6 hover:border-brand/40 hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col"
                  data-testid={`card-case-study-${cs.slug}`}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: "#1E5BFF15", color: "#1E5BFF" }}
                    >
                      {cs.industry}
                    </span>
                    <span className="text-xs text-[#94A3B8]">{cs.duration}</span>
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug mb-3">{cs.client}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed flex-1 mb-5">{cs.challenge.slice(0, 120)}…</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {cs.outcome.slice(0, 2).map((o) => (
                      <span key={o} className="text-xs text-[#00B894] font-medium px-2 py-0.5 rounded bg-[#00B894]/10">
                        ✓ {o}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#1E5BFF] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Read Case Study <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
