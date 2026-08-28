export const SIZES = ["M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export const SIZE_WEIGHT_RANGES: Record<Size, string> = {
  M: "42 - 55kg",
  L: "55 - 66kg",
  XL: "66 - 75kg",
};

export const COLORS = [
  { id: "den", label: "Đen", swatch: "#1c1c1c" },
  { id: "trang-kem", label: "Trắng Kem", swatch: "#ede6d8" },
  { id: "do-do", label: "Đỏ Đô", swatch: "#6b1f2a" },
] as const;
export type ColorId = (typeof COLORS)[number]["id"];

export const PRODUCT_PHOTOS = [
  { src: "/aothun1.jpg", colorLabel: COLORS[0].label, swatch: COLORS[0].swatch },
  { src: "/aothun2.jpg", colorLabel: COLORS[1].label, swatch: COLORS[1].swatch },
  { src: "/aothun3.jpg", colorLabel: COLORS[2].label, swatch: COLORS[2].swatch },
] as const;

export type ComboKey = "1" | "2" | "3";

export const COMBOS: Record<
  ComboKey,
  {
    qty: number;
    label: string;
    priceNote: string;
    subtotal: number;
    shipping: number;
    total: number;
    freeship: boolean;
    highlight: boolean;
    tag?: string;
    savingsNote?: string;
  }
> = {
  "1": {
    qty: 1,
    label: "Mua 1 Áo",
    priceNote: "99.000đ + 30.000đ ship",
    subtotal: 99000,
    shipping: 30000,
    total: 129000,
    freeship: false,
    highlight: false,
  },
  "2": {
    qty: 2,
    label: "Mua 2 Áo",
    priceNote: "99.000đ / áo",
    subtotal: 199000,
    shipping: 0,
    total: 198000,
    freeship: true,
    highlight: false,
    tag: "FREESHIP",
    savingsNote: "Tiết kiệm 30.000đ phí ship",
  },
  "3": {
    qty: 3,
    label: "Mua 3 Áo",
    priceNote: "99.000đ / áo",
    subtotal: 288000,
    shipping: 0,
    total: 258000,
    freeship: true,
    highlight: true,
    tag: "BÁN CHẠY NHẤT",
    savingsNote: "Miễn phí ship · tiết kiệm nhất",
  },
};

export function formatVND(amount: number): string {
  return `${amount.toLocaleString("vi-VN")}đ`;
}
