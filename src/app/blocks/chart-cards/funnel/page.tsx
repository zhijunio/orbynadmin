import ConsoleLayout from "@/components/application/app-shell/console-layout";

import FunnelChartCard from "@/components/application/dashboard/chart-cards/funnel-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function FunnelPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Funnel Charts" /><FunnelChartCard /></div>}</ConsoleLayout>;
}
