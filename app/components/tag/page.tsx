import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TagCatalogExamples } from "@/app/components/tag/tag-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Tag" };

export default function TagPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Tag" />
        <CatalogPageGrid>
          <TagCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
