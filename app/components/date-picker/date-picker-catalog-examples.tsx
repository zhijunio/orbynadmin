"use client";

import { DatePickerFieldsCatalogExamples } from "@/app/components/date-picker/date-picker-fields-catalog-examples";
import { MeetingSchedulerExample } from "@/app/components/date-picker/date-picker-catalog-demos";
import { DatePickerSelectorCatalogExamples } from "@/app/components/date-picker/date-picker-selector-catalog-examples";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

export function DatePickerCatalogExamples() {
  return (
    <CatalogGridItems>
      <DatePickerFieldsCatalogExamples />
      <ComponentPreview title="Meeting Scheduler" layout="wide" span={2}>
        <MeetingSchedulerExample />
      </ComponentPreview>
      <DatePickerSelectorCatalogExamples />
    </CatalogGridItems>
  );
}
