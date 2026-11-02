import ConsoleLayout from "@/components/application/app-shell/console-layout";

import ScatterChartCard from "@/components/application/dashboard/chart-cards/scatter-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function ScatterPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Scatter Charts" /><ScatterChartCard /></div>}</ConsoleLayout>;
}
