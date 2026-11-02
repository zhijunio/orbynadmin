import ConsoleLayout from "@/components/application/app-shell/console-layout";

import RevenueChartCard from "@/components/application/dashboard/chart-cards/revenue-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function RevenuePage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Revenue Chart" /><RevenueChartCard /></div>}</ConsoleLayout>;
}
