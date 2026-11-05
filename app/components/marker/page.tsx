import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { MarkerCatalogExamples } from "@/app/components/marker/marker-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Marker" };

export default function MarkerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Marker" />
        <CatalogPageGrid>
          <MarkerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
