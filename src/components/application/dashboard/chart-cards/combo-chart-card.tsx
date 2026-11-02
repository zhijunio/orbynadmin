"use client";

import { useState } from "react";
import { IconCalendar, IconCheck, IconChevronDown } from "@tabler/icons-react";
import { Bar, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";
import { CountUp, DeltaChip } from "@/components/application/charts/chart-card-extras";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";

type Row = { month: string; sessions: number; rate: number };
type Range = { id: string; label: string; data: Row[]; delta: number };
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const makeData = (sessions: number[], rate: number[], labels = months): Row[] => labels.map((month, index) => ({ month, sessions: sessions[index], rate: rate[index] }));
const thisYear = makeData([4200, 4800, 5600, 5200, 6400, 7100, 6800, 7600, 8400, 8100, 9200, 9800], [2.4, 2.6, 3.1, 2.9, 3.4, 3.8, 3.6, 4.1, 4.4, 4.2, 4.8, 5.2]);
const ranges: Range[] = [
  { id: "year", label: "This year", data: thisYear, delta: 0.094 },
  { id: "h2", label: "Last 6 months", data: makeData([6800, 7600, 8400, 8100, 9200, 9800], [3.6, 4.1, 4.4, 4.2, 4.8, 5.2], months.slice(6)), delta: 0.121 },
  { id: "prev", label: "Last year", data: makeData([3100, 3400, 3900, 3700, 4300, 4600, 4400, 5100, 5400, 5200, 5900, 6300], [1.9, 2.1, 2.4, 2.2, 2.7, 2.9, 2.8, 3.2, 3.3, 3.1, 3.6, 3.9]), delta: -0.028 },
];
type RangeId = Range["id"];
const numberFormat = new Intl.NumberFormat("en-US");
const formatSessions = (value: number) => value >= 1000 ? `${Math.round(value / 100) / 10}K`.replace(".0K", "K") : String(Math.round(value));
const formatRate = (value: number) => `${Math.round(value * 10) / 10}%`;

function PulsingDot({ cx, cy, color }: { cx?: number; cy?: number; color: string }) {
  if (cx === undefined || cy === undefined) return null;
  return <g><circle cx={cx} cy={cy} r={5} fill={color} opacity={0.3}><animate attributeName="r" values="5;13" dur="1.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.35;0" dur="1.4s" repeatCount="indefinite" /></circle><circle cx={cx} cy={cy} r={5} fill={color} stroke="var(--background)" strokeWidth={3} /></g>;
}

export default function ComboChartCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rangeId, setRangeId] = useState<RangeId>(ranges[0].id);
  const range = ranges.find(({ id }) => id === rangeId) ?? ranges[0];
  const data = range.data;
  const active = activeIndex === null ? null : data[activeIndex];
  const total = data.reduce((sum, item) => sum + item.sessions, 0);
  const average = data.reduce((sum, item) => sum + item.rate, 0) / data.length;
  const delta = `${range.delta >= 0 ? "+" : ""}${(range.delta * 100).toFixed(1)}%`;
  const activeRate = active?.rate ?? average;

  return (
    <div className="space-y-5">
      <div className="mx-auto w-full max-w-[896px]"><ChartCard title="Sessions and conversion">
        <div className="mb-3 flex items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{active ? `${active.month} · Conversion ${formatRate(active.rate)}` : `Sessions · Conversion ${formatRate(average)}`}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums"><CountUp value={active?.sessions ?? total} /></p><DeltaChip positive={range.delta >= 0}>{delta}</DeltaChip></div></div>
          <DropdownMenu><DropdownMenuTrigger asChild><button type="button" aria-label="Change period" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border bg-background px-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><span>{range.label}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" /></button></DropdownMenuTrigger><DropdownMenuContent align="end">{ranges.map((option) => <DropdownMenuItem key={option.id} onSelect={() => { setRangeId(option.id); setActiveIndex(null); }} aria-current={range.id === option.id ? "true" : undefined}>{option.label}{range.id === option.id && <IconCheck aria-hidden="true" className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
        </div>
        <div className="h-[196px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="22%" onMouseMove={(event) => { const index = Number(event?.activeTooltipIndex); setActiveIndex(event?.isTooltipActive && Number.isInteger(index) ? index : null); }} onMouseLeave={() => setActiveIndex(null)}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
              <YAxis yAxisId="sessions" width={44} tickCount={4} tickFormatter={formatSessions} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis yAxisId="conversion" orientation="right" width={40} tickCount={4} tickFormatter={formatRate} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} interval="preserveStartEnd" tick={{ fontSize: 13, fill: "var(--muted-foreground)" }} />
              <Tooltip content={() => null} cursor={false} isAnimationActive={false} />
              <Bar yAxisId="sessions" dataKey="sessions" name="Sessions" radius={[8, 8, 8, 8]} maxBarSize={34} activeBar={false} isAnimationActive animationDuration={450}>{data.map((item, index) => <Cell key={item.month} fill={activeIndex === index ? "var(--chart-2)" : "var(--chart-2)"} opacity={activeIndex !== null && index !== activeIndex ? 0.3 : 1} style={activeIndex === index ? { filter: "brightness(0.86)" } : undefined} className="transition-[fill,opacity] duration-200 ease-out" />)}</Bar>
              <Line yAxisId="conversion" type="monotone" dataKey="rate" stroke="var(--background)" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" dot={false} activeDot={false} isAnimationActive animationDuration={450} />
              <Line yAxisId="conversion" type="monotone" dataKey="rate" name="Conversion" stroke="var(--chart-1)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" dot={{ r: 3, fill: "var(--chart-1)", stroke: "var(--background)", strokeWidth: 2 }} activeDot={<PulsingDot color="var(--chart-1)" />} isAnimationActive animationDuration={450} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-background px-3 py-2.5"><p className="flex items-center gap-2 text-sm text-muted-foreground"><i className="size-3 rounded-[4px] bg-chart-2" />Sessions · total</p><p className="mt-1 text-sm font-medium tabular-nums">{numberFormat.format(active?.sessions ?? total)}</p></div>
          <div className="rounded-xl bg-background px-3 py-2.5"><p className="flex items-center gap-2 text-sm text-muted-foreground"><i className="size-3 rounded-[4px] bg-chart-1" />Conversion · {active ? "this month" : "average"}</p><p className="mt-1 text-sm font-medium tabular-nums">{formatRate(activeRate)}</p></div>
        </div>
      </ChartCard></div>
    </div>
  );
}
