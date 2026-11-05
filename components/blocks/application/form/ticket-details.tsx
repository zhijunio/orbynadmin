"use client";

import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import {
  IconBell,
  IconCalendarEvent,
  IconCheck,
  IconCircleCheck,
  IconClock,
  IconFileText,
  IconHash,
  IconInbox,
  IconInfoCircle,
  IconPencil,
  IconPlus,
  IconShieldCheck,
  IconX,
  IconBolt,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { DatePicker } from "@/components/ui/date-picker/date-picker";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type EditableField = "dueDate" | "status" | "sla" | "priority" | "source" | "channel" | "form" | "category" | "tags" | "owners" | "updates";
type FieldValue = string | string[];

const initialValues: Record<EditableField, FieldValue> = {
  dueDate: "2026-04-30",
  status: "open",
  sla: "met",
  priority: "medium",
  source: "portal",
  channel: "identity-access",
  form: "Workspace Access",
  category: "access",
  tags: ["feature", "security"],
  owners: ["mira", "leo"],
  updates: "requester-notified",
};

const choices: Partial<Record<EditableField, readonly (readonly [string, string])[]>> = {
  status: [["open", "Open"], ["in-progress", "In Progress"], ["pending", "Pending"], ["resolved", "Resolved"], ["closed", "Closed"]],
  sla: [["met", "SLA Met"], ["at-risk", "At Risk"], ["breached", "Breached"]],
  priority: [["low", "Low"], ["medium", "Medium"], ["high", "High"], ["urgent", "Urgent"]],
  source: [["portal", "Customer Portal"], ["email", "Email"], ["chat", "Live Chat"], ["api", "API"]],
  category: [["access", "Access Request"], ["billing", "Billing"], ["bug", "Bug Report"], ["feature", "Feature Request"]],
  updates: [["requester-notified", "Requester notified"], ["internal-only", "Internal only"], ["no-update", "No update sent"]],
  tags: [["feature", "Feature"], ["security", "Security"], ["billing", "Billing"], ["urgent", "Urgent"]],
  owners: [["mira", "Mira Stone"], ["leo", "Leo Grant"], ["ari", "Ari Bennett"]],
};

const ownerNames: Record<string, string> = { mira: "Mira Stone", leo: "Leo Grant", ari: "Ari Bennett" };

function SelectEditor({ field, value, onChange }: { field: EditableField; value: string; onChange: (value: string) => void }) {
  const options = choices[field] ?? [];
  return <Select value={value} onValueChange={onChange}><SelectTrigger aria-label={`Edit ${field}`} className="h-8 w-full max-w-56"><SelectValue /></SelectTrigger><SelectContent>{options.map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}</SelectContent></Select>;
}

function InfoTip({ label, children }: { label: string; children: string }) {
  return <Tooltip><TooltipTrigger aria-label={`${label} info`} className="text-muted-foreground"><IconInfoCircle className="size-3.5" /></TooltipTrigger><TooltipContent>{children}</TooltipContent></Tooltip>;
}

export function TicketDetails() {
  const [values, setValues] = useState(initialValues);
  const [draft, setDraft] = useState<FieldValue>("");
  const [editing, setEditing] = useState<EditableField | null>(null);
  const [notice, setNotice] = useState("");

  const beginEdit = (field: EditableField) => {
    setDraft(values[field]);
    setEditing(field);
    setNotice("");
  };

  const saveEdit = (field: EditableField) => {
    setValues((current) => ({ ...current, [field]: draft }));
    setEditing(null);
    setNotice(`${fieldLabels[field]} updated.`);
  };

  const cancelEdit = (field: EditableField) => {
    setDraft(values[field]);
    setEditing(null);
  };

  const display = (field: EditableField) => {
    const value = values[field];
    if (field === "dueDate") {
      const [year, month, day] = String(value).split("-").map(Number);
      return new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    if (field === "tags") return <div className="flex flex-wrap gap-1.5">{(value as string[]).map((tag) => <Badge key={tag} variant={tag === "security" ? "success-light" : "secondary"} size="sm">{choices.tags?.find(([key]) => key === tag)?.[1]}</Badge>)}</div>;
    if (field === "owners") return <div className="flex flex-wrap gap-1.5">{(value as string[]).map((owner) => <span key={owner} className="inline-flex items-center gap-1 rounded-md border px-1 py-0.5 text-xs"><Avatar size="xs" className="size-4"><AvatarImage src={demoAvatarUrl(ownerNames[owner])} alt="" /><AvatarFallback>{ownerNames[owner]?.split(" ").map((name) => name[0]).join("")}</AvatarFallback></Avatar>{ownerNames[owner]}</span>)}</div>;
    const label = choices[field]?.find(([key]) => key === value)?.[1] ?? String(value);
    if (field === "status") return <Badge variant="primary-outline" size="sm" className="gap-1"><span className="size-2 rounded-full bg-primary" />{label}</Badge>;
    if (field === "sla") return <Badge variant="success-light" size="sm"><IconShieldCheck />{label}</Badge>;
    if (field === "priority") return <span className="inline-flex items-center gap-2"><IconBolt className="size-4 text-muted-foreground" />{label}</span>;
    if (field === "source") return <span className="inline-flex items-center gap-2"><IconInbox className="size-4 text-muted-foreground" />{label}</span>;
    if (field === "channel") return <span className="inline-flex items-center gap-2"><IconHash className="size-4 text-muted-foreground" />{label}</span>;
    if (field === "form") return <span className="inline-flex items-center gap-2"><IconFileText className="size-4 text-muted-foreground" />{label}</span>;
    if (field === "updates") return <span className="inline-flex items-center gap-2"><IconBell className="size-4 text-muted-foreground" />{label}</span>;
    return label;
  };

  const editControl = (field: EditableField) => {
    if (field === "dueDate") {
      const [year, month, day] = String(draft).split("-").map(Number);
      const date = new CalendarDate(year, month, day);
      return <DatePicker value={date} onChange={(next) => setDraft(next ? `${next.year}-${String(next.month).padStart(2, "0")}-${String(next.day).padStart(2, "0")}` : "")} aria-label="Due Date" />;
    }
    if (field === "channel" || field === "form") return <Input aria-label={`Edit ${fieldLabels[field]}`} value={String(draft)} onChange={(event) => setDraft(event.target.value)} className="h-8 max-w-56" />;
    if (field === "tags" || field === "owners") {
      const selected = draft as string[];
      return <div className="flex flex-wrap gap-x-3 gap-y-2">{(choices[field] ?? []).map(([key, label]) => <label key={key} className="inline-flex items-center gap-1.5 text-xs"><Checkbox checked={selected.includes(key)} onCheckedChange={(checked) => setDraft(checked ? [...selected, key] : selected.filter((item) => item !== key))} />{label}</label>)}</div>;
    }
    return <SelectEditor field={field} value={String(draft)} onChange={setDraft} />;
  };

  const row = (field: EditableField, label: string, info?: string) => <div key={field} className="group grid min-h-[45px] grid-cols-[minmax(0,34%)_minmax(0,1fr)] items-center gap-2 border-b px-4 py-2 last:border-b-0 sm:grid-cols-[minmax(0,31%)_minmax(0,1fr)]">
    <div className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">{label}{info && <InfoTip label={label}>{info}</InfoTip>}</div>
    <div className="min-w-0">
      {editing === field ? <div className="flex min-w-0 flex-wrap items-center gap-2">{editControl(field)}<Button size="icon-xs" aria-label={`Discard ${label}`} variant="ghost" onClick={() => cancelEdit(field)}><IconX /></Button><Button size="icon-xs" aria-label={`Save ${label}`} variant="ghost" className="text-primary" onClick={() => saveEdit(field)}><IconCheck /></Button></div> : <div className="flex min-w-0 items-center justify-between gap-2"><div className="min-w-0 truncate text-sm font-medium text-foreground">{field === "dueDate" ? <span className="inline-flex items-center gap-2"><IconCalendarEvent className="size-4 text-muted-foreground" />{display(field)}</span> : display(field)}</div><Button aria-label={`Edit ${label}`} size="icon-xs" variant="ghost" className="size-7 shrink-0 opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100" onClick={() => beginEdit(field)}><IconPencil className="size-3.5" /></Button></div>}
    </div>
  </div>;

  return <TooltipProvider delayDuration={0}><Card className="mx-auto w-full max-w-lg gap-0 overflow-hidden py-0 shadow-none">
    <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 py-2.5">
      <div><CardTitle className="text-sm">Ticket Details</CardTitle><p className="mt-0.5 text-sm text-muted-foreground">Operational fields for triage.</p></div>
      <Button variant="outline" size="sm" onClick={() => setNotice("Note composer opened. Add a private update for the support timeline.")}><IconPlus />Add note</Button>
    </CardHeader>
    <CardContent className="px-1 py-1">
      <div className="overflow-hidden rounded-lg border">
        {row("dueDate", "Due Date", "Target date for resolving this ticket.")}
        {row("status", "Status")}
        {row("sla", "SLA", "Service-level agreement status for this ticket.")}
        {row("priority", "Priority")}
        {row("source", "Source")}
        {row("channel", "Channel")}
        {row("form", "Form")}
        {row("category", "Category")}
        {row("tags", "Tags")}
        {row("owners", "Owners")}
        {row("updates", "Updates")}
        <div className="grid min-h-[45px] grid-cols-[minmax(0,34%)_minmax(0,1fr)] items-center gap-2 border-b px-4 py-2 sm:grid-cols-[minmax(0,31%)_minmax(0,1fr)]"><span className="text-sm text-muted-foreground">Created</span><span className="inline-flex items-center gap-2 text-sm font-medium"><IconClock className="size-4 text-muted-foreground" />Jan 21, 2026 at 10:16 PM</span></div>
        <div className="grid min-h-[45px] grid-cols-[minmax(0,34%)_minmax(0,1fr)] items-center gap-2 px-4 py-2 sm:grid-cols-[minmax(0,31%)_minmax(0,1fr)]"><span className="text-sm text-muted-foreground">Updated</span><span className="inline-flex items-center gap-2 text-sm font-medium"><IconCircleCheck className="size-4 text-muted-foreground" />Just now</span></div>
      </div>
    </CardContent>
    {notice && <p role="status" className="px-4 pb-2 text-xs text-muted-foreground">{notice}</p>}
  </Card></TooltipProvider>;
}

const fieldLabels: Record<EditableField, string> = { dueDate: "Due Date", status: "Status", sla: "SLA", priority: "Priority", source: "Source", channel: "Channel", form: "Form", category: "Category", tags: "Tags", owners: "Owners", updates: "Updates" };
