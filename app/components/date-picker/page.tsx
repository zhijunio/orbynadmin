import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DatePickerCatalogExamples } from "@/app/components/date-picker/date-picker-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Date Picker" };

export default function DatePickerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Date Picker" />
        <CatalogPageGrid>
          <DatePickerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
