import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TimePickerCatalogExamples } from "@/app/components/time-picker/time-picker-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Time Picker" };

export default function TimePickerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Time Picker" />
        <CatalogPageGrid>
          <TimePickerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
