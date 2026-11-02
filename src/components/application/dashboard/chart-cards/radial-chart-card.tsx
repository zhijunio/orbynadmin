"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";

import { ChartCard } from "@/components/application/charts/chart-card";

type Metric = { label: string; value: number; color: string };

const defaultMetrics: Metric[] = [
  { label: "Other", value: 90, color: "var(--chart-1)" },
  { label: "Edge", value: 173, color: "var(--chart-2)" },
  { label: "Firefox", value: 187, color: "var(--chart-3)" },
  { label: "Safari", value: 200, color: "var(--chart-4)" },
  { label: "Chrome", value: 275, color: "var(--chart-5)" },
];
export default function RadialChartCard({
  title = "Visitors",
  metrics = defaultMetrics,
  maximum = 300,
  change = "+5.2%",
  periodLabel = "Last 7 days",
  valueSuffix = "",
}: {
  title?: string;
  metrics?: Metric[];
  maximum?: number;
  change?: string;
  periodLabel?: string;
  valueSuffix?: string;
} = {}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : metrics[activeIndex];
  const total = metrics.reduce((sum, metric) => sum + metric.value, 0);
  const formatValue = (value: number) => `${value.toLocaleString()}${valueSuffix}`;
  const circumferenceFor = (radius: number) => 2 * Math.PI * radius;

  return <div className="space-y-5"><div className="mx-auto w-full max-w-[448px]"><ChartCard title={title}>
    <div className="mb-3 flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{active?.label ?? title}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={active?.value ?? total} format={formatValue} /></p><DeltaChip>{change}</DeltaChip></div></div><span className="rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">{periodLabel}</span></div>
    <div className="mx-auto h-[231px] max-w-[520px]" onMouseLeave={() => setActiveIndex(null)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveIndex(null); }}>
      <svg viewBox="0 0 320 290" className="h-full w-full" role="img" aria-label={`Radial chart of ${title.toLowerCase()}`}>
        {metrics.map((metric, index) => {
          const radius = 32 + index * 20;
          const circumference = circumferenceFor(radius);
          const focused = activeIndex === index;
          const dimmed = activeIndex !== null && !focused;
          return <g key={metric.label} transform="rotate(-90 160 145)" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} tabIndex={0} role="button" aria-label={`${metric.label}: ${metric.value} visitors`} className="cursor-pointer outline-none transition-[opacity,filter]" style={{ opacity: dimmed ? 0.24 : 1, filter: focused ? "brightness(0.82)" : undefined }}>
            <circle cx="160" cy="145" r={radius} fill="none" stroke="var(--muted)" strokeWidth={focused ? 13 : 10} />
            <circle cx="160" cy="145" r={radius} fill="none" stroke={metric.color} strokeWidth="10" strokeDasharray={`${circumference * metric.value / maximum} ${circumference}`} strokeLinecap="round" />
          </g>;
        })}
        <text x="160" y="139" textAnchor="middle" fontSize="25" fontWeight="600" fill="var(--foreground)">{formatValue(active?.value ?? total)}</text>
        <text x="160" y="160" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">{title}</text>
      </svg>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-4 sm:grid-cols-5">{metrics.map((metric, index) => <button key={metric.label} type="button" onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} className="rounded-md px-2 py-1 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"><p className="flex items-center gap-1.5 text-xs text-muted-foreground"><i className="size-2 rounded-full" style={{ backgroundColor: metric.color }} />{metric.label}</p><p className="mt-1 text-sm font-semibold tabular-nums">{formatValue(metric.value)}</p></button>)}</div>
  </ChartCard></div></div>;
}
