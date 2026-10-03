import Image from "next/image";
import { PRODUCT_PHOTOS } from "@/lib/pricing";

export function ProductGallery() {
  return (
    <section className="bg-surface px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-extrabold tracking-[0.16em] text-sale">ÁO GIỮ NHIỆT NỮ</p>
        <h2 className="mb-8 text-center font-display text-3xl font-semibold text-ink">Áo Cổ Cao Giữ Ấm</h2>

        <div className="mx-auto grid max-w-md gap-4">
          {PRODUCT_PHOTOS.map((item) => (
            <div key={item.src} className="overflow-hidden rounded-2xl border border-line bg-white">
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 360px, 90vw"
                  className="object-contain"
                />
              </div>
              <div className="border-t border-line bg-paper-alt px-3 py-2.5 text-[12.5px] font-semibold text-ink">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
