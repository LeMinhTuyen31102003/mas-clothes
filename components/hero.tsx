import { BuyLink } from "./buy-link";
import { HeroCarousel } from "./hero-carousel";
import { COMBOS, formatVND } from "@/lib/pricing";

const PERKS = ["Giữ nhiệt 37°C", "Co giãn linh hoạt", "Mềm mại, khóa ẩm", "Freeship toàn quốc"];

export function Hero() {
  const single = COMBOS["1"];
  const combo = COMBOS["2"];

  return (
    <section className="relative overflow-hidden bg-surface px-5 pb-10 pt-8 sm:px-8 sm:pt-12">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 sm:items-center">
        <div className="order-2 sm:order-1">
          <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-sale">FLASH SALE MÙA LẠNH</p>
          <h1 className="text-4xl font-extrabold leading-[1.12] text-ink sm:text-5xl">Áo Giữ Nhiệt Nữ</h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Áo cổ cao, mỏng nhẹ, ôm dáng, giữ ấm khi trời lạnh. Giá gốc {formatVND(single.compareAt)}, hôm nay chỉ{" "}
            {formatVND(single.total)} và miễn phí ship.
          </p>

          <div className="mt-5 rounded-2xl border border-[#ffd0c8] bg-sale-soft px-4 py-3.5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-sm text-ink-faint line-through">{formatVND(single.compareAt)}</div>
                <div className="text-4xl font-extrabold leading-none text-sale">{formatVND(single.total)}</div>
                <div className="mt-1 text-sm font-bold text-sale-deep">/ áo · Miễn phí ship</div>
              </div>
              <span className="rounded-full bg-sale px-3 py-1 text-[11px] font-extrabold tracking-wide text-white">
                GIẢM 80K
              </span>
            </div>
            <p className="mt-3 border-t border-[#ffd0c8] pt-3 text-[13px] font-semibold text-ink">
              Combo 2 áo {formatVND(combo.total)} · Freeship · Tặng thêm 1 áo
            </p>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {PERKS.map((perk) => (
              <li
                key={perk}
                className="rounded-full border border-[#ffd0c8] bg-white px-3 py-1 text-[12px] font-semibold text-sale-deep"
              >
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <BuyLink combo="2" className="btn-buy btn-buy-lg w-full">
              <span className="flex flex-col items-center leading-tight">
                <span>COMBO 2 ÁO — {formatVND(combo.total)}</span>
                <span className="mt-0.5 text-[12px] font-bold tracking-normal">Tặng thêm 1 áo · Miễn phí ship</span>
              </span>
            </BuyLink>
            <BuyLink combo="1" className="btn-buy btn-buy-lg w-full">
              <span className="flex flex-col items-center leading-tight">
                <span>MUA 1 ÁO — {formatVND(single.total)}</span>
                <span className="mt-0.5 text-[12px] font-bold tracking-normal">Miễn phí ship toàn quốc</span>
              </span>
            </BuyLink>
          </div>
        </div>

        <div className="order-1 sm:order-2">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
