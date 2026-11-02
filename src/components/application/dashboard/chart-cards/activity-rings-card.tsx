"use client";

import { useState } from "react";

const rings = [
  { label: "Move", amount: "1,592 kcal", value: 82, color: "var(--chart-3)", radius: 82 },
  { label: "Exercise", amount: "1h 45m", value: 60, color: "var(--chart-2)", radius: 58 },
  { label: "Running", amount: "5.2 km", value: 75, color: "var(--chart-4)", radius: 34 },
] as const;

export default function ActivityRingsChartCard() {
  const [activeRing, setActiveRing] = useState<string | null>(null);
  return <div className="space-y-5"><section className="mx-auto flex h-[330px] w-full max-w-[448px] flex-col gap-4 rounded-[20px] bg-muted/45 p-[10px]" aria-label="Activity rings">
    <p className="mb-[8px] px-[4px] text-[14px] text-muted-foreground">Activity</p>
    <div className="grid h-[57px] shrink-0 grid-cols-3 gap-[8px]">{rings.map((ring) => <div key={ring.label} className={`flex min-w-0 flex-col justify-end gap-px rounded-[12px] bg-background px-[10px] py-[8px] transition-opacity duration-200 ${activeRing && activeRing !== ring.label ? "opacity-50" : ""}`}><span className="flex items-center gap-[6px] truncate text-[14px] text-muted-foreground"><i className="size-[10px] shrink-0 rounded-[4px]" style={{ backgroundColor: ring.color }} />{ring.label}</span><span className="truncate text-[14px] font-medium tabular-nums">{ring.amount}</span></div>)}</div>
    <div className="grid min-h-0 flex-1 place-items-center overflow-visible"><svg viewBox="0 0 200 200" className="size-[210px] max-h-full max-w-full overflow-visible" role="img" aria-label={rings.map((ring) => `${ring.label} ${ring.value}%`).join(", ")} onMouseLeave={() => setActiveRing(null)}>{rings.map((ring) => { const dimmed = activeRing !== null && activeRing !== ring.label; return <g key={ring.label} transform="rotate(-90 100 100)" tabIndex={0} role="button" aria-label={`${ring.label}: ${ring.value}%`} onMouseEnter={() => setActiveRing(ring.label)} onFocus={() => setActiveRing(ring.label)} onBlur={() => setActiveRing(null)} className="cursor-pointer outline-none" style={{ opacity: dimmed ? 0.5 : 1 }}><circle cx="100" cy="100" r={ring.radius} fill="none" stroke={ring.color} strokeOpacity={dimmed ? 0.06 : 0.16} strokeWidth="18" /><circle cx="100" cy="100" r={ring.radius} fill="none" stroke={activeRing === ring.label ? `color-mix(in srgb, ${ring.color} 78%, var(--foreground))` : ring.color} strokeWidth="18" strokeDasharray={`${ring.value} ${100 - ring.value}`} pathLength="100" strokeLinecap="round" /></g>; })}</svg></div>
  </section></div>;
}
