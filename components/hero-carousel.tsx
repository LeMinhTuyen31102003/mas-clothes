"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PRODUCT_PHOTOS } from "@/lib/pricing";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PRODUCT_PHOTOS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const active = PRODUCT_PHOTOS[index];

  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-none">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-tint via-paper-alt to-transparent sm:-inset-6" />
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-line shadow-xl">
        {PRODUCT_PHOTOS.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={`Áo tay dài cổ tim M.A.S Clothes màu ${photo.colorLabel}`}
            fill
            priority={i === 0}
            sizes="(min-width: 640px) 420px, 320px"
            className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 backdrop-blur transition-all">
          <span
            className="h-2.5 w-2.5 rounded-full border border-line"
            style={{ backgroundColor: active.swatch }}
          />
          <span className="text-[11.5px] font-semibold text-ink">{active.colorLabel}</span>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {PRODUCT_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Xem ảnh màu ${photo.colorLabel}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-accent" : "w-1.5 bg-surface/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
