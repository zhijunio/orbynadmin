"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Badge } from "@/components/ui/badges/badge";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio/radio-group";
import { Label } from "@/components/ui/input/label";
import { Button } from "@/components/ui/buttons/button";
import { IconArrowRight as IconArrowRight, IconCheck as IconCheck, IconInbox as IconInbox, IconSend as IconSend, IconTrash as IconTrash } from "@tabler/icons-react";

const tasks = ["Review the dashboard wireframes", "Confirm the launch checklist", "Share the Q3 report with the team", "Schedule a customer interview"];

function ListExamples() {
  const [completed, setCompleted] = useState<string[]>([tasks[1]]);
  return <>
    <ComponentPreview title="Unordered List"><ul className="list-disc space-y-3 pl-5 text-sm text-muted-foreground"><li>Plan the next product release</li><li>Review support feedback</li><li>Publish the monthly report</li><li>Update the team roadmap</li><li>Share decisions with the team</li></ul></ComponentPreview>
    <ComponentPreview title="Ordered List"><ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground"><li>Collect requirements</li><li>Prepare the first draft</li><li>Review with stakeholders</li><li>Ship the approved changes</li><li>Share the release notes</li></ol></ComponentPreview>
    <ComponentPreview title="List With Button"><div className="divide-y">{[{ label: "Inbox", count: "12", icon: IconInbox }, { label: "Sent", count: "", icon: IconSend }, { label: "Trash", count: "3", icon: IconTrash }].map((item) => <button key={item.label} type="button" className="flex h-11 w-full items-center gap-3 text-left text-sm hover:text-primary"><item.icon className="size-4 text-muted-foreground" />{item.label}{item.count && <Badge variant="secondary" className="ml-auto">{item.count}</Badge>}</button>)}</div></ComponentPreview>
    <ComponentPreview title="List With Icon"><div className="space-y-4 text-sm">{["Organize the shared workspace", "Keep project owners informed", "Document decisions as you go"].map((item) => <div key={item} className="flex items-start gap-3"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"><IconCheck className="size-3.5" /></span><span>{item}</span></div>)}</div></ComponentPreview>
    <ComponentPreview title="List With Checkbox"><div className="space-y-4">{tasks.map((task) => <label key={task} className="flex cursor-pointer items-center gap-3 text-sm"><Checkbox checked={completed.includes(task)} onCheckedChange={(checked) => setCompleted((current) => checked ? [...current, task] : current.filter((item) => item !== task))} /><span className={completed.includes(task) ? "text-muted-foreground line-through" : ""}>{task}</span></label>)}</div></ComponentPreview>
    <ComponentPreview title="Horizontal List" className="xl:col-span-2"><div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">{["Overview", "Activity", "Members", "Reports", "Settings"].map((item, index) => <button key={item} type="button" className={`inline-flex items-center gap-2 ${index === 0 ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}>{item}{index === 4 && <IconArrowRight className="size-3.5" />}</button>)}</div><div className="mt-5"><Button variant="outline" size="sm">Add another item</Button></div></ComponentPreview>
    <ComponentPreview title="List with Radio"><RadioGroup defaultValue="weekly" className="space-y-4">{[{ value: "daily", title: "Daily summary", detail: "A short update every morning" }, { value: "weekly", title: "Weekly digest", detail: "One summary each Monday" }, { value: "never", title: "No email updates", detail: "Manage updates in your inbox" }].map((item) => <Label key={item.value} htmlFor={`list-radio-${item.value}`} className="flex cursor-pointer items-start gap-3"><RadioGroupItem id={`list-radio-${item.value}`} value={item.value} /><span><span className="block text-sm font-medium">{item.title}</span><span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span></span></Label>)}</RadioGroup></ComponentPreview>
  </>;
}

export default function ListExamplePage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="List" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2"><ListExamples /></div></div>}</ConsoleLayout>;
}
