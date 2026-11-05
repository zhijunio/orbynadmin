"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { ListCard, ListCardHeader } from "@/components/blocks/application/list/list-card";

const funds = [
  { id: "northstar", name: "Northstar Reserve", amount: "$7,928,400", mark: "N" },
  { id: "bluepeak", name: "Bluepeak Ventures", amount: "$3,214,900", mark: "B" },
  { id: "harbor", name: "Harbor Treasury", amount: "$1,246,300", mark: "H" },
  { id: "summit", name: "Summit Partners", amount: "$984,200", mark: "S" },
  { id: "copper", name: "Copperfield Capital", amount: "$752,800", mark: "C" },
] as const;

const limits = { top3: 3, top5: 5, all: funds.length } as const;

export function FundLeaderboard() {
  const [limit, setLimit] = useState<keyof typeof limits>("top3");

  return (
    <ListCard aria-labelledby="fund-leaderboard-title">
      <ListCardHeader>
        <h2 id="fund-leaderboard-title" className="text-base font-semibold">Capital Inflows</h2>
        <Select value={limit} onValueChange={(value) => setLimit(value as keyof typeof limits)}>
          <SelectTrigger size="sm" aria-label="Filter funds shown" className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top3">Top 3 Funds</SelectItem>
            <SelectItem value="top5">Top 5 Funds</SelectItem>
            <SelectItem value="all">All funds</SelectItem>
          </SelectContent>
        </Select>
      </ListCardHeader>
      <ul aria-live="polite" className="px-3.5">
        {funds.slice(0, limits[limit]).map((fund, index) => (
          <li key={fund.id} className={`flex h-[49px] items-center gap-2 ${index < limits[limit] - 1 ? "border-b border-border" : ""}`}>
            <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">{fund.mark}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{fund.name}</span>
            <span className="shrink-0 text-sm font-medium tabular-nums">{fund.amount}</span>
          </li>
        ))}
      </ul>
    </ListCard>
  );
}
