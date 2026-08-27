"use server";

import { Resend } from "resend";
import { orderSchema, type OrderInput } from "@/lib/schema";
import { COMBOS, formatVND } from "@/lib/pricing";
import type { OrderFormState } from "@/lib/order-state";

export async function submitOrder(
  _prevState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  let variants: unknown;
  try {
    variants = JSON.parse(String(formData.get("variants") ?? "[]"));
  } catch {
    variants = [];
  }

  const raw = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    combo: formData.get("combo"),
    note: formData.get("note") ?? "",
    variants,
  };

  const parsed = orderSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Thông tin không hợp lệ, vui lòng kiểm tra lại.",
    };
  }

  const order: OrderInput = parsed.data;
  const combo = COMBOS[order.combo];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY chưa được cấu hình trong biến môi trường.");
    return {
      success: false,
      error: "Hệ thống đặt hàng đang bảo trì, vui lòng gọi hotline để được hỗ trợ.",
    };
  }

  const variantLines = order.variants
    .map((v, i) => `Áo ${i + 1}: Size ${v.size} — Màu ${v.color}`)
    .join("<br/>");

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "M.A.S Closet <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL || "hoangsondz2003@gmail.com",
      subject: `Đơn hàng mới — ${order.fullName} — ${combo.label}`,
      html: `
        <h2>Đơn hàng mới từ M.A.S Closet</h2>
        <p><strong>Khách hàng:</strong> ${order.fullName}</p>
        <p><strong>Số điện thoại:</strong> ${order.phone}</p>
        <p><strong>Địa chỉ nhận hàng:</strong> ${order.address}</p>
        <p><strong>Combo:</strong> ${combo.label}</p>
        <p><strong>Chi tiết size / màu:</strong><br/>${variantLines}</p>
        <p><strong>Ghi chú:</strong> ${order.note || "Không có"}</p>
        <p><strong>Tổng thu COD:</strong> ${formatVND(combo.total)}</p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error("Gửi email đơn hàng thất bại:", err);
    return {
      success: false,
      error: "Gửi đơn hàng thất bại, vui lòng thử lại hoặc gọi hotline.",
    };
  }
}
