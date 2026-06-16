import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FAQSection } from "@/components/faq-section";
import { StructuredData } from "@/components/structured-data";
import { ProductMaturityLegend } from "@/components/product/product-maturity-legend";
import { ProductVisualPlaceholder } from "@/components/product/product-visual-placeholder";
import { products } from "@/lib/data";
import { getProductStatus, productCtaLabels, productStatusOrder, productVisualMeta } from "@/lib/product-polish";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";

type StatusColor = "teal" | "blue" | "cyan" | "amber";

function StatusBadge({ status, color }: { status: string; color: StatusColor }) {
  const styles: Record<StatusColor, string> = {
    teal: "bg-[#00B894]/15 text-[#00B894] border-[#00B894]/30",
    blue: "bg-[#1E5BFF]/15 text-[#60A5FA] border-[#1E5BFF]/30",
    cyan: "bg-[#00D4FF]/15 text-[#00D4FF] border-[#00D4FF]/30",
    amber: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[color]}`}>
      {status}
    </span>
  );
}

const filters = ["All", "Client-Ready", "MVP", "Prototype", "Internal Use"];

const sortedProducts = [...products].sort((a, b) => {
  const statusA = getProductStatus(a.status);
  const statusB = getProductStatus(b.status);
  return productStatusOrder[statusA] - productStatusOrder[statusB] || a.name.localeCompare(b.name);
});

const productFaqs = [
  {
    question: "Are AICORE products ready-made or customisable?",
    answer: "Some products are client-ready, while others are MVPs, prototypes, or internal platforms. AICORE can customise products around your workflows, data, users, integrations, and operational requirements.",
  },
  {
    question: "Can we request a live demo before starting?",
    answer: "Yes. For client-ready products, AICORE can walk you through the current product experience and discuss how it maps to your use case.",
  },
  {
    question: "Do product pages show live screenshots?",
    answer: "Some visuals are concept previews or sample screens. Product status is labelled clearly so you know whether a product is client-ready, MVP, prototype, or internal-use.",
  },
  {
    question: "Can AICORE build a custom platform if no product fits?",
    answer: "Yes. If an existing product is not a fit, AICORE can design and build a custom SaaS, automation, IoT, AI, or operations platform for your organisation.",
  },
];

export default function Products() {
  usePageMeta(
    "Products — AICORE Platforms & Software",
    "Browse AICORE's portfolio of platforms and products across AI, automation, IoT, SaaS, and smart energy systems.",
    "/products",
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? sortedProducts : sortedProducts.filter((p) => p.status === activeFilter);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <StructuredData
        id="products"
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
          faqPageSchema(productFaqs),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Products & Platforms</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl">
            Platforms and Products Built by AICORE
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
            Purpose-built software platforms and intelligent systems developed by the AICORE team — from internal tools to client-ready products.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="no-scrollbar -mx-4 mb-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                data-testid={`filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-[#1E5BFF] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#1E5BFF]/30 hover:text-[#1E5BFF]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          </div>

          <ProductMaturityLegend />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const status = getProductStatus(p.status);
              const visual = productVisualMeta[p.slug];
              return (
              <div
                key={p.slug}
                className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden hover:border-brand/40 hover:shadow-xl transition-all group flex flex-col"
                data-testid={`card-product-${p.slug}`}
              >
                {visual ? (
                  <ProductVisualPlaceholder
                    kind={visual.kind}
                    label={visual.label}
                    caption={visual.caption}
                    compact
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-bold text-[#0F172A] text-lg leading-snug flex-1 mr-3">{p.name}</h2>
                  <StatusBadge status={p.status} color={p.statusColor as StatusColor} />
                </div>
                <p className="text-[#1E5BFF] text-sm font-medium mb-3">{p.tagline}</p>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">{p.problem}</p>
                <div className="flex flex-wrap gap-1.5 mb-6 flex-1">
                  {p.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 text-xs rounded text-slate-500 bg-slate-100 border border-slate-200">{f}</span>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row gap-3">
                  <Link href={`/products/${p.slug}`}>
                    <span
                      data-testid={`btn-product-view-${p.slug}`}
                      className="inline-block px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all cursor-pointer text-center"
                    >
                      View Product
                    </span>
                  </Link>
                  <Link href="/contact">
                    <span className="inline-block px-4 py-2 rounded-lg text-sm font-semibold text-brand hover:text-brand-hover hover:underline transition-all cursor-pointer text-center">
                      {productCtaLabels[status]}
                    </span>
                  </Link>
                </div>
                </div>
              </div>
            );
            })}
          </div>

          <div className="mt-10 p-6 rounded-xl border-l-4 border-[#1E5BFF] bg-slate-50 flex items-start gap-4">
            <p className="text-[#64748B] text-sm">
              Product screenshots and visuals shown are <strong className="text-[#0F172A]">concept previews and sample screens</strong> — clearly labeled. Contact us to see live demos of client-ready products.
            </p>
          </div>
        </div>
      </section>

      <FAQSection items={productFaqs} />

      {/* CTA */}
      <section className="py-20" style={{ background: "#07111F" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Platform?</h2>
          <p className="text-[#64748B] mb-8">AICORE builds custom platforms and SaaS products around your industry, users, and operations.</p>
          <Link href="/contact">
            <span className="inline-block px-7 py-3.5 rounded-xl font-semibold text-white cursor-pointer hover:opacity-90 transition-all" style={{ background: "#1E5BFF" }}>
              Discuss Your Platform
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
