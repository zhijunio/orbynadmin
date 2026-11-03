"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Autocomplete, type AutocompleteItem } from "@/components/ui/autocomplete/autocomplete";
import { Button } from "@/components/ui/buttons/button";
import { Label } from "@/components/ui/input/label";

const features: AutocompleteItem[] = [
  { value: "Analytics", group: "Product" }, { value: "Automation", group: "Product" },
  { value: "Billing", group: "Operations" }, { value: "Campaigns", group: "Growth" },
  { value: "Customers", group: "Operations" }, { value: "Developer API", group: "Platform" },
  { value: "Integrations", group: "Platform" }, { value: "Reports", group: "Product" },
];

function AutocompleteExamples() {
  const [formValue, setFormValue] = useState("");
  const [formError, setFormError] = useState("");
  const [serverQuery, setServerQuery] = useState("");
  const [serverItems, setServerItems] = useState<AutocompleteItem[]>([]);
  const [serverLoading, setServerLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!serverQuery.trim()) return;
    let ignore = false;
    const timer = window.setTimeout(() => {
      if (ignore) return;
      if (serverQuery.toLowerCase() === "error") {
        setServerItems([]);
        setServerError("Search failed. Try another query.");
      } else {
        setServerItems(["Alex Morgan", "Jordan Lee", "Taylor Chen", "Morgan Patel"].filter((name) => name.toLowerCase().includes(serverQuery.toLowerCase())).map((name) => ({ value: name, description: "Workspace member" })));
      }
      setServerLoading(false);
    }, 350);
    return () => { ignore = true; window.clearTimeout(timer); };
  }, [serverQuery]);

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!features.some((item) => item.value.toLowerCase() === formValue.trim().toLowerCase())) {
      setFormError("Choose a listed feature before submitting.");
      return;
    }
    setFormError("");
    setFormValue("");
  }

  return <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Basic autocomplete"><Autocomplete aria-label="Search features" items={features} placeholder="Search features…" /></ComponentPreview>
    <ComponentPreview title="Disabled state"><Autocomplete aria-label="Locked feature" items={features} value="Analytics" disabled /></ComponentPreview>
    <ComponentPreview title="Auto highlight"><Autocomplete aria-label="Choose a feature" items={features} autoHighlight placeholder="Type to highlight a match…" /></ComponentPreview>
    <ComponentPreview title="With label"><div className="grid w-full max-w-sm gap-2"><Label htmlFor="autocomplete-labeled">Feature</Label><Autocomplete id="autocomplete-labeled" aria-label="Feature" items={features} autoHighlight placeholder="Search features…" /></div></ComponentPreview>
    <ComponentPreview title="With clear button"><Autocomplete aria-label="Search and clear" items={features} clearable placeholder="Search features…" /></ComponentPreview>
    <ComponentPreview title="With trigger button"><Autocomplete aria-label="Browse features" items={features} showTrigger placeholder="Browse features…" /></ComponentPreview>
    <ComponentPreview title="With clear and trigger buttons"><Autocomplete aria-label="Search or browse features" items={features} clearable showTrigger placeholder="Search or browse…" /></ComponentPreview>
    <ComponentPreview title="Groups and labels"><Autocomplete aria-label="Search grouped features" items={features} placeholder="Search by feature or team…" /></ComponentPreview>
    <ComponentPreview title="Remote search results"><div className="grid w-full max-w-sm gap-2"><Autocomplete aria-label="Search workspace members" items={serverItems} value={serverQuery} onValueChange={(next) => { setServerQuery(next); setServerLoading(Boolean(next.trim())); setServerError(""); if (!next.trim()) setServerItems([]); }} loading={serverLoading} error={serverError} placeholder="Search members…" emptyText="No matching members." /><p className="text-xs text-muted-foreground" aria-live="polite">{serverLoading ? "Searching…" : serverError || (serverItems.length ? `${serverItems.length} results` : "Type a name to search the directory.")}</p></div></ComponentPreview>
    <ComponentPreview title="Small autocomplete"><Autocomplete aria-label="Compact filter" items={features} size="sm" clearable showTrigger placeholder="Filter…" className="max-w-xs" /></ComponentPreview>
    <ComponentPreview title="Large autocomplete"><Autocomplete aria-label="Page feature search" items={features} size="lg" clearable showTrigger placeholder="Search all features…" className="max-w-lg" /></ComponentPreview>
    <ComponentPreview title="Form integration"><form className="grid w-full max-w-sm gap-3" onSubmit={submitForm} noValidate><div className="grid gap-2"><Label htmlFor="autocomplete-form">Feature</Label><Autocomplete id="autocomplete-form" aria-label="Select a valid feature" items={features} value={formValue} onValueChange={(next) => { setFormValue(next); setFormError(""); }} invalid={Boolean(formError)} placeholder="Choose a feature…" /><p className="text-xs text-muted-foreground">Select a suggestion. Other text is rejected when submitted.</p>{formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}</div><div className="flex gap-2"><Button type="button" variant="outline" className="flex-1" onClick={() => { setFormValue(""); setFormError(""); }}>Reset</Button><Button type="submit" className="flex-1">Submit</Button></div></form></ComponentPreview>
  </div>;
}

export default function AutocompletePage() {
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Autocomplete" /><AutocompleteExamples /></div></AppShell>;
}
