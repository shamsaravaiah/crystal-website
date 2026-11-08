import { getDb } from "./db";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

function ensureTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      key TEXT PRIMARY KEY,
      attempts INTEGER NOT NULL DEFAULT 0,
      first_attempt_at INTEGER NOT NULL,
      locked_until INTEGER
    );
  `);
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

export function checkLoginRateLimit(key: string): RateLimitResult {
  ensureTable();
  const db = getDb();
  const now = Date.now();
  const row = db
    .prepare("SELECT attempts, first_attempt_at, locked_until FROM login_attempts WHERE key = ?")
    .get(key) as
    | { attempts: number; first_attempt_at: number; locked_until: number | null }
    | undefined;

  if (row?.locked_until && row.locked_until > now) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((row.locked_until - now) / 1000),
    };
  }

  if (!row) {
    return { ok: true, remaining: MAX_ATTEMPTS };
  }

  // Reset window if expired
  if (now - row.first_attempt_at > WINDOW_MS) {
    db.prepare("DELETE FROM login_attempts WHERE key = ?").run(key);
    return { ok: true, remaining: MAX_ATTEMPTS };
  }

  if (row.attempts >= MAX_ATTEMPTS) {
    const lockedUntil = now + LOCKOUT_MS;
    db.prepare(
      "UPDATE login_attempts SET locked_until = ? WHERE key = ?",
    ).run(lockedUntil, key);
    return { ok: false, retryAfterSec: Math.ceil(LOCKOUT_MS / 1000) };
  }

  return { ok: true, remaining: MAX_ATTEMPTS - row.attempts };
}

export function recordFailedLogin(key: string) {
  ensureTable();
  const db = getDb();
  const now = Date.now();
  const row = db
    .prepare("SELECT attempts, first_attempt_at FROM login_attempts WHERE key = ?")
    .get(key) as { attempts: number; first_attempt_at: number } | undefined;

  if (!row || now - row.first_attempt_at > WINDOW_MS) {
    db.prepare(
      `INSERT INTO login_attempts (key, attempts, first_attempt_at, locked_until)
       VALUES (?, 1, ?, NULL)
       ON CONFLICT(key) DO UPDATE SET
         attempts = 1,
         first_attempt_at = excluded.first_attempt_at,
         locked_until = NULL`,
    ).run(key, now);
    return;
  }

  const attempts = row.attempts + 1;
  const lockedUntil = attempts >= MAX_ATTEMPTS ? now + LOCKOUT_MS : null;
  db.prepare(
    "UPDATE login_attempts SET attempts = ?, locked_until = ? WHERE key = ?",
  ).run(attempts, lockedUntil, key);
}

export function clearLoginAttempts(key: string) {
  ensureTable();
  getDb().prepare("DELETE FROM login_attempts WHERE key = ?").run(key);
}
