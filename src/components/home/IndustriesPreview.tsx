import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const industries = [
  {
    name: "SMEs & Enterprises",
    icon: "🏢",
    color: "#1E5BFF",
    desc: "Process automation, AI Employees, workflow platforms and operational dashboards.",
  },
  {
    name: "Education & Training",
    icon: "🎓",
    color: "#00B894",
    desc: "AI tutoring platforms, learning management systems and interactive course delivery tools.",
  },
  {
    name: "Energy & Utilities",
    icon: "⚡",
    color: "#F59E0B",
    desc: "Smart monitoring, energy dashboards, IoT sensor infrastructure and consumption analysis.",
  },
  {
    name: "Manufacturing & Warehousing",
    icon: "🏭",
    color: "#00D4FF",
    desc: "Operations platforms, inventory management and real-time production monitoring.",
  },
  {
    name: "Healthcare & Facilities",
    icon: "🏥",
    color: "#EF4444",
    desc: "Asset tracking, environmental monitoring, operations dashboards and compliance tools.",
  },
  {
    name: "Retail & Commerce",
    icon: "🛒",
    color: "#8B5CF6",
    desc: "E-commerce systems, inventory tools, customer engagement platforms and analytics dashboards.",
  },
];

export default function IndustriesPreview() {
  return (
    <section id="industries" className="bg-white pt-8 pb-14 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-sm font-semibold text-brand tracking-widest uppercase mb-4">
              Industries We Serve
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-2xl">
              Built for Industries That<br />Can't Afford Downtime
            </h2>
          </div>
          <Link href="/industries">
            <span className="text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-2 mt-4 lg:mt-0 transition cursor-pointer">
              All industries <span>→</span>
            </span>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <Link key={ind.name} href="/industries">
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-7 hover:border-brand/40 hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 text-xl"
                  style={{ background: ind.color + "15" }}
                >
                  {ind.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                  {ind.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {ind.desc}
                </p>
                <span className="mt-6 text-brand text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  See use cases <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
