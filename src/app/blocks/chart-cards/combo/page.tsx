import ConsoleLayout from "@/components/application/app-shell/console-layout";

import ComboChartCard from "@/components/application/dashboard/chart-cards/combo-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function ComboPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Combo Chart" /><ComboChartCard /></div>}</ConsoleLayout>;
}
