"use client";

import { useState } from "react";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Button } from "@/components/base/buttons/button";
import { Kbd, KbdGroup } from "@/components/base/kbd/kbd";
import { Label } from "@/components/base/input/label";
import { SearchField } from "@/components/base/search-field/search-field";

const teammates = [
  { name: "Amir Haddad", team: "Design" },
  { name: "Hana Sato", team: "Engineering" },
  { name: "Leo Park", team: "Marketing" },
  { name: "Lucas Silva", team: "Sales" },
  { name: "Nora Lind", team: "Engineering" },
  { name: "Priya Nair", team: "Design" },
];

function SearchFieldExamples() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const filteredTeammates = teammates.filter((teammate) =>
    `${teammate.name} ${teammate.team}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <ComponentPreview title="Preview">
        <div className="w-full max-w-sm space-y-2">
          <SearchField aria-label="Search teammates" placeholder="Search teammates" value={query} onChange={setQuery} />
          <ul aria-label="Teammates" className="divide-y divide-border">
            {filteredTeammates.map((teammate) => (
              <li key={teammate.name} className="flex items-center justify-between gap-3 py-2 text-sm first:pt-1 last:pb-1">
                <span className="font-medium">{teammate.name}</span>
                <span className="text-muted-foreground">{teammate.team}</span>
              </li>
            ))}
            {filteredTeammates.length === 0 && (
              <li className="py-3 text-sm text-muted-foreground">No teammates found.</li>
            )}
          </ul>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Shapes and Sizes">
        <div className="grid w-full gap-4 sm:grid-cols-2">
          {[
            { label: "Pill", shape: "pill" as const, size: "default" as const },
            { label: "Rounded", shape: "rounded" as const, size: "default" as const },
            { label: "Pill, small", shape: "pill" as const, size: "small" as const },
            { label: "Rounded, small", shape: "rounded" as const, size: "small" as const },
          ].map((variant) => (
            <div key={variant.label} className="grid min-w-0 gap-2">
              <Label htmlFor={`search-${variant.label.toLowerCase().replaceAll(" ", "-")}`}>
                {variant.label}
              </Label>
              <SearchField
                id={`search-${variant.label.toLowerCase().replaceAll(" ", "-")}`}
                placeholder="Search"
                shape={variant.shape}
                size={variant.size}
              />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Loading">
        <div className="grid w-full max-w-sm gap-3">
          <div className="grid gap-2">
            <Label htmlFor="search-help-center">Help center</Label>
            <SearchField id="search-help-center" placeholder="Search articles" isLoading={isLoading} />
            <p className="text-xs text-muted-foreground">Try “team” or “plan”.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((loading) => !loading)}
          >
            {isLoading ? "Stop loading" : "Loading"}
          </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Keyboard and Accessibility">
        <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>Escape clears the search. Enter submits the current query.</p>
          <p className="flex flex-wrap items-center gap-2">
            Give the field a visible label or an accessible name. The clear button is removed from the tab order; Escape clears the query from the input.
            <KbdGroup><Kbd>Esc</Kbd><span>clear</span></KbdGroup>
            <KbdGroup><Kbd>Enter</Kbd><span>submit</span></KbdGroup>
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}

export default function SearchFieldPage() {
  return (
    <ConsoleLayout>
      <Showcase title="Search Field">
        <SearchFieldExamples />
      </Showcase>
    </ConsoleLayout>
  );
}
