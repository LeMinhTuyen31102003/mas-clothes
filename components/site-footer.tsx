import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { CONTACT } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal px-5 pb-24 pt-10 text-[#EFE6DC] sm:px-8 sm:pb-10">
      <div className="mx-auto max-w-3xl">
        <Logo size={34} tone="light" />
        <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-[#B7ACA2]">
          Áo giữ nhiệt nữ — mỏng nhẹ, ôm dáng, ấm áp. Flash sale 139K, freeship.
        </p>

        <div className="mt-6 flex items-center gap-2.5">
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-soft transition-colors hover:bg-accent-dark"
            aria-label="Gọi hotline"
          >
            <Phone size={15} strokeWidth={1.8} />
          </a>
          <a
            href={CONTACT.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-soft text-[13px] font-bold transition-colors hover:bg-accent-dark"
            aria-label="Nhắn Zalo"
          >
            Z
          </a>
          <a
            href={CONTACT.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-soft text-[13px] font-bold transition-colors hover:bg-accent-dark"
            aria-label="Fanpage Facebook"
          >
            f
          </a>
          <span className="text-[11.5px] leading-relaxed text-[#B7ACA2]">
            {CONTACT.phoneDisplay} · Zalo · Fanpage
          </span>
        </div>

        <div className="mt-5 h-px bg-charcoal-soft" />
        <p className="mt-4 text-[11px] text-[#8A7F76]">© 2026 M.A.S Clothes. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}
