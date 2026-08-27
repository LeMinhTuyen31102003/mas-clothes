import { z } from "zod";
import { SIZES } from "./pricing";

const VN_PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const variantSchema = z.object({
  size: z.enum(SIZES),
  color: z.string().min(1, "Vui lòng chọn màu"),
});

export const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Họ tên tối thiểu 2 ký tự"),
  phone: z
    .string()
    .trim()
    .regex(VN_PHONE_REGEX, "Số điện thoại không hợp lệ"),
  address: z
    .string()
    .trim()
    .min(8, "Vui lòng nhập địa chỉ đầy đủ (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành)"),
  combo: z.enum(["1", "2", "3"]),
  variants: z.array(variantSchema).min(1, "Vui lòng chọn size và màu"),
  note: z.string().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;
