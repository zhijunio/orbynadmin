"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { TagGroup } from "@/components/base/badges/tag-group";

export default function TagGroupPage() {
  const [filters, setFilters] = useState(["Active", "Enterprise", "US West"]);
  return <ConsoleLayout>{<Showcase title="Tag Group"><ComponentPreview title="Removable Filters"><div className="w-full space-y-3"><TagGroup aria-label="Active filters" values={filters} onValuesChange={setFilters} />{filters.length === 0 && <p className="text-sm text-muted-foreground">No filters selected.</p>}</div></ComponentPreview><ComponentPreview title="Read-only Tags"><TagGroup aria-label="Customer segments" values={["Healthcare", "Priority", "Renewal"]} /></ComponentPreview></Showcase>}</ConsoleLayout>;
}
