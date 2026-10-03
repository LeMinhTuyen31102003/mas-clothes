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
    <div className="relative mx-auto w-full max-w-md sm:max-w-none">
      <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-sale-soft via-paper-alt to-transparent sm:-inset-5" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-[#ffd0c8] bg-white shadow-[0_18px_40px_-24px_rgba(225,6,0,0.55)]">
        {PRODUCT_PHOTOS.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 640px) 460px, 90vw"
            className={`object-contain transition-opacity duration-[900ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <span className="absolute left-3 top-3 rounded-full bg-sale px-3 py-1 text-[11px] font-extrabold tracking-wide text-white">
          FLASH SALE
        </span>

        <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[11.5px] font-semibold text-ink shadow-sm">
          {active.caption}
        </div>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {PRODUCT_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={photo.caption}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-sale" : "w-1.5 bg-ink/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
