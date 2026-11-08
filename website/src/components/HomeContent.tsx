"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db";
import { useLanguage } from "@/lib/i18n";
import ProductCard from "./ProductCard";

export default function HomeContent({ featured }: { featured: Product[] }) {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/products/2026-09-05_18-41-53_UTC_3.jpg"
          alt="Crystal and gemstone collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,17,15,0.35)_100%)]" />

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 text-center text-cream">
          <div className="animate-rise mb-6 sparkle">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
              <path
                d="M21 2 L26 16 L40 21 L26 26 L21 40 L16 26 L2 21 L16 16 Z"
                stroke="#d4b56a"
                strokeWidth="1"
              />
            </svg>
          </div>

          <p className="animate-rise mb-3 text-[0.7rem] uppercase tracking-[0.45em] text-gold-light">
            {t.home.tagline}
          </p>
          <h1 className="animate-rise-delay font-display text-5xl leading-none tracking-[0.06em] sm:text-7xl md:text-8xl">
            UNIQUE
          </h1>
          <div className="animate-rise-delay my-4 flex w-48 items-center gap-3 sm:w-64">
            <span className="facet-line flex-1" />
            <span className="text-gold-light">✦</span>
            <span className="facet-line flex-1" />
          </div>
          <p className="animate-rise-delay text-[0.85rem] uppercase tracking-[0.5em] text-gold-light sm:text-base">
            All In One
          </p>
          <p className="animate-rise-delay-2 mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">
            {t.home.intro}
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/collection"
              className="btn-primary !bg-cream !text-ink hover:!bg-gold-light"
            >
              {t.home.viewCollection}
            </Link>
            <a
              href="https://www.instagram.com/unique.all.in.one/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost !border-cream/50 !text-cream hover:!bg-cream hover:!text-ink"
            >
              {t.nav.instagram}
            </a>
          </div>
        </div>
      </section>

      <section className="crystal-mesh px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-xl">
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep">
              {t.home.featured}
            </p>
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
              {t.home.featuredTitle}
            </h2>
            <p className="mt-4 text-ink-soft">{t.home.featuredBody}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/collection" className="btn-ghost">
              {t.home.exploreAll}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-24 text-cream md:px-8">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/products/2026-08-22_13-34-51_UTC_1.jpg"
              alt="925 silver ring"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold-light">
              {t.home.atelier}
            </p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              {t.home.atelierTitle}
            </h2>
            <p className="mt-5 max-w-md text-cream/75 leading-relaxed">
              {t.home.atelierBody}
            </p>
            <Link
              href="/about"
              className="btn-ghost mt-8 !border-cream/40 !text-cream hover:!bg-cream hover:!text-ink"
            >
              {t.home.ourStory}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
