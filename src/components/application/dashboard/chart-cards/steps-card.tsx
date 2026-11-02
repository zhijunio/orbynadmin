"use client";

import { CountUp } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { Bar, BarChart, BarShapeProps, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Card } from "@/components/base/card/card";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const format = new Intl.NumberFormat("en-US");
const stepsAccent = "var(--chart-1)";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getSteps(weekIndex: number, dayIndex: number) {
  let hash = Math.imul(0x9e3779b9 ^ (100 * weekIndex + dayIndex), 0x9e3779b1);
  hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b);
  hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35);
  hash = (hash ^ (hash >>> 16)) >>> 0;
  let value = 100 * Math.round((1800 + 7000 * hash / 0x100000000) / 100);
  if (weekIndex === 0 && dayIndex === 2) value = 100 * Math.round(0.85 * value / 100);
  if (weekIndex === 0 && dayIndex === 3) value = 100 * Math.round(0.8 * value / 100);
  return value;
}

function formatWeekRange(weekIndex: number) {
  const start = new Date(2026, 5, 29);
  start.setDate(start.getDate() + 7 * weekIndex);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const startMonth = months[start.getMonth()].slice(0, 3);
  const endMonth = months[end.getMonth()].slice(0, 3);
  return start.getMonth() === end.getMonth()
    ? `${start.getDate()} - ${end.getDate()} ${endMonth}`
    : `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth}`;
}

function StepsBar(props: BarShapeProps & { selectedIndex: number | null }) {
  const { x, y, width, height, index, selectedIndex, parentViewBox } = props;
  const isSelected = index === selectedIndex;
  const barHeight = Math.max(0, height);
  const trackY = parentViewBox.y;
  const trackHeight = Math.max(0, y + barHeight - trackY);
  const radius = 10;
  return <g>
    <rect x={x} y={trackY} width={width} height={trackHeight} rx={radius} fill="var(--muted)" />
    <rect x={x} y={y} width={width} height={barHeight} rx={radius} fill={isSelected ? "color-mix(in srgb, var(--chart-1) 80%, var(--foreground))" : stepsAccent} />
    <rect x={x - 3} y={trackY - 3} width={width + 6} height={trackHeight + 6} rx={radius + 3} fill="none" stroke="var(--ring)" strokeWidth="2" opacity={isSelected ? 1 : 0} />
  </g>;
}

export default function StepsCard() {
  const [weekIndex, setWeekIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const values = days.map((_, index) => getSteps(weekIndex, index));
  const total = values.reduce((sum, value) => sum + value, 0);
  const activeValue = activeIndex === null ? null : values[activeIndex];
  const data = days.map((day, index) => ({ day, steps: values[index] }));
  const weekRange = formatWeekRange(weekIndex);

  return <div className="space-y-5"><div className="max-w-[576px]">
    <Card className="flex h-[330px] w-full min-w-0 flex-col gap-4 rounded-[20px] border-0 bg-muted/45 p-2.5 ring-0">
      <div className="flex w-full items-start justify-between gap-2 px-1.5 pt-1.5">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5"><p className="text-sm font-medium text-muted-foreground">{activeIndex === null ? "Steps" : fullDays[activeIndex]}</p><div className="flex items-baseline gap-1"><p className="whitespace-nowrap text-2xl font-semibold tracking-tight tabular-nums"><CountUp value={activeValue ?? total} format={format.format} /></p><span className="whitespace-nowrap text-sm text-muted-foreground">{activeIndex === null ? "total steps" : "steps"}</span></div></div>
        <div className="flex h-8 min-w-[151px] shrink-0 items-center justify-between gap-1 rounded-lg border bg-background px-1 py-1 shadow-xs" role="group" aria-label="Week range">
          <button type="button" aria-label="Previous week" onClick={() => { setWeekIndex((index) => index - 1); setActiveIndex(null); }} className="grid size-5 shrink-0 place-items-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M9 4 5.7 7.3a1 1 0 0 0 0 1.4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
          <span className="flex-1 overflow-hidden whitespace-nowrap text-center text-sm text-foreground">{weekRange}</span>
          <button type="button" aria-label="Next week" onClick={() => { setWeekIndex((index) => index + 1); setActiveIndex(null); }} className="grid size-5 shrink-0 place-items-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m7 4 3.3 3.3a1 1 0 0 1 0 1.4L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
        </div>
      </div>
      <div className="-mx-[5.5px] min-h-0 flex-1"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap={4.5} onMouseMove={(event) => { const index = Number(event?.activeTooltipIndex); setActiveIndex(event?.isTooltipActive && Number.isFinite(index) ? index : null); }} onMouseLeave={() => setActiveIndex(null)}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={12} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} /><Tooltip content={() => null} cursor={false} />
        <Bar dataKey="steps" name="Steps" shape={(props) => <StepsBar {...props} selectedIndex={activeIndex} />} maxBarSize={50} activeBar={false} isAnimationActive />
      </BarChart></ResponsiveContainer></div>
    </Card>
  </div></div>;
}
