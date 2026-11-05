import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SkeletonCatalogExamples } from "@/app/components/skeleton/skeleton-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Skeleton" };

export default function SkeletonPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Skeleton" />
        <CatalogPageGrid>
          <SkeletonCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
