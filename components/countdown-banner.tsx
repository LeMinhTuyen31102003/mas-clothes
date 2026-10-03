"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

function getSecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

function Digit({ value, label }: Readonly<{ value: string; label: string }>) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-11 rounded-md bg-white px-2 py-1 text-center text-lg font-extrabold tabular-nums text-sale shadow-[0_3px_0_rgba(0,0,0,0.18)]">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/85">{label}</span>
    </div>
  );
}

export function CountdownBanner() {
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    setSeconds(getSecondsUntilMidnight());
    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev === null || prev <= 0) return getSecondsUntilMidnight();
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const total = seconds ?? 0;
  const hours = String(Math.floor(total / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const secs = String(total % 60).padStart(2, "0");

  return (
    <div className="bg-sale text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-3.5 sm:flex-row sm:justify-between sm:py-4">
        <div className="text-center sm:text-left">
          <p className="flex items-center justify-center gap-2 text-[13px] font-extrabold tracking-wide sm:justify-start sm:text-[15px]">
            <Flame size={18} className="flame-float fill-amber-300 text-amber-300" />
            ĐẠI TIỆC FLASH SALE — GIẢM SỐC HÔM NAY
            <Flame size={18} className="flame-float flame-float-late fill-amber-300 text-amber-300" />
          </p>
          <p className="mt-1 text-[12px] font-semibold text-white/92 sm:text-[13px]">
            219K còn 139K · Combo 2 áo 229K tặng 1 áo · Freeship
          </p>
        </div>
        <div className="flex items-end gap-1.5" aria-label="Thời gian còn lại trong hôm nay">
          <Digit value={seconds === null ? "--" : hours} label="Giờ" />
          <span className="pb-5 text-lg font-extrabold">:</span>
          <Digit value={seconds === null ? "--" : minutes} label="Phút" />
          <span className="pb-5 text-lg font-extrabold">:</span>
          <Digit value={seconds === null ? "--" : secs} label="Giây" />
        </div>
      </div>
    </div>
  );
}
