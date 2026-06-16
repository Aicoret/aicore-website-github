import { Printer, Download, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/lib/use-page-meta";
import { solutions, products, industries } from "@/lib/data";
import { contactInfo } from "@/lib/contact";

export default function CompanyProfile() {
  const profileContact = [
    { label: "Email", value: contactInfo.email },
    { label: "Phone / WhatsApp", value: contactInfo.phones.map((phone) => phone.display).join("\n") },
    { label: "Website", value: contactInfo.social.website.replace(/^https?:\/\//, "") },
  ];

  usePageMeta(
    "Company Profile — AICORE Technologies",
    "Download or print the AICORE Technologies company profile — AI, automation, IoT, robotics, and intelligent systems for Africa and beyond.",
    "/company-profile",
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Print toolbar — hidden in print */}
      <div
        className="print:hidden sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-slate-200"
        style={{ background: "#07111F" }}
      >
        <Link href="/about">
          <button className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
        </Link>
        <span className="text-white text-sm font-semibold">Company Profile</span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#1E5BFF" }}
        >
          <Printer size={14} />
          Print / Save as PDF
        </button>
      </div>

      {/* Printable content */}
      <div className="max-w-4xl mx-auto px-8 py-12 print:px-0 print:py-0 print:max-w-none">

        {/* Cover */}
        <div
          className="rounded-2xl print:rounded-none p-10 mb-10 print:mb-8 text-white"
          style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 60%, #1E5BFF20 100%)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="#1E5BFF" />
                <path d="M8 22L16 10L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 18H21" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="10" r="2" fill="#00D4FF" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">AICORE <span className="font-normal opacity-70">Technologies</span></p>
              <p className="text-[#00D4FF] text-xs font-semibold tracking-widest uppercase">Company Profile {new Date().getFullYear()}</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3 leading-snug">
            Building Intelligent Software,<br />
            AI Employees &amp; Automation Systems.
          </h1>
          <p className="text-[#94A3B8] text-sm leading-relaxed max-w-2xl">
            We build AI Employees, automation platforms, embedded firmware, IoT systems, robotics, SaaS products, and mobile applications for organisations that want to operate smarter.
          </p>

          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { n: "5+", label: "Years Experience" },
              { n: "12+", label: "Build Areas" },
              { n: "14+", label: "Industries Served" },
              { n: "100%", label: "Project Commitment" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#00D4FF" }}>{n}</p>
                <p className="text-white/60 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F172A] mb-3 pb-2 border-b border-slate-200">Who We Are</h2>
          <p className="text-[#475569] text-sm leading-relaxed mb-3">
            AICORE Technologies is a multidisciplinary intelligent systems company specialising in AI, automation, IoT, robotics, embedded systems, and intelligent software solutions. We serve startups, SMEs, enterprises, government agencies, and research institutions across Africa and beyond.
          </p>
          <p className="text-[#475569] text-sm leading-relaxed">
            Our team combines hardware and software expertise to deliver complete systems — from idea and design through launch, training, and ongoing support. We don't just advise; we build, test, and ship.
          </p>
        </section>

        {/* Core Services */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4 pb-2 border-b border-slate-200">Core Services</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {solutions.slice(0, 8).map((s) => (
              <div key={s.slug} className="flex gap-3 p-3 rounded-xl border border-slate-300 shadow-sm">
                <div className="w-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: "#1E5BFF", height: "auto", minHeight: 32 }} />
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">{s.title}</p>
                  <p className="text-[#475569] text-xs mt-0.5 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4 pb-2 border-b border-slate-200">Proprietary Products</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {products.slice(0, 6).map((p) => (
              <div key={p.slug} className="p-4 rounded-xl border border-slate-300 shadow-sm">
                <p className="font-semibold text-[#0F172A] text-sm">{p.name}</p>
                <p className="text-[#1E5BFF] text-xs font-medium mt-0.5">{p.status}</p>
                <p className="text-[#475569] text-xs mt-1.5 leading-relaxed">{p.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4 pb-2 border-b border-slate-200">Industries We Serve</h2>
          <div className="flex flex-wrap gap-2">
            {industries.map((i) => (
              <span
                key={i.name}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-[#475569]"
              >
                {i.name}
              </span>
            ))}
          </div>
        </section>

        {/* Why AICORE */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4 pb-2 border-b border-slate-200">Why AICORE</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Complete Delivery", desc: "From idea to launch — hardware, firmware, software, and cloud in one team." },
              { title: "Domain Expertise", desc: "Specialists in AI, IoT, robotics, and automation with 8+ years of multidisciplinary experience." },
              { title: "Africa-First Context", desc: "We understand infrastructure constraints, regulations, and market dynamics specific to African operators." },
              { title: "Agile Execution", desc: "Rapid prototyping with weekly milestones, full transparency, and no hidden scope creep." },
              { title: "Long-Term Partnership", desc: "Post-deployment support, monitoring, and continuous improvement built into every engagement." },
              { title: "IP Protection", desc: "All source code, models, and documentation are fully owned by you at project close." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-4 rounded-xl border border-slate-300 shadow-sm">
                <div className="w-6 h-1 rounded-full mb-3" style={{ background: "#1E5BFF" }} />
                <p className="font-semibold text-[#0F172A] text-sm mb-1">{title}</p>
                <p className="text-[#475569] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          className="rounded-2xl print:rounded-none p-8 text-white"
          style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}
        >
          <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            {profileContact.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[#00D4FF] text-xs font-semibold uppercase tracking-wide mb-1">{label}</p>
                <p className="text-white/80 whitespace-pre-line">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-white/50 text-xs flex-1">
              AICORE Technologies · RC: 1234567 · {new Date().getFullYear()} · All rights reserved
            </span>
            <span className="text-white/50 text-xs">Confidential — For Recipient Use Only</span>
          </div>
        </section>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Download prompt — print only shown via toolbar */}
      <div className="print:hidden flex justify-center pb-8">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#1E5BFF" }}
        >
          <Download size={16} />
          Save as PDF
        </button>
      </div>
    </div>
  );
}
