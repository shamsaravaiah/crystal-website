"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db";
import { useLanguage } from "@/lib/i18n";

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] || "/logo.jpg";
  const { categoryLabel } = useLanguage();

  return (
    <Link href={`/product/${product.slug}`} className="product-tile group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-70 transition group-hover:opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="mb-1 text-[0.62rem] uppercase tracking-[0.22em] text-gold-light">
            {categoryLabel(product.category)}
          </p>
          <h3 className="font-display text-2xl text-cream">{product.name}</h3>
        </div>
      </div>
    </Link>
  );
}
