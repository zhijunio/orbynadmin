"use client";
import { useEffect, useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Autocomplete, type AutocompleteItem } from "@/components/ui/autocomplete/autocomplete";
import { Button } from "@/components/ui/button/button";
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

  return (
    <>
    <ComponentPreview title="Default Usage" layout="grid2">
<div className="min-w-0"><Autocomplete aria-label="Search features" items={features} placeholder="Search features…" /></div>
<div className="min-w-0"><Autocomplete aria-label="Compact filter" items={features} size="sm" clearable showTrigger placeholder="Filter…" className="max-w-xs" /></div>
<div className="min-w-0"><Autocomplete aria-label="Page feature search" items={features} size="lg" clearable showTrigger placeholder="Search all features…" className="max-w-lg" /></div>
</ComponentPreview>
<ComponentPreview title="States" layout="grid2">
<div className="min-w-0"><Autocomplete aria-label="Locked feature" items={features} value="Analytics" disabled /></div>
<div className="min-w-0"><Autocomplete aria-label="Choose a feature" items={features} autoHighlight placeholder="Type to highlight a match…" /></div>
</ComponentPreview>
<ComponentPreview title="Field" layout="grid2">
<div className="min-w-0"><div className="grid w-full max-w-sm gap-2"><Label htmlFor="autocomplete-labeled">Feature</Label><Autocomplete id="autocomplete-labeled" aria-label="Feature" items={features} autoHighlight placeholder="Search features…" /></div></div>
<div className="min-w-0"><form className="grid w-full max-w-sm gap-3" onSubmit={submitForm} noValidate><div className="grid gap-2"><Label htmlFor="autocomplete-form">Feature</Label><Autocomplete id="autocomplete-form" aria-label="Select a valid feature" items={features} value={formValue} onValueChange={(next) => { setFormValue(next); setFormError(""); }} invalid={Boolean(formError)} placeholder="Choose a feature…" /><p className="text-xs text-muted-foreground">Select a suggestion. Other text is rejected when submitted.</p>{formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}</div><div className="flex gap-2"><Button type="button" variant="outline" className="flex-1" onClick={() => { setFormValue(""); setFormError(""); }}>Reset</Button><Button type="submit" className="flex-1">Submit</Button></div></form></div>
</ComponentPreview>
<ComponentPreview title="Options" layout="stack">
<div className="min-w-0 w-full"><Autocomplete aria-label="Search grouped features" items={features} placeholder="Search by feature or team…" /></div>
<div className="min-w-0 w-full"><div className="grid w-full max-w-sm gap-2"><Autocomplete aria-label="Search workspace members" items={serverItems} value={serverQuery} onValueChange={(next) => { setServerQuery(next); setServerLoading(Boolean(next.trim())); setServerError(""); if (!next.trim()) setServerItems([]); }} loading={serverLoading} error={serverError} placeholder="Search members…" emptyText="No matching members." /><p className="text-xs text-muted-foreground" aria-live="polite">{serverLoading ? "Searching…" : serverError || (serverItems.length ? `${serverItems.length} results` : "Type a name to search the directory.")}</p></div></div>
</ComponentPreview>
<ComponentPreview title="Actions" span={2} layout="grid3">
<div className="min-w-0"><Autocomplete aria-label="Search and clear" items={features} clearable placeholder="Search features…" /></div>
<div className="min-w-0"><Autocomplete aria-label="Browse features" items={features} showTrigger placeholder="Browse features…" /></div>
<div className="min-w-0"><Autocomplete aria-label="Search or browse features" items={features} clearable showTrigger placeholder="Search or browse…" /></div>
</ComponentPreview>
    </>
  );
}

export function AutocompleteCatalogExamples() {
  return (
    <CatalogGridItems>
      <AutocompleteExamples />
    </CatalogGridItems>
  );
}
