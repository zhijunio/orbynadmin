import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TableCatalogExamples } from "@/app/components/table/table-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Table" };

export default function TablePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Table" />
        <CatalogPageGrid>
          <TableCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
