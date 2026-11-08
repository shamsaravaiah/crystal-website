const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

type AttemptState = {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil: number | null;
};

const attempts = new Map<string, AttemptState>();

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

export function checkLoginRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const row = attempts.get(key);

  if (row?.lockedUntil && row.lockedUntil > now) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((row.lockedUntil - now) / 1000),
    };
  }

  if (!row) {
    return { ok: true, remaining: MAX_ATTEMPTS };
  }

  if (now - row.firstAttemptAt > WINDOW_MS) {
    attempts.delete(key);
    return { ok: true, remaining: MAX_ATTEMPTS };
  }

  if (row.attempts >= MAX_ATTEMPTS) {
    row.lockedUntil = now + LOCKOUT_MS;
    attempts.set(key, row);
    return { ok: false, retryAfterSec: Math.ceil(LOCKOUT_MS / 1000) };
  }

  return { ok: true, remaining: MAX_ATTEMPTS - row.attempts };
}

export function recordFailedLogin(key: string) {
  const now = Date.now();
  const row = attempts.get(key);

  if (!row || now - row.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, {
      attempts: 1,
      firstAttemptAt: now,
      lockedUntil: null,
    });
    return;
  }

  const nextAttempts = row.attempts + 1;
  attempts.set(key, {
    attempts: nextAttempts,
    firstAttemptAt: row.firstAttemptAt,
    lockedUntil: nextAttempts >= MAX_ATTEMPTS ? now + LOCKOUT_MS : null,
  });
}

export function clearLoginAttempts(key: string) {
  attempts.delete(key);
}
