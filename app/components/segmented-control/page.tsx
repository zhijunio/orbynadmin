import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SegmentedControlCatalogExamples } from "@/app/components/segmented-control/segmented-control-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Segmented Control" };

export default function SegmentedControlPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Segmented Control" />
        <CatalogPageGrid>
        <SegmentedControlCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
