import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AvatarCatalogExamples } from "@/app/components/avatar/avatar-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Avatar" };

export default function AvatarPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Avatar" />
        <CatalogPageGrid>
          <AvatarCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
