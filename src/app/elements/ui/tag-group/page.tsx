"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { TagGroup } from "@/components/base/badges/tag-group";

export default function TagGroupPage() {
  const [filters, setFilters] = useState(["Active", "Enterprise", "US West"]);
  const [priority, setPriority] = useState(["Standard"]);
  return <ConsoleLayout>{<Showcase title="Tag Group">
    <ComponentPreview title="Removable Filters"><div className="w-full space-y-3"><TagGroup aria-label="Active filters" values={filters} onValuesChange={setFilters} />{filters.length === 0 && <p className="text-sm text-muted-foreground">No filters selected.</p>}</div></ComponentPreview>
    <ComponentPreview title="Read-only Tags"><TagGroup aria-label="Customer segments" values={["Healthcare", "Priority", "Renewal"]} /></ComponentPreview>
    <ComponentPreview title="Colors and Sizes">
      <div className="grid w-full gap-4">
        <TagGroup aria-label="Small lime tags" values={["Active", "Verified", "Healthy"]} color="lime" size="sm" />
        <TagGroup aria-label="Medium rose tags" values={["Past due", "Blocked", "Review"]} color="rose" size="md" />
      </div>
    </ComponentPreview>
    <ComponentPreview title="Single Selection">
      <div className="grid gap-3">
        <TagGroup
          aria-label="Priority"
          selectionMode="single"
          options={["Low", "Standard", "Urgent"]}
          values={priority}
          onValuesChange={setPriority}
          color="cyan"
          size="sm"
        />
        <p className="text-xs text-muted-foreground" aria-live="polite">Selected: {priority[0] ?? "None"}</p>
      </div>
    </ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
