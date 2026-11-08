import { readStore, writeStore, slugify, type Product } from "./db";
import { randomUUID } from "crypto";

export type ProductInput = {
  name: string;
  description?: string;
  category?: string;
  price?: number | null;
  currency?: string;
  images?: string[];
  featured?: boolean;
};

export function listProducts(options?: { featured?: boolean; category?: string }) {
  let products = readStore().products;

  if (options?.featured) {
    products = products.filter((p) => p.featured === 1);
  }
  if (options?.category) {
    products = products.filter((p) => p.category === options.category);
  }

  return [...products].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getProductById(id: string): Product | null {
  return readStore().products.find((p) => p.id === id) ?? null;
}

export function getProductBySlug(slug: string): Product | null {
  return readStore().products.find((p) => p.slug === slug) ?? null;
}

export function createProduct(input: ProductInput): Product {
  const store = readStore();
  const id = randomUUID();
  const now = new Date().toISOString();
  let slug = slugify(input.name) || `product-${id.slice(0, 8)}`;

  if (store.products.some((p) => p.slug === slug)) {
    slug = `${slug}-${id.slice(0, 6)}`;
  }

  const product: Product = {
    id,
    name: input.name.trim(),
    slug,
    description: input.description?.trim() || "",
    category: input.category?.trim() || "Crystals",
    price: input.price ?? null,
    currency: input.currency || "EUR",
    images: input.images || [],
    featured: input.featured ? 1 : 0,
    created_at: now,
    updated_at: now,
  };

  store.products.unshift(product);
  writeStore(store);
  return product;
}

export function updateProduct(id: string, input: Partial<ProductInput>): Product | null {
  const store = readStore();
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = store.products[index];
  const name = input.name?.trim() ?? existing.name;
  let slug = existing.slug;

  if (input.name && input.name.trim() !== existing.name) {
    slug = slugify(name) || existing.slug;
    if (store.products.some((p) => p.slug === slug && p.id !== id)) {
      slug = `${slug}-${id.slice(0, 6)}`;
    }
  }

  const updated: Product = {
    ...existing,
    name,
    slug,
    description:
      input.description !== undefined ? input.description.trim() : existing.description,
    category: input.category !== undefined ? input.category.trim() : existing.category,
    price: input.price !== undefined ? input.price : existing.price,
    currency: input.currency ?? existing.currency,
    images: input.images ?? existing.images,
    featured:
      input.featured !== undefined ? (input.featured ? 1 : 0) : existing.featured,
    updated_at: new Date().toISOString(),
  };

  store.products[index] = updated;
  writeStore(store);
  return updated;
}

export function deleteProduct(id: string) {
  const store = readStore();
  const next = store.products.filter((p) => p.id !== id);
  if (next.length === store.products.length) return false;
  writeStore({ products: next });
  return true;
}

export function listCategories() {
  const cats = new Set(
    readStore()
      .products.map((p) => p.category)
      .filter(Boolean),
  );
  return [...cats].sort();
}
