import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { PageHeader } from "@/components/application/app-shell/page-header";
import AreaChartCard from "@/components/application/dashboard/chart-cards/area-chart-card";
import FunnelChartCard from "@/components/application/dashboard/chart-cards/funnel-chart-card";
import { StatCard, type StatCardData } from "@/components/application/dashboard/state-card/stat-card";
import { ChartCard } from "@/components/application/charts/chart-card";
import { Badge } from "@/components/base/badges/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";
import { IconClick, IconEye, IconTarget, IconWallet } from "@tabler/icons-react";

const marketingStats: StatCardData[] = [
  { label: "Ad spend", value: "$24,380", change: 8.4, trend: "up", hint: "vs. last month", icon: IconWallet },
  { label: "Impressions", value: "1.94M", change: 12.6, trend: "up", hint: "vs. last month", icon: IconEye },
  { label: "Conversions", value: "1,286", change: 5.2, trend: "up", hint: "vs. last month", icon: IconTarget },
  { label: "Cost per click", value: "$1.24", change: 3.1, trend: "down", goodWhen: "down", hint: "vs. last month", icon: IconClick },
];

const funnelStages = [
  { name: "Visits", value: 96400, fill: "var(--chart-1)" },
  { name: "Sign-ups", value: 38600, fill: "var(--chart-2)" },
  { name: "Trials", value: 14100, fill: "var(--chart-3)" },
  { name: "Customers", value: 5200, fill: "var(--chart-4)" },
];

const channelSpend = [
  { name: "Paid search", value: 11400 },
  { name: "Paid social", value: 7620 },
  { name: "Email", value: 3180 },
  { name: "Affiliates", value: 2680 },
];

const campaigns = [
  { name: "Founder story video · Global", status: "Active", objective: "Awareness", updated: "Jul 22, 2026", spend: "$34,800" },
  { name: "Holiday gift guide · Global", status: "Paused", objective: "Traffic", updated: "Sep 16, 2026", spend: "$30,884" },
  { name: "Newsletter promo · EU", status: "Paused", objective: "Leads", updated: "Dec 08, 2026", spend: "$3,180" },
  { name: "Spring launch · UK", status: "Draft", objective: "Awareness", updated: "Oct 04, 2026", spend: "$0" },
];

function SpendByChannelCard() {
  const max = channelSpend[0].value;
  const total = channelSpend.reduce((sum, channel) => sum + channel.value, 0);
  return (
    <ChartCard title="Spend by channel">
      <div className="mb-5 flex items-baseline gap-2 border-b pb-4">
        <span className="text-2xl font-semibold tabular-nums">${total.toLocaleString()}</span>
        <span className="text-xs text-emerald-600 dark:text-emerald-400">+8.4%</span>
      </div>
      <div className="space-y-4">
        {channelSpend.map(({ name, value }) => <div key={name}>
          <div className="mb-1.5 flex items-center justify-between text-sm"><span>{name}</span><span className="font-medium tabular-nums">${value.toLocaleString()}</span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-chart-1" style={{ width: `${value / max * 100}%` }} /></div>
        </div>)}
      </div>
    </ChartCard>
  );
}

function CampaignsCard() {
  return (
    <Card>
      <CardHeader><CardTitle>Campaigns</CardTitle><CardAction><span className="text-sm text-muted-foreground">80 campaigns</span></CardAction></CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader><TableRow><TableHead className="pl-5">Campaign</TableHead><TableHead>Delivery</TableHead><TableHead>Objective</TableHead><TableHead>Last updated</TableHead><TableHead className="pr-5 text-right">Spend</TableHead></TableRow></TableHeader>
          <TableBody>{campaigns.map((campaign) => <TableRow key={campaign.name}>
            <TableCell className="pl-5 font-medium">{campaign.name}</TableCell>
            <TableCell><Badge variant="secondary" className={campaign.status === "Active" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : undefined}>{campaign.status}</Badge></TableCell>
            <TableCell>{campaign.objective}</TableCell>
            <TableCell className="text-muted-foreground">{campaign.updated}</TableCell>
            <TableCell className="pr-5 text-right font-medium tabular-nums">{campaign.spend}</TableCell>
          </TableRow>)}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function MarketingDashboardPage() {
  return (
    <ConsoleLayout>
      <div className="mx-auto w-full max-w-[1440px] space-y-6">
        <PageHeader title="Marketing" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {marketingStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </div>
        <div className="grid items-start gap-4 xl:grid-cols-2">
          <FunnelChartCard title="Acquisition funnel" stages={funnelStages} />
          <AreaChartCard />
        </div>
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
          <SpendByChannelCard />
          <CampaignsCard />
        </div>
      </div>
    </ConsoleLayout>
  );
}
