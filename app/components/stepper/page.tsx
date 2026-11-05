import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { StepperCatalogExamples } from "@/app/components/stepper/stepper-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Stepper" };

export default function StepperPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Stepper" />
        <CatalogPageGrid>
          <StepperCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
