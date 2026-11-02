"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer, Tooltip } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";

const rows = [
  { label: "January", visitors: 186 }, { label: "February", visitors: 305 },
  { label: "March", visitors: 237 }, { label: "April", visitors: 273 },
  { label: "May", visitors: 209 }, { label: "June", visitors: 214 },
];

export default function RadarChartCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : rows[activeIndex];
  const total = rows.reduce((sum, row) => sum + row.visitors, 0);
  const headline = active?.visitors ?? total;
  return <div className="space-y-5"><div className="mx-auto w-full max-w-[448px]"><ChartCard title="Visitors">
    <div className="mb-3 flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{active?.label ?? "Visitors"}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={headline} /></p><DeltaChip>+5.2%</DeltaChip></div></div><span className="rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">H1 2024</span></div>
    <div className="h-[231px]"><ResponsiveContainer width="100%" height="100%"><RechartsRadarChart data={rows} margin={{ top: 8, right: 28, bottom: 4, left: 28 }} onMouseMove={(event) => { const index = Number(event?.activeTooltipIndex); setActiveIndex(event?.isTooltipActive && Number.isFinite(index) ? index : null); }} onMouseLeave={() => setActiveIndex(null)}>
      <PolarGrid stroke="var(--border)" /><PolarAngleAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} /><PolarRadiusAxis angle={90} domain={[0, 320]} tick={false} axisLine={false} /><Tooltip content={() => null} />
      <Radar name="Visitors" dataKey="visitors" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.16} strokeWidth={2} activeDot={{ r: 5, fill: "var(--chart-1)", stroke: "var(--background)", strokeWidth: 2, className: "animate-pulse" }} />
    </RechartsRadarChart></ResponsiveContainer></div>
    <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-4 sm:grid-cols-3 lg:grid-cols-6">{rows.map((row) => <div key={row.label} className="rounded-md px-2 py-1.5"><p className="text-[10px] text-muted-foreground">{row.label}</p><p className="mt-1 text-xs font-semibold tabular-nums">{row.visitors}</p></div>)}</div>
  </ChartCard></div></div>;
}
