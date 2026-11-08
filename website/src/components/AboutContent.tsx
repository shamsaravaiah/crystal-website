"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <section className="crystal-mesh px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep">
            {t.about.eyebrow}
          </p>
          <h1 className="font-display text-5xl text-ink md:text-6xl">
            UNIQUE ALL IN ONE
          </h1>
          <div className="my-6 flex w-40 items-center gap-3">
            <span className="facet-line flex-1" />
            <span className="text-gold">✦</span>
            <span className="facet-line flex-1" />
          </div>
          <p className="text-ink-soft leading-relaxed">{t.about.p1}</p>
          <p className="mt-5 text-ink-soft leading-relaxed">{t.about.p2}</p>
          <a
            href="https://www.instagram.com/unique.all.in.one/"
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8"
          >
            @unique.all.in.one
          </a>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
          <Image
            src="/products/2025-12-27_22-02-04_UTC_1.jpg"
            alt="Emerald set from the collection"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
