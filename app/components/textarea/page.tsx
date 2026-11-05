import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TextareaCatalogExamples } from "@/app/components/textarea/textarea-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Textarea" };

export default function TextareaPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Textarea" />
        <CatalogPageGrid>
          <TextareaCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
