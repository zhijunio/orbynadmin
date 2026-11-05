import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DrawerCatalogExamples } from "@/app/components/drawer/drawer-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Drawer" };

export default function DrawerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Drawer" />
        <CatalogPageGrid>
          <DrawerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
