import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { MenubarCatalogExamples } from "@/app/components/menubar/menubar-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Menubar" };

export default function MenubarPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Menubar" />
        <CatalogPageGrid>
          <MenubarCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
