"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";

const notificationGroups = {
  Projects: [{ title: "Task activity", rows: ["Task assigned to you", "Due date approaching", "Status changed", "Mentioned in a comment", "File attachment added"] }, { title: "Project updates", rows: ["Milestone completed", "Sprint ended", "New member added to project", "Project archived"] }],
  Messages: [{ title: "Direct messages", rows: ["New direct message", "Reaction to your message", "Thread reply"] }, { title: "Channel activity", rows: ["Mentioned in channel", "Added to a channel", "New announcement posted"] }],
  Reports: [{ title: "Scheduled reports", rows: ["Weekly activity summary", "Monthly performance report", "Usage statistics digest"] }],
  System: [{ title: "Account activity", rows: ["New device login", "Password changed", "API key created or revoked", "Billing and invoice updates"] }, { title: "Service updates", rows: ["Scheduled maintenance", "Incident notifications", "Product changelog"] }],
};
const notificationChannels = ["Email", "Slack", "In-app"] as const;

export function NotificationChannels() {
  const allRows = Object.values(notificationGroups).flatMap((sections) => sections.flatMap((section) => section.rows));
  const initialChecked = Object.fromEntries(allRows.flatMap((row, rowIndex) => notificationChannels.map((channel, channelIndex) => [`${row}:${channel}`, (rowIndex + channelIndex) % 3 !== 1])));
  const [checked, setChecked] = useState<Record<string, boolean>>(initialChecked);
  return <Tabs defaultValue="Projects" className="w-full"><TabsList variant="line" className="mb-3 w-full justify-start">{Object.keys(notificationGroups).map((group) => <TabsTrigger key={group} value={group} className="flex-none px-4">{group}</TabsTrigger>)}</TabsList>{Object.entries(notificationGroups).map(([group, sections]) => <TabsContent key={group} value={group} className="min-w-0 space-y-4">{sections.map((section) => <div key={section.title} className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead className="min-w-48">{section.title}</TableHead>{notificationChannels.map((channel) => <TableHead key={channel} className="text-center">{channel}</TableHead>)}</TableRow></TableHeader><TableBody>{section.rows.map((row) => <TableRow key={row}><TableCell className="font-medium">{row}</TableCell>{notificationChannels.map((channel) => { const key = `${row}:${channel}`; return <TableCell key={channel} className="text-center"><Checkbox aria-label={`${row} via ${channel}`} checked={checked[key]} onCheckedChange={(value) => setChecked((all) => ({ ...all, [key]: value === true }))} /></TableCell>; })}</TableRow>)}</TableBody></Table></div>)}</TabsContent>)}</Tabs>;
}

