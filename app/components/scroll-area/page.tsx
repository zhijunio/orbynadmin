import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ScrollAreaCatalogExamples } from "@/app/components/scroll-area/scroll-area-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Scroll Area" };

export default function ScrollAreaPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Scroll Area" />
        <CatalogPageGrid>
          <ScrollAreaCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
