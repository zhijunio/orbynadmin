"use client";
import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio/radio-group";
import { RadioCard, RadioCardGroup } from "@/components/ui/radio/radio-card";
import { Label } from "@/components/ui/input/label";

const plans = [{ id: "starter", name: "Starter", detail: "For small teams getting started" }, { id: "business", name: "Business", detail: "Advanced controls for growing teams" }, { id: "enterprise", name: "Enterprise", detail: "Custom security and support" }];

export function RadioCatalogExamples() {
const [delivery, setDelivery] = useState("email");
  const [plan, setPlan] = useState("standard");

  return (
    <CatalogGridItems>

    <ComponentPreview title="Radio Group"><RadioGroup aria-label="Billing cycle" defaultValue="monthly" className="max-w-sm"><Label htmlFor="monthly" className="flex items-center gap-3 rounded-lg border p-3"><RadioGroupItem id="monthly" value="monthly" />Monthly billing</Label><Label htmlFor="yearly" className="flex items-center gap-3 rounded-lg border p-3"><RadioGroupItem id="yearly" value="yearly" />Annual billing <span className="ml-auto text-xs text-muted-foreground">Save 15%</span></Label></RadioGroup></ComponentPreview>
    <ComponentPreview title="Controlled Selection"><div className="grid w-full max-w-sm gap-3"><RadioGroup aria-label="Invoice delivery" value={delivery} onValueChange={setDelivery}><Label htmlFor="delivery-email" className="flex items-center gap-3"><RadioGroupItem id="delivery-email" value="email" />Email</Label><Label htmlFor="delivery-download" className="flex items-center gap-3"><RadioGroupItem id="delivery-download" value="download" />Download</Label></RadioGroup><p aria-live="polite" className="text-xs text-muted-foreground">Selected: {delivery === "email" ? "Email" : "Download"}</p></div></ComponentPreview>
    <ComponentPreview title="Plan Selection"><RadioGroup aria-label="Workspace plan" defaultValue="business" className="max-w-md">{plans.map((plan) => <Label key={plan.id} htmlFor={plan.id} className="flex cursor-pointer items-start gap-3 rounded-lg border p-3"><RadioGroupItem id={plan.id} value={plan.id} className="mt-0.5" /><span><span className="block text-sm font-medium">{plan.name}</span><span className="text-xs text-muted-foreground">{plan.detail}</span></span></Label>)}</RadioGroup></ComponentPreview>
    <ComponentPreview title="Radio Card"><RadioCardGroup value={plan} onValueChange={setPlan} aria-label="Export format" className="max-w-xl"><RadioCard value="standard" label="Standard export" description="CSV files with the selected records." /><RadioCard value="complete" label="Complete archive" description="CSV files and related attachments." /></RadioCardGroup></ComponentPreview>
    <ComponentPreview title="Disabled Radio Option"><RadioGroup aria-label="Locked preference" defaultValue="standard" className="max-w-sm"><Label htmlFor="standard" className="flex items-center gap-3"><RadioGroupItem id="standard" value="standard" />Standard access</Label><Label htmlFor="restricted" className="flex items-center gap-3 text-muted-foreground"><RadioGroupItem id="restricted" value="restricted" disabled />Restricted access</Label></RadioGroup></ComponentPreview>
    </CatalogGridItems>
  );
}
