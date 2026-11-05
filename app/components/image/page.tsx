import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ImageCatalogExamples } from "@/app/components/image/image-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Image" };

export default function ImagesPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Image" />
        <CatalogPageGrid>
          <ImageCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
