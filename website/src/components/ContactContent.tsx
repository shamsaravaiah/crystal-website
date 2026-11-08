"use client";

import { useLanguage } from "@/lib/i18n";

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
        <p className="text-ink-soft leading-relaxed">{t.contact.body}</p>
        <a
          href="https://www.instagram.com/unique.all.in.one/"
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
