"use client";

import { useState } from "react";
import { IconArrowDownRight, IconArrowUpRight, IconChartBar, IconReceipt, IconShoppingCart, IconWallet, IconTrendingUp } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { ListCard } from "@/components/blocks/application/list/list-card";
import { cn } from "@/utils/cn";

type Metric = { id: string; label: string; value: string; suffix?: string; change: string; positive: boolean; icon: Icon };

const metrics: Metric[] = [
  { id: "orders", label: "Total Orders", value: "1,246", change: "23.08%", positive: true, icon: IconShoppingCart },
  { id: "spend", label: "Net Spend", value: "$89.3", suffix: "k", change: "3.82%", positive: true, icon: IconWallet },
  { id: "basket", label: "Avg. Basket Value", value: "$68.1", change: "0.39%", positive: false, icon: IconReceipt },
  { id: "balance", label: "Account Balance", value: "$2.3", suffix: "k", change: "1.04%", positive: true, icon: IconChartBar },
];

export function OrderKpiList() {
  const [selected, setSelected] = useState<Metric | null>(null);

  return <>
    <ListCard aria-label="Order metrics">
      <ul>
        {metrics.map((metric, index) => {
          const MetricIcon = metric.icon;
          return <li key={metric.id} className={cn("flex h-[72px] items-center gap-2 px-3.5", index < metrics.length - 1 && "border-b border-border")}>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground shadow-sm ring-1 ring-border/50"><MetricIcon className="size-4.5" aria-hidden="true" /></span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xl font-semibold leading-6 tracking-tight">{metric.value}{metric.suffix && <span className="ml-0.5 text-muted-foreground">{metric.suffix}</span>}</span>
              <Badge variant={metric.positive ? "success-light" : "destructive-light"} size="sm" className="gap-1 font-medium">
                {metric.positive ? <IconTrendingUp className="size-3" aria-hidden="true" /> : <IconArrowDownRight className="size-3" aria-hidden="true" />}
                {metric.change}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </div>
          <Button variant="outline" size="icon-sm" aria-label={`Open ${metric.label} details`} onClick={() => setSelected(metric)}>
            <IconArrowUpRight aria-hidden="true" />
          </Button>
          </li>;
        })}
      </ul>
    </ListCard>
    <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selected?.label}</DialogTitle>
          <DialogDescription>Current value and change for this reporting period.</DialogDescription>
        </DialogHeader>
        {selected && <div className="flex items-center gap-2 pb-2"><span className="text-2xl font-semibold">{selected.value}{selected.suffix && <span className="ml-1 text-muted-foreground">{selected.suffix}</span>}</span><Badge variant={selected.positive ? "success-light" : "destructive-light"}>{selected.positive ? <IconArrowUpRight /> : <IconArrowDownRight />}{selected.change}</Badge></div>}
      </DialogContent>
    </Dialog>
  </>;
}
