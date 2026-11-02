import ConsoleLayout from "@/components/application/app-shell/console-layout";

import StepsCard from "@/components/application/dashboard/chart-cards/steps-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function StepsPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Steps Chart" /><StepsCard /></div>}</ConsoleLayout>;
}
