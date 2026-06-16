import { Link } from "wouter";

const cards = [
  {
    href: "/solutions/ai-systems-and-tools",
    label: "Explore AI Employees →",
    title: "AI Employee Platforms",
    desc: "Role-based AI Employees that answer enquiries, capture leads, support customers, teach learners, prepare reports, and escalate to humans.",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: "/solutions/ai-systems-and-tools",
    label: "View AI Solutions →",
    title: "AI Assistants & Agentic Workflows",
    desc: "AI assistants, copilots, classifiers, knowledge systems and decision-support tools built around real business workflows.",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/solutions/process-and-business-automation",
    label: "See Automation Services →",
    title: "Business Process Automation",
    desc: "Automation for approvals, reports, notifications, task routing and operational workflows that reduce manual work.",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    href: "/solutions/web-mobile-saas-platforms",
    label: "Explore Platforms →",
    title: "Web, Mobile & SaaS Platforms",
    desc: "Custom SaaS platforms, web applications, mobile apps, dashboards, customer portals and admin tools for business operations.",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/solutions/embedded-iot-edge-ai",
    label: "View IoT Solutions →",
    title: "IoT, Embedded & Edge AI Systems",
    desc: "Sensor-based systems, smart meters, monitoring devices and edge-connected platforms for real-world operations.",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    href: "/solutions/robotics-intelligent-hardware",
    label: "See Robotics Work →",
    title: "Robotics & Intelligent Hardware Systems",
    desc: "Physical systems that combine hardware, software and AI to automate real-world operations and industrial tasks.",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
];

export default function SolutionsPreview() {
  return (
    <section id="solutions" className="bg-gradient-to-b from-white to-slate-50 py-14 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-sm font-semibold text-brand tracking-widest uppercase mb-4">What We Do</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl mb-4">
              Intelligent systems across the stack — from sensor to dashboard.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              We help organisations design and deploy intelligent systems across software, AI, automation, embedded devices, cloud platforms, web and mobile applications.
            </p>
          </div>
          <Link href="/solutions">
            <span className="text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-2 mt-4 lg:mt-0 transition cursor-pointer">
              View all solutions <span>→</span>
            </span>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="block bg-white border border-slate-300 shadow-sm rounded-2xl p-7 hover:shadow-lg hover:border-brand/40 transition group cursor-pointer"
            >
              <div className="w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{card.desc}</p>
              <span className="text-sm font-semibold text-brand group-hover:text-brand-hover inline-flex items-center gap-1 transition">
                {card.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
