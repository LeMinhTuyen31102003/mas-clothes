import { ArrowRight } from "lucide-react";
import { COMBOS, formatVND } from "@/lib/pricing";

export function StickyCta() {
  const best = COMBOS["3"];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-surface px-5 py-2.5 shadow-[0_-8px_20px_-12px_rgba(0,0,0,0.18)] sm:hidden">
      <div className="text-[11px] leading-tight text-ink-muted">
        Combo 3 áo chỉ
        <br />
        <span className="font-display text-lg font-bold text-accent-dark">{formatVND(best.total)}</span>
      </div>
      <a
        href="#order"
        className="flex h-12 items-center gap-1.5 rounded-xl bg-accent px-5 text-sm font-bold text-white"
      >
        Mua Ngay
        <ArrowRight size={15} strokeWidth={2.4} />
      </a>
    </div>
  );
}
