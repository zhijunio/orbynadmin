"use client";

import { useState } from "react";
import { IconBuilding, IconRocket } from "@tabler/icons-react";

import { Combobox, type ComboboxOption } from "@/components/ui/combobox/combobox";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import { Textarea } from "@/components/ui/textarea/textarea";

const owners: ComboboxOption[] = [
  { value: "maya", label: "Maya Chen" },
  { value: "kai", label: "Kai Morgan" },
  { value: "jules", label: "Jules Rivera" },
];

const intents = [
  { value: "pipeline", label: "Pipeline", description: "Accounts and follow-up work." },
  { value: "support", label: "Support", description: "Tickets and customer signals." },
  { value: "reporting", label: "Reporting", description: "Dashboards from trusted data." },
];

export function CustomerOnboarding() {
  const [company, setCompany] = useState("Northstar Labs");
  const [workspace, setWorkspace] = useState("northstar");
  const [intent, setIntent] = useState("pipeline");
  const [teamSize, setTeamSize] = useState("11-50");
  const [launch, setLaunch] = useState("2-weeks");
  const [template, setTemplate] = useState("revenue-operations");
  const [source, setSource] = useState("crm");
  const [selectedOwners, setSelectedOwners] = useState<string[]>(["maya", "kai"]);
  const [sampleData, setSampleData] = useState(true);
  const [notes, setNotes] = useState("Start with CRM accounts and renewal workflow defaults.");
  const [notice, setNotice] = useState("");

  const select = (value: string, onValueChange: (value: string) => void, options: [string, string][]) => (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full"><SelectValue>{options.find(([key]) => key === value)?.[1]}</SelectValue></SelectTrigger>
      <SelectContent>{options.map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}</SelectContent>
    </Select>
  );
  const row = (label: string, description: string, control: React.ReactNode, align = "center") => (
    <div className={`grid gap-3 border-b border-dashed py-3.5 last:border-0 sm:grid-cols-[minmax(0,16.5rem)_minmax(0,1fr)] sm:gap-5 sm:py-3.5 ${align === "start" ? "sm:items-start" : "sm:items-center"}`}>
      <div className="min-w-0"><div className="text-sm font-medium">{label}</div><p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p></div>
      <div className="min-w-0">{control}</div>
    </div>
  );
  const selectedOwnerNames = owners.filter((owner) => selectedOwners.includes(owner.value)).map((owner) => owner.label);

  return <Card className="mx-auto w-full max-w-3xl gap-0 shadow-none">
    <CardHeader className="flex flex-row items-center justify-between gap-4 border-b px-5 py-4 sm:px-6">
      <div><CardTitle className="text-base">Customer Onboarding</CardTitle><p className="mt-1 text-sm text-muted-foreground">Create a focused setup plan for a new workspace.</p></div>
      <Badge variant="secondary">Draft</Badge>
    </CardHeader>
    <CardContent className="px-5 py-1 sm:px-6">
      {row("Company Name", "Customer account display name.", <InputGroup><InputGroupAddon><IconBuilding /></InputGroupAddon><InputGroupInput aria-label="Company Name" value={company} onChange={(event) => setCompany(event.target.value)} /></InputGroup>)}
      {row("Workspace URL", "Short route for the new workspace.", <InputGroup><InputGroupAddon className="border-r pr-2">app.nextrose.dev/</InputGroupAddon><InputGroupInput aria-label="Workspace URL" value={workspace} onChange={(event) => setWorkspace(event.target.value)} /></InputGroup>)}
      {row("Intent", "Pick the first success path.", <RadioGroup value={intent} onValueChange={setIntent} className="gap-2">
        {intents.map((option) => <Field key={option.value} orientation="horizontal" className="items-start gap-2"><RadioGroupItem id={`onboarding-intent-${option.value}`} value={option.value} className="mt-0.5" /><FieldLabel htmlFor={`onboarding-intent-${option.value}`} className="grid gap-0.5 font-normal"><span className="font-medium text-foreground">{option.label}</span><span className="text-sm text-muted-foreground">{option.description}</span></FieldLabel></Field>)}
      </RadioGroup>, "start")}
      {row("Team Size", "Expected workspace users.", select(teamSize, setTeamSize, [["1-10", "1-10 people"], ["11-50", "11-50 people"], ["51-200", "51-200 people"], ["200+", "200+ people"]]))}
      {row("Launch Window", "Target first usable workspace.", select(launch, setLaunch, [["1-week", "Next week"], ["2-weeks", "Next 2 weeks"], ["month", "This month"], ["flexible", "Flexible"]]))}
      {row("Starter Template", "Initial workspace structure.", select(template, setTemplate, [["revenue-operations", "Revenue operations"], ["customer-support", "Customer support"], ["analytics", "Analytics workspace"]]))}
      {row("First Source", "Primary data source to connect.", select(source, setSource, [["crm", "CRM"], ["support", "Support platform"], ["warehouse", "Data warehouse"]]))}
      {row("Owners", "People responsible for setup.", <Combobox aria-label="Owners" options={owners} value={selectedOwners} onValueChange={(value) => setSelectedOwners(Array.isArray(value) ? value : [value])} multiple placeholder="Add owner" displayValue={<span className="flex min-w-0 items-center gap-1.5 overflow-hidden">{selectedOwnerNames.map((name) => <span key={name} className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs text-foreground">{name}</span>)}<span className="truncate text-muted-foreground">Add owner</span></span>} className="w-full" />)}
      {row("Include Sample Data", "Seed demo records before import.", <Switch aria-label="Include Sample Data" checked={sampleData} onCheckedChange={setSampleData} />)}
      {row("Setup Notes", "Context for the implementation team.", <Textarea aria-label="Setup Notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />, "start")}
      {notice && <p role="status" className="pb-3 text-xs text-muted-foreground">{notice}</p>}
    </CardContent>
    <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/20 px-5 py-3 sm:px-6">
      <span className="text-xs text-muted-foreground">{teamSize} people team · {launch === "2-weeks" ? "Next 2 weeks" : launch} launch · {selectedOwners.length} owners</span>
      <div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setNotice("Draft saved.")}>Save Draft</Button><Button type="button" onClick={() => setNotice("Onboarding plan created.")}><IconRocket />Create Plan</Button></div>
    </CardFooter>
  </Card>;
}
