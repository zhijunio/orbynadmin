"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { StatusDot } from "@/components/ui/badges/status-dot";
import { HintText } from "@/components/ui/input/hint-text";
import { Label } from "@/components/ui/input/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select/select";

export default function SelectPage() {
  const [team, setTeam] = useState("engineering");
  const [service, setService] = useState("operational");

  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Select" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Placeholder and Selection"><Select><SelectTrigger aria-label="Report cadence" className="w-52"><SelectValue placeholder="Choose cadence" /></SelectTrigger><SelectContent><SelectItem value="daily">Daily</SelectItem><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></ComponentPreview>
    <ComponentPreview title="Grouped Options"><Select value={team} onValueChange={setTeam}><SelectTrigger aria-label="Workspace team" className="w-56"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectLabel>Teams</SelectLabel><SelectItem value="engineering">Engineering</SelectItem><SelectItem value="design">Design</SelectItem></SelectGroup><SelectSeparator /><SelectGroup><SelectLabel>Other</SelectLabel><SelectItem value="operations">Operations</SelectItem><SelectItem value="legacy" disabled>Legacy systems</SelectItem></SelectGroup></SelectContent></Select></ComponentPreview>
    <ComponentPreview title="Labeled Rich Options"><div className="grid w-full max-w-xs gap-2"><Label htmlFor="service-status">Service status</Label><Select value={service} onValueChange={setService}><SelectTrigger id="service-status" className="w-full"><SelectValue placeholder="Choose a service" /></SelectTrigger><SelectContent><SelectItem value="operational"><span className="inline-flex items-center gap-2"><StatusDot color="success" />Operational</span></SelectItem><SelectItem value="degraded"><span className="inline-flex items-center gap-2"><StatusDot color="warning" />Degraded performance</span></SelectItem><SelectItem value="unavailable"><span className="inline-flex items-center gap-2"><StatusDot color="error" />Unavailable</span></SelectItem></SelectContent></Select><HintText>Choose the current state shown to workspace members.</HintText></div></ComponentPreview>
    <ComponentPreview title="Disabled Select"><Select disabled defaultValue="locked"><SelectTrigger aria-label="Locked status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="locked">Locked</SelectItem></SelectContent></Select></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
