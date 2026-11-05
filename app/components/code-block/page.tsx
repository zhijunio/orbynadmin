import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CodeBlockCatalogExamples } from "@/app/components/code-block/code-block-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Code Block" };

export default function CodeBlockPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Code Block" />
        <CatalogPageGrid>
          <CodeBlockCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
