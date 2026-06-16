const steps = [
  { num: "01", title: "Discover", desc: "Understand workflows, problems, users, and business opportunities." },
  { num: "02", title: "Design", desc: "Define the system, data flow, user experience, and integrations." },
  { num: "03", title: "Build & Connect", desc: "Develop the platform, AI tools, dashboards, and device connections." },
  { num: "04", title: "Deploy & Improve", desc: "Launch securely, onboard users, and improve with real usage data." },
];

export default function EngineeringProcess() {
  return (
    <section id="process" className="gradient-dark-reverse py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm font-semibold text-brand tracking-widest uppercase mb-3 text-center">Our Process</p>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-white leading-tight tracking-tight text-center max-w-4xl mx-auto mb-10">
          From idea to launch — with support beyond go-live.
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="grid gap-4 xl:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="relative rounded-xl border border-white/10 bg-[#07111F]/60 px-5 py-5 cursor-default xl:border-0 xl:bg-transparent">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand/15 text-sm font-extrabold text-brand">{step.num}</span>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
              </div>
              <p className="text-sm text-slate-300/90 leading-relaxed">{step.desc}</p>
              {step.num !== "04" ? (
                <span className="absolute right-[-0.5rem] top-10 hidden h-px w-4 bg-brand/40 xl:block" />
              ) : null}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
