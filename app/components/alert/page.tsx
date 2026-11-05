import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AlertCatalogExamples } from "@/app/components/alert/alert-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Alert" };

export default function AlertPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Alert" />
        <CatalogPageGrid>
          <AlertCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
