import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AutocompleteCatalogExamples } from "@/app/components/autocomplete/autocomplete-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Autocomplete" };

export default function AutocompletePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Autocomplete" />
        <CatalogPageGrid>
        <AutocompleteCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
