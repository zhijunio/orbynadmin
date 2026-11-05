"use client";

import type { ReactNode } from "react";
import {
  IconActivity, IconArrowUpRight, IconCalendar, IconCheck,
  IconChevronDown, IconDotsVertical, IconDownload,
  IconMessage, IconPaperclip, IconReceipt, IconTarget, IconUsers,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { ButtonGroup } from "@/components/ui/button/button-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Progress } from "@/components/ui/progress/progress";
import { Rating } from "@/components/ui/rating/rating";
import { ScrollArea } from "@/components/ui/scroll-area/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet/sheet";
import { Spinner } from "@/components/ui/spinner/spinner";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle } from "@/components/ui/timeline/timeline";
import { demoAvatarUrl } from "@/utils/demo-avatar";
import { cn } from "@/utils/cn";

const examples = [
  { title: "Customer Activation", component: <CustomerActivation /> },
  { title: "Account Rollout", component: <AccountRollout /> },
  { title: "Finance Activity", component: <FinanceActivity /> },
  { title: "Team Activity Feed", component: <TeamActivityFeed /> },
  { title: "Release Changelog", component: <ReleaseChangelog /> },
  { title: "Activity Dropdown", component: <ActivityDropdown /> },
  { title: "Team Activity Sheet", component: <TeamActivitySheet /> },
  { title: "Finance Activity Sheet", component: <FinanceActivitySheet /> },
  { title: "Approval Workflow", wide: true, component: <ApprovalWorkflow /> },
];
const featuredExampleTitles = new Set(["Customer Activation", "Team Activity Feed", "Release Changelog", "Activity Dropdown", "Approval Workflow"]);

export function TimelineShowcase() {
  return <main className="mx-auto w-full max-w-7xl space-y-6 pb-8">
    <h1 className="text-2xl font-semibold tracking-tight">Timeline</h1>
    <div className="grid min-w-0 gap-5 md:grid-cols-2">
      {examples.filter(({ title }) => featuredExampleTitles.has(title)).map(({ title, wide, component }) => <ComponentPreview key={title} title={title} className={wide ? "md:col-span-2" : undefined} previewClassName="w-full">{component}</ComponentPreview>)}
    </div>
  </main>;
}

type Person = { name: string; initials: string };
const people: Person[] = [
  { name: "Maya Brooks", initials: "MB" }, { name: "Nina Patel", initials: "NP" },
  { name: "Leah Stone", initials: "LS" }, { name: "Theo Grant", initials: "TG" },
  { name: "Nadia Flores", initials: "NF" }, { name: "Marcus Bell", initials: "MB" },
  { name: "Amara Okafor", initials: "AO" }, { name: "Dara Kim", initials: "DK" },
  { name: "Nora Patel", initials: "NP" }, { name: "Sam Lee", initials: "SL" },
];

function PersonAvatar({ person, size = "sm" }: { person: Person; size?: "xs" | "sm" | "default" }) {
  return <Avatar size={size} aria-label={person.name}><AvatarImage src={demoAvatarUrl(person.name)} alt={person.name} /><AvatarFallback>{person.initials}</AvatarFallback></Avatar>;
}

function Attachment({ name, size }: { name: string; size: string }) {
  return <ButtonGroup aria-label={`${name} attachment`} className="h-7 overflow-hidden rounded-md border">
    <Button size="xs" variant="ghost" className="h-7 min-w-0 gap-1.5 rounded-none px-2"><IconPaperclip />{name}<span className="text-muted-foreground">({size})</span></Button>
    <Button size="icon-xs" variant="ghost" aria-label={`Download ${name}`} className="h-7 rounded-none border-l"><IconDownload /></Button>
  </ButtonGroup>;
}

function RatingStars({ rating }: { rating: number }) {
  return <Rating rating={rating} size="sm" aria-label={`Rating ${rating} out of 5`} className="gap-0.5 text-amber-500 [&_svg]:fill-current [&_svg]:stroke-current" />;
}

function StatusBadge({ children, color = "secondary" }: { children: ReactNode; color?: "success" | "warning" | "destructive" | "info" | "primary-light" | "secondary" }) {
  return <Badge variant={color} size="sm" className="gap-1"><span className="size-1.5 rounded-full bg-current" />{children}</Badge>;
}

const activationSteps = [
  { title: "Contract Signed", owner: "Maya Brooks / Revenue Operations", status: "Complete", priority: "High", details: "Commercial terms and launch scope are confirmed.", due: "May 08", open: false },
  { title: "Workspace Provisioning", owner: "Nina Patel / Implementation Lead", status: "Pending", priority: "Medium", details: "SCIM groups are being matched to launch roles before the first admin invites go out.", due: "Today", open: true },
  { title: "Launch Readiness", owner: "Leah Stone / Account Executive", status: "Upcoming", priority: "Low", details: "Validate the workspace with the customer team before handoff.", due: "May 12", open: false },
];

function CustomerActivation() {
  return <div className="w-full py-2"><div className="mb-4"><h3 className="font-semibold">Activation Timeline</h3><p className="text-sm text-muted-foreground">Track onboarding milestones.</p></div>
    <Timeline value={2} className="list-none p-0">
      {activationSteps.map((step, index) => <TimelineItem key={step.title} step={index + 1} className="pb-5 last:pb-0">
        <TimelineHeader><TimelineSeparator /><TimelineIndicator>{index === 1 ? <Spinner className="size-3" /> : undefined}</TimelineIndicator><TimelineTitle>{step.title}</TimelineTitle></TimelineHeader>
        <Collapsible defaultOpen={step.open} className="mt-1 overflow-hidden rounded-xl border bg-card shadow-xs">
          <CollapsibleTrigger className="flex h-10 w-full items-center gap-2 px-3 text-left text-sm text-muted-foreground hover:bg-muted/50"><PersonAvatar person={people[index]} size="xs" /><span className="truncate">{step.owner}</span><IconChevronDown className="ml-auto size-4 shrink-0 transition-transform data-[state=open]:rotate-180" /></CollapsibleTrigger>
          <CollapsibleContent className="border-t px-3 py-3"><div className="flex flex-wrap gap-1.5"><StatusBadge color={step.priority === "High" ? "destructive" : "primary-light"}>{step.priority}</StatusBadge><StatusBadge color={step.status === "Complete" ? "success" : "warning"}>{step.status}</StatusBadge><Badge variant="outline" size="sm"><IconTarget />Identity Setup</Badge></div><h4 className="mt-3 text-sm font-medium">{index === 1 ? "Admin Group Mapping" : step.title}</h4><p className="mt-1 text-xs leading-5 text-muted-foreground">{step.details}</p><div className="mt-3 flex items-center border-t pt-3 text-xs text-muted-foreground"><AvatarGroup><PersonAvatar person={people[1]} size="xs" /><PersonAvatar person={people[2]} size="xs" /><AvatarGroupCount>+2</AvatarGroupCount></AvatarGroup><span className="ml-auto inline-flex items-center gap-1"><IconMessage className="size-3.5" />3</span><span className="ml-3 inline-flex items-center gap-1"><IconCalendar className="size-3.5" />{step.due}</span></div></CollapsibleContent>
        </Collapsible>
      </TimelineItem>)}
    </Timeline>
  </div>;
}

const rollout = [
  { date: "MAY 06, 2026", title: "Completed Renewal Workspace Handoff", description: "Success plan, contract notes, and expansion risks are ready for the account team.", file: "Handoff.pdf", size: "1.8 MB", rating: 4.8, owner: "Maya Brooks", tag: "Done", risk: "Healthy", dot: "bg-emerald-500" },
  { date: "MAY 02, 2026", title: "Verified SSO And SCIM Sync", description: "Directory groups match workspace roles before admin invitations are released.", file: "SSO-map.csv", size: "84 KB", owner: "Nina Patel", tag: "Auth", risk: "Low Risk", dot: "bg-blue-500" },
  { date: "APR 28, 2026", title: "Approved Usage-Based Billing Limits", description: "Finance confirmed seat buffers and usage caps for the renewal workspace.", owner: "Theo Grant", tag: "Limit", risk: "125% Cap", dot: "bg-violet-500" },
  { date: "APR 22, 2026", title: "Imported Production Customer Records", description: "Customer contacts, renewal dates, and usage snapshots cleared validation.", file: "Import-log.txt", size: "26 KB", owner: "Leah Stone", tag: "Data", risk: "18.4k Rows", dot: "bg-fuchsia-500" },
];

function AccountRollout() {
  return <Timeline value={0} className="list-none py-2">
    {rollout.map((item, index) => <TimelineItem key={item.title} step={index + 1} className="pb-5 last:pb-0">
      <TimelineHeader><TimelineSeparator className="bg-border group-data-completed/timeline-item:bg-border" /><TimelineIndicator className={`border-0 text-white ${item.dot}`}><span className="size-1.5 rounded-full bg-white" /></TimelineIndicator><TimelineDate className="font-medium uppercase tracking-wide">{item.date}</TimelineDate><TimelineTitle className="font-normal">{item.title}</TimelineTitle></TimelineHeader>
      <TimelineContent className="mt-1 space-y-2">{item.description}{item.file && <Attachment name={item.file} size={item.size!} />}{item.rating && <div className="flex items-center gap-1.5"><RatingStars rating={item.rating} /><span className="text-xs">{item.rating}</span></div>}<div className="flex flex-wrap items-center gap-1.5"><span>{item.owner}</span><StatusBadge color={index === 0 ? "success" : "primary-light"}>{item.tag}</StatusBadge><StatusBadge color={index === 3 ? "warning" : "secondary"}>{item.risk}</StatusBadge></div></TimelineContent>
    </TimelineItem>)}
  </Timeline>;
}

const financeEvents = [
  { person: people[4], action: "approved payout batch", key: "ACH-4182", detail: "$142,800 routed to 38 merchant accounts", time: "5 minutes ago", tags: ["Payout", "Same Day"] },
  { person: people[3], action: "flagged review on Transfer", key: "TX-9041", detail: "Velocity threshold exceeded for new payee", time: "18 minutes ago", tags: ["Risk", "High"], actions: true },
  { person: people[8], action: "reconciled ledger entry", key: "LDG-7749", detail: "Subscription invoice matched to bank settlement", time: "42 minutes ago", tags: ["Ledger"], attachment: "settlement-match.csv" },
  { person: people[5], action: "raised limit for Northstar Workspace", detail: "Monthly card volume increased to $850K", time: "1 hour ago", tags: ["Limit Raised"], group: true },
  { person: people[6], action: "sent invoice reminder", key: "INV-2098", detail: "Net 7 renewal balance due tomorrow", time: "2 hours ago", tags: ["Invoice", "Due Tomorrow"], attachment: "invoice-2098.pdf" },
];

function FinanceActivity({ compact = false }: { compact?: boolean }) {
  return <div className="w-full py-2">{!compact && <><h3 className="font-semibold">Finance Activity</h3><p className="mb-4 text-sm text-muted-foreground">Payouts, risk, invoices, and ledger updates.</p></>}<Timeline value={0} className="list-none p-0">
    {financeEvents.map((event, index) => <TimelineItem key={`${event.action}-${event.key}`} step={index + 1} className="pb-4 last:pb-0"><TimelineHeader><TimelineSeparator /><TimelineIndicator className="-left-[2.05rem] size-7 overflow-hidden border-0 bg-muted p-0"><PersonAvatar person={event.person} size="sm" /></TimelineIndicator><TimelineTitle className="font-normal"><strong className="font-medium text-foreground">{event.person.name}</strong> <span className="text-muted-foreground">{event.action}</span> {event.key && <span className="font-medium text-foreground underline underline-offset-2">{event.key}</span>}</TimelineTitle></TimelineHeader>
      <TimelineContent className="space-y-1.5"><p>{event.detail}</p>{event.attachment && <Attachment name={event.attachment} size={index === 2 ? "48kb" : "76kb"} />}{event.group && <AvatarGroup><PersonAvatar person={people[4]} size="xs" /><PersonAvatar person={people[1]} size="xs" /><AvatarGroupCount>+2</AvatarGroupCount></AvatarGroup>}{event.actions && <div className="flex gap-2"><Button size="xs">Review</Button><Button size="xs" variant="outline">Clear</Button></div>}<div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"><span>{event.time}</span>{event.tags.map((tag, tagIndex) => <StatusBadge key={tag} color={tag.includes("Tomorrow") || tag === "High" ? "destructive" : tagIndex === 0 ? "secondary" : "success"}>{tag}</StatusBadge>)}</div></TimelineContent>
    </TimelineItem>)}
  </Timeline></div>;
}

const teamEvents = [
  { person: people[7], action: "shared", subject: "Launch Timeline", detail: "Uploaded the launch packet with milestone dates and planning files.", time: "2 min ago", tags: ["Files 2"], files: ["timeline.pdf", "scope-notes.csv"], rating: 4 },
  { person: { name: "Product Operations", initials: "PO" }, action: "scheduled", subject: "Roadmap Review", detail: "Confirmed the roadmap review agenda with product, design, and engineering leads.", time: "23 min ago", tags: ["Room Huddle"], meeting: true },
  { person: people[8], action: "mentioned you in", subject: "Partner Campaign", detail: "@Alex, can you update the partner guidelines?", time: "1 hour ago", tags: ["Thread Open"], comment: true },
  { person: { name: "Task Management", initials: "TM" }, action: "assigned you", subject: "Update Project Specs", detail: "Added a task to revise project specs, acceptance criteria, and delivery notes.", time: "1 day ago", tags: ["Due Tomorrow"] },
  { person: { name: "Engineering Team", initials: "ET" }, action: "started sprint", subject: "Backend Optimization", detail: "Opened API latency sprint work with schema cleanup and queue tuning.", time: "2 days ago", tags: ["Focus API"], progress: 68 },
];

function EventMenu() {
  return <DropdownMenu><DropdownMenuTrigger asChild><Button size="icon-xs" variant="ghost" aria-label="Activity options"><IconDotsVertical /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>View activity</DropdownMenuItem><DropdownMenuItem>Copy link</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
}

function TeamActivityFeed() {
  return <Timeline value={2} className="list-none py-2">
    {teamEvents.map((event, index) => <TimelineItem key={event.subject} step={index + 1} className="pb-5 last:pb-0"><TimelineHeader><TimelineSeparator /><TimelineIndicator className={index === 0 || index === 2 ? "-left-[2.05rem] size-7 overflow-hidden border-0 bg-muted p-0" : undefined}>{index === 0 || index === 2 ? <PersonAvatar person={event.person} size="sm" /> : index === 1 ? <span className="size-1.5 rounded-full bg-foreground" /> : undefined}</TimelineIndicator><TimelineTitle className="flex items-start justify-between gap-2 font-normal"><span><strong className="font-medium">{event.person.name}</strong> <span className="text-muted-foreground">{event.action}</span> <strong className="font-medium">{event.subject}</strong></span><EventMenu /></TimelineTitle></TimelineHeader>
      <TimelineContent className="space-y-2">{!event.comment && <p>{event.detail}</p>}{event.files && <div className="flex flex-wrap gap-1.5">{event.files.map((file) => <Attachment key={file} name={file} size={file.endsWith("pdf") ? "2 MB" : "9 KB"} />)}</div>}{event.meeting && <div className="flex items-center gap-2"><AvatarGroup><PersonAvatar person={people[4]} size="xs" /><PersonAvatar person={people[1]} size="xs" /><AvatarGroupCount>+2</AvatarGroupCount></AvatarGroup><Badge variant="outline" size="sm"><IconCalendar />Today 10:00 - 11:00 AM</Badge></div>}{event.comment && <div className="flex items-center gap-2 rounded-lg border p-2 text-xs"><IconMessage className="size-4" />{event.detail}<Button size="xs" variant="ghost" className="ml-auto">View</Button></div>}{event.progress && <div className="max-w-64"><div className="flex gap-1.5"><StatusBadge color="warning">3 Tasks In Progress</StatusBadge><Badge variant="outline" size="sm">Sprint 18</Badge></div><Progress value={event.progress} className="mt-2" /></div>}<div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"><span>{event.time}</span>{event.tags.map((tag) => <StatusBadge key={tag} color={tag.includes("Tomorrow") ? "destructive" : "primary-light"}>{tag}</StatusBadge>)}{event.rating && <RatingStars rating={event.rating} />}</div></TimelineContent>
    </TimelineItem>)}
  </Timeline>;
}

const releases = [
  { month: "May 2025", version: "v2.5 Release Channels", description: "Create staged release channels for beta teams, enterprise accounts, and internal QA cohorts.", tags: ["New", "Team Rollout", "Channel Permissions", "Scheduled Publishing"] },
  { month: "Apr 2025", version: "v2.4 AI Assist", description: "Added workspace summaries, prompt presets, and faster review suggestions.", tags: ["New", "Faster Reviews", "Prompt Library", "Review Summaries"] },
  { month: "Mar 2025", version: "v2.3 Theme Studio", description: "Introduced token previews, component states, and one-click CSS exports.", tags: ["Improved", "Design Systems", "Token Previews", "CSS Export"] },
  { month: "Feb 2025", version: "v2.2 Live Editing", description: "Improved shared cursors, presence labels, and conflict-safe draft recovery.", tags: ["Improved", "Collaboration", "Presence Labels", "Draft Recovery"] },
];

function ReleaseChangelog() {
  return <div className="w-full py-2"><h3 className="font-semibold">Release Changelog</h3><p className="mb-4 text-sm text-muted-foreground">Recent releases, fixes, and platform updates.</p><Timeline value={0} className="list-none p-0">
    {releases.map((release, index) => <TimelineItem key={release.version} step={index + 1} className="pb-5 last:pb-0"><TimelineHeader><TimelineSeparator className="bg-border" /><TimelineIndicator className="-left-[2.05rem] size-4 border-2 border-border bg-card"><span className="size-2 rounded-full bg-card" /></TimelineIndicator><TimelineDate>{release.month}</TimelineDate><TimelineTitle className="font-normal">{release.version}</TimelineTitle></TimelineHeader><TimelineContent className="mt-1 space-y-2"><p>{release.description}</p><div className="flex flex-wrap gap-1.5">{release.tags.map((tag) => <Badge key={tag} variant={tag === "New" ? "secondary" : tag.includes("Channel") || tag.includes("Prompt") || tag.includes("Token") || tag.includes("Draft") ? "primary-light" : "outline"} size="sm">{tag}</Badge>)}</div></TimelineContent></TimelineItem>)}
  </Timeline></div>;
}

function ActivityDropdown() {
  return <DropdownMenu defaultOpen><DropdownMenuTrigger asChild><Button variant="outline" size="sm"><IconActivity />Open timeline</Button></DropdownMenuTrigger><DropdownMenuContent align="start" side="bottom" className="w-[22rem] p-0" onCloseAutoFocus={(event) => event.preventDefault()}><div className="flex h-12 items-center gap-2 border-b px-4 text-sm font-medium">Account Rollout<Badge variant="secondary" size="sm" className="rounded-full">10</Badge><IconCheck className="ml-auto size-4 text-muted-foreground" /></div><ScrollArea className="h-[30rem] px-3"><AccountRollout /></ScrollArea></DropdownMenuContent></DropdownMenu>;
}

function SheetActivity({ finance = false }: { finance?: boolean }) {
  return <ScrollArea className="h-full px-5"><div className="py-4">{finance ? <FinanceActivity compact /> : <TeamActivityFeed />}</div></ScrollArea>;
}

function TeamActivitySheet() {
  return <Sheet><SheetTrigger asChild><Button variant="outline" size="sm"><IconUsers />Open team activity</Button></SheetTrigger><SheetContent side="right" className="w-[min(32rem,calc(100vw-1rem))] max-w-none gap-0 p-0"><SheetHeader className="h-14 flex-row items-center border-b px-5"><SheetTitle>Team Activity <Badge variant="secondary" size="sm" className="rounded-full">12</Badge></SheetTitle></SheetHeader><SheetActivity /></SheetContent></Sheet>;
}

function FinanceActivitySheet() {
  return <Sheet><SheetTrigger asChild><Button variant="outline" size="sm"><IconReceipt />Open finance activity</Button></SheetTrigger><SheetContent side="right" className="w-[min(32rem,calc(100vw-1rem))] max-w-none gap-0 p-0"><SheetHeader className="h-14 flex-row items-center border-b px-5"><SheetTitle>Finance Activity <Badge variant="secondary" size="sm" className="rounded-full">12</Badge></SheetTitle></SheetHeader><SheetActivity finance /></SheetContent></Sheet>;
}

const workflow = [
  { time: "09:00", tag: "Intake", title: "Trigger Captured", detail: "Customer, urgency, and routing fields arrived cleanly.", file: "intake.json", rating: 4.8, owner: people[9] },
  { time: "09:14", tag: "Enrichment", title: "Records Matched", detail: "CRM and billing records attached before risk review.", file: "crm-match.csv", rating: 4.9, owner: people[1] },
  { time: "09:32", tag: "Review", title: "Policy Approved", detail: "Account checks cleared with no exceptions.", file: "policy.pdf", rating: 4.7, owner: people[4] },
  { time: "09:48", tag: "Notice", title: "Customer Updated", detail: "The account owner received the next steps.", file: "notice.txt", rating: 5, owner: people[6] },
];

function ApprovalWorkflow() {
  return <div className="w-full overflow-x-auto py-2"><div className="mb-5"><h3 className="font-semibold">Approval Workflow Timeline</h3><p className="text-sm text-muted-foreground">Process state from intake to customer notice.</p></div><Timeline orientation="horizontal" value={2} className="min-w-[54rem] list-none p-0">
    {workflow.map((step, index) => <TimelineItem key={step.tag} step={index + 1} className="min-h-56 px-3 pt-4 first:ml-3"><TimelineHeader><TimelineSeparator className="-top-[1.625rem] left-4 h-0.5 w-[calc(100%+1.5rem)] bg-border group-data-completed/timeline-item:bg-primary" /><TimelineIndicator className={cn("-top-[2.08rem] left-0 size-6 border-0", index < 2 ? "bg-primary text-primary-foreground" : "border-primary/20 bg-transparent")}>{index < 2 ? <IconCheck /> : undefined}</TimelineIndicator><TimelineDate>{step.time}</TimelineDate><Badge variant={index < 2 ? "primary-light" : "outline"} size="sm">{step.tag}</Badge><TimelineTitle className="mt-1 font-normal">{step.title}</TimelineTitle></TimelineHeader><TimelineContent className="mt-2 space-y-2"><Attachment name={step.file} size="24 KB" /><div className="flex items-center gap-2"><RatingStars rating={step.rating} /><span className="text-xs">{step.rating}</span><Button size="xs" variant="outline"><IconArrowUpRight />{index < 2 ? "Open" : "Review"}</Button></div><p>{step.detail}</p><div className="flex items-center gap-2 text-xs"><PersonAvatar person={step.owner} size="xs" />{step.owner.name}</div></TimelineContent></TimelineItem>)}
  </Timeline></div>;
}
