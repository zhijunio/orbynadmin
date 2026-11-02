import ConsoleLayout from "@/components/application/app-shell/console-layout";

import SleepScoreCard from "@/components/application/dashboard/chart-cards/sleep-score-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function SleepScorePage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Sleep Score" /><SleepScoreCard /></div>}</ConsoleLayout>;
}
