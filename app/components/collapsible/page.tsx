import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CollapsibleCatalogExamples } from "@/app/components/collapsible/collapsible-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Collapsible" };

export default function CollapsiblePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Collapsible" />
        <CatalogPageGrid>
        <CollapsibleCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
