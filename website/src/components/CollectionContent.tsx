"use client";

import Link from "next/link";
import type { Product } from "@/lib/db";
import { useLanguage } from "@/lib/i18n";
import ProductCard from "./ProductCard";

export default function CollectionContent({
  products,
  categories,
  activeCategory,
}: {
  products: Product[];
  categories: string[];
  activeCategory?: string;
}) {
  const { t, categoryLabel } = useLanguage();

  return (
    <section className="crystal-mesh px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep">
          {t.collection.eyebrow}
        </p>
        <h1 className="font-display text-5xl text-ink md:text-6xl">
          {t.collection.title}
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">{t.collection.body}</p>

        <div className="mt-10 flex flex-wrap gap-2">
          <Link
            href="/collection"
            className={`border px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] transition ${
              !activeCategory
                ? "border-ink bg-ink text-cream"
                : "border-[var(--line)] text-ink-soft hover:border-ink"
            }`}
          >
            {t.collection.all}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/collection?category=${encodeURIComponent(cat)}`}
              className={`border px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] transition ${
                activeCategory === cat
                  ? "border-ink bg-ink text-cream"
                  : "border-[var(--line)] text-ink-soft hover:border-ink"
              }`}
            >
              {categoryLabel(cat)}
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!products.length && (
          <p className="mt-16 text-center text-ink-soft">{t.collection.empty}</p>
        )}
      </div>
    </section>
  );
}
