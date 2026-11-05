import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { RatingCatalogExamples } from "@/app/components/rating/rating-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Rating" };

export default function RatingPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Rating" />
        <CatalogPageGrid>
          <RatingCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
