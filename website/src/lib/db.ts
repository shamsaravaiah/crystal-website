import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "store.db");

let db: Database.Database | null = null;

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number | null;
  currency: string;
  images: string[];
  featured: number;
  created_at: string;
  updated_at: string;
};

export function getDb() {
  if (db) return db;

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Crystals',
      price REAL,
      currency TEXT NOT NULL DEFAULT 'EUR',
      images TEXT NOT NULL DEFAULT '[]',
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  return db;
}

export function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    description: String(row.description ?? ""),
    category: String(row.category ?? "Crystals"),
    price: row.price == null ? null : Number(row.price),
    currency: String(row.currency ?? "EUR"),
    images: JSON.parse(String(row.images || "[]")) as string[],
    featured: Number(row.featured ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
