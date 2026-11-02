"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { Chip } from "@/components/base/badges/chip";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function ChipPage() {
  const [filters, setFilters] = useState(["Active", "Enterprise", "Renewal"]);
  return <ConsoleLayout>{<Showcase title="Chip">
    <ComponentPreview title="Variants"><div className="flex flex-wrap items-center gap-2"><Chip variant="default">Active</Chip><Chip variant="subtle">Enterprise</Chip><Chip variant="outline">Renewal</Chip></div></ComponentPreview>
    <ComponentPreview title="Removable filters"><div className="flex flex-wrap gap-2">{filters.map((filter) => <Chip key={filter} onRemove={() => setFilters((items) => items.filter((item) => item !== filter))}>{filter}</Chip>)}{filters.length === 0 && <span className="text-sm text-muted-foreground">All filters cleared</span>}</div></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
