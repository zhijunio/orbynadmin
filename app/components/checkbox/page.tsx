import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CheckboxCatalogExamples } from "@/app/components/checkbox/checkbox-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Checkbox" };

export default function CheckboxPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Checkbox" />
        <CatalogPageGrid>
        <CheckboxCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
