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
type FunnelPeriod = { label: string; delta: number; stages: FunnelStage[] };

function FunnelExample({ title, suppliedStages, delta: suppliedDelta, periodLabel, periods, className }: { title: string; suppliedStages?: FunnelStage[]; delta?: number; periodLabel?: string; periods?: FunnelPeriod[]; className?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rangeId, setRangeId] = useState<FunnelRangeId>(funnelRanges[0].id);
  const [periodIndex, setPeriodIndex] = useState(0);
  const range = funnelRanges.find(({ id }) => id === rangeId) ?? funnelRanges[0];
  const period = periods?.[periodIndex];
  const stages = period?.stages ?? suppliedStages ?? range.stages;
  const maxValue = stages[0].value;
  const active = activeIndex === null ? null : stages[activeIndex];
  const headline = active?.value ?? period?.stages[0].value ?? (suppliedStages ? maxValue : range.headline ?? maxValue);
  const delta = period?.delta ?? suppliedDelta ?? range.delta;
  const deltaLabel = `${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)}%`;
  const shapePath = (height: number, nextHeight: number) => {
    const top = (100 - height) / 2;
    const bottom = 100 - top;
    const nextTop = (100 - nextHeight) / 2;
    const nextBottom = 100 - nextTop;
    return `M 0 ${top} C 55 ${top}, 82 ${nextTop}, 100 ${nextTop} L 100 ${nextBottom} C 82 ${nextBottom}, 55 ${bottom}, 0 ${bottom} Z`;
  };

  return <ChartCard title={title} className={`h-full rounded-2xl p-4 ${className ?? ""}`}>
    <div className="mb-2 flex items-start justify-between gap-3"><div><p className="text-sm text-muted-foreground">{active?.name ?? title}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-3xl font-semibold tabular-nums"><CountUp value={headline} /></p>{(!suppliedStages || suppliedDelta !== undefined || period) && <DeltaChip positive={delta >= 0}>{deltaLabel}</DeltaChip>}</div></div>{(!suppliedStages || periods) && <DropdownMenu>
      <DropdownMenuTrigger asChild><button type="button" aria-label="Change period" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[10px] border bg-background py-0 ps-2 pe-1.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><span>{period?.label ?? periodLabel ?? range.label}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" /></button></DropdownMenuTrigger>
      <DropdownMenuContent align="end">{periods ? periods.map((option, index) => <DropdownMenuItem key={option.label} onSelect={() => { setPeriodIndex(index); setActiveIndex(null); }} aria-current={periodIndex === index ? "true" : undefined}>{option.label}{periodIndex === index && <IconCheck aria-hidden="true" className="ml-auto size-4" />}</DropdownMenuItem>) : funnelRanges.map((option) => <DropdownMenuItem key={option.id} onSelect={() => { setRangeId(option.id); setActiveIndex(null); }} aria-current={range.id === option.id ? "true" : undefined}>{option.label}{range.id === option.id && <IconCheck aria-hidden="true" className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent>
    </DropdownMenu>}</div>
    <div className="grid gap-1 pt-2" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }} onMouseLeave={() => setActiveIndex(null)}>{stages.map((stage, index) => {
      const share = stage.value / maxValue;
      const nextShare = index < stages.length - 1 ? stages[index + 1].value / maxValue : share;
      const percent = Math.round(share * 100);
      const muted = activeIndex !== null && activeIndex !== index;
      return <button key={stage.name} type="button" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} className="min-w-0 text-center transition-[opacity,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" style={{ opacity: muted ? 0.3 : 1, transform: activeIndex === index ? "translateY(-4px)" : undefined }}>
      <span className="relative mx-auto grid h-[140px] place-items-center"><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true"><path d={shapePath(share * 86, nextShare * 86)} fill={stage.fill} /></svg><span className="relative rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground">{percent}%</span></span>
        <span className="mt-2 block text-sm font-medium leading-tight">{stage.name}</span><span className="mt-1 block text-sm tabular-nums text-muted-foreground">{stage.value.toLocaleString()}</span>
      </button>;
    })}</div>
  </ChartCard>;
}

export default function FunnelChartCard({ title = "Sign-up funnel", stages, delta, periodLabel, periods, className }: { title?: string; stages?: FunnelStage[]; delta?: number; periodLabel?: string; periods?: FunnelPeriod[]; className?: string } = {}) {
  return (
    <div className="space-y-5">
      <div className="mx-auto h-full w-full max-w-[800px]"><FunnelExample title={title} suppliedStages={stages} delta={delta} periodLabel={periodLabel} periods={periods} className={className} /></div>
    </div>
  );
}
