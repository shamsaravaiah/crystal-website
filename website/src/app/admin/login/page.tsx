"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        const mins = Math.ceil((data.retryAfterSec || 900) / 60);
        setError(`Too many attempts. Try again in about ${mins} minute(s).`);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="crystal-mesh flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md border border-[var(--line)] bg-cream/80 p-8 backdrop-blur">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo.jpg"
            alt="UNIQUE ALL IN ONE"
            width={72}
            height={72}
            className="mb-4 h-[72px] w-[72px] rounded-full object-cover"
          />
          <h1 className="font-display text-3xl tracking-wide">Admin</h1>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-stone">
            UNIQUE ALL IN ONE
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">
          <div>
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              maxLength={128}
              spellCheck={false}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              maxLength={256}
            />
          </div>
          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
