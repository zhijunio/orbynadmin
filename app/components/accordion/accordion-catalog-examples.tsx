"use client";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import {
  AccordionExample,
  ControlledAccordionExample,
  DisabledAccordionExample,
  RotatingArrowAccordionExample,
  SettingsAccordionExample,
} from "@/app/components/accordion/accordion-catalog-demos";

export function AccordionCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Default Accordion">
        <AccordionExample variant="plain" />
      </ComponentPreview>
      <ComponentPreview title="Multiple Expand">
        <AccordionExample variant="divided" multiple plusMinus />
      </ComponentPreview>
      <ComponentPreview title="Controlled Expansion" span={2} layout="wide">
        <ControlledAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Bordered Accordion">
        <AccordionExample variant="bordered" />
      </ComponentPreview>
      <ComponentPreview title="Muted Panels">
        <AccordionExample variant="muted" />
      </ComponentPreview>
      <ComponentPreview title="With Icons and Badges">
        <SettingsAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Disabled Item">
        <DisabledAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Rotating Arrow">
        <RotatingArrowAccordionExample />
      </ComponentPreview>
    </CatalogGridItems>
  );
}
