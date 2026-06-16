import { Link } from "wouter";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/lib/use-page-meta";

const capabilities = [
  "Custom AI systems, LLM integrations, and intelligent workflow tools",
  "Business process and workflow automation platforms",
  "SaaS platforms and multi-tenant software products",
  "Embedded firmware and microcontroller development",
  "IoT gateways, sensor networks, and cloud-connected device systems",
  "Edge AI and on-device machine learning",
  "Robotics, control systems, and intelligent hardware",
  "Smart energy monitoring and analytics platforms",
  "Warehouse management and logistics tracking systems",
  "Developer tools, firmware test rigs, and engineering utilities",
  "Mobile and cross-platform applications",
  "Technical training through AICORE Academy",
];

const differentiators = [
  { title: "Full-Stack Technical Depth", desc: "We work across software, AI, firmware, hardware, and operations — not just one layer of the stack." },
  { title: "System-First Thinking", desc: "We map the complete system before writing code — data flow, integrations, rollout, and support are planned together." },
  { title: "Honest Delivery", desc: "We scope clearly, communicate status accurately, and label every product with its true readiness level." },
  { title: "Domain-Specific Solutions", desc: "We don't sell generic tools. We understand your industry, your operations, and your constraints." },
  { title: "Training Capability", desc: "Through AICORE Academy, we can upskill your team to operate and extend the systems we build together." },
  { title: "Practical Build Mindset", desc: "We build systems that work in the real world — not in controlled demos. Reliability and operational fit come first." },
];

const engineeringLayers = [
  { label: "AI Layer",                desc: "LLMs, prediction models, language tools, document intelligence",               color: "#00D4FF" },
  { label: "Backend Systems",         desc: "APIs, databases, microservices, authentication, business logic",               color: "#1E5BFF" },
  { label: "Automation Workflows",    desc: "Process automation, triggers, approval chains, integrations",                  color: "#00B894" },
  { label: "Dashboards & Mobile Apps", desc: "Real-time web dashboards, cross-platform mobile, analytics UIs",             color: "#1E5BFF" },
  { label: "Embedded Devices & IoT",  desc: "Firmware, sensors, gateways, edge compute, device fleets",                    color: "#00D4FF" },
  { label: "Data, Alerts & Reports",  desc: "Time-series storage, event alerts, automated reporting, insights",             color: "#00B894" },
];

const process = [
  { n: "01", title: "Understand", desc: "Map the workflow, users, devices, and business goal" },
  { n: "02", title: "Design",     desc: "Map the system — software, AI, hardware, integrations" },
  { n: "03", title: "Build",      desc: "Develop a working prototype or MVP with real components" },
  { n: "04", title: "Integrate",  desc: "Connect AI, backend, automation, dashboards, and hardware" },
  { n: "05", title: "Deploy",     desc: "Go live, train your team, monitor, and continuously improve" },
];

export default function About() {
  usePageMeta(
    "About AICORE Technologies",
    "Learn about AICORE Technologies — our mission to build practical intelligent systems, our eight service areas, and what makes us different.",
    "/about",
  );
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">About AICORE</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              We Build Practical Intelligent Systems
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed">
              AICORE Technologies Limited is an AI, automation, and connected systems company. We help businesses, institutions, and innovators transform manual operations, disconnected tools, physical devices, and technical ideas into intelligent systems that work.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Our Mission</h2>
              <p className="text-[#475569] text-lg leading-relaxed mb-6">
                We believe that the gap between what technology can do and what most organisations are actually using is enormous — and we exist to close that gap.
              </p>
              <p className="text-[#475569] leading-relaxed mb-6">
                Most businesses are still running on spreadsheets, manual approvals, disconnected data, and siloed devices. Most factories have sensors with no dashboards. Most schools teach theory without hardware. Most energy operators have no visibility into their assets.
              </p>
              <p className="text-[#475569] leading-relaxed">
                AICORE builds the systems, platforms, and tools that change this — connecting AI, software, firmware, IoT, and automation into intelligent systems that operators and managers can actually use.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { value: "8",    label: "Service areas",        sub: "AI, Automation, SaaS, IoT, Robotics, Dev Tools, Mobile, Training", bg: "#07111F", valueColor: "#00D4FF", textColor: "white",      subColor: "#64748B", border: "none" },
                { value: "12+",  label: "Active platforms and products",  sub: "Built and actively maintained by the AICORE team",                  bg: "white",   valueColor: "#1E5BFF", textColor: "#0F172A",   subColor: "#64748B", border: "1px solid #E2E8F0" },
                { value: "14+",  label: "Industries served",              sub: "From energy and logistics to healthcare and education",              bg: "white", valueColor: "#00D4FF", textColor: "#0F172A", subColor: "#64748B", border: "1px solid #E2E8F0" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl" style={{ background: stat.bg, border: stat.border ?? "none" }}>
                  <p className="text-4xl font-bold mb-1" style={{ color: stat.valueColor }}>{stat.value}</p>
                  <p className="font-semibold mb-1" style={{ color: stat.textColor }}>{stat.label}</p>
                  <p className="text-sm" style={{ color: stat.subColor }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What AICORE Builds (moved from homepage) ─────────────── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">What AICORE Builds</h2>
              <p className="text-[#64748B] text-lg leading-relaxed mb-10">
                A complete set of services for building intelligent systems — from AI tools to physical hardware.
              </p>
              <div className="space-y-3">
                {capabilities.map((cap) => (
                  <div key={cap} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
                    <CheckCircle size={16} className="text-[#1E5BFF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#475569] text-sm leading-relaxed">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering stack (moved from homepage) */}
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">The Full System Stack</h2>
              <p className="text-[#64748B] text-lg leading-relaxed mb-10">
                Software, AI, hardware, and operations — every layer connected into working systems.
              </p>
              <div className="relative">
                {engineeringLayers.map((layer, idx, arr) => (
                  <div key={layer.label} className="flex items-stretch">
                    <div className="flex flex-col items-center mr-5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                        style={{ borderColor: layer.color, background: layer.color + "20" }}
                      >
                        <span className="text-xs font-bold" style={{ color: layer.color }}>{idx + 1}</span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-px flex-1 my-1" style={{ background: `linear-gradient(${layer.color}, ${arr[idx + 1].color})`, opacity: 0.4 }} />
                      )}
                    </div>
                    <div className="flex-1 pb-5">
                      <div
                        className="p-4 rounded-xl border shadow-sm"
                        style={{ background: "rgba(255,255,255,0.95)", borderColor: layer.color + "30" }}
                      >
                        <h3 className="font-bold text-sm mb-1" style={{ color: layer.color }}>{layer.label}</h3>
                        <p className="text-[#64748B] text-sm">{layer.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How AICORE Works (moved from homepage) ───────────────── */}
      <section className="py-20 bg-white" data-testid="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#1E5BFF] text-sm font-semibold tracking-widest uppercase mb-3">Process</p>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">From Idea to Deployed System</h2>
            <p className="text-[#64748B] text-lg max-w-xl mx-auto">
              A structured process from understanding your business goal to deploying a working intelligent system.
            </p>
          </div>

          {/* Desktop horizontal */}
          <div className="hidden lg:block relative">
            <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#1E5BFF] via-[#00D4FF] to-[#00B894]" />
            <div className="grid grid-cols-5 gap-4">
              {process.map((step, i) => (
                <div key={step.n} className="pt-16 text-center" data-testid={`step-${i + 1}`}>
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-[#1E5BFF] bg-white flex items-center justify-center relative z-10">
                      <span className="text-[#1E5BFF] font-bold text-lg">{step.n}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2">{step.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-4">
            {process.map((step) => (
              <div key={step.n} className="flex gap-4 p-5 rounded-xl border border-slate-300 bg-white shadow-sm">
                <div className="w-12 h-12 rounded-full border-2 border-[#1E5BFF] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1E5BFF] font-bold text-sm">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-1">{step.title}</h3>
                  <p className="text-[#64748B] text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why AICORE ───────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Why AICORE</h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              How AICORE architects, builds, and deploys intelligent systems differently.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-slate-300 bg-white shadow-sm hover:border-brand/40 hover:shadow-md transition-all">
                <div className="w-8 h-1 rounded-full bg-[#1E5BFF] mb-5" />
                <h3 className="font-bold text-[#0F172A] mb-3">{item.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Something Together?</h2>
          <p className="text-[#64748B] mb-8 text-lg">Tell us what you want to automate, monitor, connect, or improve. We'll design the right approach.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <span
                data-testid="btn-about-start-project"
                className="inline-flex min-h-14 items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-white bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all cursor-pointer"
              >
                Start a Project
              </span>
            </Link>
            <Link href="/solutions">
              <span className="inline-flex min-h-14 items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white border border-white/15 hover:border-white/30 transition-all cursor-pointer sm:whitespace-nowrap">
                Explore Solutions <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/company-profile">
              <span
                data-testid="btn-download-profile"
                className="inline-flex min-h-14 items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white border border-white/15 hover:border-white/30 transition-all cursor-pointer sm:whitespace-nowrap"
              >
                <Download size={16} className="shrink-0" aria-hidden="true" /> Download Company Profile
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
