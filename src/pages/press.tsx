import { ExternalLink, Download, Mail, Phone, Newspaper } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { pressItems } from "@/lib/data";
import { usePageMeta } from "@/lib/use-page-meta";

export default function Press() {
  usePageMeta(
    "Press & Media — AICORE Technologies",
    "Media resources, press mentions, brand assets, and contact information for journalists and publishers covering AICORE Technologies.",
    "/press",
  );

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Press & Media</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Press & Media
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
            Resources and contacts for journalists and publishers covering AICORE Technologies. Find press mentions, brand assets, and our media contact below.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Press mentions */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">Press Mentions</h2>

                {pressItems.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-10 text-center">
                    <Newspaper size={32} className="text-[#94A3B8] mx-auto mb-4" />
                    <p className="text-[#64748B] text-sm">Press coverage will be listed here as it is published.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pressItems.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 hover:border-brand/40 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0F172A] text-sm">{item.publication}</span>
                            <span className="text-[#94A3B8] text-xs">·</span>
                            <span className="text-[#94A3B8] text-xs">{item.date}</span>
                          </div>
                          {item.url && item.url !== "#" && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-[#1E5BFF] font-semibold hover:underline flex-shrink-0"
                            >
                              Read <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                        <h3 className="font-semibold text-[#0F172A] leading-snug mb-2">{item.headline}</h3>
                        <p className="text-[#64748B] text-sm leading-relaxed">{item.excerpt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Boilerplate */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-5">Company Boilerplate</h2>
                <p className="text-[#475569] leading-relaxed text-sm italic border-l-4 border-[#1E5BFF]/30 pl-5">
                  AICORE Technologies Limited is a Nigerian AI, automation, and intelligent systems company specialising in artificial intelligence, automation, embedded systems, IoT, and robotics solutions. Founded to address the gap in practical intelligent systems development across Africa, AICORE designs and builds complete systems — from hardware firmware to cloud dashboards — for clients in manufacturing, energy, logistics, education, and the public sector. AICORE is headquartered in Lagos, Nigeria.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Media contact */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-5">Media Contact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Name</p>
                    <p className="text-sm font-semibold text-[#0F172A]">AICORE Communications</p>
                  </div>
                  <a
                    href="mailto:support@aicoret.com"
                    className="flex items-center gap-2.5 text-sm text-[#64748B] hover:text-[#1E5BFF] transition-colors group"
                  >
                    <Mail size={14} className="text-[#94A3B8] group-hover:text-[#1E5BFF]" />
                    support@aicoret.com
                  </a>
                  <a
                    href="tel:+2347010729722"
                    className="flex items-center gap-2.5 text-sm text-[#64748B] hover:text-[#1E5BFF] transition-colors group"
                  >
                    <Phone size={14} className="text-[#94A3B8] group-hover:text-[#1E5BFF]" />
                    +234 701 072 9722
                  </a>
                </div>
              </div>

              {/* Press kit */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-2">Press Kit</h3>
                <p className="text-[#64748B] text-sm mb-5 leading-relaxed">
                  Download brand assets for use in editorial coverage of AICORE Technologies.
                </p>
                <div className="space-y-2">
                  {[
                    { label: "AICORE Logo (SVG + PNG)", note: "Light & dark variants" },
                    { label: "Company Profile (PDF)", note: "One-page overview" },
                    { label: "Founder Photo", note: "High-resolution JPEG" },
                  ].map((asset) => (
                    <div
                      key={asset.label}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#0F172A]">{asset.label}</p>
                        <p className="text-xs text-[#94A3B8]">{asset.note}</p>
                      </div>
                      <button
                        onClick={() => alert("Press kit assets are being prepared. Please contact support@aicoret.com for immediate access.")}
                        className="flex items-center gap-1 text-xs text-[#1E5BFF] font-semibold hover:underline"
                      >
                        <Download size={11} /> Get
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#94A3B8] mt-4">
                  For immediate asset access, email{" "}
                  <a href="mailto:support@aicoret.com" className="text-[#1E5BFF] hover:underline">support@aicoret.com</a>
                </p>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-6" style={{ background: "#07111F" }}>
                <h3 className="font-bold text-white mb-2">Interview Request?</h3>
                <p className="text-[#64748B] text-sm mb-4 leading-relaxed">
                  We're available for comment on AI, IoT, embedded systems, and technology in Africa.
                </p>
                <a
                  href="mailto:support@aicoret.com?subject=Press Interview Request"
                  className="block w-full py-2.5 rounded-xl font-semibold text-white text-sm text-center bg-[#1E5BFF] hover:opacity-90 transition-all"
                >
                  Request an Interview
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
