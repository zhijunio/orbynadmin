import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SocialButtonCatalogExamples } from "@/app/components/social-button/social-button-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Social Button" };

export default function SocialButtonPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Social Button" />
        <CatalogPageGrid>
          <SocialButtonCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
