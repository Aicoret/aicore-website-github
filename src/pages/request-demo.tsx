import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle, ChevronRight, ChevronLeft, Layers, Building2, MessageSquare, Phone, PartyPopper } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/lib/use-page-meta";
import { trackEvent } from "@/lib/analytics";
import { products } from "@/lib/data";
import { pageContext, postPublicJson } from "@/lib/public-api";

interface FormData {
  product: string;
  companyName: string;
  industry: string;
  companySize: string;
  useCase: string;
  contactMethod: string;
  availability: string;
  fullName: string;
  email: string;
  phone: string;
}

type PublicIntakeAcceptedResponse = {
  data?: {
    intakeReference?: string;
  };
  intakeReference?: string;
};

const INDUSTRIES = [
  "Agriculture", "Education", "Energy & Utilities", "Finance & Fintech",
  "Government", "Healthcare", "Logistics & Supply Chain", "Manufacturing",
  "Retail & E-commerce", "Telecommunications", "Other",
];

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"];

const CONTACT_METHODS = [
  { label: "Email", value: "Email" },
  { label: "Phone Call", value: "Phone" },
  { label: "WhatsApp", value: "WhatsApp" },
  { label: "Video Call (Zoom/Meet)", value: "Any" },
];

const AVAILABILITY = [
  "Weekday mornings (9am–12pm WAT)",
  "Weekday afternoons (1pm–5pm WAT)",
  "Weekday evenings (6pm–8pm WAT)",
  "Weekend mornings",
  "Flexible — any time",
];

const STEPS = [
  { n: 1, label: "Choose Product", icon: Layers },
  { n: 2, label: "Company Details", icon: Building2 },
  { n: 3, label: "Use Case", icon: MessageSquare },
  { n: 4, label: "Contact Preferences", icon: Phone },
  { n: 5, label: "Confirmation", icon: PartyPopper },
];

export default function RequestDemo() {
  usePageMeta(
    "Request a Product Demo — AICORE Technologies",
    "Schedule a personalised demo of any AICORE product. Tell us your use case and we'll reach out within 24 hours.",
    "/request-demo",
  );

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intakeReference, setIntakeReference] = useState("");

  const [form, setForm] = useState<FormData>({
    product: "",
    companyName: "",
    industry: "",
    companySize: "",
    useCase: "",
    contactMethod: "",
    availability: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    if (step === 1) return !!form.product;
    if (step === 2) return !!form.companyName && !!form.industry && !!form.companySize;
    if (step === 3) return form.useCase.trim().length >= 20;
    if (step === 4) return !!form.contactMethod && !!form.availability && !!form.fullName && !!form.email;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await postPublicJson<PublicIntakeAcceptedResponse>(
        "/api/v1/public/demo-requests",
        {
          ...form,
          ...pageContext("request-demo-wizard"),
        },
        { idempotencyScope: "Website:DemoRequest" },
      );
      setIntakeReference(response.data?.intakeReference ?? response.intakeReference ?? "");
      trackEvent("public_form_submitted", { form: "demo_request", status: "accepted" });
      setSubmitted(true);
      setStep(5);
    } catch {
      trackEvent("public_form_submit_failed", { form: "demo_request" });
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      <section
        className="pt-28 pb-10"
        style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Request a Product Demo</h1>
          <p className="text-[#94A3B8] text-base mb-8">
            Tell us what you want to see — we'll arrange a focused walkthrough within 24 hours.
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
            {STEPS.map(({ n, label, icon: Icon }) => (
              <div key={n} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= n
                        ? "text-white"
                        : "border border-white/20 text-white/30"
                    }`}
                    style={step >= n ? { background: "#1E5BFF" } : {}}
                  >
                    {step > n ? <CheckCircle size={14} /> : <Icon size={14} />}
                  </div>
                  <span className={`hidden sm:block text-xs mt-1 transition-colors ${step >= n ? "text-white" : "text-white/30"}`}>
                    {label}
                  </span>
                </div>
                {n < STEPS.length && (
                  <div
                    className="w-6 sm:w-10 h-0.5 mx-1 sm:mx-2 rounded transition-all"
                    style={{ background: step > n ? "#1E5BFF" : "rgba(255,255,255,0.1)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">

            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">Which product would you like to demo?</h2>
                <p className="text-[#475569] text-sm mb-6">Select the product that best fits your needs.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {products.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => update("product", p.name)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        form.product === p.name
                          ? "border-[#1E5BFF] bg-[#1E5BFF]/5"
                          : "border-slate-300 hover:border-brand/40"
                      }`}
                    >
                      <p className="font-semibold text-[#0F172A] text-sm">{p.name}</p>
                      <p className="text-[#475569] text-xs mt-1 line-clamp-2">{p.tagline}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">Tell us about your company</h2>
                <p className="text-[#475569] text-sm mb-6">This helps us tailor the demo to your context.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Company Name *</label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => update("companyName", e.target.value)}
                      placeholder="Acme Ltd."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Industry *</label>
                    <select
                      value={form.industry}
                      onChange={(e) => update("industry", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all bg-white"
                    >
                      <option value="">Select industry…</option>
                      {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Company Size *</label>
                    <div className="flex flex-wrap gap-2">
                      {COMPANY_SIZES.map((s) => (
                        <button
                          key={s}
                          onClick={() => update("companySize", s)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            form.companySize === s
                              ? "border-[#1E5BFF] bg-[#1E5BFF]/10 text-[#1E5BFF]"
                              : "border-slate-300 text-[#475569] hover:border-brand/40"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">What problem are you solving?</h2>
                <p className="text-[#475569] text-sm mb-6">Describe your use case so we can focus the demo on what matters most to you.</p>
                <textarea
                  value={form.useCase}
                  onChange={(e) => update("useCase", e.target.value)}
                  rows={6}
                  placeholder="E.g. We want to automate our equipment monitoring across 5 sites and receive alerts when thresholds are breached…"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all resize-none"
                />
                <p className="text-[#94A3B8] text-xs mt-2">
                  {form.useCase.trim().length < 20
                    ? `${Math.max(0, 20 - form.useCase.trim().length)} more characters needed`
                    : "✓ Looks good"}
                </p>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">How should we reach you?</h2>
                <p className="text-[#475569] text-sm mb-6">Choose your preferred contact method and availability.</p>
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+234 …"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Preferred Contact Method *</label>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_METHODS.map((m) => (
                        <button
                          key={m.value}
                          onClick={() => update("contactMethod", m.value)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            form.contactMethod === m.value
                              ? "border-[#1E5BFF] bg-[#1E5BFF]/10 text-[#1E5BFF]"
                              : "border-slate-300 text-[#475569] hover:border-brand/40"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Preferred Availability *</label>
                    <select
                      value={form.availability}
                      onChange={(e) => update("availability", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all bg-white"
                    >
                      <option value="">Select availability…</option>
                      {AVAILABILITY.map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — confirmation */}
            {step === 5 && (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#00B894]/10 flex items-center justify-center mx-auto mb-5">
                  <PartyPopper size={30} className="text-[#00B894]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Demo Request Received!</h2>
                <p className="text-[#475569] text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  {submitted
                    ? `Thanks ${form.fullName}! We've received your request for a ${form.product} demo. Our team will reach out to ${form.email} within 24 hours.`
                    : "Review your details below before submitting."}
                </p>
                {submitted && intakeReference ? (
                  <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    Reference: <span className="text-[#0F172A]">{intakeReference}</span>
                  </p>
                ) : null}

                {/* Summary */}
                <div className="text-left bg-slate-50 rounded-xl border border-slate-300 p-5 mb-6 space-y-2">
                  {[
                    { label: "Product", value: form.product },
                    { label: "Company", value: `${form.companyName} (${form.companySize} employees)` },
                    { label: "Industry", value: form.industry },
                    { label: "Contact", value: `${form.fullName} — ${form.email}` },
                    { label: "Method", value: CONTACT_METHODS.find((m) => m.value === form.contactMethod)?.label ?? form.contactMethod },
                    { label: "Availability", value: form.availability },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-3 text-sm">
                      <span className="font-medium text-[#0F172A] w-24 flex-shrink-0">{label}</span>
                      <span className="text-[#475569]">{value}</span>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {!submitted && (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: "#1E5BFF" }}
                  >
                    {submitting ? "Submitting…" : "Confirm & Submit Request"}
                  </button>
                )}

                {submitted && (
                  <Link href="/">
                    <button
                      className="px-7 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                      style={{ background: "#1E5BFF" }}
                    >
                      Back to Homepage
                    </button>
                  </Link>
                )}
              </div>
            )}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-[#475569] hover:border-slate-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <span className="text-[#94A3B8] text-xs">Step {step} of 4</span>
                <button
                  onClick={() => {
                    if (step === 4) {
                      setStep(5);
                    } else {
                      setStep((s) => s + 1);
                    }
                  }}
                  disabled={!canAdvance()}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#1E5BFF" }}
                >
                  {step === 4 ? "Review" : "Next"} <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
