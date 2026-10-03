"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Phone, User, CheckCircle2, X } from "lucide-react";
import { submitOrder } from "@/app/actions";
import { initialOrderFormState, type OrderFieldErrors } from "@/lib/order-state";
import {
  COLORS,
  COMBOS,
  SIZES,
  formatVND,
  variantCount,
  variantLineLabel,
  type ColorId,
  type ComboKey,
  type Size,
} from "@/lib/pricing";

type Variant = { size: Size; color: ColorId };

const FIELD_ORDER: (keyof OrderFieldErrors)[] = ["fullName", "phone", "address", "variants"];

const inputBase =
  "h-12 w-full rounded-lg border bg-paper pl-10 pr-3.5 text-[13.5px] text-ink placeholder:text-ink-faint focus:outline-none";
const textareaBase =
  "w-full resize-none rounded-lg border bg-paper py-3 pl-10 pr-3.5 text-[13.5px] text-ink placeholder:text-ink-faint focus:outline-none";

function borderClass(hasError: boolean) {
  return hasError ? "border-red-400 focus:border-red-500" : "border-line focus:border-accent";
}

function buildVariants(qty: number, prev: Variant[]): Variant[] {
  const next = [...prev];
  while (next.length < qty) {
    next.push({ size: "M", color: COLORS[next.length % COLORS.length].id });
  }
  next.length = qty;
  return next;
}

export function OrderForm() {
  const [state, formAction, isPending] = useActionState(submitOrder, initialOrderFormState);
  const [comboKey, setComboKey] = useState<ComboKey>("2");
  const [variants, setVariants] = useState<Variant[]>(() => buildVariants(variantCount("2"), []));
  const [dismissed, setDismissed] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const variantsRef = useRef<HTMLDivElement>(null);

  const combo = COMBOS[comboKey];
  const showSuccess = state.success && !dismissed;
  const fieldErrors = state.fieldErrors;

  useEffect(() => {
    if (isPending) setDismissed(false);
  }, [isPending]);

  useEffect(() => {
    function onSelect(event: Event) {
      const key = (event as CustomEvent<string>).detail;
      if (key !== "1" && key !== "2") return;
      setComboKey(key);
      setVariants((prev) => buildVariants(variantCount(key), prev));
    }
    window.addEventListener("mas-select-combo", onSelect);
    return () => window.removeEventListener("mas-select-combo", onSelect);
  }, []);

  useEffect(() => {
    if (!fieldErrors) return;
    const refs = { fullName: fullNameRef, phone: phoneRef, address: addressRef, variants: variantsRef };
    const firstInvalid = FIELD_ORDER.find((key) => fieldErrors[key]);
    if (!firstInvalid) return;
    const target = refs[firstInvalid].current;
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (target instanceof HTMLElement && "focus" in target) target.focus();
  }, [fieldErrors]);

  function handleComboChange(key: ComboKey) {
    setComboKey(key);
    setVariants((prev) => buildVariants(variantCount(key), prev));
  }

  function updateVariant<K extends keyof Variant>(index: number, field: K, value: Variant[K]) {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  }

  return (
    <section id="order" className="relative scroll-mt-20 bg-surface px-5 pb-28 pt-12 sm:scroll-mt-6 sm:px-8 sm:pb-12">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-1.5 text-center font-display text-3xl font-semibold text-ink">
          Thông Tin Đặt Hàng
        </h2>
        <p className="mb-7 text-center text-[12.5px] text-ink-muted">
          Điền thông tin, M.A.S Clothes sẽ gọi xác nhận trước khi giao hàng
        </p>

        <form action={formAction} noValidate className="flex flex-col gap-5">
          <input type="hidden" name="combo" value={comboKey} />
          <input type="hidden" name="variants" value={JSON.stringify(variants)} />

          <Field label="Họ và tên" error={fieldErrors?.fullName}>
            <div className="relative">
              <User size={16} strokeWidth={1.7} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                ref={fullNameRef}
                name="fullName"
                placeholder="Nguyễn Thị A"
                aria-invalid={!!fieldErrors?.fullName}
                className={`${inputBase} ${borderClass(!!fieldErrors?.fullName)}`}
              />
            </div>
          </Field>

          <Field label="Số điện thoại" error={fieldErrors?.phone}>
            <div className="relative">
              <Phone size={16} strokeWidth={1.7} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                ref={phoneRef}
                name="phone"
                type="tel"
                placeholder="09xx xxx xxx"
                aria-invalid={!!fieldErrors?.phone}
                className={`${inputBase} ${borderClass(!!fieldErrors?.phone)}`}
              />
            </div>
          </Field>

          <Field label="Địa chỉ nhận hàng" error={fieldErrors?.address}>
            <div className="relative">
              <MapPin size={16} strokeWidth={1.7} className="absolute left-3.5 top-3.5 text-ink-faint" />
              <textarea
                ref={addressRef}
                name="address"
                rows={2}
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                aria-invalid={!!fieldErrors?.address}
                className={`${textareaBase} ${borderClass(!!fieldErrors?.address)}`}
              />
            </div>
          </Field>

          <Field label="Chọn gói">
            <div className="grid grid-cols-2 gap-2">
              {(["2", "1"] as ComboKey[]).map((key) => {
                const item = COMBOS[key];
                const selected = comboKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleComboChange(key)}
                    className={`rounded-2xl border-2 p-3 text-left transition-colors ${
                      selected ? "border-sale bg-sale-soft shadow-[0_10px_22px_-14px_rgba(225,6,0,0.8)]" : "border-line bg-paper"
                    }`}
                  >
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wide ${
                        selected ? "bg-sale text-white" : "bg-paper-alt text-ink-muted"
                      }`}
                    >
                      {item.tag}
                    </span>
                    <div className="mt-2 text-[13px] font-extrabold text-ink">{item.label}</div>
                    <div className="text-lg font-extrabold leading-tight text-sale">{formatVND(item.total)}</div>
                    <div className="text-[11px] text-ink-faint line-through">{formatVND(item.compareAt)}</div>
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Size cho từng áo" error={fieldErrors?.variants}>
            <p className="mb-2 text-[12px] font-semibold text-ink-muted">Màu {COLORS[0].label}</p>
            <div ref={variantsRef} tabIndex={-1} className="flex flex-col gap-2 outline-none">
              {variants.map((variant, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-16 flex-none text-[12px] font-semibold text-ink">
                    {variantLineLabel(comboKey, i)}
                  </span>

                  <div className="relative flex-1">
                    <select
                      value={variant.size}
                      onChange={(e) => updateVariant(i, "size", e.target.value as Size)}
                      className="h-11 w-full appearance-none rounded-lg border border-line bg-paper pl-3 pr-8 text-[13px] text-ink focus:border-accent focus:outline-none"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          Size {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                  </div>
                </div>
              ))}
            </div>
          </Field>

          <Field label="Ghi chú (tuỳ chọn)">
            <textarea
              name="note"
              rows={2}
              placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
              className="w-full resize-none rounded-lg border border-line bg-paper px-3.5 py-3 text-[13.5px] text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
          </Field>

          <div className="rounded-2xl border border-[#ffd0c8] bg-sale-soft px-4 py-4">
            <div className="mb-2 flex items-center justify-between text-[13px] text-ink-muted">
              <span>Giá gốc</span>
              <span className="line-through">{formatVND(combo.compareAt)}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-[13px] text-ink-muted">
              <span>Giá flash sale</span>
              <span>{formatVND(combo.subtotal)}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-[13px] text-ink-muted">
              <span>Phí vận chuyển</span>
              <span className="font-extrabold text-sale">Miễn phí</span>
            </div>
            {combo.giftQty > 0 && (
              <div className="mb-2 flex items-center justify-between text-[13px] text-ink-muted">
                <span>Quà tặng</span>
                <span className="font-extrabold text-sale">1 áo giữ nhiệt</span>
              </div>
            )}
            <div className="mb-3 h-px bg-[#ffd0c8]" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-extrabold text-ink">Tổng thanh toán</span>
              <span className="text-3xl font-extrabold text-sale">{formatVND(combo.total)}</span>
            </div>
          </div>

          {state.error && (
            <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-[12.5px] text-red-700">{state.error}</p>
          )}

          <button type="submit" disabled={isPending} className="btn-buy btn-buy-lg w-full">
            <span className="flex flex-col items-center leading-tight">
              <span>{isPending ? "ĐANG GỬI ĐƠN..." : "ĐẶT HÀNG NGAY"}</span>
              {!isPending && (
                <span className="mt-0.5 text-[11px] font-bold tracking-normal">
                  {formatVND(combo.total)} · Miễn phí ship{combo.giftQty > 0 ? " · Tặng 1 áo" : ""}
                </span>
              )}
            </span>
          </button>
          <p className="-mt-2 text-center text-[11.5px] text-ink-faint">Thanh toán khi nhận hàng (COD)</p>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="relative w-full max-w-sm rounded-2xl bg-surface p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Đóng"
              className="absolute right-4 top-4 text-ink-faint hover:text-ink"
            >
              <X size={18} />
            </button>
            <CheckCircle2 size={44} className="mx-auto mb-4 text-accent-dark" strokeWidth={1.6} />
            <h3 className="mb-2 font-display text-2xl font-semibold text-ink">Đặt Hàng Thành Công!</h3>
            <p className="text-[13.5px] leading-relaxed text-ink-muted">
              Cảm ơn bạn đã tin chọn M.A.S Clothes. Chúng tôi sẽ gọi xác nhận đơn hàng trong thời gian sớm nhất.
            </p>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="mt-5 h-11 w-full rounded-lg bg-accent text-sm font-bold text-white"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: Readonly<{ label: string; error?: string; children: React.ReactNode }>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[11.5px] text-red-600">{error}</span>}
    </label>
  );
}
