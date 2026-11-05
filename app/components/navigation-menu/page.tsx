import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { NavigationMenuCatalogExamples } from "@/app/components/navigation-menu/navigation-menu-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Navigation Menu" };

export default function NavigationMenuPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Navigation Menu" />
        <CatalogPageGrid>
          <NavigationMenuCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
