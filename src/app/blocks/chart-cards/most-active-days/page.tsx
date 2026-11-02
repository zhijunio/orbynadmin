import ConsoleLayout from "@/components/application/app-shell/console-layout";

import MostActiveDaysCard from "@/components/application/dashboard/chart-cards/most-active-days-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function MostActiveDaysPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Most Active Days" /><MostActiveDaysCard /></div>}</ConsoleLayout>;
}
