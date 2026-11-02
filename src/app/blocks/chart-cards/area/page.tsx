import ConsoleLayout from "@/components/application/app-shell/console-layout";

import AreaChartCard from "@/components/application/dashboard/chart-cards/area-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function AreaPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Area Charts" /><AreaChartCard /></div>}</ConsoleLayout>;
}
