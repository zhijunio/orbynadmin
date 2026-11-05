import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SortableCatalogExamples } from "@/app/components/sortable/sortable-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Sortable" };

export default function SortablePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Sortable" />
        <CatalogPageGrid>
          <SortableCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
