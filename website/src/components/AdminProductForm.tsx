"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/db";

const CATEGORIES = [
  "Crystals",
  "Gemstones",
  "Jewelry",
  "Fossils",
  "Decor",
];

export default function AdminProductForm({
  product,
}: {
  product?: Product;
}) {
  const router = useRouter();
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "Crystals");
  const [price, setPrice] = useState(
    product?.price != null ? String(product.price) : "",
  );
  const [featured, setFeatured] = useState(Boolean(product?.featured));
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      Array.from(files).forEach((file) => form.append("files", file));
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImages((prev) => [...prev, ...data.urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name,
      description,
      category,
      price: price === "" ? null : Number(price),
      featured,
      images,
    };

    try {
      const res = await fetch(
        product ? `/api/products/${product.id}` : "/api/products",
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-6">
      <div>
        <label className="label" htmlFor="name">
          Product name
        </label>
        <input
          id="name"
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="field min-h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="price">
            Price (EUR, optional)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            className="field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Leave empty for inquire"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="accent-[var(--gold)]"
        />
        Feature on homepage
      </label>

      <div>
        <p className="label">Product images</p>
        <label className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-[var(--line)] bg-white/30 px-6 py-10 transition hover:border-gold">
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            {uploading ? "Uploading…" : "Upload one or more photos"}
          </span>
          <span className="mt-2 text-sm text-ink-soft">
            JPG, PNG, WEBP — multiple files allowed
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => onUpload(e.target.files)}
          />
        </label>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((src, i) => (
              <div key={src + i} className="relative aspect-square overflow-hidden bg-cream-deep">
                <Image src={src} alt="" fill className="object-cover" sizes="160px" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 bg-ink/80 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-cream"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="btn-primary" disabled={saving || uploading}>
          {saving ? "Saving…" : product ? "Update product" : "Publish product"}
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
