import { Link, useParams } from "wouter";
import { Brain, GitBranch, Layers, Cpu, Bot, Terminal, Smartphone, GraduationCap, CheckCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FAQSection } from "@/components/faq-section";
import { StructuredData } from "@/components/structured-data";
import { SolutionDiagramPlaceholder } from "@/components/solution/solution-diagram-placeholder";
import { solutions } from "@/lib/data";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Brain, GitBranch, Layers, Cpu, Bot, Terminal, Smartphone, GraduationCap,
};

const integrationAnswers: Record<string, string> = {
  "ai-systems-and-tools": "Yes. We connect AI assistants and extraction tools to your documents, databases, CRMs, ticketing tools, and approval workflows with human review where needed.",
  "process-and-business-automation": "Yes. We connect CRMs, ERPs, spreadsheets, email, forms, databases, and custom APIs into workflows with audit trails and exception handling.",
  "intelligent-platforms-and-saas": "Yes. SaaS builds can integrate authentication, payments, analytics, admin panels, third-party APIs, and existing operational databases.",
  "embedded-iot-edge-ai": "Yes. We integrate sensors, gateways, MQTT brokers, Modbus devices, time-series stores, alerts, dashboards, and external APIs.",
  "robotics-intelligent-hardware": "Yes. Robotics work can connect sensors, controllers, actuators, vision systems, firmware, and operator dashboards.",
  "developer-tools-engineering-utilities": "Yes. Developer tools can plug into firmware repositories, CI pipelines, serial devices, test rigs, logs, and reporting tools.",
  "mobile-cross-platform-applications": "Yes. Mobile apps can connect to backend APIs, offline stores, push notifications, IoT devices, and admin dashboards.",
  "aicore-academy": "Yes. Academy programmes can be tailored around your existing curriculum, staff capability, lab equipment, and organisational goals.",
};

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const s = solutions.find((x) => x.slug === slug);

  usePageMeta(
    s ? s.title : "Solution",
    s ? s.description : "Explore AICORE Technologies technical solutions.",
    s ? `/solutions/${s.slug}` : "/solutions",
  );

  if (!s) {
    return (
      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
        <Header />
        <div className="pt-40 text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Solution not found</h1>
          <Link href="/solutions"><button className="text-[#1E5BFF] font-semibold">Back to Solutions</button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[s.icon];
  const faqs = [
    {
      question: `What does ${s.title} include?`,
      answer: s.description,
    },
    {
      question: "How does AICORE scope this kind of project?",
      answer: "We start with discovery, define the users and data flows, map integrations, identify delivery risks, and then propose a phased build plan with clear milestones.",
    },
    {
      question: "Can this integrate with our existing systems?",
      answer: integrationAnswers[s.slug] ?? "Yes. AICORE designs solutions around existing tools, APIs, databases, devices, and operational workflows wherever possible.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <StructuredData
        id={`solution-${s.slug}`}
        data={[
          serviceSchema(s),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: s.title, path: `/solutions/${s.slug}` },
          ]),
          faqPageSchema(faqs),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions">
            <span className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-white text-sm mb-8 cursor-pointer transition-colors">
              <ArrowLeft size={14} /> Back to Solutions
            </span>
          </Link>
          <div className="flex items-start gap-5 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "20", border: `1px solid ${s.color}40` }}>
              {Icon && <Icon size={26} style={{ color: s.color }} />}
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ background: s.color + "20", color: s.color }}>
                {s.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{s.title}</h1>
            </div>
          </div>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">{s.detail}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              <SolutionDiagramPlaceholder slug={s.slug} color={s.color} />

              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">What This Covers</h2>
                <div className="space-y-3">
                  {s.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: s.color }} />
                      <span className="text-[#475569] text-sm leading-relaxed">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">Technologies We Use</h2>
                <div className="flex flex-wrap gap-2">
                  {s.technologies.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-4">Use Cases</h3>
                <div className="space-y-2">
                  {s.useCases.map((uc) => (
                    <div key={uc} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-[#475569] text-sm">{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "#07111F" }}>
                <h3 className="font-bold text-white mb-3">Ready to Build?</h3>
                <p className="text-[#64748B] text-sm mb-5">Tell us about your project and we'll recommend the right approach.</p>
                <Link href="/contact">
                  <button className="w-full py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90" style={{ background: s.color }}>
                    {s.cta}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} />

      <Footer />
    </div>
  );
}
