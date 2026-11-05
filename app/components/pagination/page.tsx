import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PaginationCatalogExamples } from "@/app/components/pagination/pagination-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Pagination" };

export default function PaginationPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Pagination" />
        <CatalogPageGrid>
          <PaginationCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
