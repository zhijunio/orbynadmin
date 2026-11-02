"use client";

import { useTranslations } from "next-intl";

import { StatCardChange } from "@/components/application/dashboard/state-card/stat-card";
import { useOverviewStatData } from "@/components/application/dashboard/overview/stat-cards";
import { Card, CardContent } from "@/components/base/card/card";
import { Progress } from "@/components/base/progress/progress";

export function StatCardVariants() {
  const stats = useOverviewStatData();
  const t = useTranslations("Blocks.statCards");
  const overviewT = useTranslations("Dashboard.Overview");
  const newCustomersLabel = overviewT("stats.newCustomers");
  const goalStat = stats.find((stat) => stat.label === newCustomersLabel);

  if (!goalStat) return null;

  const target = 3_000;
  const current = Number(goalStat.value.replace(/\D/g, ""));
  const progress = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="space-y-8">
      <section className="space-y-4" aria-labelledby="stat-cards-compact-heading">
        <h2 id="stat-cards-compact-heading" className="text-base font-semibold tracking-tight">
          {t("compact")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.label}>
                <CardContent className="flex min-h-24 items-center gap-3">
                  {Icon && <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 truncate text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
                  </div>
                  <StatCardChange stat={stat} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="stat-cards-goal-heading">
        <h2 id="stat-cards-goal-heading" className="text-base font-semibold tracking-tight">
          {t("goalProgress")}
        </h2>
        <Card className="max-w-sm">
          <CardContent className="space-y-3">
            <div className="flex min-w-0 items-center gap-2">
              {goalStat.icon && <goalStat.icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
              <p className="truncate text-sm font-medium text-muted-foreground">{goalStat.label}</p>
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">{t("exampleGoal")}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">{goalStat.value}</span>
              <span className="text-sm text-muted-foreground">{t("target", { value: target.toLocaleString() })}</span>
            </div>
            <Progress value={progress} aria-label={t("progressLabel", { label: goalStat.label })} />
            <p className="text-xs text-muted-foreground">{progress}%</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
