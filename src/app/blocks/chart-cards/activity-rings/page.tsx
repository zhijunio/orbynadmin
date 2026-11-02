import ConsoleLayout from "@/components/application/app-shell/console-layout";

import ActivityRingsChartCard from "@/components/application/dashboard/chart-cards/activity-rings-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function ActivityRingsPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Activity Rings" /><ActivityRingsChartCard /></div>}</ConsoleLayout>;
}
