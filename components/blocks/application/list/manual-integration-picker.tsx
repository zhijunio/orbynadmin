"use client";

import { useState } from "react";
import { IconBrain, IconCheck, IconCode, IconMessageCircle, IconPlus, IconScan, IconShieldCheck, IconShoppingCart, IconSparkles } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { ListCard, ListCardFooter, ListCardHeader } from "@/components/blocks/application/list/list-card";

const integrations = [
  { id: "clean", name: "Data Cleaning", description: "Automate data cleanup and formatting.", Icon: IconCode },
  { id: "anomaly", name: "Anomaly Detection", description: "Identify unusual activity in your data.", Icon: IconScan },
  { id: "recommendation", name: "Recommendation Engine", description: "Suggest relevant items and content.", Icon: IconSparkles },
  { id: "assistant", name: "Chatbot Support", description: "Assist customers with common questions.", Icon: IconMessageCircle },
  { id: "fraud", name: "Fraud Monitoring", description: "Flag suspicious transactions in real time.", Icon: IconShoppingCart },
  { id: "insights", name: "Predictive Insights", description: "Forecast trends from historical activity.", Icon: IconBrain },
  { id: "compliance", name: "Compliance Review", description: "Review records against your policies.", Icon: IconShieldCheck },
] as const;

export function ManualIntegrationPicker() {
  const [added, setAdded] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const visibleIntegrations = integrations.slice(0, showAll ? integrations.length : 5);

  function toggleIntegration(id: string) {
    setAdded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <ListCard aria-labelledby="manual-integrations-title">
      <ListCardHeader>
        <h2 id="manual-integrations-title" className="text-base font-semibold">Manual Integrations</h2>
      </ListCardHeader>
      <ul className="px-3.5">
        {visibleIntegrations.map(({ id, name, description, Icon }, index) => {
          const isAdded = added.includes(id);
          return (
            <li key={id} className={`flex min-h-[68px] items-center gap-2 ${index < visibleIntegrations.length - 1 ? "border-b border-dashed border-border" : ""}`}>
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-muted-foreground shadow-sm"><Icon className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{name}</p>
                <p className="truncate text-xs text-muted-foreground">{description}</p>
              </div>
              <Button size="icon-sm" variant={isAdded ? "secondary" : "outline"} aria-label={`${isAdded ? "Remove" : "Add"} ${name}`} aria-pressed={isAdded} onClick={() => toggleIntegration(id)} className="shrink-0">
                {isAdded ? <IconCheck /> : <IconPlus />}
              </Button>
            </li>
          );
        })}
      </ul>
      <ListCardFooter>
        <Button variant="outline" className="w-full" onClick={() => setShowAll((value) => !value)}>{showAll ? "Show Fewer" : "Browse More"}</Button>
      </ListCardFooter>
    </ListCard>
  );
}
