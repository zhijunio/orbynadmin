import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ColorPickerCatalogExamples } from "@/app/components/color-picker/color-picker-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Color Picker" };

export default function ColorPickerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Color Picker" />
        <CatalogPageGrid>
        <ColorPickerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
