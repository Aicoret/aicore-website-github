type PublicApiOptions = {
  idempotencyScope?: string;
  idempotencyKey?: string;
  signal?: AbortSignal;
};

export class PublicApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "PublicApiError";
    this.status = status;
    this.details = details;
  }
}

const directBaseUrl = String(import.meta.env.VITE_PLATFORM_API_BASE_URL ?? "").replace(/\/$/, "");

function apiUrl(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return directBaseUrl ? `${directBaseUrl}${cleanPath}` : cleanPath;
}

export function createPublicIdempotencyKey(scope: string) {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${scope}:${random}`;
}

function createRequestId() {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `web-${random}`;
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function messageFromErrorPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return undefined;
  const value = payload as { message?: unknown; error?: unknown };
  if (typeof value.message === "string") return value.message;
  if (Array.isArray(value.message)) return value.message.join("; ");
  if (typeof value.error === "string") return value.error;
  return undefined;
}

export async function postPublicJson<TResponse = unknown, TBody = unknown>(
  path: string,
  body: TBody,
  options: PublicApiOptions = {},
): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Request-Id": createRequestId(),
  };

  if (options.idempotencyScope) {
    headers["Idempotency-Key"] = options.idempotencyKey ?? createPublicIdempotencyKey(options.idempotencyScope);
  }

  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: options.signal,
  });
  const payload = await readJson(response);

  if (!response.ok) {
    throw new PublicApiError(
      messageFromErrorPayload(payload) ?? "Something went wrong. Please try again.",
      response.status,
      payload,
    );
  }

  return payload as TResponse;
}

export async function getPublicJson<TResponse = unknown>(path: string, options: { signal?: AbortSignal } = {}): Promise<TResponse> {
  const response = await fetch(apiUrl(path), {
    method: "GET",
    headers: {
      "X-Request-Id": createRequestId(),
    },
    signal: options.signal,
  });
  const payload = await readJson(response);

  if (!response.ok) {
    throw new PublicApiError(
      messageFromErrorPayload(payload) ?? "Something went wrong. Please try again.",
      response.status,
      payload,
    );
  }

  return payload as TResponse;
}

export function publicApiPath(path: string) {
  return apiUrl(path);
}

export function pageContext(sourceSection?: string) {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePagePath: window.location.pathname,
    sourcePageTitle: document.title,
    sourceSection,
    referrerUrl: document.referrer || undefined,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmTerm: params.get("utm_term") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
  };
}
