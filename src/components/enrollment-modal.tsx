import { useState } from "react";
import { X, GraduationCap, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { pageContext, postPublicJson } from "@/lib/public-api";

interface Props {
  trackTitle: string;
  trackSlug: string;
  onClose: () => void;
}

const EXPERIENCE_LEVELS = [
  { label: "Complete Beginner", value: "Beginner" },
  { label: "Some Experience", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];
const COHORTS = ["Next available cohort", "In 1–2 months", "In 3–6 months", "Flexible"];

export default function EnrollmentModal({ trackTitle, trackSlug, onClose }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    experienceLevel: "",
    cohortPreference: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.experienceLevel) return;
    setSubmitting(true);
    setError(null);
    try {
      await postPublicJson(
        "/api/v1/public/academy-enrollments",
        { ...form, trackSlug, ...pageContext("academy-enrollment-modal") },
        { idempotencyScope: "Website:AcademyEnrollment" },
      );
      trackEvent("public_form_submitted", { form: "academy_enrollment", status: "accepted" });
      setDone(true);
    } catch {
      trackEvent("public_form_submit_failed", { form: "academy_enrollment" });
      setError("Could not submit. Please email us at support@aicoret.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4"
      style={{ background: "rgba(7,17,31,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E5BFF]/10 flex items-center justify-center">
              <GraduationCap size={18} className="text-[#1E5BFF]" />
            </div>
            <div>
              <h2 className="font-bold text-[#0F172A] text-base">Enroll in Track</h2>
              <p className="text-[#475569] text-xs">{trackTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close enrollment form"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#475569] hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+234 …"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Organisation</label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    placeholder="School / Company"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[#0F172A] text-sm outline-none focus:ring-2 focus:ring-[#1E5BFF]/30 focus:border-[#1E5BFF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-2">Experience Level *</label>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <button
                      key={`${lvl.label}-${lvl.value}`}
                      type="button"
                      onClick={() => update("experienceLevel", lvl.value)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        form.experienceLevel === lvl.value
                          ? "border-[#1E5BFF] bg-[#1E5BFF]/10 text-[#1E5BFF]"
                          : "border-slate-300 text-[#475569] hover:border-brand/40"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-2">Cohort Preference</label>
                <div className="flex flex-wrap gap-2">
                  {COHORTS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update("cohortPreference", c)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        form.cohortPreference === c
                          ? "border-[#1E5BFF] bg-[#1E5BFF]/10 text-[#1E5BFF]"
                          : "border-slate-300 text-[#475569] hover:border-brand/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !form.fullName || !form.email || !form.experienceLevel}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#1E5BFF" }}
              >
                {submitting ? "Submitting…" : "Submit Enrolment"}
              </button>
              <p className="text-center text-[#94A3B8] text-xs">
                We'll confirm your enrolment and send next steps within 1 business day.
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#00B894]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-[#00B894]" />
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg mb-2">Enrolment Received!</h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-6">
                Thanks <strong>{form.fullName}</strong>! We've received your enrolment for the{" "}
                <strong>{trackTitle}</strong> track and will be in touch at{" "}
                <strong>{form.email}</strong> within 1 business day.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ background: "#1E5BFF" }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
