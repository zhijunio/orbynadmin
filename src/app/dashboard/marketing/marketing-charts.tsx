"use client";

import { IconCalendar } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/tabs/tabs";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";

import { CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { ChartCard } from "@/components/application/charts/chart-card";
import AreaChartCard, { type AreaChartPeriod, type AreaChartSeries } from "@/components/application/dashboard/chart-cards/area-chart-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const roasData = months.map((month, index) => ({ month, spend: [10.9, 12.8, 14.7, 14.2, 17.2, 18.6, 17.8, 20.5, 22, 20.9, 23.5, 24.6][index], roas: [2.8, 3.2, 3.4, 3, 3.7, 3.9, 3.6, 3.9, 4.2, 4, 4.4, 3.1][index] }));
const last30DayData = [
  { month: "W1", spend: 5.4, roas: 3.3 }, { month: "W2", spend: 6.1, roas: 3.5 },
  { month: "W3", spend: 5.8, roas: 3.6 }, { month: "W4", spend: 7.58, roas: 4 },
];
const visitorData = months.map((month, index) => ({ month, organic: [5000, 5200, 5500, 5700, 6000, 6100, 6300, 6400, 6600, 6800, 7000, 7900][index], paid: [2200, 2400, 2600, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 4000, 5600][index], social: [1000, 1200, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2500, 2700][index] }));
const visitorSeries: AreaChartSeries[] = [
  { key: "organic", name: "Organic", color: "var(--chart-1)" }, { key: "paid", name: "Paid", color: "var(--chart-2)" }, { key: "social", name: "Social", color: "var(--chart-3)" },
];
const visitorPeriods: AreaChartPeriod[] = [
  { id: "year", label: "This year", delta: 0.088, data: visitorData.map(({ month, ...values }) => ({ label: month, ...values })) },
  { id: "six-months", label: "Last 6 months", delta: 0.071, data: visitorData.slice(-6).map(({ month, ...values }) => ({ label: month, ...values })) },
  { id: "30-days", label: "Last 30 days", delta: 0.052, data: [{ label: "Last 30 days", organic: 7900, paid: 5600, social: 2700 }] },
];
const channelShare = [
  { label: "Google Ads", value: 39, color: "var(--chart-1)" },
  { label: "Meta", value: 25, color: "var(--chart-2)" },
  { label: "X Ads", value: 14, color: "var(--chart-3)" },
  { label: "LinkedIn", value: 8, color: "var(--chart-4)" },
  { label: "Email", value: 7, color: "var(--chart-5)" },
];

function ChannelsTab() {
  return <div className="space-y-2 pt-2">{channelShare.map((channel) => <div key={channel.label} className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-center gap-3 text-xs"><div className="relative h-7 overflow-hidden rounded-md bg-muted"><div className="absolute inset-y-0 left-0 rounded-md transition-[width] duration-300" style={{ width: `${channel.value / 39 * 100}%`, backgroundColor: `color-mix(in srgb, ${channel.color} 25%, var(--muted))` }} /><span className="absolute inset-y-0 left-2 flex items-center text-xs font-medium text-foreground">{channel.label}</span></div><span className="text-right tabular-nums text-muted-foreground">{channel.value}%</span></div>)}</div>;
}

function CampaignPerformanceTab() {
  const rows = [{ name: "Brand awareness", value: "$62.4K", detail: "4.1x ROAS" }, { name: "Retargeting", value: "$48.2K", detail: "3.8x ROAS" }, { name: "New customers", value: "$37.6K", detail: "3.2x ROAS" }, { name: "Newsletter", value: "$19.5K", detail: "2.9x ROAS" }];
  return <div className="divide-y pt-1">{rows.map((row) => <div key={row.name} className="flex items-center justify-between gap-3 py-3 text-xs"><span className="font-medium">{row.name}</span><span className="ml-auto tabular-nums text-muted-foreground">{row.value}</span><span className="w-16 text-right text-muted-foreground">{row.detail}</span></div>)}</div>;
}

function LandingPagesTab() {
  const rows = [{ path: "/spring-launch", sessions: "18.2K", rate: "8.4%" }, { path: "/holiday-guide", sessions: "12.8K", rate: "7.1%" }, { path: "/demo-request", sessions: "9.4K", rate: "6.8%" }, { path: "/newsletter", sessions: "7.1K", rate: "5.2%" }];
  return <div className="divide-y pt-1">{rows.map((row) => <div key={row.path} className="grid grid-cols-[1fr_5rem_4rem] gap-3 py-3 text-xs"><span className="truncate font-medium">{row.path}</span><span className="text-right tabular-nums text-muted-foreground">{row.sessions}</span><span className="text-right tabular-nums">{row.rate}</span></div>)}</div>;
}

function SessionsTab() {
  const values = [36, 42, 38, 56, 48, 62, 52, 70, 58, 66, 60, 78, 64, 72, 58, 84, 74, 90, 68, 82, 72, 96, 80, 88];
  return <div className="flex h-[124px] items-end gap-1.5 pt-3" aria-label="Sessions trend over the last 24 periods">{values.map((value, index) => <span key={index} className="min-w-0 flex-1 rounded-t-sm bg-chart-1/75 transition-[height]" style={{ height: `${value}%` }} />)}</div>;
}

export function ChannelPerformanceCard() {
  return <ChartCard title="Channel performance" className="flex h-[329px] flex-col p-4">
    <CardHeader className="p-0"><CardTitle className="text-sm font-medium">Channel performance</CardTitle></CardHeader>
    <Tabs defaultValue="channels" className="mt-3 min-h-0 flex-1">
      <TabsList variant="line" className="grid w-full grid-cols-4 gap-0">
        <TabsTrigger value="channels" className="min-w-0 px-0.5 text-[11px]">Channels</TabsTrigger><TabsTrigger value="campaigns" className="min-w-0 px-0.5 text-[11px]">Campaigns</TabsTrigger><TabsTrigger value="landing-pages" className="min-w-0 px-0.5 text-[11px]">Landing pages</TabsTrigger>
        <TabsTrigger value="sessions" className="min-w-0 px-0.5 text-[11px]">Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="channels"><ChannelsTab /></TabsContent>
      <TabsContent value="campaigns"><CampaignPerformanceTab /></TabsContent>
      <TabsContent value="landing-pages"><LandingPagesTab /></TabsContent>
      <TabsContent value="sessions"><SessionsTab /></TabsContent>
    </Tabs>
  </ChartCard>;
}

export function AdSpendRoasCard() {
  const [period, setPeriod] = useState("This year");
  const data = period === "Last 30 days" ? last30DayData : period === "Last 6 months" ? roasData.slice(-6) : period === "Last year" ? roasData.map((item) => ({ ...item, spend: item.spend * 0.91, roas: item.roas - 0.2 })) : roasData;
  const total = data.reduce((sum, item) => sum + item.spend, 0);
  const averageRoas = data.reduce((sum, item) => sum + item.roas, 0) / data.length;
  const change = period === "This year" ? "+9.4%" : period === "Last year" ? "−3.6%" : "+6.2%";
  return <ChartCard title="Ad spend and return on ad spend" className="flex h-[365px] flex-col gap-3 p-4">
    <CardHeader className="flex flex-row items-start justify-between gap-3 p-0"><div><CardTitle className="text-sm font-medium">Ad spend · ROAS {averageRoas.toFixed(1)}x</CardTitle><p className="mt-2 text-2xl font-semibold tabular-nums">${total.toFixed(1)}K <span className={`text-xs font-medium ${change.startsWith("−") ? "text-rose-700 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-400"}`}>{change}</span></p></div><Select value={period} onValueChange={setPeriod}><SelectTrigger aria-label="Ad spend and ROAS date range" className="h-8 w-fit gap-1.5 rounded-[10px] py-0 pl-2 pr-1.5 text-sm font-medium text-foreground shadow-xs focus-visible:ring-2 focus-visible:ring-ring dark:bg-background dark:hover:bg-accent"><IconCalendar aria-hidden="true" className="size-4 text-muted-foreground" /><SelectValue /></SelectTrigger><SelectContent>{["This year", "Last 6 months", "Last 30 days", "Last year"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></CardHeader>
    <CardContent className="min-h-0 flex-1 p-0"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={data} margin={{ top: 6, right: 4, bottom: 0, left: -18 }}>
      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><YAxis yAxisId="spend" domain={[0, 25.5]} ticks={[0, 8.5, 17, 25.5]} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(value) => value === 0 ? "$0" : `$${value}K`} /><YAxis yAxisId="roas" orientation="right" domain={[0, 6]} ticks={[0, 2, 4, 6]} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(value) => `${value.toFixed(1)}x`} /><Tooltip content={() => null} />
      <Bar yAxisId="spend" dataKey="spend" name="Ad spend" fill="var(--chart-1)" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={450} /><Line yAxisId="roas" type="monotone" dataKey="roas" name="ROAS" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 2, fill: "var(--chart-2)", stroke: "var(--background)", strokeWidth: 1 }} isAnimationActive animationDuration={450} />
    </ComposedChart></ResponsiveContainer></CardContent>
    <div className="grid shrink-0 grid-cols-2 gap-2"><div className="rounded-xl bg-background px-3 py-2"><p className="flex items-center gap-1.5 text-xs text-muted-foreground"><i className="size-2.5 rounded-sm bg-chart-1" />Ad spend · total</p><p className="mt-1 text-sm font-semibold tabular-nums">${total.toFixed(1)}K</p></div><div className="rounded-xl bg-background px-3 py-2"><p className="flex items-center gap-1.5 text-xs text-muted-foreground"><i className="size-2.5 rounded-sm bg-chart-2" />ROAS · average</p><p className="mt-1 text-sm font-semibold tabular-nums">{averageRoas.toFixed(1)}x</p></div></div>
  </ChartCard>;
}

export function VisitorsCard() {
  return <AreaChartCard title="Visitors" periods={visitorPeriods} series={visitorSeries} className="h-[365px]" fullWidth />;
}
