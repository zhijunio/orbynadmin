import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ListCatalogExamples } from "@/app/components/list/list-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "List" };

export default function ListPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="List" />
        <CatalogPageGrid>
        <ListCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
