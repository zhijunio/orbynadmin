"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { Combobox } from "@/components/ui/combobox/combobox";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
const options = [{ value: "design", label: "Design", group: "Product" }, { value: "engineering", label: "Engineering", group: "Product" }, { value: "finance", label: "Finance", group: "Operations" }, { value: "operations", label: "Operations", group: "Operations", disabled: true }];
export default function ComboboxPage() {
  const [team, setTeam] = useState("engineering");
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Combobox" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Controlled selection"><div className="grid gap-3"><Combobox aria-label="Choose a team" options={options} value={team} onValueChange={setTeam} placeholder="Choose a team" /><p className="text-xs text-muted-foreground" aria-live="polite">Selected team: {options.find((item) => item.value === team)?.label}</p></div></ComponentPreview>
    <ComponentPreview title="Custom Values"><Combobox aria-label="Add a label" options={[]} allowCustomValue searchPlaceholder="Type a label" emptyMessage="No saved label found." /></ComponentPreview>
    <ComponentPreview title="Search Results and Empty State"><Combobox aria-label="Search reviewers" options={options} searchPlaceholder="Search reviewers" emptyMessage="No reviewer matches that search." /></ComponentPreview>
    <ComponentPreview title="Invalid State"><Combobox aria-label="Choose a reviewer" options={options} isInvalid emptyMessage="No reviewer found." /></ComponentPreview>
    <ComponentPreview title="Disabled State"><Combobox aria-label="Locked team" options={options} value="finance" disabled /></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
