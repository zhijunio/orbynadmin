"use client";

import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { IconCalendar, IconCheck, IconChevronDown } from "@tabler/icons-react";

import { ChartCard } from "@/components/application/charts/chart-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";
import { funnelRanges } from "./funnel-data";

type FunnelRangeId = (typeof funnelRanges)[number]["id"];
type FunnelStage = { name: string; value: number; fill: string };

function FunnelExample({ title, suppliedStages }: { title: string; suppliedStages?: FunnelStage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rangeId, setRangeId] = useState<FunnelRangeId>(funnelRanges[0].id);
  const range = funnelRanges.find(({ id }) => id === rangeId) ?? funnelRanges[0];
  const stages = suppliedStages ?? range.stages;
  const maxValue = stages[0].value;
  const active = activeIndex === null ? null : stages[activeIndex];
  const headline = suppliedStages ? active?.value ?? maxValue : active?.value ?? range.headline ?? maxValue;
  const deltaLabel = `${range.delta >= 0 ? "+" : ""}${(range.delta * 100).toFixed(1)}%`;
  const shapePath = (height: number, nextHeight: number) => {
    const top = (100 - height) / 2;
    const bottom = 100 - top;
    const nextTop = (100 - nextHeight) / 2;
    const nextBottom = 100 - nextTop;
    return `M 0 ${top} C 55 ${top}, 82 ${nextTop}, 100 ${nextTop} L 100 ${nextBottom} C 82 ${nextBottom}, 55 ${bottom}, 0 ${bottom} Z`;
  };

  return <ChartCard title={title} className="rounded-[24px] p-5 sm:p-6">
    <div className="mb-4 flex items-start justify-between gap-3"><div><p className="text-sm text-muted-foreground">{active?.name ?? title}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-3xl font-semibold tabular-nums"><CountUp value={headline} /></p>{!suppliedStages && <DeltaChip positive={range.delta >= 0}>{deltaLabel}</DeltaChip>}</div></div>{!suppliedStages && <DropdownMenu>
      <DropdownMenuTrigger asChild><button type="button" aria-label="Change period" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><span>{range.label}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" /></button></DropdownMenuTrigger>
      <DropdownMenuContent align="end">{funnelRanges.map((option) => <DropdownMenuItem key={option.id} onSelect={() => { setRangeId(option.id); setActiveIndex(null); }} aria-current={range.id === option.id ? "true" : undefined}>{option.label}{range.id === option.id && <IconCheck aria-hidden="true" className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent>
    </DropdownMenu>}</div>
    <div className="grid gap-1 pt-2" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }} onMouseLeave={() => setActiveIndex(null)}>{stages.map((stage, index) => {
      const share = stage.value / maxValue;
      const nextShare = index < stages.length - 1 ? stages[index + 1].value / maxValue : share;
      const percent = Math.round(share * 100);
      const muted = activeIndex !== null && activeIndex !== index;
      return <button key={stage.name} type="button" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} className="min-w-0 text-center transition-[opacity,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" style={{ opacity: muted ? 0.3 : 1, transform: activeIndex === index ? "translateY(-4px)" : undefined }}>
        <span className="relative mx-auto grid h-[184px] place-items-center"><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true"><path d={shapePath(share * 86, nextShare * 86)} fill={stage.fill} /></svg><span className="relative rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground">{percent}%</span></span>
        <span className="mt-3 block text-sm font-medium leading-tight">{stage.name}</span><span className="mt-1 block text-sm tabular-nums text-muted-foreground">{stage.value.toLocaleString()}</span>
      </button>;
    })}</div>
  </ChartCard>;
}

export default function FunnelChartCard({ title = "Sign-up funnel", stages }: { title?: string; stages?: FunnelStage[] } = {}) {
  return (
    <div className="space-y-5">
      <div className="mx-auto w-full max-w-[800px]"><FunnelExample title={title} suppliedStages={stages} /></div>
    </div>
  );
}
