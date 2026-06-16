import { Link } from "wouter";

export default function ProductsPreview() {
  return (
    <section id="products" className="bg-gradient-to-b from-slate-50 to-white pt-2 pb-14 lg:pt-4 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm font-semibold text-brand tracking-widest uppercase mb-4">Products & Platforms</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-2xl">
            Reusable platforms built from real business problems.
          </h2>
          <Link href="/products">
            <span className="text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1 mt-4 md:mt-0 transition cursor-pointer">
              View all products <span>→</span>
            </span>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <a href="#ai-employees" className="block md:col-span-2">
            <div className="bg-white border border-slate-300 shadow-md ring-1 ring-slate-200 rounded-[2rem] p-8 lg:p-10 hover:border-brand/40 hover:shadow-xl transition-all duration-300 group relative overflow-hidden cursor-pointer">
              <div className="absolute top-6 right-6 inline-flex bg-brand/5 border border-brand/10 text-brand text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-full">Featured Platform</div>
              <div className="flex flex-col md:flex-row lg:items-center gap-8 mt-4 lg:mt-0">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-brand to-cyan-500 shadow-lg shadow-brand/20 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1 max-w-3xl">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Aicore AI Employees</h3>
                  <p className="text-base text-slate-500 leading-relaxed mb-6">Hire role-based AI Employees for sales, reception, customer support, tutoring, operations and facility monitoring — powered by one shared AI agent platform.</p>
                  <span className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-6 py-3 rounded-full transition-all group/btn">
                    Explore Platform{" "}
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </a>
          <Link href="/products/aicore-growthos">
            <div className="bg-white border border-slate-300 shadow-sm ring-1 ring-slate-200 hover:border-brand/40 rounded-3xl p-8 hover:shadow-xl transition-all group duration-300 flex flex-col items-start cursor-pointer h-full">
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">AICORE GrowthOS</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">A growth platform that supports lead capture, automation, follow-up and operational reporting.</p>
              <span className="mt-auto text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1 transition group/btn">
                View Product{" "}
                <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
          <Link href="/products/throughport-wms">
            <div className="bg-white border border-slate-300 shadow-sm ring-1 ring-slate-200 hover:border-brand/40 rounded-3xl p-8 hover:shadow-xl transition-all group duration-300 flex flex-col items-start cursor-pointer h-full">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Custom Warehouse & Operations Systems</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">We design and build warehouse, inventory and operations platforms with traceability, workflow visibility, reporting dashboards and process automation.</p>
              <span className="mt-auto text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1 transition group/btn">
                Discuss Project{" "}
                <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
          <Link href="/products/iot-monitoring-platform">
            <div className="bg-white border border-slate-300 shadow-sm ring-1 ring-slate-200 hover:border-brand/40 rounded-3xl p-8 hover:shadow-xl transition-all group duration-300 flex flex-col items-start cursor-pointer h-full">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">IoT Monitoring Platform</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">Collect device data, monitor assets, trigger alerts and visualize conditions across locations.</p>
              <span className="mt-auto text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1 transition group/btn">
                View Product{" "}
                <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
          <Link href="/products/smart-energy-monitoring-platform">
            <div className="bg-white border border-slate-300 shadow-sm ring-1 ring-slate-200 hover:border-brand/40 rounded-3xl p-8 hover:shadow-xl transition-all group duration-300 flex flex-col items-start cursor-pointer h-full">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Smart Energy Platform</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">Monitor power systems, consumption, solar assets and electrical infrastructure.</p>
              <span className="mt-auto text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1 transition group/btn">
                View Product{" "}
                <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
