"use client";

import Link from "next/link";
import type { Product } from "@/lib/db";
import { getLocalizedDescription, useLanguage } from "@/lib/i18n";
import ProductGallery from "./ProductGallery";

export default function ProductDetailContent({ product }: { product: Product }) {
  const { t, locale, categoryLabel } = useLanguage();
  const description = getLocalizedDescription(product, locale);

  return (
    <section className="crystal-mesh px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:pt-6">
          <Link
            href="/collection"
            className="text-[0.68rem] uppercase tracking-[0.2em] text-stone hover:text-ink"
          >
            {t.product.back}
          </Link>
          <p className="mt-6 text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            {product.name}
          </h1>
          <div className="my-6 flex w-40 items-center gap-3">
            <span className="facet-line flex-1" />
            <span className="text-gold">✦</span>
            <span className="facet-line flex-1" />
          </div>
          <p className="max-w-lg text-base leading-relaxed text-ink-soft">
            {description}
          </p>

          {product.price != null && (
            <p className="mt-8 font-display text-3xl text-ink">
              €{product.price.toFixed(2)}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.instagram.com/unique.all.in.one/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              {t.product.inquire}
            </a>
            <Link href="/contact" className="btn-ghost">
              {t.product.contact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
