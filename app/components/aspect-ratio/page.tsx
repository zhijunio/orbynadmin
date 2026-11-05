import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AspectRatioCatalogExamples } from "@/app/components/aspect-ratio/aspect-ratio-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Aspect Ratio" };

export default function AspectRatioPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Aspect Ratio" />
        <CatalogPageGrid>
          <AspectRatioCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
