import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ContextMenuCatalogExamples } from "@/app/components/context-menu/context-menu-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Context Menu" };

export default function ContextMenuPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Context Menu" />
        <CatalogPageGrid>
        <ContextMenuCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
