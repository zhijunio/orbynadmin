"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { StatCard } from "@/components/feature/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight as IconArrowRight, Check as IconCheck } from "lucide-react";
import { toast } from "sonner";
import { demoAvatarUrl } from "@/lib/demo-avatar";
import { getInitials } from "@/lib/text";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const overview = [
  { label: "Total Revenue", value: "$200,458", change: 2.5, trend: "up" as const, hint: "vs. last week" },
  { label: "Active Users", value: "9,528", change: 9.5, trend: "up" as const, hint: "vs. last month" },
  { label: "Customer Lifetime Value", value: "$849.54", change: 1.6, trend: "down" as const, hint: "vs. last month" },
  { label: "Customer Acquisition Cost", value: "$95.28", change: 3.5, trend: "up" as const, hint: "vs. last month" },
];
const invoices = [
  ["#DF429", "Apr 28, 2026", "Jenny Wilson", "$473.85", "Complete"],
  ["#HTY274", "Mar 30, 2026", "Wade Warren", "$293.01", "Complete"],
  ["#LKE600", "Mar 19, 2026", "Darlene Robertson", "$782.01", "Pending"],
  ["#HRP447", "Feb 20, 2026", "Arlene McCoy", "$202.87", "Cancelled"],
  ["#WRH647", "Feb 13, 2026", "Bessie Cooper", "$490.51", "Complete"],
];
const activities = [
  { name: "Francisco Grbbs", action: "created invoice", id: "PQ-4491C", time: "Just now" },
  { name: "Courtney Henry", action: "created invoice", id: "HK-234G", time: "15 minutes ago" },
  { name: "Bessie Cooper", action: "joined the Growth plan", id: "Workspace plan", time: "Yesterday" },
  { name: "Theresa Webb", action: "created invoice", id: "CK-125NH", time: "2 days ago" },
];
const trend = [
  { month: "Jan", daily: 180, online: 290, users: 210 }, { month: "Feb", daily: 210, online: 310, users: 240 },
  { month: "Mar", daily: 195, online: 280, users: 230 }, { month: "Apr", daily: 250, online: 350, users: 290 },
  { month: "May", daily: 280, online: 370, users: 330 }, { month: "Jun", daily: 270, online: 390, users: 350 },
  { month: "Jul", daily: 330, online: 420, users: 370 }, { month: "Aug", daily: 360, online: 460, users: 390 },
  { month: "Sep", daily: 340, online: 440, users: 420 }, { month: "Oct", daily: 390, online: 490, users: 450 },
  { month: "Nov", daily: 430, online: 520, users: 480 }, { month: "Dec", daily: 470, online: 560, users: 520 },
];
const funnels = [{ label: "Visitors", count: "24,800", width: "100%" }, { label: "Sign ups", count: "8,450", width: "72%" }, { label: "Activated", count: "4,920", width: "48%" }, { label: "Paid users", count: "1,842", width: "28%" }];

export default function SaaSDashboardPage() {
  const locale = useLocale();
  const t = useTranslations("Dashboard.SaaS");
  const [performance, setPerformance] = useState("Daily Sales");
  const [period, setPeriod] = useState("Monthly");
  const [query, setQuery] = useState("");
  const data = period === "Monthly" ? trend : period === "Quarterly" ? trend.filter((_, index) => index % 3 === 2) : trend.filter((_, index) => index % 6 === 5);
  const visibleInvoices = invoices.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()));
  const localizeDate = (date: string) => {
    const [month, day, year] = date.replace(",", "").split(" ");
    return new Date(Date.UTC(Number(year), new Date(`${month} 1, 2000`).getMonth(), Number(day)))
      .toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  };
  return <div className="space-y-6">
    <PageHeader title={t("title")} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{overview.map((stat) => <StatCard key={stat.label} stat={{ ...stat, label: t(`metrics.${stat.label.toLowerCase().replaceAll(/[^a-z]+/g, "")}`), hint: stat.hint === "vs. last week" ? t("vsLastWeek") : t("vsLastMonth") }} />)}</div>
    <div className="grid gap-4 xl:grid-cols-3"><Card><CardHeader><CardTitle>{t("churnRate")}</CardTitle></CardHeader><CardContent><p className="text-4xl font-semibold">4.26%</p><p className="mt-2 text-sm text-emerald-600">↓ 0.31% {t("thanLastWeek")}</p><div className="mt-6 h-2 rounded-full bg-muted"><div className="h-full w-[24%] rounded-full bg-primary" /></div><p className="mt-2 text-xs text-muted-foreground">{t("monthlyTarget")}</p></CardContent></Card><Card><CardHeader><CardTitle>{t("userGrowth")}</CardTitle></CardHeader><CardContent><p className="text-4xl font-semibold">3,768</p><p className="mt-2 text-sm text-emerald-600">↗ 3.85% {t("thanLastWeek")}</p><div className="mt-5 flex h-12 items-end gap-1">{[34, 48, 40, 64, 58, 74, 66, 86, 78, 96, 82, 100].map((height, index) => <span key={index} className="flex-1 rounded-t bg-primary/70" style={{ height: `${height}%` }} />)}</div></CardContent></Card><Card><CardHeader><CardTitle>{t("conversionFunnel")}</CardTitle></CardHeader><CardContent className="space-y-3">{funnels.map((stage) => <div key={stage.label}><div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">{t(`funnel.${stage.label.toLowerCase().replaceAll(" ", "")}`)}</span><span className="font-medium">{stage.count}</span></div><div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: stage.width }} /></div></div>)}</CardContent></Card></div>
    <div className="grid gap-4 xl:grid-cols-3"><Card className="xl:col-span-2"><CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle>{t("productPerformance")}</CardTitle></div><Tabs value={period} onValueChange={setPeriod}><TabsList className="h-auto rounded-lg border bg-background p-1">{["Monthly", "Quarterly", "Annually"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded-md px-2.5 text-xs data-active:bg-primary data-active:text-primary-foreground">{t(`periods.${item.toLowerCase()}`)}</TabsTrigger>)}</TabsList></Tabs></CardHeader><CardContent><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><Tabs value={performance} onValueChange={setPerformance}><TabsList className="h-auto rounded-md border bg-background p-1">{["Daily Sales", "Online Sales", "New Users"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded px-2.5 text-xs data-active:bg-muted data-active:font-medium">{t(`performance.${item.toLowerCase().replaceAll(" ", "")}`)}</TabsTrigger>)}</TabsList></Tabs><div className="flex gap-4">{[["digitalProduct", "790"], ["physicalProduct", "572"], ["averageDailySales", "$2,950"]].map(([label, value]) => <div key={label} className="hidden text-right sm:block"><p className="text-[11px] text-muted-foreground">{t(`salesMetrics.${label}`)}</p><p className="text-sm font-semibold">{value}</p></div>)}</div></div><div className="h-[260px]"><ApexChart type="area" height="100%" options={{
          chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
          colors: ["var(--chart-1)"], stroke: { curve: "smooth", width: 2 },
          fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
          dataLabels: { enabled: false }, markers: { size: 0 }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
          xaxis: { categories: data.map(({ month }) => t.has(`months.${month.toLowerCase()}`) ? t(`months.${month.toLowerCase()}`) : month), axisBorder: { show: false }, axisTicks: { show: false } },
          tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
        }} series={[{ name: t(`performance.${performance.toLowerCase().replaceAll(" ", "")}`), data: data.map((item) => performance === "Daily Sales" ? item.daily : performance === "Online Sales" ? item.online : item.users) }]} /></div></CardContent></Card><Card><CardHeader><CardTitle>{t("activities")}</CardTitle></CardHeader><CardContent className="divide-y">{activities.map((activity) => <div key={activity.id} className="flex gap-3 py-4 first:pt-0 last:pb-0"><Avatar className="size-9 shrink-0"><AvatarImage src={demoAvatarUrl(activity.name)} alt={activity.name} /><AvatarFallback>{getInitials(activity.name)}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="text-sm font-medium">{activity.name}</p><p className="text-xs text-muted-foreground">{t(`activity.${activity.action === "created invoice" ? "createdInvoice" : "joinedGrowthPlan"}`)} · {activity.id === "Workspace plan" ? t("workspacePlan") : activity.id}</p><p className="mt-1 text-[11px] text-muted-foreground">{t(`times.${activity.time.toLowerCase().replaceAll(" ", "")}`)}</p></div></div>)}</CardContent></Card></div>
    <Card><CardHeader><CardTitle>{t("recentInvoices")}</CardTitle></CardHeader><CardContent><div className="mb-3 flex justify-end"><input className="h-9 w-full rounded-md border bg-background px-3 text-sm sm:w-64" placeholder={t("searchInvoices")} aria-label={t("searchInvoices")} value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="overflow-x-auto"><Table className="min-w-[700px]"><TableHeader><TableRow><TableHead>{t("invoiceNo")}</TableHead><TableHead>{t("closeDate")}</TableHead><TableHead>{t("user")}</TableHead><TableHead>{t("amount")}</TableHead><TableHead>{t("statusLabel")}</TableHead><TableHead className="text-right">{t("view")}</TableHead></TableRow></TableHeader><TableBody>{visibleInvoices.map(([id, date, user, amount, status]) => <TableRow key={id}><TableCell className="font-medium">{id}</TableCell><TableCell>{localizeDate(date)}</TableCell><TableCell>{user}</TableCell><TableCell>{amount}</TableCell><TableCell><Badge variant={status === "Complete" ? "secondary" : "outline"}>{t(`status.${status.toLowerCase()}`)}</Badge></TableCell><TableCell className="text-right"><Button variant="ghost" size="sm" onClick={() => toast.success(t("invoiceToast", { id }), { description: `${user} · ${amount} · ${t(`status.${status.toLowerCase()}`)}` })}><IconCheck className="size-4" /><span className="sr-only">{t("viewInvoice", { id })}</span><IconArrowRight className="size-4" /></Button></TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>
  </div>;
}
