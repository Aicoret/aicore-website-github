import { Link } from "wouter";
import { Building2, School, Zap, Package, Sprout, Factory, Shield, HeartPulse, Tractor, ShoppingCart, Landmark, Lightbulb } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { industries } from "@/lib/data";
import { usePageMeta } from "@/lib/use-page-meta";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Building2, School, Zap, Package, Sprout, Factory, Shield, HeartPulse, Tractor, ShoppingCart, Landmark, Lightbulb,
};

const industryUseCases: Record<string, string> = {
  "SMEs & Growing Businesses": "Automate lead follow-up, invoice workflows, approvals, and operational reporting.",
  "Schools & Training Institutions": "Launch robotics, AI, and embedded systems labs with practical curriculum support.",
  "Energy & Utilities": "Monitor solar sites, transformers, batteries, inverters, and field devices from one dashboard.",
  "Logistics & Warehousing": "Track stock movement, goods-in/goods-out, barcode scans, and warehouse exceptions.",
  "Agriculture & Agro-Processing": "Collect sensor data for temperature, humidity, storage, irrigation, and production conditions.",
  "Manufacturing & Production": "Detect downtime risks, monitor production signals, and automate shift reporting.",
  "Security & Surveillance": "Add edge AI alerts, event detection, and operator dashboards to monitoring workflows.",
  "Healthcare Clinics & Labs": "Connect records, lab workflows, devices, and reporting into a clearer operational view.",
  "Real Estate & Facilities": "Track energy use, maintenance issues, and building assets across multiple properties.",
  "Retail & E-Commerce": "Improve order workflows, inventory visibility, customer intelligence, and automated updates.",
  "Government & Public Sector": "Digitise field operations, approvals, reporting, and citizen-service workflows.",
  "Startups & Innovators": "Co-build MVPs that combine software, hardware, AI, IoT, or mobile products.",
};

export default function Industries() {
  usePageMeta(
    "Industries — Sectors AICORE Serves",
    "AICORE builds intelligent systems for manufacturing, healthcare, agriculture, logistics, energy, education, fintech, and more across Africa and beyond.",
    "/industries",
  );
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Industries</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Built for the Industries That Can't Afford Downtime
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
            We build intelligent systems for sectors where operations are complex, margins are tight, and manual processes are the bottleneck.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => {
              const Icon = iconMap[ind.icon];
              return (
                <div
                  key={ind.name}
                  className="bg-white rounded-2xl border border-slate-300 shadow-sm p-7 hover:border-brand/40 hover:shadow-lg transition-all group flex flex-col h-full"
                  data-testid={`card-industry-${ind.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: ind.color + "15" }}>
                    {Icon && <Icon size={22} style={{ color: ind.color }} />}
                  </div>
                  <h2 className="font-bold text-[#0F172A] text-lg mb-3">{ind.name}</h2>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-5">
                    <span className="font-medium text-[#475569]">Challenge: </span>{ind.pain}
                  </p>
                  <p className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-[#475569]">
                    <span className="font-semibold text-[#0F172A]">Use case: </span>{industryUseCases[ind.name]}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                    {ind.solutions.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200">{s}</span>
                    ))}
                  </div>
                  <Link href="/contact">
                    <span className="mt-auto block border border-brand/20 bg-white text-center py-2.5 rounded-lg w-full text-brand text-sm font-semibold cursor-pointer hover:bg-brand/5 hover:text-brand-hover transition-all">
                      See Use Cases →
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-20" style={{ background: "#07111F" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Intelligent Systems for Complex Operations</h2>
          <p className="text-[#64748B] mb-8">AICORE adapts software, AI, automation, data, sensors, devices, and dashboards to the way your operation works.</p>
          <Link href="/contact">
            <span className="inline-block px-7 py-3.5 rounded-xl font-semibold text-white cursor-pointer hover:opacity-90 transition-all" style={{ background: "#1E5BFF" }}>
              Discuss Your Use Case
            </span>
          </Link>
        </div>
      </section> */}
      {/* CTA */}
    <section className="py-20" style={{ background: "#07111F" }}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Intelligent Systems for Complex Operations
        </h2>

        <p className="text-[#94A3B8] mb-8 leading-relaxed">
          AICORE adapts software, AI, automation, data, sensors, devices, and dashboards
          to the way your operation works.
        </p>

        <Link href="/contact">
          <span
            className="inline-block px-7 py-3.5 rounded-xl font-semibold text-white cursor-pointer hover:opacity-90 transition-all"
            style={{ background: "#1E5BFF" }}
          >
            Discuss Your Use Case
          </span>
        </Link>
      </div>
    </section>

      <Footer />
    </div>
  );
}
