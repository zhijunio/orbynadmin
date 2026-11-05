import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComboboxCatalogExamples } from "@/app/components/combobox/combobox-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Combobox" };

export default function ComboboxPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Combobox" />
        <CatalogPageGrid>
        <ComboboxCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
