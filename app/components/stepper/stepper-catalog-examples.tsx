import { CatalogSections } from "@/components/custom/docs/catalog-sections";
import { StepperExample } from "@/components/custom/stepper/stepper-examples";



const stepperExampleLabels: Record<number, string> = {
  1: "Default steps",
  2: "With descriptions",
  3: "Loading step",
  5: "Optional titles",
  7: "Icon indicators",
  16: "Route completion",
  13: "Vertical layout",
  14: "Vertical with content",
  18: "Vertical rail",
  6: "Progress bar",
  11: "Step numbers",
  26: "Delivery route",
  20: "Check indicators",
  21: "Custom checks",
  24: "Icon tiles",
};

const sections = [
  {
    title: "Horizontal",
    description: "Default, loading, icon, and routed horizontal steppers.",
    examples: [1, 2, 3, 5, 7, 16],
    stack: true,
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Vertical",
    description: "Stacked steps with panels and rail variants.",
    examples: [13, 14, 18],
    stack: true,
    layout: "wide" as const,
    span: 2 as const,
  },
  { title: "Progress", description: "Numeric and progress-bar step tracking.", examples: [6, 11, 26], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Indicators", description: "Checks and icon tiles for step state.", examples: [20, 21, 24], stack: true, layout: "wide" as const, span: 2 as const },
];

export function StepperCatalogExamples() {
  return (
    <>
      <CatalogSections
                  sections={sections}
                  exampleLabel={(example) => stepperExampleLabels[example]}
                  render={(example) => <StepperExample example={example} />}
                />
    </>
  );
}
