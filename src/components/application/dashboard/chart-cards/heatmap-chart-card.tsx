"use client";

import { DeltaChip } from "@/components/application/charts/chart-card-extras";

import { useState } from "react";
import { IconCalendar, IconCheck, IconChevronDown } from "@tabler/icons-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, index) => index * 2);
const activity = [
  { day: "Mon", values: [4, 2, 1, 6, 28, 46, 52, 58, 44, 30, 18, 9] },
  { day: "Tue", values: [3, 2, 2, 8, 32, 50, 55, 62, 48, 33, 20, 10] },
  { day: "Wed", values: [5, 3, 1, 7, 30, 48, 57, 60, 47, 31, 19, 8] },
  { day: "Thu", values: [4, 2, 2, 9, 34, 52, 60, 64, 50, 35, 22, 11] },
  { day: "Fri", values: [6, 3, 2, 8, 29, 44, 49, 46, 36, 24, 15, 9] },
  { day: "Sat", values: [8, 5, 3, 4, 12, 20, 26, 28, 25, 22, 16, 12] },
  { day: "Sun", values: [7, 4, 2, 3, 10, 17, 22, 24, 23, 20, 14, 10] },
];
const scaleActivity = (factor: number) => activity.map((row, rowIndex) => ({
  ...row,
  values: row.values.map((value, columnIndex) => Math.round(value * factor * (1 + ((7 * rowIndex + 3 * columnIndex) % 5 - 2) * 0.06))),
}));
const ranges = [
  { id: "7d", label: "Last 7 days", rows: activity, delta: "+5.2%" },
  { id: "4w", label: "Last 4 weeks", rows: scaleActivity(3.8), delta: "+11.8%" },
  { id: "quarter", label: "Last quarter", rows: scaleActivity(11.4), delta: "+3.4%" },
];
const intensitySteps = [0.1, 0.25, 0.5, 0.75, 1];
const cellColor = (value: number, max: number) => `color-mix(in srgb, var(--chart-1) ${Math.round(8 + 92 * value / max)}%, var(--muted))`;

export default function HeatmapChartCard() {
  const [rangeId, setRangeId] = useState("7d");
  const [activeCell, setActiveCell] = useState<{ row: number; column: number; value: number } | null>(null);
  const range = ranges.find((item) => item.id === rangeId) ?? ranges[0];
  const maxActivity = Math.max(1, ...range.rows.flatMap((row) => row.values));
  const headline = activeCell?.value ?? range.rows.reduce((sum, row) => sum + row.values.reduce((rowSum, value) => rowSum + value, 0), 0);
  const activeLabel = activeCell ? `${weekdays[activeCell.row]} · ${String(hours[activeCell.column]).padStart(2, "0")}` : "Active users";
  return <div className="space-y-5"><div className="mx-auto w-full max-w-[448px]"><Card className="flex h-[329px] flex-col gap-0 rounded-[24px] border-0 bg-muted/45 p-4 ring-0">
    <CardHeader className="flex shrink-0 flex-row items-start justify-between gap-3 p-0"><div className="min-w-0"><CardTitle className="text-sm font-medium">{activeLabel}</CardTitle><div className="mt-1 flex items-center gap-2"><p className="text-2xl font-semibold tabular-nums">{headline.toLocaleString()}</p><span className={activeCell ? "invisible" : ""}><DeltaChip>{range.delta}</DeltaChip></span></div></div><DropdownMenu><DropdownMenuTrigger asChild><button type="button" aria-label="Change period" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border bg-background px-2.5 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-accent"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><span>{range.label}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" /></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-[188px]">{ranges.map((item) => <DropdownMenuItem key={item.id} onSelect={() => { setRangeId(item.id); setActiveCell(null); }}><span className="flex-1">{item.label}</span>{item.id === rangeId && <IconCheck aria-hidden="true" className="size-4 text-muted-foreground" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu></CardHeader>
    <CardContent className="mt-3 flex min-h-0 flex-1 flex-col p-0"><div className="overflow-x-auto pb-1" onMouseLeave={() => setActiveCell(null)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveCell(null); }}><div role="grid" aria-label="Activity by weekday and two-hour interval" className="grid w-max grid-cols-[2.5rem_repeat(12,16px)] grid-rows-[14px_repeat(7,16px)] gap-x-1.5 gap-y-1.5">
      <span />{hours.map((hour, column) => <span key={hour} className={`text-center text-[9px] leading-[14px] transition-colors ${activeCell?.column === column ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{String(hour).padStart(2, "0")}</span>)}
      {range.rows.flatMap(({ day, values }, row) => [<span key={`${day}-label`} role="rowheader" className={`flex items-center text-[10px] transition-colors ${activeCell?.row === row ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{day}</span>, ...values.map((value, column) => {
        const isActive = activeCell?.row === row && activeCell.column === column;
        const label = `${day} ${String(hours[column]).padStart(2, "0")}: ${value}`;
        return <button key={`${day}-${column}`} type="button" role="gridcell" tabIndex={0} aria-label={label} title={label} onMouseEnter={() => setActiveCell({ row, column, value })} onFocus={() => setActiveCell({ row, column, value })} className={`size-4 rounded-[3px] border border-border/30 transition-[box-shadow] ${isActive ? "ring-2 ring-foreground ring-offset-1 ring-offset-background" : ""}`} style={{ backgroundColor: cellColor(value, maxActivity) }} />;
      })])}
    </div></div>
    <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground"><span className="mr-1">Less</span>{intensitySteps.map((value) => <span key={value} className="size-3 rounded-[3px] border border-border/30" style={{ backgroundColor: cellColor(value * maxActivity, maxActivity) }} />)}<span className="ml-1">More</span></div>
    </CardContent>
  </Card></div></div>;
}
