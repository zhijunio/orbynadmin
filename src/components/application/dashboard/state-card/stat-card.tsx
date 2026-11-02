import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import type { ComponentType } from "react";

import { Card, CardContent } from "@/components/base/card/card";
import { cn } from "@/utils/cn";

export type StatCardData = {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  hint: string;
  goodWhen?: "up" | "down";
  icon?: ComponentType<{ className?: string }>;
};

export function StatCard({ stat, className }: { stat: StatCardData; className?: string }) {
  const Icon = stat.icon;

  return (
    <Card className={cn("h-[132px] rounded-2xl border-0 bg-muted/45 p-4 ring-0", className)}>
      <CardContent className="flex h-full items-center gap-3 p-0">
        {Icon && (
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon aria-hidden="true" className="size-5" />
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="truncate text-sm font-medium text-muted-foreground">{stat.label}</p>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight tabular-nums">
              {stat.value}
            </span>
            <StatCardChange stat={stat} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatCardChange({ stat }: { stat: StatCardData }) {
  const favorable = stat.trend === (stat.goodWhen ?? "up");

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 text-xs font-medium tabular-nums",
        favorable
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400"
      )}
    >
      {stat.trend === "up" ? (
        <IconTrendingUp aria-hidden="true" className="size-3.5" />
      ) : (
        <IconTrendingDown aria-hidden="true" className="size-3.5" />
      )}
      {stat.change}%
    </span>
  );
}
