"use client";

import { useLanguage } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function ContactContent() {
  const { t } = useLanguage();

  return (
    <section className="crystal-mesh px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep">
          {t.contact.eyebrow}
        </p>
        <h1 className="font-display text-5xl text-ink md:text-6xl">
          {t.contact.title}
        </h1>
        <div className="mx-auto my-6 flex w-40 items-center gap-3">
          <span className="facet-line flex-1" />
          <span className="text-gold">✦</span>
          <span className="facet-line flex-1" />
        </div>
        <p className="font-display text-2xl tracking-wide text-ink">
          {SITE.owner}
        </p>
        <p className="mt-4 text-ink-soft leading-relaxed">{t.contact.body}</p>

        <div className="mx-auto mt-10 max-w-md space-y-4 text-left">
          <a
            href={SITE.phoneHref}
            className="flex items-center justify-between border border-[var(--line)] bg-cream/50 px-5 py-4 transition hover:border-gold"
          >
            <span className="text-[0.68rem] uppercase tracking-[0.18em] text-stone">
              {t.contact.phone}
            </span>
            <span className="text-ink">{SITE.phoneDisplay}</span>
          </a>
          <a
            href={SITE.emailHref}
            className="flex items-center justify-between border border-[var(--line)] bg-cream/50 px-5 py-4 transition hover:border-gold"
          >
            <span className="text-[0.68rem] uppercase tracking-[0.18em] text-stone">
              {t.contact.email}
            </span>
            <span className="text-ink">{SITE.email}</span>
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border border-[var(--line)] bg-cream/50 px-5 py-4 transition hover:border-gold"
          >
            <span className="text-[0.68rem] uppercase tracking-[0.18em] text-stone">
              {t.contact.instagram}
            </span>
            <span className="text-ink">{SITE.instagramHandle}</span>
          </a>
        </div>

        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-10"
        >
          {t.contact.cta}
        </a>
      </div>
    </section>
  );
}
