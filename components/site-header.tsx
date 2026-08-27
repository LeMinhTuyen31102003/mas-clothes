import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { CONTACT } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface/95 px-5 py-3 backdrop-blur sm:px-8">
      <Logo size={38} />
      <a
        href={`tel:${CONTACT.phone}`}
        aria-label="Gọi hotline"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-dark transition-colors hover:bg-accent-tint"
      >
        <Phone size={17} strokeWidth={1.8} />
      </a>
    </header>
  );
}
