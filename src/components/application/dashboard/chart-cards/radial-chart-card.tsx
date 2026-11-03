"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { IconCalendar, IconCheck, IconChevronDown } from "@tabler/icons-react";

import { ChartCard } from "@/components/application/charts/chart-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";

type Metric = { label: string; value: number; color: string };
export type RadialPeriod = { label: string; metrics: Metric[]; change: string; maximum?: number };

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
  valuePrefix = "",
  variant = "rings",
  className,
  periods,
  compact = false,
}: {
  title?: string;
  metrics?: Metric[];
  maximum?: number;
  change?: string;
  periodLabel?: string;
  valueSuffix?: string;
  valuePrefix?: string;
  variant?: "rings" | "gauge";
  className?: string;
  periods?: RadialPeriod[];
  compact?: boolean;
} = {}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [periodIndex, setPeriodIndex] = useState(0);
  const selectedPeriod = periods?.[periodIndex];
  const chartMetrics = selectedPeriod?.metrics ?? metrics;
  const chartChange = selectedPeriod?.change ?? change;
  const chartPeriodLabel = selectedPeriod?.label ?? periodLabel;
  const chartMaximum = selectedPeriod?.maximum ?? maximum;
  const active = activeIndex === null ? null : chartMetrics[activeIndex];
  const total = chartMetrics.reduce((sum, metric) => sum + metric.value, 0);
  const formatValue = (value: number) => `${valuePrefix}${value.toLocaleString()}${valueSuffix}`;
  const circumferenceFor = (radius: number) => 2 * Math.PI * radius;

  return <div className="h-full w-full"><div className="mx-auto h-full w-full max-w-[448px]"><ChartCard title={title} className={className}>
    <div className="mb-3 flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{active?.label ?? title}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={active?.value ?? total} format={formatValue} /></p><DeltaChip>{chartChange}</DeltaChip></div></div>{periods ? <DropdownMenu><DropdownMenuTrigger asChild><button type="button" aria-label="Change period" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[10px] border bg-background py-0 ps-2 pe-1.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><span>{chartPeriodLabel}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" /></button></DropdownMenuTrigger><DropdownMenuContent align="end">{periods.map((item, index) => <DropdownMenuItem key={item.label} onSelect={() => { setPeriodIndex(index); setActiveIndex(null); }} aria-current={index === periodIndex ? "true" : undefined}>{item.label}{index === periodIndex && <IconCheck aria-hidden="true" className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu> : <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[10px] border bg-background py-0 ps-2 pe-1.5 text-sm font-medium text-foreground shadow-xs"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" />{chartPeriodLabel}</span>}</div>
    <div className={`mx-auto ${compact ? (variant === "gauge" ? "h-[150px]" : "h-[140px]") : "h-[231px]"} w-full max-w-[520px]`} onMouseLeave={() => setActiveIndex(null)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveIndex(null); }}>
      {variant === "gauge" ? <svg viewBox="0 0 320 190" className="h-full w-full" role="img" aria-label={`${title}: ${formatValue(total)}`}>
        {(() => {
          const radius = 112;
          const circumference = Math.PI * radius;
          let offset = 0;
          return chartMetrics.map((metric, index) => {
          const segment = circumference * metric.value / total;
            const dash = Math.max(0, segment - 5);
            const start = offset;
            offset += segment;
            return <path key={metric.label} d={`M ${160 - radius} 154 A ${radius} ${radius} 0 0 1 ${160 + radius} 154`} fill="none" stroke={metric.color} strokeWidth="24" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-start} strokeLinecap="round" pathLength={circumference} opacity={activeIndex === null || activeIndex === index ? 1 : 0.28} style={{ transition: "stroke-dasharray 450ms ease, stroke-dashoffset 450ms ease, opacity 200ms ease" }} tabIndex={0} role="img" aria-label={`${metric.label}: ${formatValue(metric.value)}`} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} />;
          });
        })()}
        <text x="160" y="124" textAnchor="middle" fontSize="25" fontWeight="600" fill="var(--foreground)">{Math.round((active?.value ?? chartMetrics[0]?.value ?? 0) / total * 100)}%</text>
        <text x="160" y="144" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">{active?.label ?? chartMetrics[0]?.label}</text>
      </svg> : <svg viewBox="0 0 320 290" className="h-full w-full" role="img" aria-label={`Radial chart of ${title.toLowerCase()}`}>
        {chartMetrics.map((metric, index) => {
          const radius = 32 + index * 20;
          const circumference = circumferenceFor(radius);
          const focused = activeIndex === index;
          const dimmed = activeIndex !== null && !focused;
          return <g key={metric.label} transform="rotate(-90 160 145)" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} tabIndex={0} role="button" aria-label={`${metric.label}: ${metric.value} visitors`} className="cursor-pointer outline-none transition-[opacity,filter]" style={{ opacity: dimmed ? 0.24 : 1, filter: focused ? "brightness(0.82)" : undefined }}>
            <circle cx="160" cy="145" r={radius} fill="none" stroke="var(--muted)" strokeWidth={focused ? 13 : 10} />
            <circle cx="160" cy="145" r={radius} fill="none" stroke={metric.color} strokeWidth="10" strokeDasharray={`${circumference * metric.value / chartMaximum} ${circumference}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 450ms ease, opacity 200ms ease" }} />
          </g>;
        })}
        <text x="160" y="139" textAnchor="middle" fontSize="25" fontWeight="600" fill="var(--foreground)">{formatValue(active?.value ?? total)}</text>
      </svg>
      }
    </div>
    <div className={`mt-3 grid gap-2 border-t pt-4 ${variant === "gauge" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-5"}`}>{chartMetrics.map((metric, index) => <button key={metric.label} type="button" onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} className="rounded-md px-2 py-1 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"><p className="flex items-center gap-1.5 text-xs text-muted-foreground"><i className="size-2 rounded-full" style={{ backgroundColor: metric.color }} />{metric.label}</p><p className="mt-1 text-sm font-semibold tabular-nums">{formatValue(metric.value)}</p></button>)}</div>
  </ChartCard></div></div>;
}
