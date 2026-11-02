"use client";

import { CountUp } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";

type Period = "Weekly" | "Monthly" | "Yearly";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const values: Record<Period, number[]> = {
  Weekly: [1400, 1900, 2600, 2300, 3400, 3100, 2700, 3800, 4600, 4200, 3600, 5200],
  Monthly: [3200, 4100, 3800, 5200, 6400, 5900, 5100, 6800, 8100, 7600, 8400, 9600],
  Yearly: [28000, 34000, 46000, 41000, 52000, 49000, 61000, 55000, 68000, 72000, 64000, 83000],
};
const totals: Record<Period, number> = { Weekly: 18240, Monthly: 64820, Yearly: 512400 };
const changes: Record<Period, string> = { Weekly: "+9.4%", Monthly: "+12.6%", Yearly: "-3.2%" };
const series = Object.fromEntries(Object.entries(values).map(([period, points]) => [period, points.map((value, index) => ({ label: months[index], value }))])) as Record<Period, { label: string; value: number }[]>;

export default function LineChartCard() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const data = series[period];
  const current = activeIndex === null ? totals[period] : data[activeIndex]?.value ?? totals[period];

  return <div className="space-y-5"><div className="mx-auto w-full max-w-[576px]"><ChartCard title="Revenue" className="h-[329px] gap-6">
    <div className="flex items-start justify-between gap-3"><div><p className="text-sm text-muted-foreground">{activeIndex === null ? "Revenue" : fullMonths[activeIndex]}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={current} format={(amount) => `$${amount.toLocaleString()}`} /></p><span className={`rounded-md bg-lime-300/70 px-1.5 py-0.5 text-xs font-semibold text-lime-950 dark:bg-lime-400/20 dark:text-lime-300 ${activeIndex === null ? "" : "invisible"}`}>{changes[period]}</span></div></div><div className="flex rounded-lg bg-background/80 p-1" role="group" aria-label="Line chart period">{(["Weekly", "Monthly", "Yearly"] as Period[]).map((item) => <button key={item} type="button" aria-pressed={period === item} onClick={() => { setPeriod(item); setActiveIndex(null); }} className={`rounded-md px-2.5 py-1.5 text-xs ${period === item ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div></div>
    <div className="h-[196px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 10, right: 8, bottom: 2, left: 0 }} onMouseMove={(event) => { const index = Number(event?.activeTooltipIndex); setActiveIndex(event?.isTooltipActive && Number.isFinite(index) ? index : null); }} onMouseLeave={() => setActiveIndex(null)}>
      <defs><linearGradient id="line-revenue-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.015} /></linearGradient></defs>
      <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={12} interval="preserveStartEnd" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} /><YAxis width={44} domain={[0, (max: number) => max * 1.1]} tickCount={4} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(value) => value === 0 ? "$0" : `$${Math.round(value / 1000)}K`} /><Tooltip content={() => null} cursor={{ stroke: "var(--ring)", strokeWidth: 1, strokeDasharray: "4 4" }} />
      <Area dataKey="value" name="Revenue" type="monotone" stroke="var(--chart-1)" strokeWidth={2} fill="url(#line-revenue-area)" activeDot={{ r: 5, fill: "var(--chart-1)", stroke: "var(--background)", strokeWidth: 2, className: "animate-pulse" }} isAnimationActive />
    </AreaChart></ResponsiveContainer></div>
  </ChartCard></div></div>;
}
