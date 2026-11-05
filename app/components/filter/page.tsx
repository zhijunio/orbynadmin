import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { FilterCatalogExamples } from "@/app/components/filter/filter-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Filter" };

export default function FiltersPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Filter" />
        <CatalogPageGrid>
          <FilterCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
