import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CardCatalogExamples } from "@/app/components/card/card-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Card" };

export default function CardPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Card" />
        <CatalogPageGrid>
          <CardCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
