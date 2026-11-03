"use client";

import { useMemo, useState } from "react";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { ChartCard } from "@/components/application/charts/chart-card";

const firstWeekStart = new Date(2026, 5, 29);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatWeekRange(weekIndex: number) {
  const start = new Date(firstWeekStart);
  start.setDate(start.getDate() + 7 * weekIndex);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const startMonth = months[start.getMonth()].slice(0, 3);
  const endMonth = months[end.getMonth()].slice(0, 3);
  return start.getMonth() === end.getMonth()
    ? `${start.getDate()} - ${end.getDate()} ${endMonth}`
    : `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth}`;
}

function getMetrics(weekIndex: number) {
  if (weekIndex === 0) return [
    { label: "Duration", detail: "7h 50m", score: 49, max: 50, color: "var(--chart-1)" },
    { label: "Quality", detail: "Bedtime: 20m earlier", score: 29, max: 30, color: "var(--chart-2)" },
    { label: "Consistency", detail: "Interruptions: 5m wake up", score: 20, max: 20, color: "var(--chart-3)" },
  ];
  const start = new Date(firstWeekStart);
  start.setDate(start.getDate() + 7 * weekIndex);
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(date.getDate() + index);
    return date;
  });
  const values = dates.map((date) => {
    const seed = date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate();
    return { duration: 48 + seed % 3, quality: 28 + (seed * 7) % 3, consistency: 19 + (seed * 13) % 2, minutes: 450 + (seed * 17) % 31, bedtime: 10 + (seed * 5) % 21, interruptions: 1 + (seed * 11) % 10 };
  });
  const average = (key: keyof typeof values[number]) => Math.round(values.reduce((sum, value) => sum + value[key], 0) / values.length);
  const averageDuration = average("minutes");
  const bedtime = average("bedtime");
  return [
    { label: "Duration", detail: `${Math.floor(averageDuration / 60)}h ${averageDuration % 60}m`, score: average("duration"), max: 50, color: "var(--chart-1)" },
    { label: "Quality", detail: `Bedtime: ${bedtime}m earlier`, score: average("quality"), max: 30, color: "var(--chart-2)" },
    { label: "Consistency", detail: `Interruptions: ${average("interruptions")}m wake up`, score: average("consistency"), max: 20, color: "var(--chart-3)" },
  ];
}

export default function SleepScoreCard() {
  const [weekIndex, setWeekIndex] = useState(0);
  const [activeMetric, setActiveMetric] = useState<number | null>(null);
  const metrics = useMemo(() => getMetrics(weekIndex), [weekIndex]);
  const weekRange = formatWeekRange(weekIndex);
  const score = metrics.reduce((sum, metric) => sum + metric.score, 0);
  const max = metrics.reduce((sum, metric) => sum + metric.max, 0);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const gap = 8;
  const arcLength = circumference * 0.78 - gap * 2;

  return <div className="space-y-5"><div className="mx-auto w-full max-w-[448px]"><ChartCard title="Sleep score" className="flex h-[330px] flex-col gap-4 rounded-[20px] p-[10px]"><CardHeader className="flex flex-row items-center justify-between gap-3 p-0"><CardTitle className="text-sm font-medium">Sleep score</CardTitle><div className="flex h-8 min-w-[151px] shrink-0 items-center justify-between gap-1 rounded-lg border bg-background px-1 py-1 shadow-xs" role="group" aria-label="Week range"><button type="button" aria-label="Previous week" onClick={() => { setWeekIndex((index) => index - 1); setActiveMetric(null); }} className="grid size-5 shrink-0 place-items-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"><IconChevronLeft aria-hidden="true" className="size-4" /></button><span className="flex-1 overflow-hidden whitespace-nowrap text-center text-sm text-foreground">{weekRange}</span><button type="button" aria-label="Next week" onClick={() => { setWeekIndex((index) => index + 1); setActiveMetric(null); }} className="grid size-5 shrink-0 place-items-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"><IconChevronRight aria-hidden="true" className="size-4" /></button></div></CardHeader><CardContent className="mt-0 flex min-h-0 flex-1 flex-col gap-3 p-0">
    <div className="relative -mt-2 grid h-[104px] w-full shrink-0 place-items-center"><svg viewBox="0 0 220 220" className="h-full w-auto" role="img" aria-label={`Sleep score ${score} of ${max}`}>
      {metrics.map((metric, index) => {
        const segment = arcLength * (metric.max / 100);
        const segmentOffset = metrics.slice(0, index).reduce((sum, item) => sum + arcLength * (item.max / 100) + gap, 0);
        const dimmed = activeMetric !== null && activeMetric !== index;
        const color = activeMetric === index ? `color-mix(in srgb, ${metric.color} 78%, var(--foreground))` : metric.color;
        return <g key={metric.label} transform="rotate(-135 110 110)" style={{ opacity: dimmed ? 0.4 : 1 }}><circle cx="110" cy="110" r={radius} fill="none" stroke="var(--muted)" strokeWidth={13} strokeDasharray={`${segment} ${circumference - segment}`} strokeDashoffset={-segmentOffset} strokeLinecap="round" /><circle cx="110" cy="110" r={radius} fill="none" stroke={color} strokeWidth={13} strokeDasharray={`${segment * (metric.score / metric.max)} ${circumference - segment * (metric.score / metric.max)}`} strokeDashoffset={-segmentOffset} strokeLinecap="round" /></g>;
      })}
      <text x="110" y="105" textAnchor="middle" fontSize="36" fontWeight="600" fill="var(--foreground)">{score}</text><text x="110" y="130" textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">Excellent</text>
    </svg></div>
    <div className="mt-0 flex h-[120px] shrink-0 flex-col divide-y border-t pt-2">{metrics.map((metric, index) => <button key={metric.label} type="button" onMouseEnter={() => setActiveMetric(index)} onMouseLeave={() => setActiveMetric(null)} onFocus={() => setActiveMetric(index)} onBlur={() => setActiveMetric(null)} className="flex min-h-0 flex-1 items-center gap-3 px-2 py-1 text-left transition-opacity focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring" style={{ opacity: activeMetric !== null && activeMetric !== index ? 0.55 : 1 }}><i className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: metric.color }} /><span className="min-w-0 flex-1"><span className="block text-xs font-medium">{metric.label}</span><span className="mt-0.5 block text-[11px] text-muted-foreground">{metric.detail}</span></span><span className="shrink-0 text-xs font-semibold tabular-nums">{metric.score}/{metric.max}</span></button>)}</div>
  </CardContent></ChartCard></div></div>;
}
