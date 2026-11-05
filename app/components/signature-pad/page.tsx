import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SignaturePadCatalogExamples } from "@/app/components/signature-pad/signature-pad-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Signature Pad" };

export default function SignaturePadPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Signature Pad" />
        <CatalogPageGrid>
          <SignaturePadCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
