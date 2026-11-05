import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { RibbonCatalogExamples } from "@/app/components/ribbon/ribbon-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Ribbon" };

export default function RibbonsPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Ribbon" />
        <CatalogPageGrid>
          <RibbonCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
