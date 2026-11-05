import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { KanbanCatalogExamples } from "@/app/components/kanban/kanban-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Kanban" };

export default function KanbanPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Kanban" />
        <CatalogPageGrid>
          <KanbanCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
