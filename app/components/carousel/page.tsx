import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CarouselCatalogExamples } from "@/app/components/carousel/carousel-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Carousel" };

export default function CarouselPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Carousel" />
        <CatalogPageGrid>
          <CarouselCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
