import { Link } from "wouter";
import { Layers, Smartphone, CheckCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/lib/use-page-meta";

const saas = {
  title: "Intelligent Platforms & SaaS",
  icon: Layers,
  badge: "SaaS Platforms",
  color: "#1E5BFF",
  detail:
    "We build complete SaaS products from design to launch — including auth, billing, dashboards, admin panels, and API layers — ready for real customers.",
  capabilities: [
    "Multi-tenant SaaS design",
    "Subscription and billing integration",
    "Role-based access control",
    "Admin dashboards and analytics",
    "API-first backend design",
    "Cloud deployment and DevOps",
  ],
  technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS/GCP", "Docker"],
  useCases: ["SaaS dashboards", "Business operating systems", "Subscription platforms", "Multi-tenant apps"],
};

const mobile = {
  title: "Mobile & Cross-Platform Apps",
  icon: Smartphone,
  badge: "Mobile",
  color: "#1E5BFF",
  detail:
    "We build cross-platform mobile apps that connect to your hardware, IoT devices, and backend systems — fully integrated with your business operations.",
  capabilities: [
    "React Native / Flutter cross-platform development",
    "IoT device companion apps",
    "Field inspection and data collection apps",
    "Offline-capable with sync",
    "Real-time alerts and push notifications",
    "Backend API integration",
  ],
  technologies: ["React Native", "Flutter", "Expo", "REST APIs", "Firebase", "SQLite"],
  useCases: ["Field apps", "IoT dashboards", "Inspection tools", "Companion apps"],
};

export default function WebMobileSaaS() {
  usePageMeta(
    "Web, Mobile & SaaS Platforms",
    "Custom SaaS platforms, web applications, and mobile apps built for real business operations.",
    "/solutions/web-mobile-saas-platforms",
  );

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions">
            <span className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-white text-sm mb-8 cursor-pointer transition-colors">
              <ArrowLeft size={14} /> Back to Solutions
            </span>
          </Link>
          <div className="mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#1E5BFF20", color: "#1E5BFF" }}>
              Web · Mobile · SaaS
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Web, Mobile &amp; SaaS Platforms</h1>
          </div>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            Custom SaaS platforms, web applications, mobile apps, dashboards, customer portals and admin tools — built from design to launch.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* SaaS Platforms */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#1E5BFF20", border: "1px solid #1E5BFF40" }}>
                <Layers size={22} style={{ color: "#1E5BFF" }} />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">{saas.title}</h2>
            </div>
            <p className="text-[#475569] mb-8 max-w-2xl">{saas.detail}</p>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-5">What We Build</h3>
                  <div className="space-y-3">
                    {saas.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-3">
                        <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#1E5BFF" }} />
                        <span className="text-[#475569] text-sm leading-relaxed">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-5">Technologies We Use</h3>
                  <div className="flex flex-wrap gap-2">
                    {saas.technologies.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                  <h3 className="font-bold text-[#0F172A] mb-4">Use Cases</h3>
                  <div className="space-y-2">
                    {saas.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#1E5BFF" }} />
                        <span className="text-[#475569] text-sm">{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Mobile Apps */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#1E5BFF20", border: "1px solid #1E5BFF40" }}>
                <Smartphone size={22} style={{ color: "#1E5BFF" }} />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">{mobile.title}</h2>
            </div>
            <p className="text-[#475569] mb-8 max-w-2xl">{mobile.detail}</p>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-5">What We Build</h3>
                  <div className="space-y-3">
                    {mobile.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-3">
                        <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#1E5BFF" }} />
                        <span className="text-[#475569] text-sm leading-relaxed">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-5">Technologies We Use</h3>
                  <div className="flex flex-wrap gap-2">
                    {mobile.technologies.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                  <h3 className="font-bold text-[#0F172A] mb-4">Use Cases</h3>
                  <div className="space-y-2">
                    {mobile.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#1E5BFF" }} />
                        <span className="text-[#475569] text-sm">{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-6" style={{ background: "#07111F" }}>
                  <h3 className="font-bold text-white mb-3">Ready to Build?</h3>
                  <p className="text-[#64748B] text-sm mb-5">Tell us about your project and we'll recommend the right approach.</p>
                  <Link href="/contact">
                    <button className="w-full py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90" style={{ background: "#1E5BFF" }}>
                      Start a Project
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
