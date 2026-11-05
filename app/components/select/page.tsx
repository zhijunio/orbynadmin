import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SelectCatalogExamples } from "@/app/components/select/select-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Select" };

export default function SelectPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Select" />
        <CatalogPageGrid>
          <SelectCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
