import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { GanttCatalogExamples } from "@/app/components/gantt/gantt-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Gantt" };

export default function GanttPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Gantt" />
        <CatalogPageGrid>
          <GanttCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
