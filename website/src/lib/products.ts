import { getDb, rowToProduct, slugify, type Product } from "./db";
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
  const db = getDb();
  let sql = "SELECT * FROM products";
  const params: (string | number)[] = [];
  const clauses: string[] = [];

  if (options?.featured) {
    clauses.push("featured = 1");
  }
  if (options?.category) {
    clauses.push("category = ?");
    params.push(options.category);
  }

  if (clauses.length) sql += ` WHERE ${clauses.join(" AND ")}`;
  sql += " ORDER BY created_at DESC";

  const rows = db.prepare(sql).all(...params) as Record<string, unknown>[];
  return rows.map(rowToProduct);
}

export function getProductById(id: string): Product | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  return row ? rowToProduct(row) : null;
}

export function getProductBySlug(slug: string): Product | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM products WHERE slug = ?").get(slug) as
    | Record<string, unknown>
    | undefined;
  return row ? rowToProduct(row) : null;
}

export function createProduct(input: ProductInput): Product {
  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();
  let slug = slugify(input.name) || `product-${id.slice(0, 8)}`;

  const existing = db.prepare("SELECT id FROM products WHERE slug = ?").get(slug);
  if (existing) slug = `${slug}-${id.slice(0, 6)}`;

  db.prepare(
    `INSERT INTO products (id, name, slug, description, category, price, currency, images, featured, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.name.trim(),
    slug,
    input.description?.trim() || "",
    input.category?.trim() || "Crystals",
    input.price ?? null,
    input.currency || "EUR",
    JSON.stringify(input.images || []),
    input.featured ? 1 : 0,
    now,
    now,
  );

  return getProductById(id)!;
}

export function updateProduct(id: string, input: Partial<ProductInput>): Product | null {
  const existing = getProductById(id);
  if (!existing) return null;

  const db = getDb();
  const name = input.name?.trim() ?? existing.name;
  let slug = existing.slug;
  if (input.name && input.name.trim() !== existing.name) {
    slug = slugify(name) || existing.slug;
    const clash = db
      .prepare("SELECT id FROM products WHERE slug = ? AND id != ?")
      .get(slug, id);
    if (clash) slug = `${slug}-${id.slice(0, 6)}`;
  }

  db.prepare(
    `UPDATE products
     SET name = ?, slug = ?, description = ?, category = ?, price = ?, currency = ?, images = ?, featured = ?, updated_at = ?
     WHERE id = ?`,
  ).run(
    name,
    slug,
    input.description !== undefined ? input.description.trim() : existing.description,
    input.category !== undefined ? input.category.trim() : existing.category,
    input.price !== undefined ? input.price : existing.price,
    input.currency ?? existing.currency,
    JSON.stringify(input.images ?? existing.images),
    input.featured !== undefined ? (input.featured ? 1 : 0) : existing.featured,
    new Date().toISOString(),
    id,
  );

  return getProductById(id);
}

export function deleteProduct(id: string) {
  const db = getDb();
  const result = db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return result.changes > 0;
}

export function listCategories() {
  const db = getDb();
  const rows = db
    .prepare(
      "SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != '' ORDER BY category",
    )
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}
