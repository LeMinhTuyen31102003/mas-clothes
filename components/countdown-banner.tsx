"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

function getSecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
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

  return (
    <div className="flex items-center justify-center gap-2 bg-accent-dark px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
      <Zap size={14} className="flex-none fill-amber-200 text-amber-200 animate-pulse" />
      <span>
        ƯU ĐÃI HÔM NAY — Mua 3 áo chỉ 288.000đ, freeship
        {seconds !== null && (
          <>
            {" "}
            · Kết thúc sau{" "}
            <span className="font-display font-bold tabular-nums">{formatDuration(seconds)}</span>
          </>
        )}
      </span>
    </div>
  );
}
