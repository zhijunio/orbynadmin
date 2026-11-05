"use client";
import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { TagGroup } from "@/components/ui/badge/tag-group";

export function TagGroupCatalogExamples() {
const [filters, setFilters] = useState(["Active", "Enterprise", "US West"]);
  const [priority, setPriority] = useState(["Standard"]);

  return (
    <CatalogGridItems>

    <ComponentPreview title="Removable Filters"><div className="w-full space-y-3"><TagGroup aria-label="Active filters" values={filters} onValuesChange={setFilters} />{filters.length === 0 && <p className="text-sm text-muted-foreground">No filters selected.</p>}</div></ComponentPreview>
    <ComponentPreview title="Read-only Tags"><TagGroup aria-label="Customer segments" values={["Healthcare", "Priority", "Renewal"]} /></ComponentPreview>
    <ComponentPreview title="Color Variants">
      <div className="grid w-full gap-4">
        <TagGroup aria-label="Lime tags" values={["Active", "Verified", "Healthy"]} color="lime" />
        <TagGroup aria-label="Rose tags" values={["Past due", "Blocked", "Review"]} color="rose" />
        <TagGroup aria-label="Neutral tags" values={["Draft", "Pending", "Archived"]} color="gray" />
      </div>
    </ComponentPreview>
    <ComponentPreview title="Tag Sizes">
      <div className="grid w-full gap-4">
        <TagGroup aria-label="Small cyan tags" values={["New", "Review"]} color="cyan" size="sm" />
        <TagGroup aria-label="Medium cyan tags" values={["New", "Review"]} color="cyan" size="default" />
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
    </CatalogGridItems>
  );
}
