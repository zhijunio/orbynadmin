import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { FieldCatalogExamples } from "@/app/components/field/field-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Field" };

export default function FieldPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Field" />
        <CatalogPageGrid>
          <FieldCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
