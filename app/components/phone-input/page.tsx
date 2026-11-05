import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PhoneInputCatalogExamples } from "@/app/components/phone-input/phone-input-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Phone Input" };

export default function PhoneInputPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Phone Input" />
        <CatalogPageGrid>
          <PhoneInputCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
