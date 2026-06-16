import { Link } from "wouter";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Twitter } from "lucide-react";
import { contactInfo } from "@/lib/contact";
import { NewsletterWidget } from "@/components/newsletter-widget";

export default function Footer() {
  return (
    <footer style={{ background: "#07111F" }} className="border-t border-white/8 relative z-[5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2 md:col-span-2 lg:pr-6">
            <div className="mb-4">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="AICORE Technologies"
                width={222}
                height={58}
                className="h-9 w-auto"
              />
            </div>

            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs mb-6">
              Purpose-built AI, automation, IoT, and intelligent software systems for organisations.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-6">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-[#94A3B8] hover:text-[#00D4FF] transition-colors group">
                <Mail size={16} className="text-[#64748B] flex-shrink-0 group-hover:text-[#00D4FF]" />
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <a href={`tel:${contactInfo.phones[0]?.number}`} className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors group">
                <Phone size={16} className="text-[#64748B] flex-shrink-0 group-hover:text-white" />
                <span className="text-sm">{contactInfo.phones[0]?.number}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#64748B] flex-shrink-0 mt-0.5" />
                <span className="text-[#94A3B8] text-sm">{contactInfo.offices.map((office) => office.city).join(" & ")}, Nigeria</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mb-2">
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="Follow AICORE on LinkedIn"
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.02] text-[#64748B] hover:bg-white/5 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={contactInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                aria-label="Follow AICORE on X"
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.02] text-[#64748B] hover:bg-white/5 hover:text-white hover:border-white/30 transition-all"
              >
                <Twitter size={16} />
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={contactInfo.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with AICORE on WhatsApp"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/20 mt-5"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Nav Columns Container */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 pt-2 lg:pt-0">
            {/* Solutions */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-5 tracking-wide">Solutions</h4>
              <ul className="space-y-3">
                {[
                  ["AI Systems & Tools", "/solutions/ai-systems-and-tools"],
                  ["Business Automation", "/solutions/process-and-business-automation"],
                  ["SaaS & Platforms", "/solutions/intelligent-platforms-and-saas"],
                  ["Embedded & IoT", "/solutions/embedded-iot-edge-ai"],
                  ["Robotics", "/solutions/robotics-intelligent-hardware"],
                  ["Mobile Apps", "/solutions/mobile-cross-platform-applications"],
                  ["AICORE Academy", "/solutions/aicore-academy"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>
                      <span className="text-[#B6C7E3] hover:text-[#00D4FF] text-sm transition-colors cursor-pointer">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-5 tracking-wide">Products</h4>
              <ul className="space-y-3">
                {[
                  ["Aicore AI Employees", "/#ai-employees"],
                  ["AICORE GrowthOS", "/products/aicore-growthos"],
                  ["Throughport WMS", "/products/throughport-wms"],
                  ["IoT Monitoring Platform", "/products/iot-monitoring-platform"],
                  ["Smart Energy Monitoring", "/products/smart-energy-monitoring-platform"],
                  ["AI Business Assistant", "/products/ai-business-assistant-platform"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>
                      <span className="text-[#94A3B8] hover:text-[#00D4FF] text-sm transition-colors cursor-pointer">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & CTA */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white text-sm font-semibold mb-5 tracking-wide">Company</h4>
              <ul className="space-y-3 mb-8">
                {[
                  ["About AICORE", "/about"],
                  ["AICORE Academy", "/academy"],
                  ["Industries", "/industries"],
                  ["Insights", "/insights"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>
                      <span className="text-[#94A3B8] hover:text-[#00D4FF] text-sm transition-colors cursor-pointer">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Row */}
        <div className="py-6 border-y border-white/8 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-[#0B1728]/30 rounded-2xl px-6 mb-8">
          <div className="max-w-md">
            <h4 className="text-[#E2E8F0] text-sm font-semibold mb-1 focus:outline-none">Stay Updated</h4>
            <p className="text-[#B6C7E3] text-sm leading-relaxed">
              Get AI & automation insights, product updates, and case studies — straight to your inbox.
            </p>
          </div>
          <div className="w-full md:w-auto md:min-w-[360px]">
            <NewsletterWidget />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-[#64748B] text-sm text-center md:text-left">
            © {new Date().getFullYear()} AICORE Technologies Limited. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
            <Link href="/privacy">
              <span className="text-[#64748B] hover:text-white text-sm transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="text-[#64748B] hover:text-white text-sm transition-colors cursor-pointer">Terms of Service</span>
            </Link>
            <Link href="/sitemap">
              <span className="text-[#64748B] hover:text-white text-sm transition-colors cursor-pointer">Sitemap</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
