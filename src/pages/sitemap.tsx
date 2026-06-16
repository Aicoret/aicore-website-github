import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { staticArticles } from "@/lib/articles";
import { solutions, products, industries } from "@/lib/data";
import { usePageMeta } from "@/lib/use-page-meta";

function SitemapGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; description?: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-widest mb-4 pb-2 border-b border-slate-200">
        {title}
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link href={link.href}>
              <span className="text-[#1E5BFF] text-sm hover:underline cursor-pointer font-medium">
                {link.label}
              </span>
            </Link>
            {link.description && (
              <p className="text-[#94A3B8] text-xs mt-0.5">{link.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  usePageMeta(
    "Sitemap",
    "Complete index of all pages on the AICORE Technologies website.",
    "/sitemap",
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-14" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#1E5BFF] text-xs font-bold tracking-widest uppercase mb-3">Navigation</p>
          <h1 className="text-4xl font-bold text-[#07111F] mb-3">Site Map</h1>
          <p className="text-[#64748B]">A complete index of all pages on the AICORE Technologies website.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

            <SitemapGroup
              title="Main Pages"
              links={[
                { label: "Home", href: "/", description: "Company overview and featured content" },
                { label: "Solutions", href: "/solutions", description: "Eight service areas" },
                { label: "Products", href: "/products", description: "AICORE platforms and products" },
                { label: "Industries", href: "/industries", description: "Sectors we serve" },
                { label: "Academy", href: "/academy", description: "Technical training programmes" },
                { label: "Insights", href: "/insights", description: "Technical articles and case notes" },
                { label: "About", href: "/about", description: "Mission, team, and service areas" },
                { label: "Contact", href: "/contact", description: "Start a project or enquiry" },
              ]}
            />

            <SitemapGroup
              title="Solutions"
              links={solutions.map((s) => ({
                label: s.title,
                href: `/solutions/${s.slug}`,
                description: s.badge,
              }))}
            />

            <SitemapGroup
              title="Products"
              links={products.map((p) => ({
                label: p.name,
                href: `/products/${p.slug}`,
                description: p.status,
              }))}
            />

            <SitemapGroup
              title="Industries"
              links={industries.slice(0, 8).map((ind) => ({
                label: ind.name,
                href: "/industries",
              }))}
            />

            <SitemapGroup
              title="Insights"
              links={staticArticles.map((a) => ({
                label: a.title,
                href: `/insights/${a.slug}`,
                description: a.category,
              }))}
            />

            <SitemapGroup
              title="Legal & Policy"
              links={[
                { label: "Privacy Policy", href: "/privacy", description: "NDPA / GDPR compliance" },
                { label: "Terms of Service", href: "/terms", description: "Website usage terms" },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
