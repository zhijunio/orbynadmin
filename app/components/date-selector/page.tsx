import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DateSelectorCatalogExamples } from "@/app/components/date-selector/date-selector-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Date Selector" };

export default function DateSelectorPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Date Selector" />
        <CatalogPageGrid>
          <DateSelectorCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
