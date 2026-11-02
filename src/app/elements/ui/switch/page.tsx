"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Label } from "@/components/base/input/label";
import { Switch } from "@/components/base/switch/switch";

export default function SwitchPage() {
  const [enabled, setEnabled] = useState(true);
  return <ConsoleLayout>{<Showcase title="Switch">
    <ComponentPreview title="Preferences"><div className="w-full max-w-sm space-y-5">{[{ id: "email-alerts", text: "Email alerts", note: "Receive important account updates." }, { id: "weekly-report", text: "Weekly report", note: "Get a summary every Monday." }].map((item) => <div key={item.id} className="flex items-center justify-between gap-4"><div><Label htmlFor={item.id}>{item.text}</Label><p className="text-xs text-muted-foreground">{item.note}</p></div><Switch id={item.id} defaultChecked={item.id === "weekly-report"} /></div>)}</div></ComponentPreview>
    <ComponentPreview title="Sizes"><div className="flex flex-wrap items-center gap-6"><div className="flex items-center gap-3"><Switch id="small-switch" size="sm" defaultChecked /><Label htmlFor="small-switch">Compact</Label></div><div className="flex items-center gap-3"><Switch id="default-switch" defaultChecked /><Label htmlFor="default-switch">Default</Label></div></div></ComponentPreview>
    <ComponentPreview title="Controlled"><div className="flex items-center gap-3"><Switch id="maintenance-mode" checked={enabled} onCheckedChange={setEnabled} /><Label htmlFor="maintenance-mode">Maintenance mode {enabled ? "on" : "off"}</Label></div></ComponentPreview>
    <ComponentPreview title="Disabled"><div className="flex items-center gap-3"><Switch id="locked-feature" disabled checked /><Label htmlFor="locked-feature">Managed by your administrator</Label></div></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
