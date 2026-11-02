"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";

const data = [
  { label: "Jan", current: 1680, previous: 1510 }, { label: "Feb", current: 1740, previous: 1480 },
  { label: "Mar", current: 1920, previous: 1650 }, { label: "Apr", current: 1850, previous: 1620 },
  { label: "May", current: 2040, previous: 1710 }, { label: "Jun", current: 2110, previous: 1760 },
  { label: "Jul", current: 2290, previous: 1840 }, { label: "Aug", current: 2180, previous: 1890 },
  { label: "Sep", current: 2320, previous: 1930 }, { label: "Oct", current: 2410, previous: 1970 },
  { label: "Nov", current: 2280, previous: 1810 }, { label: "Dec", current: 2342, previous: 1798 },
];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentTotal = data.reduce((sum, item) => sum + item.current, 0);
const previousTotal = data.reduce((sum, item) => sum + item.previous, 0);
const growth = Math.round((currentTotal / previousTotal - 1) * 1000) / 10;
const numberFormat = new Intl.NumberFormat("en-US");

export function OrdersChartExample() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : data[activeIndex];
  const headlineValue = active?.current ?? currentTotal;
  const comparisonValue = active?.previous ?? previousTotal;
  const delta = Math.round((headlineValue / comparisonValue - 1) * 1000) / 10;

  return (
    <ChartCard title="Orders" className="h-[344px] gap-6 rounded-2xl p-4 sm:p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{active ? fullMonths[activeIndex ?? 0] : "Orders"}</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-2xl font-semibold tabular-nums"><CountUp value={headlineValue} format={numberFormat.format} /></p>
            <DeltaChip positive={delta >= 0}>{delta > 0 ? "+" : ""}{delta}%</DeltaChip>
          </div>
          <p className="mt-1 text-xs text-muted-foreground tabular-nums">{numberFormat.format(comparisonValue)} {active ? "a year earlier" : "last year"}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-chart-1" />This year</span>
          <span className="flex items-center gap-1.5"><i className="size-2 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 18%, var(--background))" }} />Last year</span>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
            barCategoryGap="28%"
            barGap={3}
            onMouseMove={(state) => {
              const index = Number(state?.activeTooltipIndex);
              setActiveIndex(state?.isTooltipActive && Number.isFinite(index) ? index : null);
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <YAxis width={42} domain={[0, 3000]} tickCount={4} tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : String(value)} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
            <Tooltip content={() => null} cursor={{ fill: "var(--muted)", opacity: 0.55 }} />
            <Bar dataKey="previous" name="Last year" fill="color-mix(in srgb, var(--foreground) 18%, var(--background))" radius={[4, 4, 0, 0]} maxBarSize={26} />
            <Bar dataKey="current" name="This year" fill="var(--chart-1)" radius={[4, 4, 0, 0]} maxBarSize={26} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <span className="sr-only">Year over year orders. This year {numberFormat.format(currentTotal)}, last year {numberFormat.format(previousTotal)}, growth {growth}%.</span>
    </ChartCard>
  );
}

export default function OrdersChartCard() {
  return <div className="space-y-5"><div className="mx-auto w-full max-w-[720px]"><OrdersChartExample /></div></div>;
}
