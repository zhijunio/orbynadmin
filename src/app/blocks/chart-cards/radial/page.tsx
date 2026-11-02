import ConsoleLayout from "@/components/application/app-shell/console-layout";

import RadialChartCard from "@/components/application/dashboard/chart-cards/radial-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function RadialPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Radial Chart" /><RadialChartCard /></div>}</ConsoleLayout>;
}
