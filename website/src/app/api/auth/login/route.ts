import { NextResponse } from "next/server";
import { createSession, validateCredentials } from "@/lib/auth";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  recordFailedLogin,
} from "@/lib/rate-limit";
import { clientKey, isSameOriginRequest } from "@/lib/security";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = clientKey(request);
  const rateKey = `login:${ip}`;
  const limit = checkLoginRateLimit(rateKey);

  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "Too many login attempts. Try again later.",
        retryAfterSec: limit.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      },
    );
  }

  const body = await request.json().catch(() => null);
  const username = String(body?.username || "").slice(0, 128);
  const password = String(body?.password || "").slice(0, 256);

  if (!username || !password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await validateCredentials(username, password);

  if (!valid) {
    recordFailedLogin(rateKey);
    // Constant response shape; small delay makes brute force slower.
    await new Promise((r) => setTimeout(r, 300 + Math.floor(Math.random() * 200)));
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  clearLoginAttempts(rateKey);
  await createSession();
  return NextResponse.json({ ok: true });
}
