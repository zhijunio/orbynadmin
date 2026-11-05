import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { QuestionnaireCatalogExamples } from "@/app/components/questionnaire/questionnaire-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Questionnaire" };

export default function QuestionnairePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Questionnaire" />
        <CatalogPageGrid>
          <QuestionnaireCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
