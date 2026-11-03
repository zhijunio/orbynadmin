"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";

import { useState } from "react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Label } from "@/components/ui/input/label";
import { Switch } from "@/components/ui/switch/switch";
import { SwitchCard } from "@/components/ui/switch/switch-card";

export default function SwitchPage() {
  const [enabled, setEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Switch" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Preferences"><div className="w-full max-w-sm space-y-5">{[{ id: "email-alerts", text: "Email alerts", note: "Receive important account updates." }, { id: "weekly-report", text: "Weekly report", note: "Get a summary every Monday." }].map((item) => <div key={item.id} className="flex items-center justify-between gap-4"><div><Label htmlFor={item.id}>{item.text}</Label><p className="text-xs text-muted-foreground">{item.note}</p></div><Switch id={item.id} defaultChecked={item.id === "weekly-report"} /></div>)}</div></ComponentPreview>
    <ComponentPreview title="Switch Card"><div className="w-full max-w-xl space-y-3"><SwitchCard checked={emailNotifications} onCheckedChange={setEmailNotifications} label="Email notifications" description="Send an email when this export is ready." /><p className="text-xs text-muted-foreground" aria-live="polite">Notifications {emailNotifications ? "enabled" : "disabled"}</p></div></ComponentPreview>
    <ComponentPreview title="Switch Sizes"><div className="flex flex-wrap items-center gap-6"><div className="flex items-center gap-3"><Switch id="small-switch" size="sm" defaultChecked /><Label htmlFor="small-switch">Compact</Label></div><div className="flex items-center gap-3"><Switch id="default-switch" defaultChecked /><Label htmlFor="default-switch">Default</Label></div></div></ComponentPreview>
    <ComponentPreview title="Controlled Switch"><div className="flex items-center gap-3"><Switch id="maintenance-mode" checked={enabled} onCheckedChange={setEnabled} /><Label htmlFor="maintenance-mode">Maintenance mode {enabled ? "on" : "off"}</Label></div></ComponentPreview>
    <ComponentPreview title="Disabled Switch"><div className="flex items-center gap-3"><Switch id="locked-feature" disabled checked /><Label htmlFor="locked-feature">Managed by your administrator</Label></div></ComponentPreview>
  </div></div>}</AppShell>;
}
