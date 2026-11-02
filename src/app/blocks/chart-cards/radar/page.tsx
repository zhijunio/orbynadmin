import ConsoleLayout from "@/components/application/app-shell/console-layout";

import RadarChartCard from "@/components/application/dashboard/chart-cards/radar-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function RadarPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Radar Chart" /><RadarChartCard /></div>}</ConsoleLayout>;
}
