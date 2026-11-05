import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DataGridCatalogExamples } from "@/app/components/data-grid/data-grid-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Data Grid" };

export default function DataGridPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Data Grid" />
        <CatalogPageGrid>
          <DataGridCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
