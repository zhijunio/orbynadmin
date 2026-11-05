"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { ListCard, ListCardHeader } from "@/components/blocks/application/list/list-card";

const inflows = {
  weekly: [
    { id: "northstar", name: "Northstar Funds", amount: "$7.6M", share: "35%", mark: "N" },
    { id: "bluepeak", name: "Bluepeak Markets", amount: "$3.4M", share: "34%", mark: "B" },
    { id: "harbor", name: "Harbor Investments", amount: "$1.2M", share: "14%", mark: "H" },
  ],
  allTime: [
    { id: "northstar", name: "Northstar Funds", amount: "$42.8M", share: "39%", mark: "N" },
    { id: "bluepeak", name: "Bluepeak Markets", amount: "$31.6M", share: "29%", mark: "B" },
    { id: "harbor", name: "Harbor Investments", amount: "$18.4M", share: "17%", mark: "H" },
  ],
} as const;

export function InflowLeaderboard() {
  const [period, setPeriod] = useState<keyof typeof inflows>("weekly");

  return (
    <ListCard aria-labelledby="inflow-title">
      <ListCardHeader>
        <h2 id="inflow-title" className="text-base font-semibold">Capital Inflows</h2>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as keyof typeof inflows)}>
          <TabsList className="h-8">
            <TabsTrigger value="weekly" className="px-2.5 text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="allTime" className="px-2.5 text-xs">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </ListCardHeader>
      <ul aria-live="polite" className="px-3.5">
        {inflows[period].map((item, index) => (
          <li key={item.id} className={`flex h-[49px] items-center gap-2 ${index < inflows[period].length - 1 ? "border-b border-border" : ""}`}>
            <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">{item.mark}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{item.name}</span>
            <span className="shrink-0 text-sm font-medium tabular-nums">{item.amount}</span>
            <span className="w-8 shrink-0 text-right text-sm text-muted-foreground tabular-nums">{item.share}</span>
          </li>
        ))}
      </ul>
    </ListCard>
  );
}
