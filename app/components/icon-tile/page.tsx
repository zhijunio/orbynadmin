import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { IconTileCatalogExamples } from "@/app/components/icon-tile/icon-tile-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Icon Tile" };

export default function IconTilePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Icon Tile" />
        <CatalogPageGrid>
          <IconTileCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
