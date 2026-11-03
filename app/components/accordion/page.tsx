import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { AccordionExamples } from "@/app/components/accordion/accordion-examples";

export const metadata = { title: "Accordion" };

export default function AccordionPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Accordion" />
        <AccordionExamples />
      </div>
    </AppShell>
  );
}
