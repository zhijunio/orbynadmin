"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { IconDownload, IconPlus } from "@tabler/icons-react";

import { PageHeader } from "@/components/application/app-shell/page-header";
import { AddWidgetDialog } from "@/components/application/dashboard/overview/add-widget-dialog";
import { DashboardSummaryCards } from "@/components/application/dashboard/overview/stat-cards";
import EarningsChartCard from "@/components/application/dashboard/chart-cards/earnings-chart-card";
import RevenueChartCard from "@/components/application/dashboard/chart-cards/revenue-chart-card";
import { OrdersResultsCard } from "@/components/application/dashboard/overview/orders-results-card";
import { TeamCard } from "@/components/application/dashboard/overview/team-card";
import ContributionsCard from "@/components/application/dashboard/chart-cards/contributions-card";
import { Button } from "@/components/base/buttons/button";

export default function DashboardPage() {
  const t = useTranslations("Dashboard.Overview");
  const [addOpen, setAddOpen] = useState(false);

  function handleExport() {
    toast.success(t("exported"), { description: t("summaryDownloading") });
  }

  function handleAddWidget(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = (data.get("name") as string)?.trim() || t("newWidget");
    setAddOpen(false);
    toast.success(t("widgetAdded"), { description: t("widgetPinned", { name }) });
  }

  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1440px] space-y-6">
      <PageHeader title="Welcome back, Alex">
        <Button variant="outline" onClick={handleExport}><IconDownload className="size-4" /> {t("export")}</Button>
        <Button onClick={() => setAddOpen(true)}><IconPlus className="size-4" /> {t("addWidget")}</Button>
      </PageHeader>

      <DashboardSummaryCards />
      <div className="grid gap-4 xl:grid-cols-2">
        <TeamCard />
        <EarningsChartCard />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <RevenueChartCard />
        <ContributionsCard />
      </div>

      <OrdersResultsCard />
      <AddWidgetDialog open={addOpen} onOpenChange={setAddOpen} onSubmit={handleAddWidget} />
    </div>}</ConsoleLayout>;
}
