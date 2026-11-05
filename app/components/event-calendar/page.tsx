import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { EventCalendarCatalogExamples } from "@/app/components/event-calendar/event-calendar-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Event Calendar" };

export default function EventCalendarPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Event Calendar" />
        <CatalogPageGrid>
          <EventCalendarCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
