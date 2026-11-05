import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ChartCatalogExamples } from "@/app/components/chart/chart-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Chart" };

export default function ChartPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Chart" />
        <CatalogPageGrid>
        <ChartCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
