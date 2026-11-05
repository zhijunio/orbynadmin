import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ProgressCatalogExamples } from "@/app/components/progress/progress-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Progress" };

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Progress" />
        <CatalogPageGrid>
          <ProgressCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
