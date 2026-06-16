const STORAGE_KEY = "aicore_cookie_consent";

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export function getCookieConsent(): CookieConsent | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: Omit<CookieConsent, "essential" | "timestamp">): void {
  const value: CookieConsent = {
    essential: true,
    analytics: consent.analytics,
    marketing: consent.marketing,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function hasConsent(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function analyticsAllowed(): boolean {
  const consent = getCookieConsent();
  return consent?.analytics ?? false;
}
