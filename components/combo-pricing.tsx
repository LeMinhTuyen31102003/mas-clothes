import { BuyLink } from "./buy-link";
import { COMBOS, formatVND, type ComboKey } from "@/lib/pricing";

export function ComboPricing() {
  const combos = (Object.entries(COMBOS) as [ComboKey, (typeof COMBOS)[ComboKey]][]).sort(
    (a, b) => Number(b[1].highlight) - Number(a[1].highlight),
  );

  return (
    <section className="bg-paper-alt px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-extrabold tracking-[0.16em] text-sale">BẢNG GIÁ FLASH SALE</p>
        <h2 className="mb-2 text-center font-display text-3xl font-semibold text-ink">Chọn Gói, Nhận Deal Hôm Nay</h2>
        <p className="mb-8 text-center text-[13.5px] text-ink-muted">Cả hai gói đều miễn phí ship toàn quốc</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {combos.map(([key, combo]) => (
            <div
              key={key}
              className={
                combo.highlight
                  ? "relative flex flex-col rounded-2xl border-2 border-sale bg-sale-soft p-5 shadow-[0_16px_32px_-18px_rgba(225,6,0,0.65)]"
                  : "relative flex flex-col rounded-2xl border border-line bg-surface p-5"
              }
            >
              <span
                className={
                  combo.highlight
                    ? "mb-3 inline-flex w-fit rounded-full bg-sale px-3 py-1 text-[10px] font-extrabold tracking-wide text-white"
                    : "mb-3 inline-flex w-fit rounded-full bg-sale-soft px-3 py-1 text-[10px] font-extrabold tracking-wide text-sale-deep"
                }
              >
                {combo.tag}
              </span>

              <div className="text-[17px] font-extrabold text-ink">{combo.label}</div>
              <div className="mt-1 text-[12.5px] text-ink-muted">{combo.priceNote}</div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-sale">{formatVND(combo.total)}</span>
                <span className="text-sm text-ink-faint line-through">{formatVND(combo.compareAt)}</span>
              </div>
              <div className="mt-1 text-[13px] font-bold text-sale-deep">
                Tiết kiệm {formatVND(combo.compareAt - combo.total)}
              </div>
              {combo.giftNote && <div className="mt-1 text-[13px] font-bold text-ink">{combo.giftNote}</div>}

              <BuyLink combo={key} className="btn-buy btn-buy-lg mt-5 w-full">
                {combo.highlight ? "CHỌN COMBO NÀY" : "MUA 1 BỘ"}
              </BuyLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
