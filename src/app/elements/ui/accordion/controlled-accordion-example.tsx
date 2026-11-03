"use client";

import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/base/accordion/accordion";

const items = [
  { value: "billing", title: "How does billing work?", content: "Plans are billed monthly for every active seat." },
  { value: "plans", title: "Can I change plans later?", content: "Upgrades apply right away. Downgrades take effect at the end of the billing period." },
  { value: "data", title: "What happens to my data?", content: "Your workspace stays readable for 30 days, so you can export your data." },
];

export function ControlledAccordionExample() {
  const [openItems, setOpenItems] = useState<string[]>(["billing"]);
  const itemIds = items.map((item) => item.value);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setOpenItems(itemIds)}>Expand all</Button>
        <Button variant="outline" size="sm" onClick={() => setOpenItems([])}>Collapse all</Button>
      </div>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="gap-3">
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value} className="rounded-lg border px-3">
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
