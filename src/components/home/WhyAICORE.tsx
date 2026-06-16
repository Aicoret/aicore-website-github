export default function WhyAICORE() {
  return (
    <section id="about" className="bg-gradient-to-b from-slate-50 to-white pt-8 pb-14 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-semibold text-brand tracking-widest uppercase mb-4">Why AICORE</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-10">
              We combine software, AI, embedded systems, automation, and business thinking in one team.
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-slate-300 bg-white p-4 -m-4 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md cursor-default">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" /><path d="M9 12h6" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Cross-domain technical delivery</h3>
                <p className="text-sm text-slate-500">AI, software, firmware, embedded, IoT, robotics, cloud and mobile.</p>
              </div>
              <div className="rounded-2xl border border-slate-300 bg-white p-4 -m-4 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md cursor-default">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">AI Employee Strategy</h3>
                <p className="text-sm text-slate-500">We design role-based AI Employees, not generic chatbots — each with its own knowledge base and workflows.</p>
              </div>
              <div className="rounded-2xl border border-slate-300 bg-white p-4 -m-4 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md cursor-default">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">AI + physical world</h3>
                <p className="text-sm text-slate-500">Connecting AI to sensors, machines, workflows and dashboards.</p>
              </div>
              <div className="rounded-2xl border border-slate-300 bg-white p-4 -m-4 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md cursor-default">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Product-minded delivery</h3>
                <p className="text-sm text-slate-500">Platforms, reusable systems and long-term value, not throwaway code.</p>
              </div>
            </div>
            <div className="mt-12">
              <a href="/solutions" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-md transition text-sm">
                See What We Build <span>→</span>
              </a>
            </div>
          </div>
          <div id="academy" className="bg-slate-50 border border-slate-300 shadow-sm rounded-2xl p-8">
            <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">AICORE Academy</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">Our technical training platform for AI, automation, embedded systems, software and intelligent systems. Separate from Aicore AI Teacher, but aligned with our education mission.</p>
            <a href="/academy" className="bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-md transition text-sm inline-block">Explore Academy</a>
          </div>
        </div>
      </div>
    </section>
  );
}
