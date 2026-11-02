import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { DashboardStatCards } from "@/components/application/dashboard/overview/stat-cards";
import { StatCardVariants } from "@/components/application/dashboard/stat-cards/stat-card-variants";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";

export default function StatCardsPage() {
  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1440px] space-y-8">
      <PageHeader title="Stat Cards" />
      <DashboardStatCards />
      <StatCardVariants />
    </div>}</ConsoleLayout>;
}
