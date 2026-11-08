import bcrypt from "bcryptjs";
import { timingSafeEqual, randomUUID } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "unique_admin_session";
const SESSION_HOURS = 8;

/** Dummy hash so bcrypt still runs when username is wrong (timing hardening). */
const DUMMY_HASH =
  "$2b$12$yOq8hQuz.BnBekCu8VW1sO4EyCmMVx6WDfC.1Hid5vxZJ15vjfKLm";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET must be set to a strong value (32+ chars)");
    }
    return new TextEncoder().encode(
      "dev-only-insecure-secret-replace-in-env-local!!",
    );
  }
  return new TextEncoder().encode(secret);
}

function safeEqualStrings(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still do a compare to reduce length-leak timing differences.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function createSession() {
  const token = await new SignJWT({
    role: "admin",
    jti: randomUUID(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Verify admin credentials.
 * Prefer ADMIN_PASSWORD_HASH (bcrypt). Falls back to ADMIN_PASSWORD only outside production.
 */
export async function validateCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const plainPassword = process.env.ADMIN_PASSWORD;

  const userOk = safeEqualStrings(username.trim(), expectedUser);

  if (passwordHash) {
    const hashToCheck = userOk ? passwordHash : DUMMY_HASH;
    const passOk = await bcrypt.compare(password, hashToCheck);
    return userOk && passOk;
  }

  if (process.env.NODE_ENV === "production") {
    // Refuse plaintext password config in production.
    return false;
  }

  if (!plainPassword) return false;

  // Dev fallback: still hash-compare path when possible; otherwise timing-safe string compare.
  const passOk = safeEqualStrings(password, plainPassword);
  return userOk && passOk;
}

export async function requireAdmin() {
  return isAuthenticated();
}
