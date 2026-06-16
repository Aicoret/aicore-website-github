import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Cookie, X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { hasConsent, setCookieConsent } from "@/lib/cookie-consent";

function Toggle({ enabled, onChange, label, description }: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold">{label}</p>
        <p className="text-[#475569] text-xs leading-relaxed mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className="flex-shrink-0 w-9 h-5 rounded-full transition-all relative mt-0.5"
        style={{ background: enabled ? "#1E5BFF" : "#334155" }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
          style={{ left: enabled ? "calc(100% - 18px)" : "2px" }}
        />
      </button>
    </div>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (hasConsent()) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const acceptAll = () => {
    setCookieConsent({ analytics: true, marketing: true });
    setVisible(false);
  };

  const savePreferences = () => {
    setCookieConsent({ analytics, marketing });
    setVisible(false);
  };

  const decline = () => {
    setCookieConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] px-2 pb-2 sm:px-4 sm:pb-4"
      data-testid="cookie-banner"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div
        className="max-w-[900px] mx-auto max-h-[78vh] overflow-y-auto rounded-xl border border-white/10 shadow-2xl p-2.5 sm:p-3"
        style={{ background: "#0D1F35" }}
      >
        {/* Main row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          {/* Icon */}
          <div
            className="hidden h-9 w-9 rounded-lg sm:flex items-center justify-center flex-shrink-0"
            style={{ background: "#1E5BFF20" }}
          >
            <Cookie size={18} style={{ color: "#00D4FF" }} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs sm:text-sm font-semibold leading-tight">We use cookies</p>
            <p className="text-[#94A3B8] text-[11px] sm:text-sm leading-snug">
              Essential cookies keep the site working. Optional analytics help us improve.{" "}
              <Link href="/privacy">
                <span className="text-[#00D4FF] hover:underline cursor-pointer">Privacy Policy</span>
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0 w-full sm:w-auto">
            <button
              data-testid="btn-cookie-preferences"
              onClick={() => setExpanded((v) => !v)}
              className="flex min-h-8 items-center gap-1 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-medium text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              Manage {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            <button
              data-testid="btn-cookie-decline"
              onClick={decline}
              className="min-h-8 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-medium text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              Decline
            </button>
            <button
              data-testid="btn-cookie-accept"
              onClick={acceptAll}
              className="flex min-h-8 flex-1 items-center justify-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold text-white transition-all hover:opacity-90 sm:flex-none"
              style={{ background: "#1E5BFF" }}
            >
              <Check size={13} strokeWidth={2.5} />
              <span className="whitespace-nowrap">Accept All</span>
            </button>
            <button
              data-testid="btn-cookie-close"
              onClick={decline}
              aria-label="Close"
              className="min-h-8 min-w-8 p-1.5 rounded-lg text-[#64748B] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Preferences accordion */}
        {expanded && (
          <div
            className="mt-4 pt-4 border-t border-white/8 space-y-4"
          >
            {/* Essential — always on */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold">Essential Cookies</p>
                <p className="text-[#475569] text-xs leading-relaxed mt-0.5">
                  Required for core site functionality such as navigation and form submission. Cannot be disabled.
                </p>
              </div>
              <span className="flex-shrink-0 mt-0.5 text-[#00B894] text-xs font-semibold px-2 py-0.5 rounded border border-[#00B894]/30 bg-[#00B894]/10">
                Always On
              </span>
            </div>

            <Toggle
              enabled={analytics}
              onChange={setAnalytics}
              label="Analytics Cookies"
              description="Help us understand how visitors use the site — pages visited, time on page, referral source. All data is anonymised."
            />

            <Toggle
              enabled={marketing}
              onChange={setMarketing}
              label="Marketing Cookies"
              description="Used for retargeting and advertising to show relevant AICORE content on other platforms."
            />

            <button
              data-testid="btn-cookie-save"
              onClick={savePreferences}
              className="mt-2 min-h-9 px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#1E5BFF" }}
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
