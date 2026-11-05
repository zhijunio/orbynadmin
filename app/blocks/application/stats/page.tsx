import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { StatsShowcase } from "@/components/blocks/application/stats/stats-showcase";

export const metadata = { title: "Stats" };

export default function StatsPage() {
  return (
    <AppShell>
      <StatsShowcase />
    </AppShell>
  );
}
