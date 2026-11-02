"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";

const data = [
  { month: "Jan", current: 9840, previous: 8210 }, { month: "Feb", current: 10120, previous: 8460 },
  { month: "Mar", current: 11380, previous: 9950 }, { month: "Apr", current: 10960, previous: 10240 },
  { month: "May", current: 12210, previous: 10880 }, { month: "Jun", current: 12740, previous: 11020 },
  { month: "Jul", current: 13980, previous: 11760 }, { month: "Aug", current: 13120, previous: 12030 },
  { month: "Sep", current: 14210, previous: 12190 }, { month: "Oct", current: 14690, previous: 12480 },
  { month: "Nov", current: 14360, previous: 12160 }, { month: "Dec", current: 14703.92, previous: 11924 },
];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function RevenueChartCard({ title = "Revenue" }: { title?: string } = {}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const current = data.reduce((sum, point) => sum + point.current, 0);
  const previous = data.reduce((sum, point) => sum + point.previous, 0);
  const active = activeIndex === null ? null : data[activeIndex];
  const value = active?.current ?? current;
  const previousValue = active?.previous ?? previous;
  const delta = Math.round((value / previousValue - 1) * 1000) / 10;
  const activeLabel = active ? fullMonths[activeIndex ?? 0] : title;

  return <div className="w-full"><ChartCard title={title} className="h-[337px] gap-6 rounded-2xl p-4 sm:p-4">
    <div className="flex items-start justify-between gap-4">
      <div><p className="text-xs text-muted-foreground">{activeLabel}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={value} format={(amount) => `$${Math.round(amount).toLocaleString()}`} /></p><DeltaChip positive={delta >= 0}>{delta > 0 ? "+" : ""}{delta}%</DeltaChip></div><p className="mt-1 text-xs text-muted-foreground">${previousValue.toLocaleString()} {active ? "a year earlier" : "last year"}</p></div>
      <div className="flex shrink-0 items-center gap-4 pt-1 text-xs text-muted-foreground"><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-chart-1" />This year</span><span className="flex items-center gap-2"><i className="h-0.5 w-4 border-t border-dashed border-muted-foreground/50" />Last year</span></div>
    </div>
    <div className="min-h-0 flex-1"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={data} margin={{ top: 4, right: 6, bottom: 0, left: 0 }} onMouseMove={(event) => { const index = Number(event?.activeTooltipIndex); setActiveIndex(event?.isTooltipActive && Number.isFinite(index) ? index : null); }} onMouseLeave={() => setActiveIndex(null)}>
      <defs><linearGradient id="revenue-current-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} /></linearGradient></defs>
      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(tick) => `$${Math.round(tick / 1000)}k`} /><Tooltip content={() => null} cursor={{ stroke: "var(--muted-foreground)", strokeDasharray: "4 4" }} />
      <Line dataKey="previous" name="Last year" type="monotone" stroke="color-mix(in srgb, var(--foreground) 20%, var(--background))" strokeDasharray="5 5" strokeWidth={2} dot={false} activeDot={false} isAnimationActive />
      <Area dataKey="current" name="This year" type="monotone" stroke="none" fill="url(#revenue-current-area)" isAnimationActive />
      <Line dataKey="current" name="This year" type="monotone" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "var(--chart-1)", stroke: "var(--background)", strokeWidth: 2 }} isAnimationActive />
    </ComposedChart></ResponsiveContainer></div>
  </ChartCard></div>;
}
