import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SpinnerCatalogExamples } from "@/app/components/spinner/spinner-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Spinner" };

export default function SpinnerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Spinner" />
        <CatalogPageGrid>
          <SpinnerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
