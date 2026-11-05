"use client";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { EmptyBasicCatalogExamples } from "@/app/components/empty/empty-basic-catalog-examples";
import { EmptyIllustrationCatalogExamples } from "@/app/components/empty/empty-illustration-catalog-examples";

export function EmptyCatalogExamples() {
  return (
    <CatalogGridItems>
      <EmptyBasicCatalogExamples />
      <EmptyIllustrationCatalogExamples />
    </CatalogGridItems>
  );
}
