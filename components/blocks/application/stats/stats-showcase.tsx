"use client";

import { useState, type ComponentProps } from "react";
import {
  IconActivity, IconArrowRight, IconArrowUpRight, IconCreditCard, IconDots,
  IconInfoCircle, IconUsers,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card } from "@/components/ui/card/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Progress } from "@/components/ui/progress/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { cn } from "@/utils/cn";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { demoAvatarUrl } from "@/utils/demo-avatar";

const examples = [
  { title: "Stats Overview", wide: true, component: <StatsOverview /> },
  { title: "KPI Scorecard", wide: true, component: <KpiScorecard /> },
  { title: "Wallet Balance", component: <WalletBalance /> },
  { title: "Task Progress", component: <TaskProgress /> },
  { title: "KPI Callouts", wide: true, component: <KpiCallouts /> },
  { title: "Portfolio Allocation", wide: true, component: <PortfolioAllocation /> }
];

export function StatsShowcase() {
  return <main className="mx-auto w-full max-w-7xl space-y-6 pb-8">
    <h1 className="text-2xl font-semibold tracking-tight">Stats</h1>
    <div className="grid min-w-0 gap-5 md:grid-cols-2">
      {examples.map(({ title, wide, component }) => <ComponentPreview key={title} title={title} className={wide ? "md:col-span-2" : undefined} previewClassName="w-full items-start">{component}</ComponentPreview>)}
    </div>
  </main>;
}

function Frame({ className, dense = false, spacing: _spacing, ...props }: ComponentProps<typeof Card> & { dense?: boolean; spacing?: "xs" | "sm" | "default" | "lg" }) {
  void _spacing;
  return <Card className={cn("w-full border border-border bg-card p-4 shadow-none ring-0", dense && "divide-y gap-0 overflow-hidden p-0", className)} {...props} />;
}

function FramePanel({ className, ...props }: ComponentProps<"div">) {
  return <div className={className} {...props} />;
}

function ActionsMenu({ items = ["View Details", "Export Data", "Refresh", "Settings", "Remove"] }: { items?: string[] }) {
  const [message, setMessage] = useState("");
  return <div className="flex items-center gap-2">
    {message && <span role="status" className="text-xs text-muted-foreground">{message}</span>}
    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="More actions"><IconDots /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{items.map((item) => <DropdownMenuItem key={item} onSelect={() => setMessage(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
  </div>;
}

function RangeSelect({ value, defaultValue = "This Month", onValueChange }: { value?: string; defaultValue?: string; onValueChange?: (value: string) => void }) {
  return <Select value={value} defaultValue={value ? undefined : defaultValue} onValueChange={onValueChange}><SelectTrigger size="sm" aria-label="Reporting period"><SelectValue /></SelectTrigger><SelectContent>{["This Month", "Last Month", "This Quarter", "This Year", "Q3 - 2024"].map((range) => <SelectItem value={range} key={range}>{range}</SelectItem>)}</SelectContent></Select>;
}

function Trend({ value, positive = true, subdued = false }: { value: string; positive?: boolean; subdued?: boolean }) {
  return <Badge variant={subdued ? "secondary" : positive ? "success-light" : "destructive-light"} className="gap-1"><span aria-hidden="true">{positive ? "↗" : "↘"}</span>{value}</Badge>;
}

function StatsOverview() {
  const items = [{ label: "All Orders", value: "122,380", delta: "15.1%", prev: "105,922", up: true }, { label: "Order Created", value: "1.9M", delta: "-2%", prev: "2.0M", up: false }, { label: "Organic Sales", value: "$98.1M", delta: "0.4%", prev: "$97.8M", up: true }, { label: "Active Users", value: "48,210", delta: "3.7%", prev: "46,480", up: true }];
  return <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">{items.map((item) => <Frame key={item.label} spacing="sm"><FramePanel className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{item.label}</span><ActionsMenu /></div><div className="flex items-center gap-2"><strong className="text-2xl font-semibold tabular-nums">{item.value}</strong><Trend value={item.delta} positive={item.up} /></div><div className="border-t pt-3 text-xs text-muted-foreground">Vs last month: <span className="font-medium text-foreground">{item.prev}</span></div></FramePanel></Frame>)}</div>;
}

function KpiScorecard() {
  const data = [{ name: "Total Sales", value: "$892.2M", delta: "0.2%", last: "$889.1M", tone: "bg-neutral-950" }, { name: "New Customers", value: "12,800", delta: "3.1%", last: "12,400", tone: "bg-fuchsia-600" }, { name: "Refunds", value: "320", delta: "-1.2%", last: "340", tone: "bg-blue-600" }, { name: "Churn Rate", value: "2.3%", delta: "-0.1%", last: "2.4%", tone: "bg-teal-600" }];
  return <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">{data.map((item) => <div key={item.name} className={`${item.tone} rounded-xl p-4 text-white`}><div className="flex items-center justify-between text-sm">{item.name}<ActionsMenu /></div><div className="mt-4 flex items-center gap-2"><strong className="text-2xl tabular-nums">{item.value}</strong><Badge className="border-white/15 bg-white/15 text-white">{item.delta.startsWith("-") ? "↘" : "↗"} {item.delta}</Badge></div><div className="mt-3 border-t border-white/15 pt-3 text-xs text-white/70">Vs last month: <span className="text-white">{item.last}</span></div></div>)}</div>;
}

function WalletBalance() {
  const [topupStarted, setTopupStarted] = useState(false);
  const currencies = [{ code: "USD", value: 30, color: "bg-white" }, { code: "GBP", value: 20, color: "bg-indigo-400" }, { code: "EUR", value: 15, color: "bg-blue-500" }, { code: "JPY", value: 20, color: "bg-purple-600" }, { code: "CNY", value: 15, color: "bg-fuchsia-600" }];
  return <div className="w-full max-w-xl rounded-xl bg-zinc-900 p-5 text-white"><header className="flex items-center justify-between"><span className="font-semibold text-zinc-400">Balance</span><Button size="sm" variant="secondary" onClick={() => setTopupStarted(true)}><IconCreditCard />{topupStarted ? "Top up started" : "Topup"}</Button></header><div className="mt-6 flex items-baseline gap-4"><strong className="text-3xl tabular-nums">$10,976.95</strong><span className="text-sm font-medium text-emerald-400">+5.7%</span></div><div className="mt-5 border-t border-white/15 pt-5"><div className="flex h-2 gap-1.5">{currencies.map((item) => <span key={item.code} className={`rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />)}</div><div className="mt-2 grid grid-cols-5 gap-2">{currencies.map((item) => <div key={item.code} className="text-xs text-zinc-400">{item.code}<strong className="mt-1 block text-base text-white">{item.value}%</strong></div>)}</div></div></div>;
}

function TaskProgress() {
  return <Frame className="w-full"><FramePanel className="space-y-5"><header className="flex items-center justify-between"><h2 className="font-semibold">Tasks Overview</h2><RangeSelect /></header><div><div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Tasks Done</span><span>12</span></div><Progress value={64} aria-label="Tasks completed" className="h-1" /></div><div className="grid grid-cols-3 gap-2">{[{ value: "28", label: "Backlog", color: "text-emerald-500" }, { value: "14", label: "In Progress", color: "text-amber-500" }, { value: "8", label: "In Review", color: "text-indigo-500" }].map((item) => <div key={item.label} className="rounded-xl bg-muted/50 p-3 text-center"><strong className={`text-xl ${item.color}`}>{item.value}</strong><p className="text-xs">{item.label}</p></div>)}</div><p className="text-center text-xs text-muted-foreground">AI prediction to finish all tasks: <b className="text-foreground">1w 4d 2h</b></p></FramePanel></Frame>;
}

function KpiCallouts() {
  const items = [{ icon: IconActivity, value: "27.3%", title: "NPS Improvement", desc: "Our new onboarding flow increased Net Promoter Score by 27.3% in Q2.", cta: "Read full story", color: "bg-blue-600" }, { icon: IconUsers, value: "8,200", title: "Active Users", desc: "Highest monthly active users since launch. Engagement up 12% MoM.", cta: "See user insights", color: "bg-emerald-600" }, { icon: IconArrowUpRight, value: "$1.4M", title: "ARR Growth", desc: "Annual recurring revenue grew by $1.4M in the last quarter.", cta: "View ARR breakdown", color: "bg-fuchsia-700" }];
  return <div className="grid w-full gap-4 md:grid-cols-3">{items.map((item) => <KpiCallout key={item.title} {...item} />)}</div>;
}

function KpiCallout({ icon: Icon, value, title, desc, cta, color }: { icon: typeof IconActivity; value: string; title: string; desc: string; cta: string; color: string }) {
  const [opened, setOpened] = useState(false);
  return <article className={`flex min-h-64 flex-col overflow-hidden rounded-xl text-white shadow-sm ${color}`}><div className="flex-1 p-5"><Icon className="size-5 text-white/70" /><strong className="mt-3 block text-3xl">{value}</strong><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-1 text-sm text-white/80">{desc}</p></div><button type="button" onClick={() => setOpened(true)} className="flex items-center justify-between bg-black/75 px-5 py-3 text-left text-sm hover:bg-black/85"><span>{opened ? "Opened" : cta}</span><IconArrowRight className="size-4" /></button></article>;
}

function PortfolioAllocation() {
  const data = [{ label: "Equities", share: 52, delta: "+5.1%", exposure: "$5.2M", managers: 6, color: "bg-emerald-500" }, { label: "Fixed Income", share: 29, delta: "-2.6%", exposure: "$2.9M", managers: 2, color: "bg-violet-500" }, { label: "Alternatives", share: 12, delta: "-0.9%", exposure: "$1.2M", managers: 5, color: "bg-amber-500" }];
  return <div className="grid w-full gap-3 xl:grid-cols-3">{data.map((item) => <Frame key={item.label} className="w-full" spacing="sm"><FramePanel className="space-y-3"><header className="flex flex-wrap items-center justify-between gap-3"><span className="flex items-center gap-1.5 text-sm">{item.label}<IconInfoCircle className="size-3.5 text-muted-foreground" /></span><PeriodTabs /></header><div className="flex flex-wrap items-center gap-2"><strong className="text-2xl">{item.share}%</strong><Trend value={item.delta} positive={!item.delta.startsWith("-")} /><span className="text-xs text-muted-foreground">vs last month</span></div><SegmentMeter count={40} filled={Math.round(item.share / 100 * 40)} color={item.color} /><div className="flex items-center justify-between gap-3 text-xs"><span className="text-muted-foreground">Exposure <b className="text-foreground">{item.exposure}</b></span><div className="flex items-center gap-2"><ManagerAvatars count={item.managers} /><span className="text-muted-foreground">{item.managers} Managers</span></div></div></FramePanel></Frame>)}</div>;
}

function SegmentMeter({ count, filled, color }: { count: number; filled: number; color: string }) {
  return <div className="flex w-full gap-1" aria-hidden="true">{Array.from({ length: count }, (_, index) => <span key={index} className={`min-w-0 flex-1 rounded-full ${index < filled ? color : "bg-muted"} ${count > 24 ? "h-1.5" : "h-2"}`} />)}</div>;
}

function PeriodTabs() {
  return <Tabs defaultValue="1M"><TabsList className="h-7"><TabsTrigger value="1W" className="px-2 text-xs">1W</TabsTrigger><TabsTrigger value="1M" className="px-2 text-xs">1M</TabsTrigger><TabsTrigger value="3M" className="px-2 text-xs">3M</TabsTrigger><TabsTrigger value="1Y" className="px-2 text-xs">1Y</TabsTrigger></TabsList></Tabs>;
}

function ManagerAvatars({ count }: { count: number }) {
  return <AvatarGroup className="-space-x-2">{Array.from({ length: Math.min(count, 3) }, (_, index) => <Avatar key={index} size="xs" className="ring-2 ring-background"><AvatarImage src={demoAvatarUrl(`manager-${index + count}`)} alt="" /><AvatarFallback>{["JS", "MK", "AR"][index]}</AvatarFallback></Avatar>)}</AvatarGroup>;
}

