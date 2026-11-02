import ConsoleLayout from "@/components/application/app-shell/console-layout";

import SankeyChartCard from "@/components/application/dashboard/chart-cards/sankey-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function SankeyPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Sankey Chart" /><SankeyChartCard /></div>}</ConsoleLayout>;
}
