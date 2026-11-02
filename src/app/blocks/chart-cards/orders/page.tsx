import ConsoleLayout from "@/components/application/app-shell/console-layout";

import OrdersChartCard from "@/components/application/dashboard/chart-cards/orders-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function OrdersPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Orders Chart" /><OrdersChartCard /></div>}</ConsoleLayout>;
}
