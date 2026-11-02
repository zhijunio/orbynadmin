import ConsoleLayout from "@/components/application/app-shell/console-layout";

import LineChartCard from "@/components/application/dashboard/chart-cards/line-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function LinePage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Line Charts" /><LineChartCard /></div>}</ConsoleLayout>;
}
