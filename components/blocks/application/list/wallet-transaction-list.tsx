"use client";

import { useState } from "react";
import { IconBuildingStore, IconBolt, IconChartLine, IconDownload, IconExternalLink, IconShoppingCart } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { cn } from "@/utils/cn";
import { ListCard, ListCardFooter, ListCardHeader } from "@/components/blocks/application/list/list-card";

const activity = {
  weekly: [
    { id: "deposit", title: "Wallet Deposit", detail: "June 16", amount: "+ $3,100.00", positive: true, Icon: IconDownload, tone: "success" },
    { id: "shopping", title: "Market Purchase", detail: "June 14", amount: "- $312.40", positive: false, Icon: IconShoppingCart, tone: "primary" },
    { id: "utility", title: "Power Service", detail: "June 12", amount: "- $84.20", positive: false, Icon: IconBolt, tone: "warning" },
    { id: "dining", title: "Cafe Payment", detail: "June 11", amount: "- $189.00", positive: false, Icon: IconBuildingStore, tone: "primary" },
    { id: "interest", title: "Interest Credit", detail: "June 9", amount: "+ $28.90", positive: true, Icon: IconChartLine, tone: "muted" },
  ],
  allTime: [
    { id: "deposit", title: "Wallet Deposit", detail: "Mar 4", amount: "+ $18,750.00", positive: true, Icon: IconDownload, tone: "success" },
    { id: "shopping", title: "Market Purchase", detail: "Quarterly avg.", amount: "- $4,920.00", positive: false, Icon: IconShoppingCart, tone: "primary" },
    { id: "utility", title: "Power Service", detail: "YTD", amount: "- $1,010.40", positive: false, Icon: IconBolt, tone: "warning" },
    { id: "dining", title: "Cafe Payment", detail: "YTD", amount: "- $2,340.88", positive: false, Icon: IconBuildingStore, tone: "primary" },
    { id: "interest", title: "Interest Credit", detail: "YTD", amount: "+ $410.22", positive: true, Icon: IconChartLine, tone: "muted" },
  ],
} as const;

const iconTones = {
  success: "bg-success text-success-foreground",
  primary: "bg-primary text-primary-foreground",
  warning: "bg-warning text-warning-foreground",
  muted: "bg-muted-foreground text-background",
} as const;

export function WalletTransactionList() {
  const [period, setPeriod] = useState<keyof typeof activity>("weekly");

  return (
    <ListCard aria-labelledby="wallet-transactions-title">
      <ListCardHeader>
        <h2 id="wallet-transactions-title" className="text-base font-semibold">Transactions</h2>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as keyof typeof activity)}>
          <TabsList className="h-8">
            <TabsTrigger value="weekly" className="px-2.5 text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="allTime" className="px-2.5 text-xs">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </ListCardHeader>
      <ul aria-live="polite" className="px-3.5">
        {activity[period].map(({ id, title, detail, amount, positive, Icon, tone }, index) => (
          <li key={id} className={cn("flex min-h-[72px] items-center gap-2", index < activity[period].length - 1 && "border-b border-dashed border-border")}>
            <span aria-hidden="true" className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg border-2 border-background shadow-sm ring-1 ring-border", iconTones[tone])}><Icon className="size-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{detail}</p>
            </div>
            <p className={cn("shrink-0 text-sm font-medium tabular-nums", positive ? "text-success" : "text-destructive")}>{amount}</p>
          </li>
        ))}
      </ul>
      <ListCardFooter>
        <Button variant="outline" className="w-full"><IconExternalLink className="size-4 text-muted-foreground" aria-hidden="true" />View More</Button>
      </ListCardFooter>
    </ListCard>
  );
}
