import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { EmojiPickerCatalogExamples } from "@/app/components/emoji-picker/emoji-picker-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Emoji Picker" };

export default function EmojiPickerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Emoji Picker" />
        <CatalogPageGrid>
          <EmojiPickerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
