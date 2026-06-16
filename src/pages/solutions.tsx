import { Link } from "wouter";
import { Brain, GitBranch, Layers, Cpu, Bot, Terminal, Smartphone, GraduationCap, ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FAQSection } from "@/components/faq-section";
import { StructuredData } from "@/components/structured-data";
import { solutions } from "@/lib/data";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Brain, GitBranch, Layers, Cpu, Bot, Terminal, Smartphone, GraduationCap,
};

const proofLines: Record<string, string> = {
  "ai-systems-and-tools": "Example: document intelligence, AI assistants, and data extraction workflows.",
  "process-and-business-automation": "Example: approval chains, lead follow-up, internal handoffs, and reporting loops.",
  "intelligent-platforms-and-saas": "Example: GrowthOS, WMS, dashboards, portals, and operating platforms.",
  "embedded-iot-edge-ai": "Example: sensor-to-dashboard systems with MQTT, Modbus, and time-series data.",
  "robotics-intelligent-hardware": "Example: STEM robotics kits, control systems, and hardware training labs.",
  "developer-tools-engineering-utilities": "Example: HIL test rigs, protocol analyzers, and firmware CI utilities.",
  "mobile-cross-platform-applications": "Example: field apps, inspection tools, IoT companions, and offline workflows.",
  "aicore-academy": "Example: practical bootcamps, school labs, corporate training, and project-based learning.",
};

const solutionFaqs = [
  {
    question: "Which AICORE solution should we start with?",
    answer: "Start with the highest-friction workflow or system constraint. AICORE can assess your process, data, devices, and users, then recommend whether AI, automation, IoT, SaaS, mobile, or embedded systems is the right first step.",
  },
  {
    question: "Can AICORE combine multiple service areas in one project?",
    answer: "Yes. Many projects combine software, AI, automation, embedded devices, dashboards, and mobile apps. AICORE is built for complete intelligent system delivery rather than isolated single-discipline work.",
  },
  {
    question: "Do you build MVPs or production systems?",
    answer: "We build both. We can validate an MVP quickly, then harden it into a secure, maintainable production system with deployment, monitoring, documentation, and support.",
  },
  {
    question: "Can you work with an existing team or system?",
    answer: "Yes. AICORE can extend existing platforms, integrate with current tools, modernise legacy workflows, or co-build alongside your internal technical team.",
  },
];

export default function Solutions() {
  usePageMeta(
    "Solutions — Eight Service Areas",
    "Explore AICORE's eight solution pillars: AI systems, process automation, IoT, embedded firmware, robotics, SaaS platforms, mobile apps, and developer tools.",
    "/solutions",
  );
  const deliverySolutions = solutions.filter((s) => s.slug !== "aicore-academy");
  const academySolution = solutions.find((s) => s.slug === "aicore-academy");

  const renderSolutionCard = (s: (typeof solutions)[number]) => {
    const Icon = iconMap[s.icon];
    return (
      <div
        key={s.slug}
        className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8 hover:border-brand/40 hover:shadow-lg transition-all group"
        data-testid={`card-solution-${s.slug}`}
      >
        <div className="flex items-start gap-5 mb-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18" }}>
            {Icon && <Icon size={24} style={{ color: s.color }} />}
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold mb-2" style={{ background: s.color + "15", color: s.color }}>
              {s.badge}
            </span>
            <h2 className="font-bold text-[#0F172A] text-xl">{s.title}</h2>
          </div>
        </div>
        <p className="text-[#64748B] leading-relaxed mb-4">{s.description}</p>
        <p className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-[#475569]">
          <span className="font-semibold text-[#0F172A]">Proof shape: </span>{proofLines[s.slug]}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {s.useCases.map((uc) => (
            <span key={uc} className="px-3 py-1 rounded-lg text-sm text-slate-600 bg-slate-100 border border-slate-200">{uc}</span>
          ))}
        </div>
        <Link href={`/solutions/${s.slug}`}>
          <span
            data-testid={`btn-solution-learn-more-${s.slug}`}
            className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
            style={{ background: s.color }}
          >
            {s.cta} <ChevronRight size={14} className="inline ml-1" />
          </span>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <StructuredData
        id="solutions"
        data={[
          ...solutions.map(serviceSchema),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
          faqPageSchema(solutionFaqs),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Solutions</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Eight Service Areas, One Intelligent Partner
            </h1>
            <p className="text-[#64748B] text-lg leading-relaxed max-w-2xl">
              From AI systems to embedded firmware — we cover the full technical spectrum of intelligent system building. Each discipline is a complete capability, not a checkbox.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Engineering services</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {deliverySolutions.map(renderSolutionCard)}
            </div>
          </div>

          {academySolution ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-4 sm:p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Training & Capability Building</p>
              <div className="grid lg:grid-cols-[1fr_0.7fr] gap-4 items-stretch">
                {renderSolutionCard(academySolution)}
                <div className="rounded-2xl border border-amber-200 bg-white p-6">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">Training is framed separately from delivery work.</h3>
                  <p className="text-sm leading-relaxed text-[#64748B]">
                    AICORE Academy supports schools, corporate teams, and technical learners with practical labs. It complements the engineering services without diluting them.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          </div>
      </section>

      <div className="border-t border-slate-200" />
      <FAQSection items={solutionFaqs} />

      {/* CTA */}
      <section className="py-20" style={{ background: "#07111F" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Solution Fits?</h2>
          <p className="text-[#64748B] mb-8">Tell us about the workflow, system, or operational constraint you want to improve.</p>
          <Link href="/contact">
            <span className="inline-block px-7 py-3.5 rounded-xl font-semibold text-white cursor-pointer hover:opacity-90 transition-all" style={{ background: "#1E5BFF" }}>
              Discuss Your Use Case
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
