"use client";

import { useState } from "react";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { Button } from "@/components/ui/buttons/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd/kbd";
import { Label } from "@/components/ui/input/label";
import { SearchField } from "@/components/ui/search-field/search-field";

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
  const [keyboardQuery, setKeyboardQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const filteredTeammates = teammates.filter((teammate) =>
    `${teammate.name} ${teammate.team}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <ComponentPreview title="Search Results">
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

      <ComponentPreview title="Loading State">
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

      <ComponentPreview title="Keyboard Shortcuts">
        <div className="grid w-full max-w-sm gap-3">
          <Label htmlFor="keyboard-search">Search help articles</Label>
          <SearchField
            id="keyboard-search"
            placeholder="Try “team” or “plan”"
            value={keyboardQuery}
            onChange={setKeyboardQuery}
            onSubmit={setSubmittedQuery}
          />
          <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <KbdGroup><Kbd>Esc</Kbd><span>clear</span></KbdGroup>
            <KbdGroup><Kbd>Enter</Kbd><span>submit</span></KbdGroup>
          </p>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {submittedQuery ? `Submitted search: ${submittedQuery}` : "Press Enter to submit your search."}
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}

export default function SearchFieldPage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5"><PageHeader title="Search Field" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
        <SearchFieldExamples />
      </div></div>
    </ConsoleLayout>
  );
}
