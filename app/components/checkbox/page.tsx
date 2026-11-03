"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";

import { useId, useState } from "react";
import { IconBuilding, IconCreditCard, IconInfoCircle, IconKey, IconShieldCheck, IconUser } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badges/badge";

import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { CheckboxCard } from "@/components/ui/checkbox/checkbox-card";
import { HintText } from "@/components/ui/input/hint-text";
import { Label } from "@/components/ui/input/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip";

const preferences = [
  { id: "billing", label: "Billing updates" },
  { id: "security", label: "Security alerts" },
  { id: "product", label: "Product news" },
];

function CheckboxExamples() {
  const id = useId();
  const [selected, setSelected] = useState<string[]>(["security"]);
  const [includeAuditLog, setIncludeAuditLog] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(["billing"]);
  const allSelected = selected.length === preferences.length;
  const someSelected = selected.length > 0 && !allSelected;

  function togglePreference(preferenceId: string, checked: boolean) {
    setSelected((current) =>
      checked
        ? [...current, preferenceId]
        : current.filter((item) => item !== preferenceId),
    );
  }

  return <>
      <ComponentPreview title="Checked and Unchecked">
        <div className="grid gap-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox aria-label="Remember this device" />
            <span>Remember this device</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox defaultChecked aria-label="Receive product updates" />
            <span>Receive product updates</span>
          </label>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Checkbox Card">
        <div className="grid w-full max-w-xl gap-3">
          <CheckboxCard
            checked={includeAuditLog}
            onCheckedChange={(checked) => setIncludeAuditLog(checked === true)}
            label="Include audit log"
            description="Keep an export of changes made to this workspace."
          />
          <CheckboxCard
            label="Notify workspace owners"
            description="Send a summary when the export is ready."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Indeterminate Group">
        <div className="grid w-full max-w-sm gap-3">
          <label className="flex cursor-pointer items-center gap-3 border-b pb-3 text-sm font-medium">
            <Checkbox
              checked={allSelected ? true : someSelected ? "indeterminate" : false}
              onCheckedChange={(checked) =>
                setSelected(checked ? preferences.map((item) => item.id) : [])
              }
              aria-label="Select all notification preferences"
            />
            <span>Notification preferences</span>
          </label>
          <div className="grid gap-3 pl-7">
            {preferences.map((preference) => (
              <label
                key={preference.id}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={selected.includes(preference.id)}
                  onCheckedChange={(checked) =>
                    togglePreference(preference.id, checked === true)
                  }
                  aria-label={preference.label}
                />
                <span>{preference.label}</span>
              </label>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Checkbox">
        <label className="flex cursor-not-allowed items-center gap-3 text-sm opacity-60">
          <Checkbox disabled checked aria-label="Required policy accepted" />
          <span>Required policy accepted</span>
        </label>
      </ComponentPreview>

      <ComponentPreview title="Invalid Checkbox">
        <div className="grid w-full max-w-sm gap-2">
            <div className="flex items-center gap-3">
              <Checkbox id={`${id}-terms`} aria-invalid="true" />
              <Label htmlFor={`${id}-terms`}>Accept the terms</Label>
            </div>
            <HintText variant="error">You must accept the terms to continue.</HintText>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Label, description, and help tooltip">
        <div className="grid w-full max-w-md gap-4">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4"><Checkbox defaultChecked aria-label="Enable security notifications" /><span className="grid gap-1"><span className="text-sm font-medium">Security notifications</span><span className="text-xs text-muted-foreground">Receive alerts when workspace access changes.</span></span></label>
          <TooltipProvider><div className="flex items-center gap-2"><Checkbox id={`${id}-retention`} /><Label htmlFor={`${id}-retention`}>Enable extended retention</Label><Tooltip><TooltipTrigger asChild><button type="button" aria-label="About extended retention" className="text-muted-foreground hover:text-foreground"><IconInfoCircle className="size-4" /></button></TooltipTrigger><TooltipContent>Retained data follows your organization policy.</TooltipContent></Tooltip></div></TooltipProvider>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Colored and circular checkboxes">
        <div className="flex flex-wrap gap-5"><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked className="data-checked:border-blue-600 data-checked:bg-blue-600" />Blue selection</label><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked className="data-checked:border-emerald-600 data-checked:bg-emerald-600" />Approved</label><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked className="rounded-full" />Circular selection</label></div>
      </ComponentPreview>

      <ComponentPreview title="Framed and icon checkbox cards" className="xl:col-span-2">
        <div className="grid w-full gap-4 md:grid-cols-2"><fieldset className="grid gap-2 rounded-xl border p-4"><legend className="px-1 text-sm font-medium">Workspace access</legend><CheckboxCard label="Billing" description="Invoices, plans, and payment settings" defaultChecked /><CheckboxCard label="Audit logs" description="Security and access history" /></fieldset><div className="grid gap-2 sm:grid-cols-3">{[{ label: "Projects", icon: IconBuilding }, { label: "Security", icon: IconShieldCheck }, { label: "API keys", icon: IconKey }].map(({ label, icon: Icon }) => <CheckboxCard key={label} label={<span className="grid justify-items-center gap-2 text-center"><Icon className="size-5 text-primary" />{label}</span>} cardClassName="relative min-h-32 flex-col items-center justify-center p-4 pt-8" className="absolute left-3 top-3 mt-0" />)}</div></div>
      </ComponentPreview>

      <ComponentPreview title="Positioned and avatar selections">
        <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2"><label className="relative flex min-h-24 cursor-pointer items-end rounded-xl border bg-muted/40 p-4"><Checkbox defaultChecked aria-label="Select incident response project" className="absolute top-3 right-3" /><span><span className="block text-sm font-medium">Incident response</span><span className="text-xs text-muted-foreground">Project · 8 members</span></span></label><CheckboxCard label={<span className="flex items-center gap-3"><Avatar><AvatarFallback><IconUser className="size-4" /></AvatarFallback></Avatar><span><span className="block font-medium">Morgan Lee</span><span className="text-xs text-muted-foreground">Workspace owner</span></span></span>} cardClassName="items-center" /></div>
      </ComponentPreview>

      <ComponentPreview title="Nested checkbox group">
        <div className="grid w-full max-w-sm gap-3"><label className="flex items-center gap-3 border-b pb-3 text-sm font-medium"><Checkbox checked={selectedProjects.length === 3 ? true : selectedProjects.length > 0 ? "indeterminate" : false} onCheckedChange={(checked) => setSelectedProjects(checked ? ["billing", "identity", "analytics"] : [])} aria-label="Select all projects" /><span>Project permissions</span></label><div className="grid gap-3 pl-7">{[{ id: "billing", label: "Billing" }, { id: "identity", label: "Identity" }, { id: "analytics", label: "Analytics" }].map((project) => <label key={project.id} className="flex items-center gap-3 text-sm"><Checkbox checked={selectedProjects.includes(project.id)} onCheckedChange={(checked) => setSelectedProjects((current) => checked ? [...current, project.id] : current.filter((value) => value !== project.id))} /><span>{project.label}</span></label>)}</div></div>
      </ComponentPreview>

      <ComponentPreview title="Payment methods, badges, and inline options">
        <div className="grid w-full gap-4"><div className="grid max-w-xl gap-2 sm:grid-cols-2"><CheckboxCard label={<span className="flex items-center gap-2"><IconCreditCard className="size-4" />Corporate card ending in 2048</span>} description="Default payment method" defaultChecked cardClassName="items-center" /><CheckboxCard label={<span className="flex items-center gap-2"><IconBuilding className="size-4" />Invoice billing</span>} description="Net 30 · Finance team" cardClassName="items-center" /></div><div className="flex flex-wrap items-center gap-5"><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked />Email receipts <Badge variant="secondary">Recommended</Badge></label><label className="flex items-center gap-2 text-sm"><Checkbox />Send weekly summary</label><label className="flex items-center gap-2 text-sm"><Checkbox />Include archived projects</label></div></div>
      </ComponentPreview>
    </>;
}

export default function CheckboxPage() {
  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Checkbox" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <CheckboxExamples />
    </div></div>}</AppShell>;
}
