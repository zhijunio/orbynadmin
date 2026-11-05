import { DateCalendarScenariosCatalogExamples } from "@/app/components/date-calendar/date-calendar-scenarios-catalog-examples";
import { DateCalendarSurfaceCatalogExamples } from "@/app/components/date-calendar/date-calendar-surface-catalog-examples";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";

export function DateCalendarCatalogExamples() {
  return (
    <CatalogGridItems>
      <DateCalendarSurfaceCatalogExamples />
      <DateCalendarScenariosCatalogExamples />
    </CatalogGridItems>
  );
}
