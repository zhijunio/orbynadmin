import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DateCalendarCatalogExamples } from "@/app/components/date-calendar/date-calendar-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Calendar" };

export default function DateCalendarPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Calendar" />
        <CatalogPageGrid>
          <DateCalendarCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
