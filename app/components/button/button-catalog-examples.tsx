import { ButtonAdornmentExamples, ButtonIconExamples, ButtonSizeExamples, ButtonStateExamples, ButtonVariantExamples, CloseButtonExamples, LinkButtonExamples, SocialButtonExamples } from "@/components/custom/button/button-examples";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";



export function ButtonCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Variants"><ButtonVariantExamples /></ComponentPreview>
              <ComponentPreview title="Sizes"><ButtonSizeExamples /></ComponentPreview>
              <ComponentPreview title="Icons"><ButtonIconExamples /></ComponentPreview>
              <ComponentPreview title="Link Button"><LinkButtonExamples /></ComponentPreview>
              <ComponentPreview title="States"><ButtonStateExamples /></ComponentPreview>
              <ComponentPreview title="Adornments"><ButtonAdornmentExamples /></ComponentPreview>
              <ComponentPreview title="Social"><SocialButtonExamples /></ComponentPreview>
              <ComponentPreview title="Close Button"><CloseButtonExamples /></ComponentPreview>
    </CatalogGridItems>
  );
}
