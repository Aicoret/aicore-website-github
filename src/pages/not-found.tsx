import { Link } from "wouter";
import { Home, ArrowLeft, Search } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const quickLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Insights", href: "/insights" },
  { label: "Academy", href: "/academy" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-24">
        <div className="max-w-xl w-full text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
            style={{ background: "linear-gradient(135deg, #1E5BFF18, #00D4FF12)", border: "1.5px solid #1E5BFF25" }}
          >
            <Search size={32} className="text-[#1E5BFF]" />
          </div>

          <p className="text-[#1E5BFF] text-sm font-bold tracking-widest uppercase mb-3">404</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4 leading-tight">
            Page Not Found
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been moved. Here are some helpful links to get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link href="/">
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1E5BFF, #3B82F6)" }}
              >
                <Home size={16} />
                Go to Homepage
              </button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 text-[#475569] hover:border-slate-300 hover:text-[#0F172A] transition-all"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>

          <div>
            <p className="text-[#94A3B8] text-xs font-semibold tracking-widest uppercase mb-4">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="px-4 py-1.5 rounded-lg text-sm font-medium text-[#475569] border border-slate-200 bg-white hover:border-[#1E5BFF]/30 hover:text-[#1E5BFF] transition-all cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
