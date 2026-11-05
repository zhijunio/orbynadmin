import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { BreadcrumbCatalogExamples } from "@/app/components/breadcrumb/breadcrumb-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Breadcrumb" };

export default function BreadcrumbsPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Breadcrumb" />
        <CatalogPageGrid>
          <BreadcrumbCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
