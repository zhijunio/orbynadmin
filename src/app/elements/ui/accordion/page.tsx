import ConsoleLayout from "@/components/application/app-shell/console-layout";

export const metadata = { title: "Accordion" };




import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { ControlledAccordionExample } from "@/app/elements/ui/accordion/controlled-accordion-example";
import { cn } from "@/utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/base/accordion/accordion";

const styles = {
  style_one: {
    root: "gap-5",
    item: "overflow-hidden rounded-xl border border-border bg-card",
    trigger: "px-4",
    content: "px-4",
  },
  style_two: {
    root: "gap-4",
    item: "border-b border-border last:border-b-0",
  },
  style_three: {
    root: "gap-3",
    item: "overflow-hidden rounded-xl bg-muted/40",
    content: "border-t border-border",
  },
} as const;

function AccordionExample({
  variant,
  multiple = false,
  className,
}: {
  variant: keyof typeof styles;
  multiple?: boolean;
  className?: string;
}) {
  const style = styles[variant];
  const items = multiple ? accordionData.slice(0, 3) : accordionData;

  return <Accordion
      type={multiple ? "multiple" : "single"}
      className={cn(style.root, className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={String(item.id)} className={style.item}>
          <AccordionTrigger className={cn("text-sm text-foreground", "trigger" in style && style.trigger)}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={cn("text-sm leading-6", "content" in style && style.content)}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>;
}

const accordionData = [
  {
    id: 1,
    title: "What can I manage from this dashboard?",
    content: "Use the dashboard to review key metrics, manage records, and access common workspace tools.",
  },
  {
    id: 2,
    title: "How do I get started?",
    content: "Install the project dependencies and start the development server by following the setup guide in the README.",
  },
  {
    id: 3,
    title: "Can I customize the dashboard widgets?",
    content:
      "Yes, you can customize the dashboard widgets as you want to suit your needs. The code is completely yours.",
  },
  {
    id: 4,
    title: "Does the dashboard support dark mode?",
    content: "Yes. Switch between light and dark themes from the theme control in the header.",
  },
  {
    id: 5,
    title: "What do I need to run this project?",
    content: "Use a supported Node.js version and a modern browser. See the setup guide for the current requirements.",
  },
];



export default function AccordionPage() {
  return <ConsoleLayout>{<Showcase title="Accordion">
      <ComponentPreview title="Style One"><AccordionExample variant="style_one" /></ComponentPreview>
      <ComponentPreview title="Style Two"><AccordionExample variant="style_two" /></ComponentPreview>
      <ComponentPreview title="Style Three"><AccordionExample variant="style_three" /></ComponentPreview>
      <ComponentPreview title="Muted Rows"><AccordionExample variant="style_three" /></ComponentPreview>
      <ComponentPreview title="Multiple Items Open" className="xl:col-span-2"><AccordionExample variant="style_one" multiple /></ComponentPreview>
      <ComponentPreview title="Controlled and Disabled Items" className="xl:col-span-2"><ControlledAccordionExample /></ComponentPreview>
    </Showcase>}</ConsoleLayout>;
}
