"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { IconCalendar, IconCheck, IconChevronDown } from "@tabler/icons-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";

export type AreaChartRow = { label: string; [key: string]: string | number };
export type AreaChartSeries = { key: string; name: string; color: string };
export type AreaChartPeriod = { id: string; label: string; data: AreaChartRow[]; delta: number };
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const makeData = (organic: number[], referral: number[], paid: number[], labels = months): AreaChartRow[] => labels.map((label, index) => ({ label, organic: organic[index], referral: referral[index], paid: paid[index] }));
const thisYear = makeData(
  [2400, 2800, 3200, 3000, 3600, 4200, 4600, 4400, 5100, 5600, 5400, 6200],
  [1200, 1400, 1300, 1700, 1900, 1800, 2200, 2500, 2400, 2900, 3200, 3400],
  [800, 700, 1100, 900, 1300, 1500, 1400, 1800, 2000, 1900, 2300, 2600],
);
const ranges: AreaChartPeriod[] = [
  { id: "year", label: "This year", data: thisYear, delta: 0.082 },
  {
    id: "h2", label: "Last 6 months", delta: 0.114,
    data: makeData([4600, 4400, 5100, 5600, 5400, 6200], [2200, 2500, 2400, 2900, 3200, 3400], [1400, 1800, 2000, 1900, 2300, 2600], months.slice(6)),
  },
  {
    id: "prev", label: "Last year", delta: -0.036,
    data: makeData([1900, 2100, 2000, 2400, 2600, 2500, 3100, 3000, 3400, 3800, 3600, 4100], [900, 1100, 1000, 1300, 1200, 1500, 1600, 1800, 1700, 2100, 2300, 2200], [600, 500, 800, 700, 900, 1100, 1000, 1200, 1400, 1300, 1600, 1800]),
  },
];
const series: AreaChartSeries[] = [
  { key: "organic", name: "Organic", color: "var(--chart-2)" },
  { key: "referral", name: "Referral", color: "var(--chart-1)" },
  { key: "paid", name: "Paid", color: "var(--chart-5)" },
];
const formatThousands = (value: number) => value >= 1000 ? `${Math.round(value / 100) / 10}K`.replace(".0K", "K") : String(Math.round(value));
type AreaChartCardProps = { title?: string; periods?: AreaChartPeriod[]; series?: AreaChartSeries[]; className?: string; fullWidth?: boolean };

function AreaExample({ title, periods, series: chartSeries, className }: Required<Pick<AreaChartCardProps, "title" | "periods" | "series">> & Pick<AreaChartCardProps, "className">) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rangeId, setRangeId] = useState(periods[0]?.id ?? "");
  const range = periods.find(({ id }) => id === rangeId) ?? periods[0];
  if (!range) return null;
  const data = range.data;
  const totals = chartSeries.map(({ key }) => data.reduce((sum, row) => sum + Number(row[key] ?? 0), 0));
  const active = activeIndex === null ? null : data[activeIndex];
  const headline = active ? chartSeries.reduce((sum, item) => sum + Number(active[item.key] ?? 0), 0) : totals.reduce((sum, value) => sum + value, 0);
  const delta = `${range.delta >= 0 ? "+" : ""}${(range.delta * 100).toFixed(1)}%`;

  return <ChartCard title={title} className={className ?? "h-[420px]"}>
    <div className="mb-3 flex shrink-0 items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{active?.label ?? title}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={headline} /></p><DeltaChip positive={range.delta >= 0}>{delta}</DeltaChip></div></div>
      <DropdownMenu><DropdownMenuTrigger asChild><button type="button" aria-label="Change period" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[10px] border bg-background py-0 ps-2 pe-1.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><span>{range.label}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" /></button></DropdownMenuTrigger><DropdownMenuContent align="end">{periods.map((option) => <DropdownMenuItem key={option.id} onSelect={() => { setRangeId(option.id); setActiveIndex(null); }} aria-current={range.id === option.id ? "true" : undefined}>{option.label}{range.id === option.id && <IconCheck aria-hidden="true" className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
    </div>
    <div className="min-h-0 w-full flex-1"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 4, right: 6, bottom: 0, left: 0 }} onMouseMove={(event) => { const index = Number(event?.activeTooltipIndex); setActiveIndex(event?.isTooltipActive && Number.isInteger(index) ? index : null); }} onMouseLeave={() => setActiveIndex(null)}>
      <defs>{chartSeries.map(({ key, color }) => <linearGradient key={key} id={`area-${key}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.55} /><stop offset="100%" stopColor={color} stopOpacity={0.04} /></linearGradient>)}</defs>
      <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} /><YAxis width={44} tickCount={4} tickFormatter={formatThousands} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} /><XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={12} interval="preserveStartEnd" tick={{ fontSize: 13, fill: "var(--muted-foreground)" }} /><Tooltip content={() => null} cursor={{ stroke: "var(--muted-foreground)", strokeWidth: 1, strokeDasharray: "4 4" }} />
      {chartSeries.map(({ key, name, color }) => <Area key={key} name={name} type="monotone" dataKey={key} stackId="total" stroke={color} strokeWidth={2} fill={`url(#area-${key})`} isAnimationActive animationDuration={450} activeDot={{ r: 4, fill: color, stroke: "var(--background)", strokeWidth: 2 }} />)}
    </AreaChart></ResponsiveContainer></div>
    <div className={`mt-3 grid shrink-0 gap-2 ${chartSeries.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"}`}>{chartSeries.map(({ key, name, color }, index) => <div key={key} className="rounded-xl bg-background px-3 py-2.5"><p className="flex items-center gap-2 text-sm text-muted-foreground"><i className="size-3 rounded-[4px]" style={{ backgroundColor: color }} />{name}</p><p className="mt-1 text-sm font-medium tabular-nums">{totals[index].toLocaleString()}</p></div>)}</div>
  </ChartCard>;
}

export default function AreaChartCard({ title = "Visitors", periods = ranges, series: chartSeries = series, className, fullWidth = false }: AreaChartCardProps = {}) {
  return <div className="w-full"><div className={fullWidth ? "w-full" : "mx-auto w-full max-w-[896px]"}><AreaExample title={title} periods={periods} series={chartSeries} className={className} /></div></div>;
}
