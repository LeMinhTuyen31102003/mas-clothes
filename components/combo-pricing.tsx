import { COMBOS, formatVND } from "@/lib/pricing";

export function ComboPricing() {
  const combos = Object.entries(COMBOS) as [keyof typeof COMBOS, (typeof COMBOS)[keyof typeof COMBOS]][];

  return (
    <section className="bg-paper-alt px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-xs font-bold tracking-[0.18em] text-accent-dark">
          BẢNG GIÁ ƯU ĐÃI
        </p>
        <h2 className="mb-8 text-center font-display text-3xl font-semibold text-ink">
          Mua Càng Nhiều, Tiết Kiệm Càng Lớn
        </h2>

        <div className="grid gap-4 sm:grid-cols-3 sm:items-stretch">
          {combos.map(([key, combo]) => (
            <div
              key={key}
              className={
                combo.highlight
                  ? "relative flex flex-col rounded-2xl border-2 border-accent bg-accent-tint p-5 shadow-[0_14px_28px_-14px_var(--color-accent-dark)] sm:order-2"
                  : `relative flex flex-col rounded-2xl border p-5 ${
                      key === "2" ? "border-accent-soft bg-surface sm:order-1" : "border-line bg-surface sm:order-0"
                    }`
              }
            >
              {combo.tag && (
                <span
                  className={
                    combo.highlight
                      ? "absolute -top-3 left-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-wide text-white"
                      : "absolute -top-3 left-4 rounded-full bg-accent-soft px-3 py-1 text-[10px] font-bold tracking-wide text-accent-dark"
                  }
                >
                  {combo.tag}
                </span>
              )}

              <div className="mt-2 flex items-start justify-between gap-3">
                <div>
                  <div className={`font-bold ${combo.highlight ? "text-[17px]" : "text-[15.5px]"} text-ink`}>
                    {combo.label}
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-faint">{combo.priceNote}</div>
                  {combo.savingsNote && (
                    <div className="mt-1 text-[12.5px] font-semibold text-accent-dark">{combo.savingsNote}</div>
                  )}
                </div>
                <div className="text-right">
                  <div
                    className={`font-display font-bold text-accent-dark ${
                      combo.highlight ? "text-3xl" : "text-2xl"
                    }`}
                  >
                    {formatVND(combo.total)}
                  </div>
                </div>
              </div>

              {combo.highlight && (
                <a
                  href="#order"
                  className="mt-4 block rounded-lg bg-accent py-2.5 text-center text-sm font-bold text-white"
                >
                  Chọn Combo Này
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
