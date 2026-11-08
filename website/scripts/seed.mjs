import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const storePath = path.join(dataDir, "products.json");
const seedPath = path.join(dataDir, "products.seed.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const catalog = [
  {
    name: "Lapis Lazuli & Silver",
    category: "Jewelry",
    featured: 1,
    description:
      "Bring your style to life with striking Lapis Lazuli or choose the timeless beauty of silver. Hand-selected pieces that blend deep celestial blue with refined metalwork.",
    images: [
      "/products/2025-03-15_23-43-12_UTC_1.jpg",
      "/products/2025-03-15_23-43-12_UTC_2.jpg",
      "/products/2025-03-15_23-43-12_UTC_3.jpg",
      "/products/2025-03-15_23-43-12_UTC_4.jpg",
    ],
  },
  {
    name: "Emerald Radiance",
    category: "Gemstones",
    featured: 1,
    description:
      "Emerald does more than sparkle — it radiates positive energy and calm. A luminous green gemstone chosen for its clarity and serene presence.",
    images: ["/products/2025-04-03_14-11-21_UTC.jpg"],
  },
  {
    name: "Afghan Emerald Set — Panjshir",
    category: "Gemstones",
    featured: 1,
    description:
      "A rare set featuring Afghan emerald from Panjshir — one of the world's most celebrated sources of deep green emerald of fine quality.",
    images: [
      "/products/2025-12-27_22-02-04_UTC_1.jpg",
      "/products/2025-12-27_22-02-04_UTC_2.jpg",
      "/products/2025-12-27_22-02-04_UTC_3.jpg",
    ],
  },
  {
    name: "Turquoise Stories",
    category: "Gemstones",
    featured: 1,
    description:
      "Every turquoise tells its own story. Known as a stone of protection and calm, these pieces carry soft sky-blue tones and unique natural patterning.",
    images: [
      "/products/2025-12-27_22-46-48_UTC_1.jpg",
      "/products/2025-12-27_22-46-48_UTC_2.jpg",
      "/products/2025-12-27_22-46-48_UTC_3.jpg",
    ],
  },
  {
    name: "Apatite",
    category: "Crystals",
    featured: 0,
    description:
      "Natural beauty from the earth. Apatite is associated with energy, motivation, and inspiration — a stone that keeps drawing the eye.",
    images: ["/products/2026-08-20_19-57-12_UTC.jpg"],
  },
  {
    name: "Celestine",
    category: "Crystals",
    featured: 1,
    description:
      "Calm and beauty in one stone. Celestine is known for harmony and a relaxed presence, with a distinctive soft luminous character.",
    images: ["/products/2026-08-20_20-03-20_UTC.jpg"],
  },
  {
    name: "925 Silver Rings",
    category: "Jewelry",
    featured: 1,
    description:
      "925 sterling silver rings — each with its own character. Refined everyday pieces crafted to last and designed to feel personal.",
    images: [
      "/products/2026-08-22_13-34-51_UTC_1.jpg",
      "/products/2026-08-22_13-34-51_UTC_2.jpg",
      "/products/2026-08-22_13-34-51_UTC_3.jpg",
    ],
  },
  {
    name: "Panjshir Emerald",
    category: "Gemstones",
    featured: 0,
    description:
      "Emerald from Panjshir, Afghanistan — a world-famous locality known for deep green stones of excellent quality. Associated with the heart, love, and wisdom.",
    images: ["/products/2026-08-24_17-31-33_UTC.jpg"],
  },
  {
    name: "Druzy Pyrite — Peru",
    category: "Crystals",
    featured: 1,
    description:
      "Druzy pyrite from Peru formed of countless tiny crystals that create a sparkling surface. Associated with strength, confidence, protection, and abundance.",
    images: ["/products/2026-08-28_16-58-36_UTC.jpg"],
  },
  {
    name: "Cabochon Collection",
    category: "Gemstones",
    featured: 1,
    description:
      "Cabochons in a spectrum of colors and patterns — perfect for creating unique rings, pendants, and one-of-a-kind jewelry designs.",
    images: [
      "/products/2026-09-05_18-41-53_UTC_1.jpg",
      "/products/2026-09-05_18-41-53_UTC_2.jpg",
      "/products/2026-09-05_18-41-53_UTC_3.jpg",
      "/products/2026-09-05_18-41-53_UTC_4.jpg",
      "/products/2026-09-05_18-41-53_UTC_5.jpg",
      "/products/2026-09-05_18-41-53_UTC_6.jpg",
      "/products/2026-09-05_18-41-53_UTC_7.jpg",
      "/products/2026-09-05_18-41-53_UTC_8.jpg",
    ],
  },
  {
    name: "Tiger Eye",
    category: "Crystals",
    featured: 0,
    description:
      "With its warm golden banding, tiger eye is known for strength, balance, and focus — a grounded stone with natural chatoyancy.",
    images: [
      "/products/2026-09-16_09-23-37_UTC_1.jpg",
      "/products/2026-09-16_09-23-37_UTC_2.jpg",
      "/products/2026-09-16_09-23-37_UTC_3.jpg",
    ],
  },
  {
    name: "Afghan Lapis Lazuli & Turquoise Rings",
    category: "Jewelry",
    featured: 1,
    description:
      "Beautiful Afghan lapis lazuli and turquoise set into unique rings — deep blues and soft turquoise tones in wearable art.",
    images: [
      "/products/2026-09-16_10-04-46_UTC_1.jpg",
      "/products/2026-09-16_10-04-46_UTC_2.jpg",
    ],
  },
  {
    name: "Amethyst",
    category: "Crystals",
    featured: 0,
    description:
      "Beyond its violet beauty, amethyst is known for its calming and protective qualities — a classic crystal with soft luminous depth.",
    images: ["/products/2026-09-19_12-03-45_UTC.jpg"],
  },
  {
    name: "Crystal Selection",
    category: "Crystals",
    featured: 0,
    description:
      "A curated selection of natural stones — choose the piece that speaks to you.",
    images: [
      "/products/2026-09-30_06-44-53_UTC_1.jpg",
      "/products/2026-09-30_06-44-53_UTC_2.jpg",
    ],
  },
  {
    name: "Ammonite — Madagascar",
    category: "Fossils",
    featured: 1,
    description:
      "Ammonite from Madagascar — a remarkable fossil from a world millions of years ago, with spiral form and mineralized beauty.",
    images: ["/products/2026-10-10_19-11-48_UTC.jpg"],
  },
  {
    name: "Gemstone Trees",
    category: "Decor",
    featured: 0,
    description:
      "Beautiful gemstone trees — striking accents for your interior and thoughtful gifts that bring color and crystal energy into a space.",
    images: ["/products/2026-10-27_14-13-30_UTC.jpg"],
  },
];

const now = new Date().toISOString();
const products = catalog.map((p) => ({
  id: randomUUID(),
  name: p.name,
  slug: slugify(p.name),
  description: p.description,
  category: p.category,
  price: null,
  currency: "EUR",
  images: p.images,
  featured: p.featured ? 1 : 0,
  created_at: now,
  updated_at: now,
}));

const payload = JSON.stringify({ products }, null, 2);
fs.writeFileSync(seedPath, payload);
fs.writeFileSync(storePath, payload);

console.log(`Seeded ${products.length} products into:`);
console.log(`  ${seedPath}`);
console.log(`  ${storePath}`);
