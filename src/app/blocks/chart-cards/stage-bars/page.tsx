import ConsoleLayout from "@/components/application/app-shell/console-layout";

import StageBarsCard from "@/components/application/dashboard/chart-cards/stage-bars-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function StageBarsPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Stage Bars" /><StageBarsCard /></div>}</ConsoleLayout>;
}
