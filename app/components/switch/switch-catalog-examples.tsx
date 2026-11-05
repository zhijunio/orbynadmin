"use client";
import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Label } from "@/components/ui/input/label";
import { Switch } from "@/components/ui/switch/switch";
import { SwitchCard } from "@/components/ui/switch/switch-card";

export function SwitchCatalogExamples() {
const [enabled, setEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <CatalogGridItems>

    <ComponentPreview title="Preferences"><div className="w-full max-w-sm space-y-5">{[{ id: "email-alerts", text: "Email alerts", note: "Receive important account updates." }, { id: "weekly-report", text: "Weekly report", note: "Get a summary every Monday." }].map((item) => <div key={item.id} className="flex items-center justify-between gap-4"><div><Label htmlFor={item.id}>{item.text}</Label><p className="text-xs text-muted-foreground">{item.note}</p></div><Switch id={item.id} defaultChecked={item.id === "weekly-report"} /></div>)}</div></ComponentPreview>
    <ComponentPreview title="Switch Card"><div className="w-full max-w-xl space-y-3"><SwitchCard checked={emailNotifications} onCheckedChange={setEmailNotifications} label="Email notifications" description="Send an email when this export is ready." /><p className="text-xs text-muted-foreground" aria-live="polite">Notifications {emailNotifications ? "enabled" : "disabled"}</p></div></ComponentPreview>
    <ComponentPreview title="Switch Sizes"><div className="flex flex-wrap items-center gap-6"><div className="flex items-center gap-3"><Switch id="small-switch" size="sm" defaultChecked /><Label htmlFor="small-switch">Compact</Label></div><div className="flex items-center gap-3"><Switch id="default-switch" defaultChecked /><Label htmlFor="default-switch">Default</Label></div></div></ComponentPreview>
    <ComponentPreview title="Controlled Switch"><div className="flex items-center gap-3"><Switch id="maintenance-mode" checked={enabled} onCheckedChange={setEnabled} /><Label htmlFor="maintenance-mode">Maintenance mode {enabled ? "on" : "off"}</Label></div></ComponentPreview>
    <ComponentPreview title="Disabled Switch"><div className="flex items-center gap-3"><Switch id="locked-feature" disabled checked /><Label htmlFor="locked-feature">Managed by your administrator</Label></div></ComponentPreview>
    </CatalogGridItems>
  );
}
