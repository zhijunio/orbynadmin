import ConsoleLayout from "@/components/application/app-shell/console-layout";

import EarningsChartCard from "@/components/application/dashboard/chart-cards/earnings-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function EarningsPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Earnings Chart" /><EarningsChartCard /></div>}</ConsoleLayout>;
}
