import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ItemCatalogExamples } from "@/app/components/item/item-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Item" };

export default function ItemPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Item" />
        <CatalogPageGrid>
          <ItemCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
