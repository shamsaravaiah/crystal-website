/**
 * Reject cross-site mutating requests (basic CSRF defense for cookie auth).
 * Compares Origin/Referer against the request Host header.
 */
export function isSameOriginRequest(request: Request) {
  const host = request.headers.get("host");
  if (!host) return false;

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  // Non-browser clients often omit Origin/Referer.
  // Allow only in development so local tooling still works.
  return process.env.NODE_ENV !== "production";
}

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}
