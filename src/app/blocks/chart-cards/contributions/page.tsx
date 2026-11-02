import ConsoleLayout from "@/components/application/app-shell/console-layout";

import ContributionsCard from "@/components/application/dashboard/chart-cards/contributions-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function ContributionsPage() {
  return <ConsoleLayout>{<div className="space-y-5"><PageHeader title="Contributions" /><ContributionsCard /></div>}</ConsoleLayout>;
}
