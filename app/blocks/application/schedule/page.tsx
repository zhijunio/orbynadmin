import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ScheduleShowcase } from "@/components/blocks/application/schedule/schedule-showcase";

export const metadata = { title: "Schedule" };

export default function ScheduleBlocksPage() {
  return (
    <AppShell>
      <ScheduleShowcase />
    </AppShell>
  );
}
