"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const list = images.length ? images : ["/logo.jpg"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-cream-deep">
        <Image
          src={list[active]}
          alt={`${name} image ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden border transition ${
                i === active ? "border-gold" : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
