import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "products.json");
const seedPath = path.join(dataDir, "products.seed.json");

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

type Store = {
  products: Product[];
};

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readSeed(): Store {
  if (!fs.existsSync(seedPath)) {
    return { products: [] };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(seedPath, "utf8")) as Store;
    return { products: Array.isArray(parsed.products) ? parsed.products : [] };
  } catch {
    return { products: [] };
  }
}

export function readStore(): Store {
  ensureDataDir();

  if (fs.existsSync(storePath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(storePath, "utf8")) as Store;
      if (Array.isArray(parsed.products) && parsed.products.length > 0) {
        return { products: parsed.products };
      }
    } catch {
      // fall through to seed
    }
  }

  const seed = readSeed();
  if (seed.products.length > 0) {
    try {
      writeStore(seed);
    } catch {
      // Read-only filesystem: still serve seed in memory
    }
  }
  return seed;
}

export function writeStore(store: Store) {
  ensureDataDir();
  const tmp = `${storePath}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2));
  fs.renameSync(tmp, storePath);
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
