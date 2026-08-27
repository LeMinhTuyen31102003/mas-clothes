import Image from "next/image";
import { PRODUCT_PHOTOS } from "@/lib/pricing";

export function ProductGallery() {
  return (
    <section className="bg-surface px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-bold tracking-[0.18em] text-accent-dark">
          ẢNH THẬT 100%
        </p>
        <h2 className="mb-8 text-center font-display text-3xl font-semibold text-ink">
          3 Màu Basic Dễ Phối Đồ
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {PRODUCT_PHOTOS.map((item) => (
            <div key={item.src} className="overflow-hidden rounded-2xl border border-line">
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.src}
                  alt={`Áo tay dài cổ tim M.A.S Closet màu ${item.colorLabel}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 bg-paper-alt px-3 py-2.5">
                <span
                  className="h-3.5 w-3.5 flex-none rounded-full border border-line"
                  style={{ backgroundColor: item.swatch }}
                />
                <span className="text-[12.5px] font-semibold text-ink">{item.colorLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
