"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDeleteButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) return;
    setLoading(true);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Could not delete product");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      className="border border-red-300 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.12em] text-red-800 hover:bg-red-50"
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
