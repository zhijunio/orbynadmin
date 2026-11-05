"use client";

import { useState } from "react";
import { IconArrowDownRight, IconArrowUpRight, IconBuildingBank, IconCurrencyBitcoin, IconCurrencyDollar, IconChartBar, IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { cn } from "@/utils/cn";
import { ListCard, ListCardFooter, ListCardHeader } from "@/components/blocks/application/list/list-card";

const portfolio = {
  weekly: [
    { id: "bitcoin", name: "Bitcoin", price: "$64,120", change: "0.3%", value: "$3,334", units: "0.052 BTC", direction: "down", Icon: IconCurrencyBitcoin },
    { id: "stablecoin", name: "Dollar Token", price: "$1.00", change: "1.2%", value: "$590", units: "590 DLT", direction: "up", Icon: IconCurrencyDollar },
    { id: "algorand", name: "Algorand", price: "$0.18", change: "2.9%", value: "$450", units: "2,500 ALGO", direction: "down", Icon: IconChartBar },
    { id: "network", name: "Network Token", price: "$320.40", change: "1.7%", value: "$1,345.68", units: "4.2 NET", direction: "up", Icon: IconBuildingBank },
  ],
  allTime: [
    { id: "bitcoin", name: "Bitcoin", price: "$64,120", change: "2.1%", value: "$3,426", units: "0.053 BTC", direction: "up", Icon: IconCurrencyBitcoin },
    { id: "stablecoin", name: "Dollar Token", price: "$1.00", change: "0.4%", value: "$590", units: "590 DLT", direction: "up", Icon: IconCurrencyDollar },
    { id: "algorand", name: "Algorand", price: "$0.18", change: "4.2%", value: "$432", units: "2,400 ALGO", direction: "down", Icon: IconChartBar },
    { id: "network", name: "Network Token", price: "$320.40", change: "3.1%", value: "$1,377.72", units: "4.3 NET", direction: "up", Icon: IconBuildingBank },
  ],
} as const;

export function PortfolioSnapshot() {
  const [period, setPeriod] = useState<keyof typeof portfolio>("weekly");

  return (
    <ListCard aria-labelledby="portfolio-title">
      <ListCardHeader>
        <h2 id="portfolio-title" className="text-base font-semibold">Portfolio Snapshot</h2>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as keyof typeof portfolio)}>
          <TabsList className="h-8">
            <TabsTrigger value="weekly" className="px-2.5 text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="allTime" className="px-2.5 text-xs">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </ListCardHeader>
      <ul aria-live="polite" className="px-3.5">
        {portfolio[period].map(({ id, name, price, change, value, units, direction, Icon }, index) => {
          const TrendIcon = direction === "up" ? IconArrowUpRight : IconArrowDownRight;
          return (
            <li key={id} className={cn("flex min-h-[72px] items-center gap-2", index < portfolio[period].length - 1 && "border-b border-dashed border-border")}>
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{name}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{price}</span>
                  <span className={cn("inline-flex items-center gap-0.5 rounded border px-1 py-0.5 font-medium", direction === "up" ? "border-success/20 bg-success/10 text-success" : "border-destructive/20 bg-destructive/10 text-destructive")}>
                    <TrendIcon className="size-3" aria-hidden="true" />{change}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium tabular-nums">{value}</p>
                <p className="text-xs text-muted-foreground">{units}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <ListCardFooter>
        <Button variant="outline" className="w-full"><IconExternalLink className="size-4 text-muted-foreground" aria-hidden="true" />Add Asset</Button>
      </ListCardFooter>
    </ListCard>
  );
}
