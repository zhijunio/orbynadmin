"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/base/tooltip/tooltip";

type Period = "Weekly" | "Monthly" | "Yearly";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthStarts = [0, 4, 9, 13, 18, 22, 27, 31, 36, 40, 45, 49];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const accent = "var(--chart-1)";
const tierRanges = [[0, 0], [1, 4], [5, 9], [10, 15], [16, 24], [25, 40]] as const;

function activityValue(week: number, day: number) {
  let hash = 0x165667b1 * day + 0x27d4eb2f * week;
  hash = (Math.imul(hash ^ (hash >>> 13), 0x4bf19f61) ^ (hash >>> 16)) >>> 0;
  const roll = hash % 20;
  const tier = roll < 6 ? 0 : roll < 11 ? 1 : roll < 15 ? 2 : roll < 18 ? 3 : roll < 19 ? 4 : 5;
  const [minimum, maximum] = tierRanges[tier];
  return tier === 0 ? 0 : minimum + ((hash >>> 3) % (maximum - minimum + 1));
}

export default function ContributionsCard() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const values = Array.from({ length: 53 * 7 }, (_, index) => activityValue(Math.floor(index / 7), index % 7));
  const total = values.reduce((sum, value) => sum + value, 0);

  return <div className="space-y-5"><Card className="mx-auto min-h-[337px] w-full gap-4 rounded-[24px] border-0 bg-muted/45 p-4 ring-0 sm:h-[337px]">
    <CardHeader className="p-0"><CardTitle className="text-sm font-medium">Contributions this year</CardTitle><div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-semibold tabular-nums">958</span><span className="rounded-md bg-lime-300/70 px-2 py-1 text-xs font-semibold text-lime-950 dark:bg-lime-400/20 dark:text-lime-300">+14.8%</span></div></CardHeader>
    <CardContent className="mt-4 p-0">
      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="Lifetime tokens" value="9B" /><Stat label="Peak tokens" value="562.7M" /><Stat label="Longest task" value="12h 54m" /><Stat label="Top streak" value="62 days" /></div>
      <div className="mb-3 flex items-center justify-between gap-3"><p className="text-sm font-medium text-muted-foreground">Activity</p><div className="flex items-center gap-3" role="group" aria-label="Contribution period">{(["Weekly", "Monthly", "Yearly"] as Period[]).map((item) => <button key={item} type="button" aria-pressed={period === item} onClick={() => setPeriod(item)} className={`px-1.5 py-1 text-xs transition-colors ${period === item ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div></div>
      <div className="overflow-x-auto pb-1"><div className="min-w-[900px] sm:min-w-0">
        <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] grid-rows-7 gap-1" role="group" aria-label={`${total} contributions across 53 weeks`}>
          {days.flatMap((day, dayIndex) => Array.from({ length: 53 }, (_, week) => {
            const value = values[week * 7 + dayIndex];
            const tier = value === 0 ? 0 : value < 5 ? 1 : value < 10 ? 2 : value < 16 ? 3 : value < 25 ? 4 : 5;
            const opacity = [0, 0.22, 0.4, 0.58, 0.78, 1][tier];
            return <Tooltip key={`${week}-${day}`}><TooltipTrigger asChild><span tabIndex={0} aria-label={`${day}, week ${week + 1}: ${value} contributions`} className="aspect-square w-full rounded-[3px] bg-muted outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1" style={value ? { backgroundColor: accent, opacity } : undefined} /></TooltipTrigger><TooltipContent>{day}, week {week + 1}: {value} contributions</TooltipContent></Tooltip>;
          }))}
        </div>
        <div className="relative mt-2 h-4">{monthStarts.map((week, index) => <span key={months[index]} className="absolute text-[11px] text-muted-foreground" style={{ left: `${week / 53 * 100}%` }}>{months[index]}</span>)}</div>
      </div></div>
    </CardContent>
  </Card></div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-[14px] bg-background px-3 py-2.5"><p className="text-sm font-semibold tabular-nums">{value}</p><p className="mt-1 truncate text-xs text-muted-foreground">{label}</p></div>;
}
