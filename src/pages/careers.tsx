import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, MapPin, Briefcase, Clock, Users, Zap, Target, Heart, X } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { openRoles } from "@/lib/data";
import { usePageMeta } from "@/lib/use-page-meta";

type Department = "Engineering" | "Product" | "Sales" | "Operations";

const departments: Department[] = ["Engineering", "Sales", "Operations"];

const values = [
  {
    icon: Target,
    title: "Ownership",
    description: "We hire people who take the initiative, own their work end to end, and don't wait for permission to solve problems.",
  },
  {
    icon: Zap,
    title: "Craft",
    description: "We care about building things that actually work well — not just things that technically ship. Quality is a habit, not an afterthought.",
  },
  {
    icon: Heart,
    title: "Impact",
    description: "Our work ends up in factories, classrooms, and energy installations across Africa. That context motivates everything we build.",
  },
  {
    icon: Users,
    title: "Openness",
    description: "We share knowledge, ask for help when stuck, give honest feedback, and make space for different approaches.",
  },
];

const locationColor: Record<string, string> = {
  "Lagos, Nigeria": "#1E5BFF",
  Remote: "#00B894",
  Hybrid: "#F59E0B",
};

interface ApplicationModalProps {
  role: typeof openRoles[number];
  onClose: () => void;
}

function ApplicationModal({ role, onClose }: ApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    note: "",
    file: null as File | null,
  });
  const [error, setError] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("CV file must be under 5MB.");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setError("");
    setForm((f) => ({ ...f, file }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Please fill in your name and email.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(7,17,31,0.8)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-[#0F172A]">Apply for this Role</h3>
            <p className="text-sm text-[#64748B] mt-0.5">{role.title}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-100 transition-all">
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#00B894]/15 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="font-bold text-[#0F172A] text-lg mb-2">Application Received</h4>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              Thank you for applying for the {role.title} position. We review every application and will be in touch if there's a fit.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#1E5BFF] text-white font-semibold text-sm hover:bg-[#1a50e0] transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E5BFF] focus:ring-1 focus:ring-[#1E5BFF]/20"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E5BFF] focus:ring-1 focus:ring-[#1E5BFF]/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Role</label>
              <input
                type="text"
                readOnly
                value={role.title}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-sm text-[#64748B]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E5BFF] focus:ring-1 focus:ring-[#1E5BFF]/20"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Cover Note</label>
              <textarea
                rows={4}
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E5BFF] focus:ring-1 focus:ring-[#1E5BFF]/20 resize-none"
                placeholder="Tell us why you're a strong fit for this role..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">CV / Resume (PDF, max 5MB)</label>
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-slate-300 cursor-pointer hover:border-[#1E5BFF]/40 transition-all">
                <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
                <span className="text-sm text-[#64748B]">
                  {form.file ? form.file.name : "Click to upload PDF"}
                </span>
              </label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all text-sm"
            >
              Submit Application
            </button>
            <p className="text-xs text-[#94A3B8] text-center">
              Your information will only be used to evaluate this application.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Careers() {
  usePageMeta(
    "Careers — Join AICORE Technologies",
    "Join the team building Africa's intelligent systems. Explore open roles in engineering, sales, and operations at AICORE Technologies.",
    "/careers",
  );

  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [applyingRole, setApplyingRole] = useState<typeof openRoles[number] | null>(null);

  const openPositions = openRoles.filter((r) => r.open);
  const hasOpenRoles = openPositions.length > 0;

  const byDepartment = departments.reduce<Record<string, typeof openRoles>>((acc, dept) => {
    acc[dept] = openPositions.filter((r) => r.department === dept);
    return acc;
  }, {} as Record<string, typeof openRoles>);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Careers</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Join the Team Building Africa's Intelligent Systems
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
            We work on genuinely hard problems — firmware, AI pipelines, warehouse systems, robotics curricula. If that sounds like meaningful work to you, we'd like to meet you.
          </p>
        </div>
      </section>

      {/* Culture values */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-10">How We Work</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-6 rounded-2xl border border-slate-300 bg-white shadow-sm hover:border-brand/40 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#1E5BFF]/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#1E5BFF]" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2">{v.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Open Roles</h2>
          <p className="text-[#64748B] text-sm mb-10">
            {hasOpenRoles
              ? `${openPositions.length} position${openPositions.length !== 1 ? "s" : ""} currently open`
              : "No positions currently open"}
          </p>

          {!hasOpenRoles ? (
            <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-10 text-center">
              <p className="text-[#0F172A] font-semibold mb-2">We're not hiring right now</p>
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                But we'd love to hear from standout engineers, sales professionals, and operators. Send your CV and a short note about what you're looking for.
              </p>
              <a
                href="mailto:support@aicoret.com?subject=Speculative Application"
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all text-sm inline-block"
              >
                Send Your CV
              </a>
            </div>
          ) : (
            <div className="space-y-10">
              {departments.map((dept) => {
                const roles = byDepartment[dept];
                if (!roles || roles.length === 0) return null;
                return (
                  <div key={dept}>
                    <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">{dept}</h3>
                    <div className="space-y-3">
                      {roles.map((role) => {
                        const isExpanded = expandedRole === role.id;
                        return (
                          <div
                            key={role.id}
                            className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden transition-all hover:border-brand/40"
                          >
                            <button
                              onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                              className="w-full flex items-center justify-between p-6 text-left"
                            >
                              <div className="flex-1 min-w-0 pr-4">
                                <h4 className="font-bold text-[#0F172A] mb-2">{role.title}</h4>
                                <div className="flex flex-wrap items-center gap-3">
                                  <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
                                    <MapPin size={11} />
                                    {role.location}
                                  </span>
                                  <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
                                    <Briefcase size={11} />
                                    {role.type}
                                  </span>
                                  <span
                                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                    style={{
                                      background: (locationColor[role.location] ?? "#1E5BFF") + "15",
                                      color: locationColor[role.location] ?? "#1E5BFF",
                                    }}
                                  >
                                    {role.location}
                                  </span>
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp size={16} className="text-[#94A3B8] flex-shrink-0" />
                              ) : (
                                <ChevronDown size={16} className="text-[#94A3B8] flex-shrink-0" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="px-6 pb-6 border-t border-slate-100 pt-5">
                                <p className="text-[#475569] text-sm leading-relaxed mb-6">{role.description}</p>

                                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                  <div>
                                    <h5 className="font-semibold text-[#0F172A] text-sm mb-3">Requirements</h5>
                                    <ul className="space-y-2">
                                      {role.requirements.map((r) => (
                                        <li key={r} className="flex items-start gap-2 text-sm text-[#475569]">
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BFF] flex-shrink-0 mt-1.5" />
                                          {r}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  {role.niceToHave.length > 0 && (
                                    <div>
                                      <h5 className="font-semibold text-[#0F172A] text-sm mb-3">Nice to Have</h5>
                                      <ul className="space-y-2">
                                        {role.niceToHave.map((r) => (
                                          <li key={r} className="flex items-start gap-2 text-sm text-[#64748B]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] flex-shrink-0 mt-1.5" />
                                            {r}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>

                                <button
                                  onClick={() => setApplyingRole(role)}
                                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-[#1E5BFF] hover:bg-[#1a50e0] transition-all text-sm"
                                >
                                  Apply Now
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Speculative CTA */}
      {hasOpenRoles && (
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-[#0F172A] font-semibold mb-1">Don't see a match?</p>
            <p className="text-[#64748B] text-sm mb-4">
              We're always interested in exceptional people. Send your CV to{" "}
              <a href="mailto:support@aicoret.com" className="text-[#1E5BFF] hover:underline">support@aicoret.com</a>
            </p>
          </div>
        </section>
      )}

      {/* Application modal */}
      {applyingRole && (
        <ApplicationModal role={applyingRole} onClose={() => setApplyingRole(null)} />
      )}

      <Footer />
    </div>
  );
}
