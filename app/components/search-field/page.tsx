import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SearchFieldCatalogExamples } from "@/app/components/search-field/search-field-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Search Field" };

export default function SearchFieldPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Search Field" />
        <CatalogPageGrid>
        <SearchFieldCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
