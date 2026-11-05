import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { MeterCatalogExamples } from "@/app/components/meter/meter-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Meter" };

export default function MeterPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Meter" />
        <CatalogPageGrid>
          <MeterCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
