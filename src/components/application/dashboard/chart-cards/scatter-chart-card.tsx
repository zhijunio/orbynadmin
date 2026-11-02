"use client";

import { DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { IconCalendar, IconCheck, IconChevronDown } from "@tabler/icons-react";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";

type Point = { x: number; y: number; z: number; label: string };
type Series = { name: string; color: string; points: Point[] };
const baseSeries: Series[] = [
  {
    name: "Starter",
    color: "var(--chart-1)",
    points: [
      { x: 12, y: 180, z: 40, label: "Acme" }, { x: 18, y: 240, z: 60, label: "Bolt" },
      { x: 24, y: 210, z: 30, label: "Corvus" }, { x: 31, y: 320, z: 80, label: "Delta" },
      { x: 38, y: 290, z: 50, label: "Ember" }, { x: 45, y: 380, z: 70, label: "Flux" },
    ],
  },
  {
    name: "Growth",
    color: "var(--chart-2)",
    points: [
      { x: 42, y: 620, z: 90, label: "Gale" }, { x: 55, y: 740, z: 120, label: "Helio" },
      { x: 61, y: 690, z: 70, label: "Ionic" }, { x: 68, y: 880, z: 150, label: "Juno" },
      { x: 74, y: 810, z: 100, label: "Kite" }, { x: 83, y: 960, z: 130, label: "Lumen" },
    ],
  },
  {
    name: "Scale",
    color: "var(--chart-3)",
    points: [
      { x: 78, y: 1240, z: 180, label: "Meridian" }, { x: 86, y: 1420, z: 220, label: "Nova" },
      { x: 92, y: 1310, z: 160, label: "Orbit" }, { x: 97, y: 1580, z: 260, label: "Prism" },
    ],
  },
];
const scaleSeries = (scale: number) => baseSeries.map((series) => ({
  ...series,
  points: series.points.map((point) => ({ ...point, y: Math.round(point.y * scale) })),
}));
const ranges = [
  { id: "q3", label: "This quarter", series: baseSeries, delta: 0.068 },
  { id: "q2", label: "Last quarter", series: scaleSeries(0.82), delta: 0.041 },
  { id: "year", label: "This year", series: scaleSeries(3.6), delta: -0.019 },
] as const;
type RangeId = (typeof ranges)[number]["id"];
const numberFormat = new Intl.NumberFormat("en-US");
const formatY = (value: number) => value >= 1000 ? `${Math.round(value / 100) / 10}K`.replace(".0K", "K") : numberFormat.format(Math.round(value));
const formatX = (value: number) => value >= 1000 ? `${Math.round(value / 100) / 10}K`.replace(".0K", "K") : String(Math.round(value));

type ActivePoint = { series: number; index: number } | null;

export default function ScatterChartCard() {
  const [active, setActive] = useState<ActivePoint>(null);
  const [rangeId, setRangeId] = useState<RangeId>(ranges[0].id);
  const range = ranges.find(({ id }) => id === rangeId) ?? ranges[0];
  const series = range.series;
  const activeSeries = active ? series[active.series] : undefined;
  const activePoint = active ? activeSeries?.points[active.index] : undefined;
  const allPoints = series.flatMap(({ points }) => points);
  const average = (points: Point[]) => Math.round(points.reduce((sum, point) => sum + point.y, 0) / points.length);
  const overallAverage = Math.round(average(allPoints));
  const deltaLabel = `${range.delta >= 0 ? "+" : ""}${(range.delta * 100).toFixed(1)}%`;
  const headlineLabel = activePoint ? `${activePoint.label} · ${formatX(activePoint.x)}` : "Revenue per account";
  const headline = activePoint?.y ?? overallAverage;

  return (
    <div className="space-y-5">
      <div className="mx-auto w-full max-w-[896px]">
        <ChartCard title="Revenue per account" className="h-[480px]">
          <div className="mb-3 flex shrink-0 items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">{headlineLabel}</p>
              <div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums">{numberFormat.format(headline)}</p><DeltaChip positive={range.delta >= 0}>{deltaLabel}</DeltaChip></div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" aria-label="Change period" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border bg-background px-2.5 text-sm text-foreground shadow-sm transition-colors hover:bg-accent">
                  <IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><span>{range.label}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ranges.map((option) => <DropdownMenuItem key={option.id} onSelect={() => { setRangeId(option.id); setActive(null); }} aria-current={range.id === option.id ? "true" : undefined}>
                  {option.label}{range.id === option.id && <IconCheck aria-hidden="true" className="ml-auto size-4" />}
                </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="min-h-0 w-full flex-1" onMouseLeave={() => setActive(null)}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" />
                <XAxis type="number" dataKey="x" tickCount={5} tickFormatter={formatX} tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis type="number" dataKey="y" width={48} tickCount={4} tickFormatter={formatY} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <ZAxis type="number" dataKey="z" range={[90, 620]} />
                <Tooltip content={() => null} cursor={false} isAnimationActive={false} />
                {series.map(({ name, color, points }, seriesIndex) => {
                  const muted = active !== null && active.series !== seriesIndex;
                  return <Scatter key={name} name={name} data={points} fill={color} fillOpacity={muted ? 0.25 : 0.85} stroke={color} strokeOpacity={muted ? 0.25 : 1} strokeWidth={1.5} className="cursor-default transition-opacity duration-200 ease-out" onMouseEnter={(_, pointIndex) => setActive({ series: seriesIndex, index: pointIndex })} onMouseLeave={() => setActive(null)} isAnimationActive animationDuration={450} />;
                })}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex w-full shrink-0 justify-between text-[10px] text-muted-foreground"><span>Revenue</span><span>Sessions</span></div>
          <div className="mt-3 grid shrink-0 grid-cols-3 gap-2 border-t pt-3">
            {series.map(({ name, color }, seriesIndex) => <button key={name} type="button" onMouseEnter={() => setActive({ series: seriesIndex, index: 0 })} onMouseLeave={() => setActive(null)} onFocus={() => setActive({ series: seriesIndex, index: 0 })} onBlur={() => setActive(null)} className="rounded-xl bg-background p-3 text-left transition-colors hover:bg-background/80 focus-visible:outline-2 focus-visible:outline-ring">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><i className="size-2 rounded-full" style={{ backgroundColor: color }} />{name} · avg</p>
              <p className="mt-1 text-sm font-semibold tabular-nums">{numberFormat.format(average(series[seriesIndex].points))}</p>
            </button>)}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
