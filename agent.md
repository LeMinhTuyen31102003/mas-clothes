# Product Requirements Document (PRD): Landing Page - M.A.S Clothes

## 1. Project Overview
Build a high-converting, mobile-first, lightweight Landing Page for local brand **M.A.S Clothes**, optimized for fast loading and Core Web Vitals.
The core goal is to showcase the fashion product (Áo dài / thời trang nữ), promote combo pricing tiers, and process direct orders sent to Gmail.

## 2. Technical Stack & Architecture
- **Framework:** Next.js (App Router, TypeScript, Tailwind CSS).
- **Icons:** Lucide-react.
- **Form Handling:** Client Form with Server Actions.
- **Validation:** Zod schema validation (Client & Server).
- **Email Service:** Resend API (`resend` npm package).
- **Database:** None required (Stateless architecture).
- **Hosting Target:** Vercel or Cloudflare Pages (Free Tier).

## 3. Brand & Pricing Configuration

### Brand Information:
- **Brand Name:** M.A.S Clothes
- **Style:** Modern, elegant, clean local brand aesthetic (soft tones, minimalist typography).

### Promotional Pricing Strategy (Combo Tiers):
- **Combo 1:** Mua 1 áo: `99.000đ` + `30.000đ ship` = **129.000đ**
- **Combo 2:** Mua 2 áo: `99.000đ/c` = **199.000đ** (Miễn phí vận chuyển)
- **Combo 3 (Best Deal):** Mua 3 áo: `99.000đ/c` = **288.000đ** (Miễn phí vận chuyển - Tiết kiệm nhất)

## 4. Key Features & Page Structure

### A. Hero & Product Section
- **Brand Identity:** Prominent "M.A.S Clothes" branding and slogan.
- **Highlight Promo Badges:** Visual comparison table/cards showing the 3 pricing tiers (emphasizing Free Ship on 2+ items).
- **Product Gallery:** High-resolution product images, close-ups of fabric/stitching, size guide chart.
- **Trust Elements:** Cam kết đổi trả nếu lỗi, kiểm tra hàng trước khi thanh toán (COD), cam kết chuẩn form dáng.
- **Urgency Banner:** Countdown timer / Flash Sale tag.

### B. Sticky CTA & Interactive Order Form
- Floating "Mua Ngay" button smoothly scrolling down to the order section.
- **Dynamic Pricing Calculator:** As the user selects or changes quantity (1, 2, 3+ items), the UI dynamically updates the subtotal, shipping fee, and final payable amount according to the pricing rules above.
- **Form Fields:**
  1. `fullName` (text, required, min 2 chars)
  2. `phone` (tel, required, VN regex: `/(84|0[3|5|7|8|9])+([0-9]{8})\b/`)
  3. `address` (text, required: Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành)
  4. `selectedCombo` / `quantity` (Select 1, 2, or 3 áo)
  5. `variants` (Dynamic selection of Color/Size based on the quantity chosen, e.g., if buying 2 shirts, show 2 dropdowns for Size/Color)
  6. `note` (textarea, optional)
  7. `totalAmount` (calculated automatically on submit)

### C. Backend & Email Flow
- **Destination Email:** `hoangsondz2003@gmail.com`
- **Sender:** Resend API integration (`process.env.RESEND_API_KEY`).
- **Submit Logic:**
  1. Validate payload with Zod.
  2. Format and send an email notification to `hoangsondz2003@gmail.com` containing:
     - Customer info (Name, Phone, Full Address).
     - Order details (Combo chosen, specific Colors/Sizes per item, Quantity).
     - Total price to collect (COD amount).
     - Note (if any).
  3. Return `{ success: true }`.
  4. Display an inline success confirmation modal without refreshing the page.

## 5. Environment Variables Required
```env
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=hoangsondz2003@gmail.com