import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { PageHeader } from "@/components/custom/docs/page-header";
import { AccordionExamples } from "@/app/components/accordion/accordion-examples";

export const metadata = { title: "Accordion" };

export default function AccordionPage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Accordion" />
        <AccordionExamples />
      </div>
    </ConsoleLayout>
  );
}
