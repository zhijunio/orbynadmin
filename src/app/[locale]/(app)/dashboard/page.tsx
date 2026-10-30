"use client";
import Image from "next/image";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";
import {
  IconArrowUpRight,
  IconDownload,
  IconPlus,
  IconDotsVertical,
  IconRefresh,
  IconPhoto,
  IconReportAnalytics,
} from "@tabler/icons-react";

import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { RevenueAreaChart } from "@/components/charts/revenue-area-chart";
import { TrafficDonutChart } from "@/components/charts/traffic-donut-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  overviewStats,
  recentActivity,
  topProducts,
  trafficSources,
  orders,
} from "@/data";

const statTranslationKeys: Record<string, string> = {
  "Total Revenue": "totalRevenue",
  "New Customers": "newCustomers",
  "Active Accounts": "activeAccounts",
  "Churn Rate": "churnRate",
};

function ChartMenu({ title }: { title: string }) {
  const t = useTranslations("Dashboard.Overview");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconDotsVertical className="size-4" />
          <span className="sr-only">{t("chartOptions", { title })}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onSelect={() =>
            toast.success(t("chartRefreshed", { title }), {
              description: t("latestData"),
            })
          }
        >
          <IconRefresh className="size-4" /> {t("refresh")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() =>
            toast.success(t("chartExported"), {
              description: t("chartSavedAsPng", { title }),
            })
          }
        >
          <IconPhoto className="size-4" /> {t("downloadPng")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() =>
            toast(t("openingReport"), {
              description: t("preparingReport", { title }),
            })
          }
        >
          <IconReportAnalytics className="size-4" /> {t("viewFullReport")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardPage() {
  const t = useTranslations("Dashboard.Overview");
  const [addOpen, setAddOpen] = useState(false);

  function handleExport() {
    toast.success(t("exported"), {
      description: t("summaryDownloading"),
    });
  }

  function handleAddWidget(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim() || t("newWidget");
    setAddOpen(false);
    toast.success(t("widgetAdded"), {
      description: t("widgetPinned", { name }),
    });
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <PageHeader
        title="Welcome back, Alex"
      >
        <Button variant="outline" onClick={handleExport}>
          <IconDownload className="size-4" /> {t("export")}
        </Button>
        <Button onClick={() => setAddOpen(true)}>
          <IconPlus className="size-4" /> {t("addWidget")}
        </Button>
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {overviewStats.map((s) => (
          <StatCard key={s.label} stat={{ ...s, label: t(`stats.${statTranslationKeys[s.label]}`), hint: t("vsLastMonth") }} />
        ))}
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>{t("revenueOverview")}</CardTitle>
            <CardAction>
              <ChartMenu title={t("revenueOverview")} />
            </CardAction>
          </CardHeader>
          <CardContent>
            <RevenueAreaChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("trafficSources")}</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficDonutChart />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-2">
            {trafficSources.map((source) => (
              <div key={source.source} className="flex items-center gap-2 text-sm">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: source.fill }}
                />
                <span className="text-muted-foreground">{t(`traffic.${source.source.toLowerCase()}`)}</span>
                <span className="ml-auto font-medium tabular-nums">
                  {source.value.toLocaleString()}
                </span>
              </div>
            ))}
          </CardFooter>
        </Card>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>{t("recentOrders")}</CardTitle>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/orders">
                  {t("viewAll")} <IconArrowUpRight className="size-4" />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">{t("customer")}</TableHead>
                  <TableHead>{t("product")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="pr-6 text-right">{t("amount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 6).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7">
                          <AvatarImage src={o.avatar} alt={o.customer} />
                          <AvatarFallback>{o.customer.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{o.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {o.product}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="pr-6 text-right font-medium tabular-nums">
                      ${o.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("topProducts")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0.5">
            {topProducts
              .map((p) => ({ ...p, revenue: p.price * p.sold }))
              .sort((a, b) => b.revenue - a.revenue)
              .map((p, i) => {
              const trend = [18.2, 12.4, 9.6, 6.1, 4.3][i] ?? 3;
              return (
                <div
                  key={p.id}
                  className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
                >
                  <span className="w-4 shrink-0 text-center text-sm font-medium text-muted-foreground tabular-nums">
                    {i + 1}
                  </span>
                  <Image
                    src={p.image}
                    unoptimized
                    alt={p.name}
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-md border bg-muted object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.has(`categories.${p.category.toLowerCase()}`) ? t(`categories.${p.category.toLowerCase()}`) : p.category} · {p.sold.toLocaleString()} {t("sold")}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-medium tabular-nums">
                      ${p.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs font-medium text-emerald-600 tabular-nums dark:text-emerald-400">
                      +{trend}%
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative space-y-5 border-l pl-6">
            {recentActivity.map((a) => (
              <li key={a.id} className="relative">
                <span className="absolute -left-[31px] top-0.5">
                  <Avatar className="size-6 ring-4 ring-background">
                    <AvatarImage src={a.avatar} alt={a.user} />
                    <AvatarFallback>{a.user.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </span>
                <p className="text-sm">
                  <span className="font-medium">{a.user}</span> {t.has(`activity.${a.id}`) ? t(`activity.${a.id}`) : a.action}{" "}
                  {a.target && <span className="font-medium">{a.target === "Enterprise plan" ? t("enterprisePlan") : a.target}</span>}
                </p>
                <span className="text-xs text-muted-foreground">{t.has(`times.${a.time}`) ? t(`times.${a.time}`) : a.time}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <form onSubmit={handleAddWidget}>
            <DialogHeader>
              <DialogTitle>{t("addWidget")}</DialogTitle>
              <DialogDescription>
                {t("widgetDescription")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="widget-name">{t("widgetName")}</Label>
                <Input
                  id="widget-name"
                  name="name"
                  placeholder={t("widgetPlaceholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="widget-type">{t("type")}</Label>
                <Select name="type" defaultValue="metric">
                  <SelectTrigger id="widget-type" className="w-full">
                    <SelectValue placeholder={t("selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">{t("metricCard")}</SelectItem>
                    <SelectItem value="line">{t("lineChart")}</SelectItem>
                    <SelectItem value="bar">{t("barChart")}</SelectItem>
                    <SelectItem value="table">{t("table")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t("cancel")}
                </Button>
              </DialogClose>
              <Button type="submit">
                <IconPlus className="size-4" /> {t("addWidget")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations("Dashboard.Overview");
  const map: Record<string, string> = {
    Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Refunded: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    Failed: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  };
  return (
    <Badge variant="secondary" className={map[status]}>
      {t(`orderStatus.${status.toLowerCase()}`)}
    </Badge>
  );
}
