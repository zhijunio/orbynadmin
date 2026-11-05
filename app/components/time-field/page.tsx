import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TimeFieldCatalogExamples } from "@/app/components/time-field/time-field-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Time Field" };

export default function TimeFieldPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Time Field" />
        <CatalogPageGrid>
        <TimeFieldCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
