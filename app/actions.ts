"use server";

import { Resend } from "resend";
import { orderSchema, type OrderInput } from "@/lib/schema";
import { COLORS, COMBOS, formatSizeLabel, formatVND, variantLineLabel } from "@/lib/pricing";
import type { OrderFieldErrors, OrderFormState } from "@/lib/order-state";

export async function submitOrder(
  _prevState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  // Every branch below must return a state object instead of throwing —
  // an uncaught error here surfaces to the client as a raw 500 on the
  // page's own POST route instead of the in-form error message.
  try {
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
      const fieldErrors: OrderFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (
          (key === "fullName" || key === "phone" || key === "address" || key === "variants") &&
          !fieldErrors[key]
        ) {
          fieldErrors[key] = issue.message;
        }
      }
      return {
        success: false,
        error: "Vui lòng kiểm tra lại thông tin được đánh dấu bên dưới.",
        fieldErrors,
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
      .map((v, i) => {
        const color = COLORS.find((c) => c.id === v.color)?.label ?? v.color;
        return `${variantLineLabel(order.combo, i)}: ${formatSizeLabel(v.size)} — Màu ${color}`;
      })
      .join("<br/>");

    const orderCode = Date.now().toString(36).toUpperCase();
    const receivedAt = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    try {
      const resend = new Resend(apiKey);
      const { error: sendError } = await resend.emails.send({
        from: "M.A.S Clothes <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL || "hoangsondz2003@gmail.com",
        subject: `[#${orderCode}] ${order.fullName} — ${order.phone} — ${combo.label}`,
        html: `
          <h2>Đơn hàng mới từ M.A.S Clothes</h2>
          <p><strong>Mã đơn:</strong> #${orderCode} &nbsp; <strong>Thời gian:</strong> ${receivedAt}</p>
          <p><strong>Khách hàng:</strong> ${order.fullName}</p>
          <p><strong>Số điện thoại:</strong> ${order.phone}</p>
          <p><strong>Địa chỉ nhận hàng:</strong> ${order.address}</p>
          <p><strong>Combo:</strong> ${combo.label}${combo.giftQty ? " — tặng thêm 1 áo giữ nhiệt" : ""}</p>
          <p><strong>Chi tiết size / màu:</strong><br/>${variantLines}</p>
          <p><strong>Ghi chú:</strong> ${order.note || "Không có"}</p>
          <p><strong>Tổng thu COD:</strong> ${formatVND(combo.total)}</p>
        `,
      });
      if (sendError) {
        console.error("Gửi email đơn hàng thất bại:", sendError);
        return {
          success: false,
          error: "Gửi đơn hàng thất bại, vui lòng thử lại hoặc gọi hotline.",
        };
      }
      return { success: true };
    } catch (err) {
      console.error("Gửi email đơn hàng thất bại:", err);
      return {
        success: false,
        error: "Gửi đơn hàng thất bại, vui lòng thử lại hoặc gọi hotline.",
      };
    }
  } catch (err) {
    console.error("Lỗi không xác định khi xử lý đơn hàng:", err);
    return {
      success: false,
      error: "Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline để được hỗ trợ.",
    };
  }
}
