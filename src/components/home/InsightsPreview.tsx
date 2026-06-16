import { Link } from "wouter";

export default function InsightsPreview() {
  return (
    <section id="insights" className="bg-white pt-2 pb-14 lg:pt-4 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
          <div>
            <p className="text-sm font-semibold text-brand tracking-widest uppercase mb-4">Insights & Technical Notes</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 leading-tight tracking-tight max-w-4xl">
              Technical Insights from the Field.
            </h2>
          </div>
          <Link href="/insights">
            <span className="text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-2 mt-4 lg:mt-0 transition cursor-pointer">
              Read all insights <span>→</span>
            </span>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/insights/5-processes-smes-should-automate-first">
            <div className="bg-white border border-slate-300 shadow-sm rounded-2xl p-7 hover:border-brand/40 hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">AI for Business</p>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex-1">How AI Employees can support SMEs</h3>
              <span className="text-sm font-semibold text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <span>→</span>
              </span>
            </div>
          </Link>

          <Link href="/insights/sensor-to-dashboard-iot-stack">
            <div className="bg-white border border-slate-300 shadow-sm rounded-2xl p-7 hover:border-brand/40 hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">AI, IoT & Embedded Systems</p>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex-1">Building AI systems that connect software, IoT and dashboards</h3>
              <span className="text-sm font-semibold text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <span>→</span>
              </span>
            </div>
          </Link>

          <Link href="/insights/solar-monitoring-critical-metrics">
            <div className="bg-white border border-slate-300 shadow-sm rounded-2xl p-7 hover:border-brand/40 hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">Smart Energy Monitoring</p>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex-1">Why Most Solar Monitoring Systems Miss the Critical Metrics</h3>
              <span className="text-sm font-semibold text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <span>→</span>
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
