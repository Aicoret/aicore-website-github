import { analyticsAllowed } from "@/lib/cookie-consent";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    clarity: (...args: unknown[]) => void;
  }
}

export function initGA(): void {
  if (!GA_ID || !analyticsAllowed()) return;

  if (document.querySelector(`script[src*="googletagmanager"]`)) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export function trackPageView(path: string): void {
  if (!GA_ID) return;
  window.gtag?.("event", "page_view", { page_path: path });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  window.gtag?.("event", eventName, params);
}

export function initClarity(): void {
  if (!CLARITY_ID || !analyticsAllowed()) return;
  if (document.querySelector(`script[src*="clarity.ms"]`)) return;

  (function (
    c: Window & typeof globalThis,
    l: Document,
    a: string,
    r: string,
    i: string
  ) {
    type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
    const cAny = c as unknown as Record<string, ClarityFn>;
    cAny[a] =
      cAny[a] ||
      function (...args: unknown[]) {
        (cAny[a].q = cAny[a].q || []).push(args);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
}

export function initAnalytics(): void {
  initGA();
  initClarity();
}
