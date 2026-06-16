import { useState } from "react";
import { Link } from "wouter";
import { Lock, FolderOpen, FileText, LifeBuoy, ArrowRight, LogIn } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/lib/use-page-meta";

export default function Portal() {
  usePageMeta(
    "Client Portal — AICORE Technologies",
    "Log in to the AICORE client portal to view your project status, invoices, and support tickets.",
    "/portal",
    { noindex: true },
  );

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      <section
        className="pt-28 pb-20 min-h-[60vh] flex items-center"
        style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — portal intro */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E5BFF]/30 bg-[#1E5BFF]/10 mb-6">
                <Lock size={13} className="text-[#00D4FF]" />
                <span className="text-[#00D4FF] text-xs font-semibold tracking-wide uppercase">Client Portal</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Your Projects,<br />
                <span style={{ color: "#00D4FF" }}>All in One Place</span>
              </h1>
              <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
                Track project milestones, review deliverables, access invoices, and raise support tickets — all from your secure AICORE client dashboard.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: FolderOpen, label: "Project Status", desc: "Live milestone tracking" },
                  { icon: FileText, label: "Invoices", desc: "Payment history & docs" },
                  { icon: LifeBuoy, label: "Support", desc: "Raise & track tickets" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="rounded-xl border border-white/10 p-4 bg-white/5">
                    <Icon size={18} className="text-[#00D4FF] mb-2" />
                    <p className="text-white text-sm font-semibold">{label}</p>
                    <p className="text-[#64748B] text-xs mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — login form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-300">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#1E5BFF]/10 flex items-center justify-center">
                      <LogIn size={18} className="text-[#1E5BFF]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#0F172A]">Sign In</h2>
                      <p className="text-[#475569] text-xs">Existing clients only</p>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="portal-email" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                        Work Email
                      </label>
                      <input
                        id="portal-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="portal-password" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                        Password
                      </label>
                      <input
                        id="portal-password"
                        type="password"
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ background: "#1E5BFF" }}
                    >
                      <LogIn size={16} />
                      Sign In to Portal
                    </button>
                  </form>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <p className="text-[#475569] text-xs text-center">
                      Not a client yet?{" "}
                      <Link href="/contact">
                        <span className="text-[#1E5BFF] font-semibold cursor-pointer hover:underline">Start a Project</span>
                      </Link>{" "}
                      to get portal access.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-[#1E5BFF]/10 flex items-center justify-center mx-auto mb-4">
                    <LogIn size={24} className="text-[#1E5BFF]" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-lg mb-2">Portal Coming Soon</h3>
                  <p className="text-[#475569] text-sm leading-relaxed mb-5">
                    The client portal is currently being set up. We'll send login credentials to <strong>{email}</strong> as soon as it's ready.
                  </p>
                  <p className="text-[#475569] text-xs mb-6">
                    In the meantime, your project manager will keep you updated via email.
                  </p>
                  <Link href="/contact">
                    <button
                      className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm flex items-center gap-2 mx-auto transition-all hover:opacity-90"
                      style={{ background: "#1E5BFF" }}
                    >
                      Contact Your PM <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
