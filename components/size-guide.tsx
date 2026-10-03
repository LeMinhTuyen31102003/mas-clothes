import { SIZES, SIZE_WEIGHT_RANGES } from "@/lib/pricing";

export function SizeGuide() {
  return (
    <section className="bg-surface px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-6 text-center font-display text-3xl font-semibold text-ink">
          Hướng Dẫn Chọn Size
        </h2>
        <div className="overflow-hidden rounded-2xl border border-line">
          <div
            className="grid bg-accent-tint"
            style={{ gridTemplateColumns: `1.3fr repeat(${SIZES.length}, 1fr)` }}
          >
            <div className="px-3 py-2.5 text-[11.5px] font-bold text-accent-dark">Size</div>
            {SIZES.map((s) => (
              <div key={s} className="px-2 py-2.5 text-center text-[11.5px] font-bold text-accent-dark">
                {s}
              </div>
            ))}
          </div>
          <div
            className="grid border-t border-line"
            style={{ gridTemplateColumns: `1.3fr repeat(${SIZES.length}, 1fr)` }}
          >
            <div className="px-3 py-2.5 text-[11.5px] text-ink-muted">Cân nặng phù hợp</div>
            {SIZES.map((s) => (
              <div key={s} className="px-2 py-2.5 text-center text-[11.5px] text-ink-muted">
                {SIZE_WEIGHT_RANGES[s]}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[11.5px] text-ink-faint">
          Áo cổ cao và quần dài cùng một size. Combo 2 bộ được chọn size riêng cho áo tặng. Số đo mang tính tham khảo,
          dáng người khác nhau có thể lệch nhẹ.
        </p>
      </div>
    </section>
  );
}
