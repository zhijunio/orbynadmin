"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { SearchField } from "@/components/base/search-field/search-field";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function SearchFieldPage() {
  const [query, setQuery] = useState("Quarterly report");
  return <ConsoleLayout>{<Showcase title="Search Field">
    <ComponentPreview title="Default and controlled"><div className="grid w-full max-w-md gap-3"><SearchField aria-label="Search customers" placeholder="Search customers" /><SearchField aria-label="Search files" placeholder="Search files" value={query} onValueChange={setQuery} /><p className="text-xs text-muted-foreground" aria-live="polite">Query: {query || "None"}</p></div></ComponentPreview>
    <ComponentPreview title="Disabled"><SearchField aria-label="Search unavailable records" placeholder="Search records" disabled /></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
