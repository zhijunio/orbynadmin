import { CardInteractiveCatalogExamples } from "@/app/components/card/card-interactive-catalog-examples";
import { CardsExample } from "@/app/components/card/card-catalog-demos";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";

export function CardCatalogExamples() {
  return (
    <CatalogGridItems>
      <CardsExample />
      <CardInteractiveCatalogExamples />
    </CatalogGridItems>
  );
}
