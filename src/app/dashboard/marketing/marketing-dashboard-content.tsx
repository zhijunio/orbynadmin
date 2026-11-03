"use client";

import { useState } from "react";

import { IconAdjustmentsHorizontal, IconClick, IconEye, IconPlus, IconTarget, IconWallet } from "@tabler/icons-react";
import { PageHeader } from "@/components/application/app-shell/page-header";
import FunnelChartCard from "@/components/application/dashboard/chart-cards/funnel-chart-card";
import { StatCard, type StatCardData } from "@/components/application/dashboard/state-card/stat-card";
import { Button } from "@/components/base/buttons/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/base/dialog/dialog";
import { Input } from "@/components/base/input/input";
import RadialChartCard from "@/components/application/dashboard/chart-cards/radial-chart-card";
import MarketingCampaignsCard, { initialCampaigns, type Campaign } from "./marketing-campaigns-card";
import { AdSpendRoasCard, ChannelPerformanceCard, VisitorsCard } from "./marketing-charts";

const marketingStats: StatCardData[] = [
  { label: "Ad spend", value: "$24,380", change: 8.4, trend: "up", hint: "vs. last month", icon: IconWallet },
  { label: "Impressions", value: "1.94M", change: 12.6, trend: "up", hint: "vs. last month", icon: IconEye },
  { label: "Conversions", value: "1,286", change: 5.2, trend: "up", hint: "vs. last month", icon: IconTarget },
  { label: "Cost per click", value: "$1.24", change: -3.1, trend: "down", goodWhen: "down", hint: "vs. last month", icon: IconClick },
];

const funnelPeriods = [
  { label: "Last 30 days", delta: 0.058, stages: [{ name: "Visits", value: 96_400, fill: "var(--chart-1)" }, { name: "Sign-ups", value: 38_600, fill: "var(--chart-2)" }, { name: "Trials", value: 14_100, fill: "var(--chart-3)" }, { name: "Customers", value: 5_200, fill: "var(--chart-4)" }] },
  { label: "Last 7 days", delta: 0.036, stages: [{ name: "Visits", value: 22_800, fill: "var(--chart-1)" }, { name: "Sign-ups", value: 9_100, fill: "var(--chart-2)" }, { name: "Trials", value: 3_300, fill: "var(--chart-3)" }, { name: "Customers", value: 1_200, fill: "var(--chart-4)" }] },
  { label: "Last 90 days", delta: 0.071, stages: [{ name: "Visits", value: 286_200, fill: "var(--chart-1)" }, { name: "Sign-ups", value: 114_500, fill: "var(--chart-2)" }, { name: "Trials", value: 42_300, fill: "var(--chart-3)" }, { name: "Customers", value: 15_600, fill: "var(--chart-4)" }] },
];

const channelSpendMetrics = [
  { label: "Paid search", value: 11_400, color: "var(--chart-1)" }, { label: "Paid social", value: 7_620, color: "var(--chart-2)" }, { label: "Email", value: 3_180, color: "var(--chart-3)" }, { label: "Affiliates", value: 2_680, color: "var(--chart-4)" },
];
const channelSpendPeriods = [
  { label: "Last 30 days", change: "+8.4%", metrics: channelSpendMetrics },
  { label: "Last 7 days", change: "+4.2%", metrics: [
    { label: "Paid search", value: 2_610, color: "var(--chart-1)" }, { label: "Paid social", value: 1_750, color: "var(--chart-2)" }, { label: "Email", value: 730, color: "var(--chart-3)" }, { label: "Affiliates", value: 630, color: "var(--chart-4)" },
  ] },
  { label: "Last 90 days", change: "+11.6%", metrics: [
    { label: "Paid search", value: 33_870, color: "var(--chart-1)" }, { label: "Paid social", value: 22_640, color: "var(--chart-2)" }, { label: "Email", value: 9_450, color: "var(--chart-3)" }, { label: "Affiliates", value: 7_980, color: "var(--chart-4)" },
  ] },
];

export default function MarketingDashboardContent() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [createOpen, setCreateOpen] = useState(false);
  const [draft, setDraft] = useState<Campaign>({ name: "", status: "Active", objective: "Awareness", updated: "Nov 03, 2026", spend: 0, channel: "Google Ads" });

  function createCampaign(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCampaigns((items) => [{ ...draft }, ...items]);
    setDraft({ name: "", status: "Active", objective: "Awareness", updated: "Nov 03, 2026", spend: 0, channel: "Google Ads" });
    setCreateOpen(false);
  }

  return <>
    <div className="mx-auto w-full max-w-[1300px] space-y-6">
      <PageHeader title="Marketing">
        <Button variant="outline" onClick={() => document.getElementById("campaign-filters")?.scrollIntoView({ behavior: "smooth", block: "center" })}><IconAdjustmentsHorizontal aria-hidden="true" />5 Filters</Button>
        <Button onClick={() => setCreateOpen(true)}><IconPlus aria-hidden="true" />New campaign</Button>
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{marketingStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>
      <div className="grid items-stretch gap-4 xl:grid-cols-3">
        <FunnelChartCard title="Acquisition funnel" periods={funnelPeriods} className="h-[329px]" />
        <RadialChartCard title="Spend by channel" metrics={channelSpendMetrics} maximum={24_880} change="+8.4%" periodLabel="Last 30 days" periods={channelSpendPeriods} valuePrefix="$" variant="gauge" compact className="h-[329px]" />
        <ChannelPerformanceCard />
      </div>
      <div className="grid items-start gap-4 xl:grid-cols-2"><AdSpendRoasCard /><VisitorsCard /></div>
      <MarketingCampaignsCard campaigns={campaigns} onCampaignsChange={setCampaigns} />
    </div>
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent>
        <DialogHeader><DialogTitle>New campaign</DialogTitle></DialogHeader>
        <form id="marketing-create-campaign" className="grid gap-3" onSubmit={createCampaign}>
          <label className="grid gap-1.5 text-sm font-medium">Campaign name<Input required autoFocus value={draft.name} onChange={(event) => setDraft((item) => ({ ...item, name: event.currentTarget.value }))} /></label>
          <div className="grid grid-cols-2 gap-3"><label className="grid gap-1.5 text-sm font-medium">Channel<Input required value={draft.channel} onChange={(event) => setDraft((item) => ({ ...item, channel: event.currentTarget.value }))} /></label><label className="grid gap-1.5 text-sm font-medium">Objective<Input required value={draft.objective} onChange={(event) => setDraft((item) => ({ ...item, objective: event.currentTarget.value }))} /></label><label className="grid gap-1.5 text-sm font-medium">Last updated<Input required value={draft.updated} onChange={(event) => setDraft((item) => ({ ...item, updated: event.currentTarget.value }))} /></label><label className="grid gap-1.5 text-sm font-medium">Spend<Input type="number" min="0" step="1" value={draft.spend} onChange={(event) => setDraft((item) => ({ ...item, spend: Number(event.currentTarget.value) }))} /></label></div>
        </form>
        <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button type="submit" form="marketing-create-campaign">Create campaign</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
}
