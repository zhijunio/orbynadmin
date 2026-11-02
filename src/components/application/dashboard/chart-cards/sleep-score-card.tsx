"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";

const metrics = [
  { label: "Duration", detail: "7h 50m", score: 49, max: 50, color: "var(--chart-1)" },
  { label: "Quality", detail: "Bedtime: 20m earlier", score: 29, max: 30, color: "var(--chart-2)" },
  { label: "Consistency", detail: "Interruptions: 5m wake up", score: 20, max: 20, color: "var(--chart-3)" },
];

export default function SleepScoreCard() {
  const [activeMetric, setActiveMetric] = useState<number | null>(null);
  const score = metrics.reduce((sum, metric) => sum + metric.score, 0);
  const max = metrics.reduce((sum, metric) => sum + metric.max, 0);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const gap = 8;
  const arcLength = circumference * 0.78 - gap * 2;

  return <div className="space-y-5"><div className="mx-auto w-full max-w-[448px]"><Card className="flex h-[330px] flex-col gap-4 rounded-[20px] border-0 bg-muted/45 p-[10px] ring-0"><CardHeader className="flex flex-row items-center justify-between gap-3 p-0"><CardTitle className="text-sm font-medium">Sleep score</CardTitle><span className="rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">29 Jun – 5 Jul</span></CardHeader><CardContent className="mt-0 flex min-h-0 flex-1 flex-col gap-3 p-0">
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
  </CardContent></Card></div></div>;
}
