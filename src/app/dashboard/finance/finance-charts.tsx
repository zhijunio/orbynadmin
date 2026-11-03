"use client";

import { useState } from "react";

import { IconArrowUpRight, IconCalendar } from "@tabler/icons-react";
import { Button } from "@/components/base/buttons/button";
import { CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { ChartCard } from "@/components/application/charts/chart-card";
import RadialChartCard from "@/components/application/dashboard/chart-cards/radial-chart-card";
import { PortfolioScatterChartCard } from "@/components/application/dashboard/chart-cards/scatter-chart-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";

const spendingMetrics = [
  { label: "Groceries", value: 1_840, color: "var(--chart-1)" }, { label: "Housing", value: 1_620, color: "var(--chart-2)" }, { label: "Transport", value: 970, color: "var(--chart-3)" }, { label: "Subscriptions", value: 740, color: "var(--chart-4)" }, { label: "Utilities", value: 640, color: "var(--chart-5)" },
];
const spendingPeriods = [
  { label: "This month", metrics: spendingMetrics, change: "+2.4%", maximum: 1_840 },
  { label: "This quarter", metrics: spendingMetrics.map((item) => ({ ...item, value: item.value * 3 })), change: "+4.8%", maximum: 5_520 },
  { label: "This year", metrics: spendingMetrics.map((item) => ({ ...item, value: item.value * 12 })), change: "+8.2%", maximum: 22_080 },
];

const incomeSources = [
  { label: "Salary", value: 12_400, color: "var(--chart-1)" },
  { label: "Freelance", value: 3_800, color: "var(--chart-2)" },
  { label: "Dividends", value: 2_220, color: "var(--chart-3)" },
];
const incomeTargets = [
  { label: "Housing", value: 2_579, color: "var(--chart-4)" }, { label: "Groceries", value: 1_289, color: "var(--chart-5)" },
  { label: "Transport", value: 553, color: "var(--chart-2)" }, { label: "Subscriptions", value: 368, color: "var(--chart-3)" },
  { label: "Dining", value: 921, color: "var(--chart-4)" }, { label: "Investing", value: 6_631, color: "var(--chart-1)" },
  { label: "Savings", value: 6_079, color: "var(--chart-2)" },
];
const incomeLinks = incomeSources.flatMap((source) => incomeTargets.map((target) => ({
  source: source.label, target: target.label, value: source.value * target.value / 18_420, color: source.color,
})));

const spendingTargets = [
  { label: "Housing", value: 1_620, color: "var(--chart-4)" }, { label: "Groceries", value: 1_840, color: "var(--chart-5)" },
  { label: "Transport", value: 970, color: "var(--chart-2)" }, { label: "Subscriptions", value: 740, color: "var(--chart-3)" },
  { label: "Utilities", value: 640, color: "var(--chart-4)" }, { label: "Other", value: 3_330, color: "var(--chart-1)" },
];
const spendingLinks = spendingTargets.map((target) => ({ source: "Expenses", target: target.label, value: target.value, color: target.color }));

function CashFlowCard() {
  const [mode, setMode] = useState<"Income" | "Spending">("Income");
  const [period, setPeriod] = useState("This month");
  const multiplier = period === "This quarter" ? 3 : period === "This year" ? 12 : 1;
  const baseLinks = mode === "Income" ? incomeLinks : spendingLinks;
  const links = baseLinks.map((link) => ({ ...link, value: link.value * multiplier }));
  const sourceNames = [...new Set(links.map(({ source }) => source))];
  const targetNames = [...new Set(links.map(({ target }) => target))];
  const totalBySource = Object.fromEntries(sourceNames.map((name) => [name, links.filter((link) => link.source === name).reduce((sum, link) => sum + link.value, 0)]));
  const totalByTarget = Object.fromEntries(targetNames.map((name) => [name, links.filter((link) => link.target === name).reduce((sum, link) => sum + link.value, 0)]));
  const total = (mode === "Income" ? 18_420 : 9_140) * multiplier;
  const change = period === "This month" ? (mode === "Income" ? "+6.1%" : "+2.4%") : period === "This quarter" ? "+4.8%" : "+8.2%";
  const sourceLabel = mode === "Income" ? "Income sources" : "Spending";
  const chartTop = 28;
  const chartHeight = 188;
  const gap = 7;
  const flowHeight = chartHeight - (Math.max(sourceNames.length, targetNames.length) - 1) * gap;
  const sourceHeights = Object.fromEntries(sourceNames.map((name) => [name, flowHeight * totalBySource[name] / total]));
  const targetHeights = Object.fromEntries(targetNames.map((name) => [name, flowHeight * totalByTarget[name] / total]));
  const sourceY = Object.fromEntries(sourceNames.map((name, index) => [name, chartTop + sourceNames.slice(0, index).reduce((sum, item) => sum + sourceHeights[item] + gap, 0)]));
  const targetY = Object.fromEntries(targetNames.map((name, index) => [name, chartTop + targetNames.slice(0, index).reduce((sum, item) => sum + targetHeights[item] + gap, 0)]));
  const sourceOffsets: Record<string, number> = { ...sourceY };
  const targetOffsets: Record<string, number> = { ...targetY };
  const positionedLinks = links.map((link) => {
    const height = flowHeight * link.value / total;
    const start = sourceOffsets[link.source];
    const end = targetOffsets[link.target];
    sourceOffsets[link.source] += height;
    targetOffsets[link.target] += height;
    return { ...link, height, start, end };
  });

  return <ChartCard title="Cash flow" className="flex h-[480px] flex-col gap-0 p-4">
    <CardHeader className="flex shrink-0 flex-row items-start justify-between gap-3 p-0">
      <div><CardTitle className="text-sm font-medium">Cash flow</CardTitle><p className="mt-2 text-2xl font-semibold tabular-nums">${total.toLocaleString()} <span className={`text-sm font-medium ${mode === "Income" ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>{change}</span></p></div>
      <Select value={period} onValueChange={setPeriod}><SelectTrigger aria-label="Cash flow date range" className="h-8 w-fit gap-1.5 rounded-[10px] py-0 pl-2 pr-1.5 text-sm font-medium text-foreground shadow-xs dark:bg-background dark:hover:bg-accent"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><SelectValue>{period}</SelectValue></SelectTrigger><SelectContent>{["This month", "This quarter", "This year"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
      <div className="flex rounded-lg border bg-background p-0.5" role="group" aria-label="Cash flow view">
        {(["Income", "Spending"] as const).map((item) => <Button key={item} type="button" size="sm" variant={mode === item ? "secondary" : "ghost"} aria-pressed={mode === item} onClick={() => setMode(item)}>{item}</Button>)}
      </div>
    </CardHeader>
    <CardContent className="mt-3 min-h-0 flex-1 p-0">
      <svg viewBox="0 0 700 260" preserveAspectRatio="xMidYMid meet" className="size-full" role="img" aria-label={`${sourceLabel} flow breakdown`}>
        <text x="30" y="20" fill="var(--muted-foreground)" fontSize="12">{sourceLabel}</text>
        {positionedLinks.map((link) => <path key={`${link.source}-${link.target}`} d={`M184 ${link.start + link.height / 2} C275 ${link.start + link.height / 2}, 365 ${link.end + link.height / 2}, 470 ${link.end + link.height / 2}`} fill="none" stroke={link.color} strokeOpacity="0.3" strokeWidth={Math.max(1, link.height)} />)}
        {sourceNames.map((name) => <g key={name}><rect x="170" y={sourceY[name]} width="14" height={sourceHeights[name]} rx="7" fill={links.find((link) => link.source === name)?.color} /><text x="158" y={sourceY[name] + sourceHeights[name] / 2 - 5} textAnchor="end" fill="var(--foreground)" fontSize="13" fontWeight="500">{name}</text><text x="158" y={sourceY[name] + sourceHeights[name] / 2 + 10} textAnchor="end" fill="var(--muted-foreground)" fontSize="11">${totalBySource[name].toLocaleString()}</text></g>)}
        {targetNames.map((name) => <g key={name}><rect x="470" y={targetY[name]} width="14" height={targetHeights[name]} rx="7" fill={(mode === "Income" ? incomeTargets : spendingTargets).find((target) => target.label === name)?.color} /><text x="500" y={targetY[name] + targetHeights[name] / 2 + 4} fill="var(--foreground)" fontSize="12" fontWeight="500">{name} · {Math.round(totalByTarget[name] / total * 100)}%</text></g>)}
      </svg>
    </CardContent>
  </ChartCard>;
}

const initialDailyValues = Array.from({ length: 84 }, (_, index) => 12 + ((index * 37 + Math.floor(index / 12) * 13) % 80));
const scaledDailyValues = initialDailyValues.map((value) => Math.round(value * 4_390 / 4_306));
const dailyValues = scaledDailyValues.map((value, index) => index === 83 ? value + 4_390 - scaledDailyValues.reduce((sum, amount) => sum + amount, 0) : value);
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DailySpendingCard() {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [period, setPeriod] = useState("Last 12 weeks");
  const count = period === "Last 4 weeks" ? 28 : period === "Last 8 weeks" ? 56 : 84;
  const values = dailyValues.slice(-count);
  const weeks = count / 7;
  const max = Math.max(...values);
  const total = values.reduce((sum, value) => sum + value, 0);
  return <ChartCard title="Daily spending" className="flex h-[329px] flex-col gap-4 p-4 md:col-span-2 xl:col-span-1">
    <CardHeader className="flex flex-row items-start justify-between gap-3 p-0"><div><CardTitle className="text-sm font-medium">Daily spending</CardTitle><p className="mt-2 flex items-baseline gap-2 text-2xl font-semibold tabular-nums">${total.toLocaleString()} <span className="inline-flex items-center text-xs font-medium text-emerald-700 dark:text-emerald-400"><IconArrowUpRight aria-hidden="true" className="size-3.5" />{period === "Last 12 weeks" ? "3.6%" : period === "Last 8 weeks" ? "2.8%" : "1.4%"}</span></p></div><Select value={period} onValueChange={(value) => { setPeriod(value); setActiveDay(null); }}><SelectTrigger aria-label="Daily spending date range" className="h-8 w-fit gap-1.5 rounded-[10px] py-0 pl-2 pr-1.5 text-sm font-medium text-foreground shadow-xs dark:bg-background dark:hover:bg-accent"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><SelectValue>{period}</SelectValue></SelectTrigger><SelectContent>{["Last 4 weeks", "Last 8 weeks", "Last 12 weeks"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></CardHeader>
    <CardContent className="flex min-h-0 flex-1 items-center gap-5 p-0">
      <div className="grid shrink-0 gap-x-1 gap-y-1 overflow-x-auto" style={{ gridTemplateColumns: `1.75rem repeat(${weeks}, 0.625rem)` }} role="group" aria-label={`Daily spending over the last ${weeks} weeks`} onMouseLeave={() => setActiveDay(null)}>
        <span />{Array.from({ length: weeks }, (_, week) => <span key={week} className="whitespace-nowrap text-center text-[7px] leading-3 text-muted-foreground">W{week + 1}</span>)}
        {weekdays.flatMap((day, dayIndex) => [<span key={`${day}-label`} className="text-[10px] text-muted-foreground">{day}</span>, ...Array.from({ length: weeks }, (_, week) => {
          const index = week * 7 + dayIndex;
          const value = values[index];
          return <button key={`${day}-${week}`} type="button" aria-label={`${day}, week ${week + 1}: $${value}`} onMouseEnter={() => setActiveDay(index)} onFocus={() => setActiveDay(index)} onBlur={() => setActiveDay(null)} className={`size-2.5 rounded-[3px] border border-border/30 outline-none transition-[background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-ring ${activeDay === index ? "ring-2 ring-foreground ring-offset-1" : ""}`} style={{ backgroundColor: `color-mix(in srgb, var(--chart-1) ${Math.round(10 + value / max * 90)}%, var(--muted))` }} />;
        })])}
      </div>
      <div className="ml-auto shrink-0 text-right"><p className="text-xs text-muted-foreground">{activeDay === null ? "Average per day" : `${weekdays[activeDay % 7]} · week ${Math.floor(activeDay / 7) + 1}`}</p><p className="mt-1 text-lg font-semibold tabular-nums">${activeDay === null ? Math.round(total / count) : values[activeDay].toLocaleString()}</p><div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-muted-foreground"><span>Less</span>{[15, 35, 60, 85].map((value) => <i key={value} className="size-2.5 rounded-[2px]" style={{ backgroundColor: `color-mix(in srgb, var(--chart-1) ${value}%, var(--muted))` }} />)}<span>More</span></div></div>
    </CardContent>
  </ChartCard>;
}

export default function FinanceCharts() {
  return <div className="space-y-4">
    <CashFlowCard />
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
      <RadialChartCard title="Spending by category" metrics={spendingMetrics} maximum={1840} change="+2.4%" periodLabel="This month" periods={spendingPeriods} valuePrefix="$" compact className="h-[329px]" />
      <PortfolioScatterChartCard />
      <DailySpendingCard />
    </div>
  </div>;
}
