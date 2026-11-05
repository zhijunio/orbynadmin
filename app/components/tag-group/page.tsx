import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TagGroupCatalogExamples } from "@/app/components/tag-group/tag-group-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Tag Group" };

export default function TagGroupPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Tag Group" />
        <CatalogPageGrid>
        <TagGroupCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
