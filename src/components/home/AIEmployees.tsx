const aiEmployees = [
  { title: "AI Sales Employee", desc: "Captures leads, answers product questions, and follows up.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { title: "AI Receptionist", desc: "Handles enquiries, appointments and visitor questions.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /> },
  { title: "AI Customer Support Employee", desc: "Resolves common customer issues and escalates complex cases.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /> },
  { title: "AI Teacher / Tutor", desc: "Supports learners with curriculum-aligned explanations and practice.", icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></> },
  { title: "AI Social Media Handler", desc: "Drafts captions, campaign ideas and content calendars.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /> },
  { title: "AI Energy Auditor", desc: "Monitors energy data, detects anomalies and prepares reports.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
];

export default function AIEmployees() {
  return (
    <section id="ai-employees" className="gradient-dark pt-8 pb-14 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold text-brand tracking-widest uppercase mb-4">Featured Platform</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Hire AI Employees for business, education and operations.
            </h2>
            <p className="text-lg font-medium text-slate-300 mb-4">
              Role-based AI Employees with knowledge bases, workflows, escalation rules, human handoff and performance reports.
            </p>
            <p className="text-slate-400 mb-8">
              Unlike a generic chatbot, each AI Employee is configured for a role. It can answer questions, capture leads, support customers, teach learners, monitor operations and escalate to a human when needed.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#contact" className="bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-md transition text-sm">Explore AI Employees</a>
              <a href="#contact" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3 rounded-md transition text-sm">Book a Demo</a>
            </div>
            <a href="#contact" className="text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-2 transition">View Full AI Employee Catalogue <span>→</span></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiEmployees.map((w) => (
              <div key={w.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-brand/40 hover:bg-white/[0.07] transition-all group">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{w.icon}</svg>
                </div>
                <h4 className="text-white font-bold mb-2">{w.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
