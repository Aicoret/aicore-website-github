import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { StructuredData } from "@/components/structured-data";
import { usePageMeta } from "@/lib/use-page-meta";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import SolutionsPreview from "@/components/home/SolutionsPreview";
import ProductsPreview from "@/components/home/ProductsPreview";
import AIEmployees from "@/components/home/AIEmployees";
import IndustriesPreview from "@/components/home/IndustriesPreview";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import WhyAICORE from "@/components/home/WhyAICORE";
import InsightsPreview from "@/components/home/InsightsPreview";
import CTA from "@/components/home/CTA";

export default function Home() {
  usePageMeta(
    "AICORE Technologies — AI Employees, Automation, IoT & Intelligent Software",
    "AICORE Technologies builds AI Employees, AI-powered software, automation platforms, IoT systems, intelligent dashboards and hardware-enabled solutions for businesses, schools and facilities.",
    "/",
  );

  return (
    <div className="home-page bg-white text-slate-900 antialiased relative z-0 isolate">
      <StructuredData id="home-site" data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
      <Header />
      <div id="main-content" />
      <Hero />
      <SolutionsPreview />
      <ProductsPreview />
      <AIEmployees />
      <IndustriesPreview />
      <EngineeringProcess />
      <WhyAICORE />
      <InsightsPreview />
      <CTA />
      <Footer />
    </div>
  );
}
