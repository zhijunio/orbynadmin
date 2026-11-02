"use client";

import { CountUp } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { Bar, BarChart, BarShapeProps, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";

type Period = "Weekly" | "Monthly" | "Yearly";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dataByPeriod: Record<Period, { label: string; value: number }[]> = {
  Weekly: [3240, 7420, 9650, 7130, 3670, 2300, 3820, 5040, 6840, 4540, 11520, 8210].map((value, index) => ({ label: months[index], value })),
  Monthly: [5200, 6100, 7300, 8900, 9600, 10800, 11200, 9800, 8600, 7400, 6900, 8100].map((value, index) => ({ label: months[index], value })),
  Yearly: [4200, 4800, 5600, 6100, 6800, 7500, 8200, 8900, 9600, 10300, 11000, 11600].map((value, index) => ({ label: months[index], value })),
};
const totals: Record<Period, number> = { Weekly: 7462, Monthly: 32180, Yearly: 389204 };
const changes: Record<Period, string> = { Weekly: "+14.8%", Monthly: "+8.2%", Yearly: "+21.4%" };
const numberFormat = new Intl.NumberFormat("en-US");

function EarningsBar(props: BarShapeProps & { activeIndex: number | null }) {
  const { x, y, width, height, parentViewBox, index, activeIndex } = props;
  const radius = Math.min(width / 2, 6);
  const trackY = parentViewBox.y;
  const trackHeight = Math.max(0, y + height - trackY);

  return <g>
    <rect x={x} y={trackY} width={width} height={trackHeight} rx={radius} fill="var(--muted)" />
    <rect x={x} y={y} width={width} height={height} rx={radius} fill="var(--chart-1)" style={index === activeIndex ? { filter: "brightness(0.86)" } : undefined} />
    {index === activeIndex && <rect x={x - 3} y={trackY - 3} width={width + 6} height={trackHeight + 6} rx={radius + 3} fill="none" stroke="var(--ring)" strokeWidth="2" />}
  </g>;
}

export default function EarningsChartCard() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const data = dataByPeriod[period];
  const total = totals[period];
  const active = activeIndex === null ? null : data[activeIndex];
  const headline = active?.value ?? total;

  return <div className="w-full"><ChartCard title="Earnings" className="h-[337px] gap-6 rounded-2xl p-4 sm:p-4">
    <div className="flex items-start justify-between gap-3"><div><p className="text-sm text-muted-foreground">{active ? fullMonths[activeIndex ?? 0] : "Earned so far"}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={headline} format={(amount) => `$${numberFormat.format(amount)}`} /></p><span className={`rounded-md bg-lime-300/70 px-1.5 py-0.5 text-xs font-semibold text-lime-950 dark:bg-lime-400/20 dark:text-lime-300 ${active ? "invisible" : ""}`}>{changes[period]}</span></div></div><div className="flex rounded-lg bg-background/80 p-1" role="group" aria-label="Earnings period">{(["Weekly", "Monthly", "Yearly"] as Period[]).map((item) => <button key={item} type="button" aria-pressed={period === item} onClick={() => { setPeriod(item); setActiveIndex(null); }} className={`rounded-md px-3 py-1.5 text-sm transition-colors ${period === item ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div></div>
    <div className="min-h-0 flex-1"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="18%" onMouseMove={(state) => { const index = Number(state?.activeTooltipIndex); setActiveIndex(state?.isTooltipActive && Number.isFinite(index) ? index : null); }} onMouseLeave={() => setActiveIndex(null)}>
      <XAxis dataKey="label" interval={0} tickLine={false} axisLine={false} tickMargin={12} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} /><YAxis width={44} domain={[0, 12000]} ticks={[0, 3000, 5000, 10000]} tickLine={false} axisLine={false} tickMargin={4} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(value: number) => value === 0 ? "$0" : `$${value / 1000}K`} /><Tooltip content={() => null} cursor={false} /><Bar dataKey="value" name="Earnings" shape={(props) => <EarningsBar {...props} activeIndex={activeIndex} />} maxBarSize={40} activeBar={false} />
    </BarChart></ResponsiveContainer></div>
  </ChartCard></div>;
}
