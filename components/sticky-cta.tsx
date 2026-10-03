import { BuyLink } from "./buy-link";
import { COMBOS, formatVND } from "@/lib/pricing";

export function StickyCta() {
  const best = COMBOS["2"];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t-2 border-sale bg-surface px-4 py-2.5 shadow-[0_-10px_24px_-12px_rgba(225,6,0,0.45)] sm:hidden">
      <div className="min-w-0 leading-tight">
        <div className="text-[10px] font-extrabold tracking-wide text-sale">COMBO 2 BỘ · FREESHIP</div>
        <div className="text-xl font-extrabold text-sale">{formatVND(best.total)}</div>
        <div className="text-[10px] text-ink-faint line-through">
          {formatVND(best.compareAt)} · Tặng 1 áo
        </div>
      </div>
      <BuyLink combo="2" className="btn-buy shrink-0 px-4 text-sm">
        MUA NGAY
      </BuyLink>
    </div>
  );
}
