import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FAQSection } from "@/components/faq-section";
import { StructuredData } from "@/components/structured-data";
import { ProductVisualPlaceholder } from "@/components/product/product-visual-placeholder";
import { products, solutions } from "@/lib/data";
import { getProductStatus, productCtaLabels, productFeatureDescriptions, productStatusNotes, productVisualMeta } from "@/lib/product-polish";
import { breadcrumbSchema, faqPageSchema, softwareApplicationSchema } from "@/lib/seo";
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
    <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full border ${styles[color]}`}>
      {status}
    </span>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const p = products.find((x) => x.slug === slug);

  usePageMeta(
    p ? p.name : "Product",
    p ? p.tagline : "Explore AICORE Technologies products and platforms.",
    p ? `/products/${p.slug}` : "/products",
  );

  if (!p) {
    return (
      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
        <Header />
        <div className="pt-40 text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Product not found</h1>
          <Link href="/products"><button className="text-[#1E5BFF] font-semibold">Back to Products</button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedSols = solutions.filter((s) => p.relatedSolutions.includes(s.slug));
  const status = getProductStatus(p.status);
  const visual = productVisualMeta[p.slug];
  const featureDescriptions = productFeatureDescriptions[p.slug] ?? {};
  const faqs = [
    {
      question: `Who is ${p.name} for?`,
      answer: p.targetUsers,
    },
    {
      question: "What problem does this product solve?",
      answer: p.problem,
    },
    {
      question: "Can AICORE customise this product?",
      answer: "Yes. AICORE can adapt product workflows, integrations, dashboards, user roles, and deployment details around your organisation's requirements.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <StructuredData
        id={`product-${p.slug}`}
        data={[
          softwareApplicationSchema(p),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: p.name, path: `/products/${p.slug}` },
          ]),
          faqPageSchema(faqs),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products">
            <span className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-white text-sm mb-8 cursor-pointer transition-colors">
              <ArrowLeft size={14} /> Back to Products
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{p.name}</h1>
            <StatusBadge status={p.status} color={p.statusColor as StatusColor} />
          </div>
          <p className="text-[#00D4FF] font-medium mb-4">{p.tagline}</p>
          <p className="text-[#94A3B8] text-lg max-w-2xl leading-relaxed">{p.description}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {visual ? (
                <ProductVisualPlaceholder
                  kind={visual.kind}
                  label={visual.label}
                  caption={visual.caption}
                />
              ) : null}

              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-3">The Problem</h2>
                <p className="text-[#475569] leading-relaxed">{p.problem}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-300">
                      <CheckCircle size={15} className="text-[#1E5BFF] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#0F172A] text-sm font-semibold">{f}</span>
                        {featureDescriptions[f] ? (
                          <p className="mt-1 text-xs leading-relaxed text-[#64748B]">{featureDescriptions[f]}</p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {relatedSols.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                  <h2 className="text-xl font-bold text-[#0F172A] mb-6">Related Solutions</h2>
                  <div className="space-y-3">
                    {relatedSols.map((s) => (
                      <Link key={s.slug} href={`/solutions/${s.slug}`}>
                        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-300 hover:border-brand/40 hover:bg-slate-50 transition-all cursor-pointer group">
                          <div>
                            <p className="font-semibold text-[#0F172A] text-sm">{s.title}</p>
                            <p className="text-[#64748B] text-xs mt-0.5">{s.badge}</p>
                          </div>
                          <span className="text-brand group-hover:text-brand-hover text-xs font-semibold">View Solution →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-3 text-sm">Target Users</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{p.targetUsers}</p>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#07111F" }}>
                <h3 className="font-bold text-white mb-2">Request a Demo</h3>
                <p className="text-[#94A3B8] text-sm mb-5">{productStatusNotes[status]}</p>
                <Link href="/contact">
                  <button
                    data-testid="btn-product-request-demo"
                    className="w-full py-2.5 rounded-xl font-semibold text-white text-sm bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all"
                  >
                    {productCtaLabels[status]}
                  </button>
                </Link>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50">
                <p className="text-amber-800 text-xs leading-relaxed">
                  <strong>Honest status:</strong> This product is currently marked as <strong>{p.status}</strong>. Visuals shown are concept previews and sample screens — not live production screenshots.
                </p>
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
