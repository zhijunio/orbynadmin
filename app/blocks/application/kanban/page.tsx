import { KanbanGallery } from "@/components/blocks/application/kanban/kanban-gallery";
import AppShell from "@/components/blocks/application/app-shell/app-shell";

export const metadata = { title: "Kanban" };

export default function KanbanPage() {
  return (
    <div className="min-w-0 overflow-x-hidden">
      <AppShell>
        <KanbanGallery />
      </AppShell>
    </div>
  );
}
