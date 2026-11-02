"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { Combobox } from "@/components/base/combobox/combobox";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
const options = [{ value: "design", label: "Design", group: "Product" }, { value: "engineering", label: "Engineering", group: "Product" }, { value: "finance", label: "Finance", group: "Operations" }, { value: "operations", label: "Operations", group: "Operations", disabled: true }];
export default function ComboboxPage() {
  const [team, setTeam] = useState("engineering");
  return <ConsoleLayout>{<Showcase title="Combobox">
    <ComponentPreview title="Controlled selection"><div className="grid gap-3"><Combobox aria-label="Choose a team" options={options} value={team} onValueChange={setTeam} placeholder="Choose a team" /><p className="text-xs text-muted-foreground" aria-live="polite">Selected team: {options.find((item) => item.value === team)?.label}</p></div></ComponentPreview>
    <ComponentPreview title="Custom values and disabled"><div className="grid gap-3"><Combobox aria-label="Add a label" options={[]} allowCustomValue searchPlaceholder="Type a label" emptyMessage="No saved label found." /><Combobox aria-label="Locked team" options={options} value="finance" disabled /></div></ComponentPreview>
    <ComponentPreview title="Invalid state"><div className="grid gap-3"><Combobox aria-label="Choose a reviewer" options={options} isInvalid emptyMessage="No reviewer found." /></div></ComponentPreview>
    <ComponentPreview title="Empty and disabled states"><div className="grid gap-3"><Combobox aria-label="Search reviewers" options={options} searchPlaceholder="Search reviewers" emptyMessage="No reviewer matches that search." /><Combobox aria-label="Locked team" options={options} value="finance" disabled /></div></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
