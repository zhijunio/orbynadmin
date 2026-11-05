import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TimelineShowcase } from "@/components/blocks/application/timeline/timeline-showcase";

export const metadata = { title: "Timeline" };

export default function TimelineBlocksPage() {
  return (
    <AppShell>
      <TimelineShowcase />
    </AppShell>
  );
}
