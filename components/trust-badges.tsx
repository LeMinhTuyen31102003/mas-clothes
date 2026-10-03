import { PackageCheck, Undo2, Ruler, Sparkles, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: PackageCheck,
    title: "Kiểm Tra Hàng COD",
    desc: "Xem hàng trước khi thanh toán",
  },
  {
    icon: Undo2,
    title: "Đổi Trả Nếu Lỗi",
    desc: "Đổi trả nhanh chóng nếu sản phẩm lỗi",
  },
  {
    icon: Ruler,
    title: "Co Giãn Linh Hoạt",
    desc: "Ôm dáng, dễ mặc ở nhà, đi chơi, đi làm",
  },
  {
    icon: Sparkles,
    title: "Giữ Nhiệt 37°C",
    desc: "Mềm mại, khóa ẩm, chống tĩnh điện",
  },
  {
    icon: Truck,
    title: "Miễn Phí Ship",
    desc: "Giao toàn quốc, thanh toán khi nhận",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-paper-alt px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center font-display text-3xl font-semibold text-ink">
          Cam Kết Từ M.A.S Clothes
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-surface p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft">
                <Icon size={18} strokeWidth={1.7} className="text-accent-dark" />
              </div>
              <div className="mb-1 text-sm font-bold text-ink">{title}</div>
              <div className="text-[12.5px] leading-relaxed text-ink-muted">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
