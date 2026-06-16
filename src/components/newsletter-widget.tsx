import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { pageContext, postPublicJson } from "@/lib/public-api";

export function NewsletterWidget() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      await postPublicJson(
        "/api/v1/public/newsletter-subscriptions",
        { email: email.trim(), ...pageContext("newsletter-widget") },
        { idempotencyScope: "Website:NewsletterSubscription" },
      );
      trackEvent("newsletter_signup_submitted", { status: "accepted" });
      setStatus("success");
      setEmail("");
    } catch {
      trackEvent("newsletter_signup_failed");
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3">
        <CheckCircle2 size={18} className="text-[#00B894] flex-shrink-0" />
        <p className="text-[#94A3B8] text-sm">You're subscribed! We'll send you our latest insights.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address for newsletter"
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-white/15 bg-white/5 text-white placeholder-[#64748B] focus:outline-none focus:border-[#1E5BFF]/60 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 flex items-center gap-2 flex-shrink-0"
          style={{ background: "#1E5BFF" }}
        >
          {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : null}
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs">{errorMsg}</p>
      )}
      <p className="text-[#475569] text-xs">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
