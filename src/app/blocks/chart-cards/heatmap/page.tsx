import ConsoleLayout from "@/components/application/app-shell/console-layout";

import HeatmapChartCard from "@/components/application/dashboard/chart-cards/heatmap-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function HeatmapPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Heatmap Chart" /><HeatmapChartCard /></div>}</ConsoleLayout>;
}
