import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CommandCatalogExamples } from "@/app/components/command/command-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Command" };

export default function CommandPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Command" />
        <CatalogPageGrid>
        <CommandCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
