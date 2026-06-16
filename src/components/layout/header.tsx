import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const sectionMap: Record<string, string> = {
  "section-solutions": "/solutions",
  "section-products": "/products",
  "section-industries": "/industries",
  "section-academy": "/academy",
  "section-insights": "/insights",
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [location] = useLocation();
  const onHomepage = location === "/";

  useEffect(() => {
    setMobileOpen(false);
    if (!onHomepage) setActiveSection(null);
  }, [location]);

  useEffect(() => {
    if (!onHomepage) return;
    const observers: IntersectionObserver[] = [];
    Object.keys(sectionMap).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [onHomepage]);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    if (onHomepage && activeSection && sectionMap[activeSection] === href) return true;
    if (onHomepage) return false;
    return location === href || location.startsWith(href + "/");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[60] border-b border-white/10 bg-[#07111F]/98 shadow-[0_10px_30px_rgba(2,6,23,0.22)] backdrop-blur-md transition-all duration-300"
    >
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="nav-logo" aria-label="AICORE home">
            <div className="flex items-center cursor-pointer select-none">
              <img
                src="/logo.png"
                alt="AICORE Technologies"
                width={222}
                height={58}
                className="h-8 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-medium text-slate-300" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`nav-${link.label.toLowerCase()}`}>
                <span
                  className={`relative cursor-pointer transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#0EA5E9] after:transition-opacity ${
                    isActive(link.href)
                      ? "text-white after:opacity-100"
                      : "text-slate-300 after:opacity-0 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <span
                data-testid="btn-start-project"
                className="inline-block whitespace-nowrap px-4 py-2.5 xl:px-6 text-sm font-semibold text-white bg-[#0EA5E9] hover:bg-[#0284C7] rounded-full transition-colors shadow-lg shadow-[#0EA5E9]/20 cursor-pointer"
              >
                Discuss a Project
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="btn-mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-white/10 bg-[#07111F]"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-6 py-4 space-y-3 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block cursor-pointer transition-colors ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            <div className="pt-1">
              <Link href="/contact">
                <span className="block w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#0EA5E9] hover:bg-[#0284C7] rounded-full transition-colors text-center cursor-pointer">
                  Discuss a Project
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
