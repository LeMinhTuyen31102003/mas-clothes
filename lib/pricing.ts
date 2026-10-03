export const SIZES = ["M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export const SIZE_WEIGHT_RANGES: Record<Size, string> = {
  M: "42 - 55kg",
  L: "55 - 66kg",
  XL: "66 - 75kg",
};

export const COLORS = [{ id: "den", label: "Đen", swatch: "#1c1c1c" }] as const;
export type ColorId = (typeof COLORS)[number]["id"];

export const PRODUCT_PHOTOS = [
  {
    src: "/products/lifestyle.png",
    alt: "Người mẫu mặc bộ giữ nhiệt nữ cổ cao màu đen",
    caption: "Tôn dáng, thêm khí chất",
  },
  {
    src: "/products/set.png",
    alt: "Bộ áo cổ cao và quần dài giữ nhiệt màu đen",
    caption: "Áo cổ cao + quần dài",
  },
  {
    src: "/products/warmth.png",
    alt: "Bộ giữ nhiệt nữ mỏng nhẹ, ôm dáng, ấm áp",
    caption: "Mỏng nhẹ · Ôm dáng · Ấm áp",
  },
  {
    src: "/products/moisture.png",
    alt: "Áo giữ ẩm, khóa ẩm và giữ nhiệt 37 độ",
    caption: "Khóa ẩm · Giữ nhiệt 37°C",
  },
] as const;

export type ComboKey = "1" | "2";

export const COMBOS: Record<
  ComboKey,
  {
    qty: number;
    giftQty: number;
    label: string;
    priceNote: string;
    compareAt: number;
    subtotal: number;
    shipping: number;
    total: number;
    freeship: boolean;
    highlight: boolean;
    tag: string;
    giftNote?: string;
  }
> = {
  "1": {
    qty: 1,
    giftQty: 0,
    label: "Mua 1 Bộ",
    priceNote: "Miễn phí ship toàn quốc",
    compareAt: 219000,
    subtotal: 139000,
    shipping: 0,
    total: 139000,
    freeship: true,
    highlight: false,
    tag: "FREESHIP",
  },
  "2": {
    qty: 2,
    giftQty: 1,
    label: "Combo 2 Bộ",
    priceNote: "Miễn phí ship toàn quốc",
    compareAt: 438000,
    subtotal: 229000,
    shipping: 0,
    total: 229000,
    freeship: true,
    highlight: true,
    tag: "TẶNG THÊM 1 ÁO",
    giftNote: "Tặng thêm 1 áo giữ nhiệt",
  },
};

export function variantCount(comboKey: ComboKey): number {
  const combo = COMBOS[comboKey];
  return combo.qty + combo.giftQty;
}

export function variantLineLabel(comboKey: ComboKey, index: number): string {
  const combo = COMBOS[comboKey];
  if (index < combo.qty) return combo.qty > 1 ? `Bộ ${index + 1}` : "Bộ";
  return "Áo tặng";
}

export function formatVND(amount: number): string {
  return `${amount.toLocaleString("vi-VN")}đ`;
}
