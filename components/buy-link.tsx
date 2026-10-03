"use client";

import type { ComboKey } from "@/lib/pricing";

export function BuyLink({
  combo,
  children,
  className = "btn-buy w-full",
}: Readonly<{
  combo: ComboKey;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <a
      href="#order"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("mas-select-combo", { detail: combo }));
      }}
    >
      {children}
    </a>
  );
}
