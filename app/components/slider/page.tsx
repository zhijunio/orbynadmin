import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SliderCatalogExamples } from "@/app/components/slider/slider-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Slider" };

export default function SliderPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Slider" />
        <CatalogPageGrid>
        <SliderCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
