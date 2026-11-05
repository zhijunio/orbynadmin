import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { NumberFieldCatalogExamples } from "@/app/components/number-field/number-field-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Number Field" };

export default function NumberFieldPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Number Field" />
        <CatalogPageGrid>
        <NumberFieldCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
