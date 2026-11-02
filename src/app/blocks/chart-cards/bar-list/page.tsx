import ConsoleLayout from "@/components/application/app-shell/console-layout";

import BarListCard from "@/components/application/dashboard/chart-cards/bar-list-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function BarListPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Bar List" /><BarListCard /></div>}</ConsoleLayout>;
}
