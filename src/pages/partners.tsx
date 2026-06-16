import { useState } from "react";
import { Link } from "wouter";
import { ExternalLink, Handshake } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { partners } from "@/lib/data";
import { usePageMeta } from "@/lib/use-page-meta";

type Category = "All" | "Technology" | "Hardware" | "Cloud" | "Academic" | "Distribution";

const categories: Category[] = ["All", "Technology", "Hardware", "Cloud", "Academic"];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Technology: { bg: "#1E5BFF15", text: "#1E5BFF" },
  Hardware: { bg: "#00B89415", text: "#00B894" },
  Cloud: { bg: "#00D4FF15", text: "#00D4FF" },
  Academic: { bg: "#F59E0B15", text: "#F59E0B" },
  Distribution: { bg: "#8B5CF615", text: "#8B5CF6" },
};

export default function Partners() {
  usePageMeta(
    "Partners & Ecosystem — AICORE Technologies",
    "Explore AICORE's technology, hardware, cloud, and academic partners powering our AI, IoT, automation, and robotics solutions.",
    "/partners",
  );

  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = activeCategory === "All"
    ? partners
    : partners.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Ecosystem</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Our Ecosystem — Technology, Hardware & Academic Partners
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
            AICORE's solutions are built on a foundation of trusted technology platforms, hardware components, cloud infrastructure, and academic relationships.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#1E5BFF] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#1E5BFF]/30 hover:text-[#1E5BFF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((partner) => {
              const color = categoryColors[partner.category] ?? { bg: "#1E5BFF15", text: "#1E5BFF" };
              return (
                <div
                  key={partner.name}
                  className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 hover:border-brand/40 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ background: color.bg, color: color.text }}>
                      {partner.name.charAt(0)}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={{ background: color.bg, color: color.text }}>
                      {partner.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0F172A] mb-2">{partner.name}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed flex-1 mb-4">{partner.description}</p>

                  {partner.url && partner.url !== "#" && (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#1E5BFF] font-semibold hover:gap-2.5 transition-all"
                    >
                      Visit Website <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 border-t border-slate-200" style={{ background: "#07111F" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1E5BFF]/20 flex items-center justify-center mx-auto mb-6">
            <Handshake size={26} className="text-[#1E5BFF]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Become a Partner</h2>
          <p className="text-[#64748B] text-base leading-relaxed mb-8 max-w-xl mx-auto">
            If you represent a technology vendor, hardware supplier, cloud platform, or academic institution and want to explore a partnership with AICORE, we'd love to hear from you.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3.5 rounded-xl font-semibold text-white bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all text-sm">
              Enquire About Partnership
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
