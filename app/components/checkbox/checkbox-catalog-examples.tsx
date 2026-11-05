"use client";

import { CheckboxLayoutCatalogExamples } from "@/app/components/checkbox/checkbox-layout-catalog-examples";
import { CheckboxUsageCatalogExamples } from "@/app/components/checkbox/checkbox-usage-catalog-examples";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";

export function CheckboxCatalogExamples() {
  return (
    <CatalogGridItems>
      <CheckboxUsageCatalogExamples />
      <CheckboxLayoutCatalogExamples />
    </CatalogGridItems>
  );
}
