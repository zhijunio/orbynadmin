"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useEffect, useState } from "react";

import { ChartCard } from "@/components/application/charts/chart-card";
import { pipelineMaxValue, pipelineStages } from "./funnel-data";

export default function StageBarsCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const active = activeIndex === null ? null : pipelineStages[activeIndex];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <div className="space-y-5"><div className="mx-auto w-full max-w-[448px]"><ChartCard title="Pipeline">
    <div className="mb-3 flex items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{active?.name ?? "Pipeline"}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={active?.value ?? pipelineMaxValue} /></p><DeltaChip>+2.4%</DeltaChip></div></div><span className="rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">Last 7 days</span></div>
    <div className="space-y-2" onMouseLeave={() => setActiveIndex(null)}>{pipelineStages.map((stage, index) => {
      const share = Math.round(stage.value / pipelineMaxValue * 100);
      const muted = activeIndex !== null && activeIndex !== index;
      return <button key={stage.name} type="button" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} className="relative h-10 w-full overflow-hidden rounded-full bg-muted text-left transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" style={{ opacity: muted ? 0.32 : 1 }}><span className="absolute inset-y-0 left-0 rounded-full transition-[width,filter] duration-700 ease-out" style={{ width: entered ? `${share}%` : "0%", backgroundColor: stage.fill, filter: activeIndex === index ? "brightness(0.86)" : undefined }} /><span className="absolute inset-0 flex items-center justify-between gap-3 px-3 text-xs font-medium"><span className="truncate">{stage.name}</span><span className="shrink-0 tabular-nums">{stage.value.toLocaleString()} <span className="ml-1 text-[10px]">{share}%</span></span></span></button>;
    })}</div>
  </ChartCard></div></div>;
}
