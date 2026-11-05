import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { GanttShowcase } from "@/components/blocks/application/gantt/gantt-showcase";

export const metadata = { title: "Gantt" };

export default function GanttBlocksPage() {
  return <AppShell><GanttShowcase /></AppShell>;
}
