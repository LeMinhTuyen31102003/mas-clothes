import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "./hero-carousel";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 sm:items-center">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-accent-dark">
            ÁO TAY DÀI CỔ TIM BASIC
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.15] text-ink sm:text-5xl">
            Tôn Dáng Phái Đẹp,
            <br />
            <em className="italic text-accent">Sang Trọng</em> Mỗi Ngày
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Chất liệu co giãn 4 chiều, ôm nhẹ tôn form, cổ tim tinh tế mặc được cả ngày dài.
            Ảnh thật 100%, kiểm tra hàng trước khi thanh toán.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#order"
              className="flex h-13 items-center justify-center gap-2 rounded-xl bg-accent px-7 text-[15px] font-bold text-white shadow-[0_10px_24px_-8px_var(--color-accent-dark)] transition-transform hover:scale-[1.02]"
            >
              Đặt Hàng Ngay
              <ArrowRight size={16} strokeWidth={2.4} />
            </a>
            <span className="text-xs text-ink-faint sm:text-sm">
              hoặc xem bảng giá ưu đãi bên dưới ↓
            </span>
          </div>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}
