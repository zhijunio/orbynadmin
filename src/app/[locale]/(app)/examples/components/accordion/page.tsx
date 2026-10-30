import { Info } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Showcase } from "@/components/feature/example/Showcase";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const styles = {
  style_one: {
    root: "gap-5",
    item: "overflow-hidden rounded-xl border border-border bg-card",
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
  style_four: {
    root: "gap-4",
    item: "overflow-hidden rounded-xl bg-muted/60",
    content: "border-t border-border",
  },
  style_five: {
    root: "grid gap-3 sm:grid-cols-2",
    item: "overflow-hidden rounded-xl bg-muted/60",
  },
  style_six: {
    root: "gap-4",
    item: "bg-transparent text-sm data-[open]:bg-muted/40",
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

  return (
    <Accordion
      type={multiple ? "multiple" : "single"}
      className={cn(style.root, className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={String(item.id)} className={style.item}>
          <AccordionTrigger className={cn("text-sm text-foreground", variant === "style_six" && "px-4 py-4")}>
            {variant === "style_six" && <Info className="mr-3 size-4 shrink-0 text-muted-foreground" />}
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={cn("text-sm leading-6", "content" in style && style.content)}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
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

export const metadata = { title: "Accordion" };

export default function AccordionPage() {
  return (
    <Showcase title="Accordion">
      <ComponentPreview title="Style One"><AccordionExample variant="style_one" /></ComponentPreview>
      <ComponentPreview title="Style Two"><AccordionExample variant="style_two" /></ComponentPreview>
      <ComponentPreview title="Style Three"><AccordionExample variant="style_three" /></ComponentPreview>
      <ComponentPreview title="Style Four"><AccordionExample variant="style_four" /></ComponentPreview>
      <ComponentPreview title="Style Five"><AccordionExample variant="style_five" /></ComponentPreview>
      <ComponentPreview title="Style Six"><AccordionExample variant="style_six" /></ComponentPreview>
      <ComponentPreview title="Multiple Items Open" className="xl:col-span-2"><AccordionExample variant="style_one" multiple /></ComponentPreview>
    </Showcase>
  );
}
