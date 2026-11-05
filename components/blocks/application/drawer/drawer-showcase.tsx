"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  IconActivity, IconArrowDown, IconArrowRight, IconCheck, IconCopy,
  IconExternalLink, IconMessage, IconPlus, IconRefresh, IconSearch,
  IconSend, IconShieldCheck,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Progress } from "@/components/ui/progress/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import { Textarea } from "@/components/ui/textarea/textarea";
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet/sheet";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Kind =
  | "project" | "help" | "shortcuts" | "model-chat" | "comments" | "customizer"
  | "notifications" | "settings" | "ticket" | "copilot" | "metric" | "cron-detail"
  | "cron-create" | "audit" | "rollout" | "deploy" | "firewall-create" | "firewall-edit"
  | "firewall-request" | "slo-detail" | "slo-create" | "connection" | "connect-wizard" | "dataset";

const examples: { number: number; title: string; description: string; kind: Kind }[] = [
  { number: 1, title: "Create Project", description: "Project metadata, ownership, labels and target date.", kind: "project" },
  { number: 2, title: "Help Center", description: "Searchable support guides grouped by topic.", kind: "help" },
  { number: 3, title: "Keyboard Shortcuts", description: "Search shortcuts by action or key chord.", kind: "shortcuts" },
  { number: 4, title: "AI Model Chat", description: "Model picker, prompt suggestions and composer.", kind: "model-chat" },
  { number: 5, title: "Comment Thread", description: "Reply, react, resolve and filter open comments.", kind: "comments" },
  { number: 6, title: "View Customizer", description: "Display toggles and layout choices.", kind: "customizer" },
  { number: 7, title: "Notifications Feed", description: "Unread activity, approvals and mark all as read.", kind: "notifications" },
  { number: 8, title: "Relay Settings", description: "Delivery and routing controls with a pinned footer.", kind: "settings" },
  { number: 9, title: "Ticket Details", description: "Inline record editing and save feedback.", kind: "ticket" },
  { number: 10, title: "Copilot Chat", description: "Conversation history with pinned message composer.", kind: "copilot" },
  { number: 11, title: "Metric Detail", description: "Target progress, owners, alert rule and change history.", kind: "metric" },
  { number: 12, title: "Cron Job Detail", description: "Run history, schedule settings and job controls.", kind: "cron-detail" },
  { number: 13, title: "New Cron Job", description: "Schedule presets, validation and next runs.", kind: "cron-create" },
  { number: 14, title: "Audit Event", description: "Request facts, configuration diff and review state.", kind: "audit" },
  { number: 15, title: "Canary Rollout", description: "Release health, commits, logs and rollout actions.", kind: "rollout" },
  { number: 16, title: "Failed Deploy", description: "Build logs, pipeline tabs and retry action.", kind: "deploy" },
  { number: 17, title: "New Firewall Rule", description: "Condition builder with a live rule preview.", kind: "firewall-create" },
  { number: 18, title: "Edit Firewall Rule", description: "Rule state, sampled traffic and undoable delete.", kind: "firewall-edit" },
  { number: 19, title: "Firewall Request", description: "Request decision trace and network actions.", kind: "firewall-request" },
  { number: 20, title: "SLO Error Budget", description: "Burn windows, alert rules and error budget history.", kind: "slo-detail" },
  { number: 21, title: "New SLO", description: "Objective type, target and rolling window.", kind: "slo-create" },
  { number: 22, title: "Data Connection", description: "Sync health, datasets and connection settings.", kind: "connection" },
  { number: 23, title: "New Connection", description: "Three-step integration setup and connection test.", kind: "connect-wizard" },
  { number: 24, title: "Dataset Preview", description: "Rows, schema, PII masking and column drift.", kind: "dataset" },
];
const featuredExampleKinds = new Set<Kind>(["project", "model-chat", "notifications", "ticket", "cron-create", "rollout", "firewall-create", "dataset"]);

export function DrawerShowcase() {
  return <main className="mx-auto w-full max-w-7xl space-y-6 pb-8">
    <div className="flex flex-wrap items-end justify-between gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Drawer</h1>
      <p className="text-sm text-muted-foreground">8 drawer examples</p>
    </div>
    <div className="grid min-w-0 gap-5 md:grid-cols-2">
      {examples.filter(({ kind }) => featuredExampleKinds.has(kind)).map((example) => <ComponentPreview key={example.number} title={example.title} previewClassName="w-full items-start">
        <div className="space-y-3"><p className="text-sm text-muted-foreground">{example.description}</p><DrawerExample example={example} /></div>
      </ComponentPreview>)}
    </div>
  </main>;
}

function DrawerExample({ example }: { example: (typeof examples)[number] }) {
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Overview");
  const [step, setStep] = useState(1);
  const [enabled, setEnabled] = useState(true);
  const [resolved, setResolved] = useState(false);
  const [unread, setUnread] = useState(3);
  const [maskPii, setMaskPii] = useState(true);
  const [layout, setLayout] = useState("List");

  const note = (text: string) => setNotice(text);
  const filteredGuides = useMemo(() => ["Getting started", "Invite your team", "Import your data", "Configure access", "Billing and plans"].filter((item) => item.toLowerCase().includes(query.toLowerCase())), [query]);
  const filteredShortcuts = useMemo(() => [
    ["Open command menu", "⌘ K"], ["Create a new project", "⌘ ⇧ P"], ["Search workspace", "⌘ /"], ["Go to inbox", "G then I"], ["Show keyboard shortcuts", "?"],
  ].filter(([label, keys]) => `${label} ${keys}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return <>
    <Sheet>
      <SheetTrigger asChild><Button variant="outline" size="sm">Open panel <IconArrowRight /></Button></SheetTrigger>
      <SheetContent side="right" className="data-[side=right]:inset-y-4 data-[side=right]:right-4 data-[side=right]:h-auto data-[side=right]:w-[min(32rem,calc(100vw-2rem))] data-[side=right]:sm:max-w-none max-h-[calc(100svh-2rem)] gap-0 rounded-xl border p-0">
        <SheetHeader className="shrink-0 border-b px-5 py-4 pr-14">
          <div className="flex items-center gap-2"><SheetTitle>{sheetTitle(example.kind)}</SheetTitle>{example.kind === "notifications" && <Badge variant="destructive-light" size="sm">{unread} new</Badge>}</div>
          <SheetDescription>{sheetDescription(example.kind)}</SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <SheetBody kind={example.kind} note={note} query={query} setQuery={setQuery} tab={tab} setTab={setTab} step={step} setStep={setStep} enabled={enabled} setEnabled={setEnabled} resolved={resolved} setResolved={setResolved} unread={unread} setUnread={setUnread} maskPii={maskPii} setMaskPii={setMaskPii} layout={layout} setLayout={setLayout} filteredGuides={filteredGuides} filteredShortcuts={filteredShortcuts} />
        </div>
        <SheetFooter className="shrink-0 flex-row items-center justify-between border-t px-5 py-3">
          <span role="status" className="min-w-0 truncate text-xs text-muted-foreground">{notice}</span>
          <SheetClose asChild><Button variant="outline" size="sm">Close</Button></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>;
}

function sheetTitle(kind: Kind) {
  const titles: Record<Kind, string> = {
    project: "Create project", help: "Help center", shortcuts: "Keyboard shortcuts", "model-chat": "AI assistant", comments: "Project discussion", customizer: "Customize view", notifications: "Notifications", settings: "Relay settings", ticket: "Ticket details", copilot: "Workspace copilot", metric: "Active users", "cron-detail": "Nightly warehouse sync", "cron-create": "Create scheduled job", audit: "Audit event", rollout: "API gateway · v2.8.0", deploy: "Deploy #2481", "firewall-create": "New firewall rule", "firewall-edit": "Rule · Block credential stuffing", "firewall-request": "Request details", "slo-detail": "Checkout availability", "slo-create": "Create service objective", connection: "Warehouse connection", "connect-wizard": "Connect a data source", dataset: "orders_daily",
  };
  return titles[kind];
}

function sheetDescription(kind: Kind) {
  const descriptions: Record<Kind, string> = {
    project: "Add the basics, then choose who and what belongs to this project.", help: "Find an answer or browse the most used guides.", shortcuts: "Search the keyboard commands available in this workspace.", "model-chat": "Ask a question about your workspace data.", comments: "Review the open discussion and reply to your team.", customizer: "Choose which details appear in this view.", notifications: "Updates from projects and services you follow.", settings: "Manage how this relay delivers and routes events.", ticket: "Update the fields attached to this support request.", copilot: "Ask follow-up questions without leaving your work.", metric: "Usage is trending ahead of its monthly target.", "cron-detail": "Schedule, recent runs and execution controls.", "cron-create": "Set a schedule and choose where it should run.", audit: "Review the actor, request and affected resource.", rollout: "Canary release is serving 25% of production traffic.", deploy: "The latest build stopped during integration tests.", "firewall-create": "Define a condition and preview the matching traffic.", "firewall-edit": "Review recent matches before changing this rule.", "firewall-request": "Inspect the request and its security decision.", "slo-detail": "Current burn rate is consuming the error budget.", "slo-create": "Set the reliability target for a service.", connection: "Connection health and linked datasets.", "connect-wizard": "Choose an integration, authenticate and select data.", dataset: "Preview sampled records and review schema changes.",
  };
  return descriptions[kind];
}

type BodyProps = {
  kind: Kind; note: (text: string) => void; query: string; setQuery: (value: string) => void;
  tab: string; setTab: (value: string) => void; step: number; setStep: (value: number) => void;
  enabled: boolean; setEnabled: (value: boolean) => void; resolved: boolean; setResolved: (value: boolean) => void;
  unread: number; setUnread: (value: number) => void; maskPii: boolean; setMaskPii: (value: boolean) => void;
  layout: string; setLayout: (value: string) => void; filteredGuides: string[]; filteredShortcuts: string[][];
};

function SheetBody(props: BodyProps) {
  const { kind, note, query, setQuery, tab, setTab, step, setStep, enabled, setEnabled, resolved, setResolved, unread, setUnread, maskPii, setMaskPii, layout, setLayout, filteredGuides, filteredShortcuts } = props;
  const [created, setCreated] = useState(false);
  const [message, setMessage] = useState("");
  const [reactions, setReactions] = useState(12);
  const [muted, setMuted] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);
  const [eventIndex, setEventIndex] = useState(1);
  const [extraCondition, setExtraCondition] = useState(false);
  const action = (label: string, result = `${label} complete`) => <Button size="sm" onClick={() => note(result)}>{label}</Button>;
  const secondary = (label: string, result = `${label} complete`) => <Button variant="outline" size="sm" onClick={() => note(result)}>{label}</Button>;

  useEffect(() => {
    if (kind !== "audit" && kind !== "deploy" && kind !== "firewall-request") return;
    const handleKey = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((event.target as HTMLElement).tagName)) return;
      if (event.key.toLowerCase() === "j") setEventIndex((value) => value + 1);
      if (event.key.toLowerCase() === "k") setEventIndex((value) => Math.max(1, value - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [kind]);

  switch (kind) {
    case "project": return <>
      <Field label="Project name"><Input placeholder="e.g. Customer portal refresh" /></Field>
      <Field label="Description"><Textarea placeholder="What should this project accomplish?" rows={3} /></Field>
      <div className="grid grid-cols-2 gap-3">{[["Status", "In progress"], ["Priority", "High"], ["Lead", "Maya Brooks"], ["Members", "3 members"], ["Milestone", "Beta release"], ["Labels", "Product, Web"]].map(([label, value]) => <Field key={label} label={label}><SelectInput value={value} /></Field>)}<Field label="Target date"><Input type="date" defaultValue="2026-05-28" /></Field></div>
      <Section title="Project members"><AvatarRow names={["Maya Brooks", "Noah Williams", "Priya Shah"]} /><Button variant="outline" size="sm" className="mt-3"><IconPlus /> Add member</Button></Section>
      <Section title="A few tips"><p className="text-sm text-muted-foreground">Keep the project name easy to scan. Assign a lead and target date so the team can track progress.</p></Section>
      <div className="flex justify-end gap-2">{secondary("Save draft")}{<Button size="sm" onClick={() => { setCreated(true); note("Project created"); }}>{created && <IconCheck />}{created ? "Project created" : "Create project"}</Button>}</div>
    </>;
    case "help": return <>
      <div className="relative"><IconSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search help articles" className="pl-9" /></div>
      <Section title="Get started"><GuideList guides={filteredGuides.filter((_, index) => index < 3)} note={note} /></Section>
      <Section title="Workspace and billing"><GuideList guides={filteredGuides.filter((_, index) => index >= 3)} note={note} /></Section>
      <Section title="Need more help?"><p className="text-sm text-muted-foreground">Our support team usually replies within one business day.</p><Button variant="outline" size="sm" className="mt-3" onClick={() => note("Support request started")}>Contact support</Button></Section>
    </>;
    case "shortcuts": return <>
      <div className="relative"><IconSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search shortcuts" className="pl-9" /></div>
      <Section title="General"><div className="divide-y">{filteredShortcuts.map(([label, keys]) => <div key={label} className="flex items-center justify-between gap-3 py-3 text-sm"><span>{label}</span><kbd className="rounded-md border bg-muted px-2 py-1 text-xs text-muted-foreground">{keys}</kbd></div>)}{filteredShortcuts.length === 0 && <p className="py-4 text-sm text-muted-foreground">No shortcuts found.</p>}</div></Section>
      <Section title="Navigation"><ShortcutRow label="Next item" keys="J" /><ShortcutRow label="Previous item" keys="K" /><ShortcutRow label="Open selected item" keys="↵" /></Section>
    </>;
    case "model-chat": return <>
      <div className="flex items-center justify-between"><span className="text-sm font-medium">Model</span><SelectInput value="Rose Assistant · Balanced" /></div>
      <div className="space-y-4"><ChatMessage name="You" text="Summarize the latest project risks." /><ChatMessage name="Rose Assistant" text="Three projects need attention: the portal refresh is 2 days behind, billing QA has 4 unresolved issues, and the mobile beta is waiting on a security review." assistant /></div>
      <div className="flex flex-wrap gap-2">{["Show owners", "Draft an update", "Compare with last week"].map((item) => <Button key={item} variant="outline" size="xs" onClick={() => note(`${item} selected`)}>{item}</Button>)}</div>
      <Composer value={message} onChange={setMessage} onSend={() => { note("Message sent to Rose Assistant"); setMessage(""); }} />
    </>;
    case "comments": return <>
      <div className="flex items-center justify-between"><PillTabs values={["Open", "All"]} value={tab} onChange={setTab} /><Badge variant="secondary">3 open</Badge></div>
      {(tab === "All" ? ["Confirm the rollout window with support.", "Could we include the latest accessibility pass?", "The revised copy is ready for review."] : ["Confirm the rollout window with support.", "Could we include the latest accessibility pass?"]).map((text, index) => <div key={text} className="space-y-3 border-b pb-4"><div className="flex items-start gap-3"><Person name={index ? "Noah Williams" : "Priya Shah"} /><p className="flex-1 text-sm leading-5">{text}<span className="mt-1 block text-xs text-muted-foreground">{index ? "18 minutes ago" : "42 minutes ago"}</span></p></div><div className="flex items-center gap-2 pl-11"><Button variant="ghost" size="xs" onClick={() => setReactions(reactions + 1)}>👍 {reactions + index}</Button><Button variant="ghost" size="xs" onClick={() => note("Reply editor opened")}><IconMessage />Reply</Button><Button variant="ghost" size="xs" onClick={() => setResolved(!resolved)}>{resolved ? "Reopen" : "Resolve"}</Button></div></div>)}
      <Composer value={message} onChange={setMessage} onSend={() => { note("Reply posted"); setMessage(""); }} placeholder="Write a comment…" />
    </>;
    case "customizer": return <>
      <Section title="Visible fields"><ToggleRow label="Owner avatars" checked={enabled} onChange={setEnabled} /><ToggleRow label="Status and priority" checked={!muted} onChange={setMuted} /><ToggleRow label="Due dates" checked={true} onChange={() => note("Due dates updated")} /></Section>
      <Section title="Layout"><div className="grid grid-cols-3 gap-2">{["List", "Board", "Compact"].map((item) => <button key={item} onClick={() => setLayout(item)} aria-pressed={layout === item} className={`rounded-lg border p-3 text-left text-sm ${layout === item ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}><span className="mb-3 block h-8 rounded border bg-muted/50" /><span className="font-medium">{item}</span></button>)}</div></Section>
      <p className="text-sm text-muted-foreground">Current layout: <b className="text-foreground">{layout}</b></p>{action("Apply view")}
    </>;
    case "notifications": return <>
      <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{unread} unread updates</span><Button variant="ghost" size="sm" onClick={() => { setUnread(0); note("All notifications marked as read"); }}>Mark all as read</Button></div>
      <Section title="Today"><NotificationCard name="Maya Brooks" text="approved the production rollout" time="8 min ago" unread={unread > 0} onRead={() => setUnread(Math.max(0, unread - 1))}><div className="mt-3 flex gap-2"><Button size="xs" onClick={() => note("Approval details opened")}>Review</Button><Button size="xs" variant="outline" onClick={() => note("Release notes downloaded")}>Release notes.pdf</Button></div><div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><span className="block h-full w-3/4 bg-primary" /></span>75%</div></NotificationCard><ActivityRow name="Noah Williams" text="attached Q3 release notes" time="26 min ago" unread={unread > 1} onRead={() => setUnread(Math.max(0, unread - 1))} /><ActivityRow name="Priya Shah" text="completed the security review" time="1 hr ago" unread={unread > 2} onRead={() => setUnread(Math.max(0, unread - 1))} /></Section>
      <Section title="Earlier"><ActivityRow name="Release Monitor" text="latency returned to baseline" time="Yesterday" /><ActivityRow name="Maya Brooks" text="mentioned you in Portal Refresh" time="Yesterday" /></Section>
    </>;
    case "settings": return <>
      <Section title="Delivery"><Field label="Endpoint URL"><Input defaultValue="https://hooks.example.com/events" /></Field><ToggleRow label="Send retry notifications" checked={enabled} onChange={setEnabled} /><Field label="Retry policy"><SelectInput value="Exponential · 5 attempts" /></Field></Section>
      <Section title="Routing"><Field label="Default channel"><SelectInput value="#platform-alerts" /></Field><Field label="Severity threshold"><SelectInput value="Warning and above" /></Field><ToggleRow label="Include resolved events" checked={muted} onChange={setMuted} /></Section>
      <div className="flex justify-between"><Button variant="outline" size="sm" onClick={() => { setEnabled(true); setMuted(false); note("Relay settings reset"); }}>Reset</Button>{action("Save changes", "Relay settings saved")}</div>
    </>;
    case "ticket": return <>
      <div className="flex items-center gap-2"><Badge variant="warning-light">In progress</Badge><span className="text-sm text-muted-foreground">SUP-2841</span></div>
      <h3 className="text-lg font-semibold">Unable to export monthly report</h3>
      <Section title="Properties"><EditableRow label="Assignee" value="Nora Patel" onEdit={() => note("Assignee updated")} /><EditableRow label="Priority" value="High" onEdit={() => note("Priority updated")} /><EditableRow label="Due date" value="Nov 9, 2026" onEdit={() => note("Due date updated")} /><EditableRow label="Customer" value="Northstar Studio" onEdit={() => note("Customer updated")} /><ToggleRow label="Escalated" checked={enabled} onChange={setEnabled} /></Section>
      <Section title="Requester"><Person name="Jamie Chen" detail="jamie@example.com" /></Section>
      <div className="flex justify-end">{action("Save changes", "Ticket details saved")}</div>
    </>;
    case "copilot": return <>
      <div className="flex justify-between"><SelectInput value="Rose Assistant" /><div className="flex gap-1"><Button variant="ghost" size="icon-sm" aria-label="Start new chat" onClick={() => note("New conversation started")}><IconPlus /></Button><Button variant="ghost" size="icon-sm" aria-label="Refresh conversation" onClick={() => note("Conversation refreshed")}><IconRefresh /></Button></div></div>
      <div className="space-y-4"><ChatMessage name="You" text="Why did signups dip this week?" /><ChatMessage name="Rose Assistant" text="Signups are down 8% week over week. The largest change came from the EU campaign, where form completion fell after the consent update." assistant /><ChatMessage name="You" text="Break that down by device." /><ChatMessage name="Rose Assistant" text="Mobile accounts for 72% of the decrease. Desktop conversion is unchanged." assistant /></div>
      <div className="flex flex-wrap gap-2">{["Show daily trend", "Draft a summary"].map((item) => <Button key={item} size="xs" variant="outline" onClick={() => note(`${item} added to prompt`)}>{item}</Button>)}</div>
      <Composer value={message} onChange={setMessage} onSend={() => { note("Copilot response is ready"); setMessage(""); }} placeholder="Ask a follow-up…" />
    </>;
    case "metric": return <>
      <div className="flex items-end gap-3"><strong className="text-4xl tabular-nums">48,210</strong><Badge variant="success-light">↗ 3.7%</Badge><span className="pb-1 text-xs text-muted-foreground">vs previous month</span></div>
      <Section title="Monthly target"><div className="flex justify-between text-sm"><span>48,210 of 55,000 users</span><b>88%</b></div><Progress value={88} className="mt-2 h-2" /></Section>
      <Section title="Definition"><Fact label="Metric" value="Monthly active users" /><Fact label="Source" value="Product events · workspace-prod" /><Fact label="Updated" value="2 minutes ago" /></Section>
      <Section title="Owners"><AvatarRow names={["Maya Brooks", "Theo Grant", "Nora Patel"]} /></Section>
      <Section title="Alert rule"><ToggleRow label="Notify at 90% of target" checked={enabled} onChange={setEnabled} /><p className="mt-2 text-xs text-muted-foreground">Posts to #growth-metrics and emails metric owners.</p></Section>
      <Section title="Recent changes"><TimelineRow title="Target raised to 55,000" time="Oct 28 · Maya Brooks" /><TimelineRow title="Definition updated" time="Oct 14 · Theo Grant" /></Section>
    </>;
    case "cron-detail": return <>
      <Notice tone="warning">Last run failed · Timeout after 10 minutes</Notice>
      <PillTabs values={["Overview", "Runs", "Schedule"]} value={tab} onChange={setTab} />
      {tab === "Overview" && <><Section title="Schedule"><Fact label="Expression" value="0 2 * * *" /><Fact label="Timezone" value="UTC" /><Fact label="Command" value="sync warehouse --full" /></Section><Section title="Next runs">{["Today, 2:00 AM", "Tomorrow, 2:00 AM", "Nov 6, 2:00 AM", "Nov 7, 2:00 AM", "Nov 8, 2:00 AM"].map((x) => <Fact key={x} label={x} value="Scheduled" />)}</Section></>}
      {tab === "Runs" && <Section title="Recent runs">{["Failed · 10m 00s", "Succeeded · 4m 12s", "Succeeded · 4m 08s"].map((x) => <div key={x} className="flex items-center justify-between border-b py-3 text-sm"><span>{x}</span><Button variant="outline" size="xs" onClick={() => note(`Opened log for ${x}`)}>View logs</Button></div>)}</Section>}
      {tab === "Schedule" && <Section title="Schedule settings"><Field label="Cron expression"><Input defaultValue="0 2 * * *" /></Field><Field label="Timezone"><SelectInput value="UTC" /></Field></Section>}
      <div className="flex flex-wrap gap-2">{secondary("Retry failed run", "Retry queued")}{action("Run now", "Job run started")}<Button variant="outline" size="sm" onClick={() => { setMuted(!muted); note(muted ? "Job resumed" : "Job paused"); }}>{muted ? "Resume" : "Pause"}</Button></div>
    </>;
    case "cron-create": return <>
      <Field label="Job name"><Input placeholder="e.g. Refresh search index" /></Field>
      <Field label="Command"><Input defaultValue="node scripts/refresh-index.js" /></Field>
      <Section title="Schedule presets"><div className="flex flex-wrap gap-2">{["Every hour", "Daily at 2 AM", "Weekdays", "Custom"].map((x) => <Button key={x} size="xs" variant={tab === x ? "default" : "outline"} onClick={() => setTab(x)}>{x}</Button>)}</div><Field label="Cron expression"><Input value={tab === "Every hour" ? "0 * * * *" : tab === "Weekdays" ? "0 9 * * 1-5" : "0 2 * * *"} readOnly /></Field><p className="text-xs text-muted-foreground">Runs daily at 2:00 AM UTC.</p></Section>
      <div className="grid grid-cols-2 gap-3"><Field label="Owner"><SelectInput value="Platform team" /></Field><Field label="Cluster"><SelectInput value="production-us-east" /></Field></div><ToggleRow label="Pause after consecutive failures" checked={enabled} onChange={setEnabled} />
      <Section title="Next runs">{["Nov 5 · 2:00 AM", "Nov 6 · 2:00 AM", "Nov 7 · 2:00 AM"].map((x) => <Fact key={x} label={x} value="UTC" />)}</Section>
      <div className="flex justify-end">{action("Create job", "Scheduled job created")}</div>
    </>;
    case "audit": return <>
      <Notice tone="destructive">Access denied · Policy blocked this request</Notice>
      <div className="flex justify-between"><Button variant="outline" size="xs" onClick={() => setEventIndex(Math.max(1,eventIndex-1))}><IconArrowDown className="rotate-90" /> Previous</Button><span className="self-center text-xs text-muted-foreground">Event {eventIndex} of 28 · J/K to step</span><Button variant="outline" size="xs" onClick={() => setEventIndex(eventIndex+1)}>Next <IconArrowDown className="-rotate-90" /></Button></div>
      <Section title="Event details"><Fact label="Actor" value={eventIndex % 2 ? "sam.lee@example.com" : "maya.brooks@example.com"} /><Fact label="Action" value="workspace.member.export" /><Fact label="Resource" value="workspace/ws_204" /><Fact label="Time" value="Nov 4, 2026 · 09:42:18 UTC" /><Fact label="Request ID" value={`req_01JBC9QZ${eventIndex}M`} /></Section>
      <PillTabs values={["Diff", "JSON", "Trace"]} value={tab} onChange={setTab} />
      <CodeBlock>{tab === "Diff" ? "- export_scope: all\n+ export_scope: restricted\n  decision: denied" : tab === "JSON" ? '{\n  "actor": "sam.lee@example.com",\n  "action": "workspace.member.export",\n  "decision": "denied"\n}' : "gateway → policy-engine → audit-log\n  └─ rule export_requires_mfa: denied"}</CodeBlock>
      {resolved ? <Notice tone="success">Marked reviewed · <button className="underline" onClick={() => setResolved(false)}>Undo</button></Notice> : <Button size="sm" onClick={() => { setResolved(true); note("Event marked reviewed"); }}>Mark reviewed</Button>}
    </>;
    case "rollout": return <>
      <Notice tone="info">Canary is healthy · 25% of traffic</Notice>
      <div className="grid grid-cols-2 gap-3"><Metric label="Error rate" value="0.12%" detail="baseline 0.14%" /><Metric label="p95 latency" value="184 ms" detail="baseline 191 ms" /></div>
      <Section title="Rollout progress"><Progress value={25} className="h-2" /><div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Canary 25%</span><span>Full rollout 100%</span></div></Section>
      <PillTabs values={["Commits", "Logs"]} value={tab} onChange={setTab} />
      {tab === "Commits" ? <Section title="Included changes"><TimelineRow title="Fix request timeout handling" time="a98d20f · Maya Brooks" /><TimelineRow title="Add gateway retry metrics" time="18c4a90 · Theo Grant" /></Section> : <CodeBlock>09:42:08 canary health check passed<br />09:41:52 traffic weight updated to 25%<br />09:40:17 rollout started</CodeBlock>}
      <div className="flex gap-2">{action("Promote", "Rollout promoted to 50%")}{secondary("Pause", "Rollout paused")}<Button variant="destructive" size="sm" onClick={() => note("Rollback started")}>Roll back</Button></div>
    </>;
    case "deploy": return <>
      <Notice tone="destructive">Integration tests failed · 2 checks need attention</Notice>
      <div className="flex justify-between"><Button variant="outline" size="xs" onClick={() => note("Previous deployment")}>Previous <IconArrowDown className="rotate-90" /></Button><Button variant="outline" size="xs" onClick={() => note("Next deployment")}>Next <IconArrowDown className="-rotate-90" /></Button></div>
      <PillTabs values={["Pipeline", "Health", "Changes"]} value={tab} onChange={setTab} />
      {tab === "Pipeline" && <Section title="Build log"><CodeBlock className={showRaw ? "whitespace-pre" : "whitespace-pre-wrap"}>09:42:16 Starting integration tests<br />09:43:02 ✕ checkout-flow.spec.ts<br />09:43:04 ✕ payment-retry.spec.ts<br />09:43:05 Job failed · exit code 1</CodeBlock><div className="mt-3 flex gap-2"><Button variant="outline" size="xs" onClick={() => setShowRaw(!showRaw)}>{showRaw ? "Wrap lines" : "No wrap"}</Button><Button variant="outline" size="xs" onClick={() => { setCopied(true); note("Build log copied"); }}><IconCopy />{copied ? "Copied" : "Copy log"}</Button>{secondary("Download", "Log download started")}</div></Section>}
      {tab === "Health" && <Section title="Service health"><Metric label="Error rate" value="1.8%" detail="target < 0.5%" /><Metric label="p95 latency" value="492 ms" detail="target < 250 ms" /></Section>}
      {tab === "Changes" && <Section title="Changes"><TimelineRow title="Update checkout retry policy" time="b12e180 · Priya Shah" /><TimelineRow title="Refresh payment SDK" time="a938c4b · Noah Williams" /></Section>}
      {action("Retry deployment", "Deployment retry queued")}
    </>;
    case "firewall-create": return <>
      <Field label="Rule name"><Input placeholder="e.g. Block credential stuffing" /></Field>
      <Section title="Match conditions"><div className="grid grid-cols-[1fr_1fr_1.3fr] gap-2"><SelectInput value="IP address" /><SelectInput value="is in" /><Input placeholder="198.51.100.0/24" /></div>{extraCondition && <div className="grid grid-cols-[1fr_1fr_1.3fr] gap-2"><SelectInput value="Country" options={["Country", "Path", "ASN", "Bot score"]} /><SelectInput value="is" options={["is", "is not", "contains"]} /><Input placeholder="Select a value" /></div>}<Button variant="ghost" size="sm" className="mt-2" onClick={() => setExtraCondition(true)} disabled={extraCondition}><IconPlus /> Add condition</Button><Field label="Bot score below"><Input type="number" defaultValue="20" /></Field><Field label="Rate limit"><Input defaultValue="100 requests / minute" /></Field></Section>
      <Section title="Then"><div className="flex flex-wrap gap-2">{["Block", "Challenge", "Allow", "Log"].map((x) => <Button key={x} size="xs" variant={tab === x || (!tab && x === "Block") ? "default" : "outline"} onClick={() => setTab(x)}>{x}</Button>)}</div></Section>
      <Section title="Live expression"><CodeBlock>(ip.src in 198.51.100.0/24) and (cf.bot_score lt 20)</CodeBlock><p className="mt-2 text-xs text-muted-foreground">Would match 18 requests in the last hour.</p></Section>
      <div className="flex justify-end">{action("Create rule", "Firewall rule created")}</div>
    </>;
    case "firewall-edit": return <>
      <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Rule enabled</p><p className="text-xs text-muted-foreground">Block suspicious login attempts</p></div><Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Rule enabled" /></div>
      <Section title="Conditions"><div className="grid grid-cols-[1fr_1fr_1.3fr] gap-2"><SelectInput value="URI path" /><SelectInput value="contains" /><Input defaultValue="/login" /></div><div className="grid grid-cols-[1fr_1fr_1.3fr] gap-2"><SelectInput value="Bot score" /><SelectInput value="below" /><Input defaultValue="15" /></div></Section>
      <div className="grid grid-cols-2 gap-3"><Metric label="Requests matched" value="1,284" detail="last 24 hours" /><Metric label="Last match" value="3 min ago" detail="198.51.100.24" /></div>
      <PillTabs values={["Sampled events", "Rule"]} value={tab} onChange={setTab} />
      {tab === "Rule" ? <CodeBlock>{'(http.request.uri.path contains "/login") and (cf.bot_score lt 15)'}</CodeBlock> : <Section title="Sampled events"><Fact label="09:38:12 UTC" value="198.51.100.24 · challenged" /><Fact label="09:32:46 UTC" value="203.0.113.18 · blocked" /></Section>}
      <div className="flex justify-between">{resolved ? <Button size="sm" variant="outline" onClick={() => { setResolved(false); note("Rule restored"); }}>Undo delete</Button> : <Button size="sm" variant="destructive" onClick={() => { setResolved(true); note("Rule deleted"); }}>Delete rule</Button>}{action("Save changes", "Firewall rule saved")}</div>
    </>;
    case "firewall-request": return <>
      <Notice tone="destructive">Blocked · Managed security rule</Notice>
      <div className="flex justify-between">{secondary("← Previous", "Previous request opened")}{secondary("Next →", "Next request opened")}</div>
      <Section title="Request"><Fact label="IP address" value="198.51.100.24" /><Fact label="Country / ASN" value="US · AS64500" /><Fact label="Path" value="POST /api/auth/session" /><Fact label="Bot score" value="8 / 100" /><Fact label="Rate" value="142 requests / minute" /><Fact label="Time" value="Nov 4 · 09:38:12 UTC" /></Section>
      <PillTabs values={["Decision trace", "Raw log"]} value={tab} onChange={setTab} />
      <CodeBlock>{tab === "Decision trace" ? "1. rate_limit_login: matched\n2. bot_score < 15: matched\n3. action: block" : '{ "action": "block", "rule_id": "fw_204", "bot_score": 8, "country": "US" }'}</CodeBlock>
      <div className="flex flex-wrap gap-2">{secondary("Block IP", "IP added to block list")}{secondary("Allow IP", "IP added to allow list")}{action("Create rule", "Rule draft created")}</div>
    </>;
    case "slo-detail": return <>
      <div className="flex items-end gap-3"><strong className="text-4xl">99.92%</strong><Badge variant="warning-light">Budget 38%</Badge></div>
      <div className="grid grid-cols-2 gap-3"><Metric label="Objective" value="99.90%" detail="30 day rolling window" /><Metric label="Remaining" value="3h 42m" detail="of 9h 36m budget" /></div>
      <Section title="Hourly error budget burn"><div className="flex h-28 items-end gap-1 border-b border-l px-2">{[30,45,35,58,40,50,68,42,78,56,39,61,87,47,52,34,70,46].map((v,i)=><span key={i} className={`flex-1 rounded-t-sm ${v>70?"bg-destructive/70":"bg-primary/60"}`} style={{height:`${v}%`}} />)}</div><div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>00:00</span><span>12:00</span><span>Now</span></div></Section>
      <PillTabs values={["1h", "6h", "24h", "7d"]} value={tab} onChange={setTab} />
      <Section title="Burn alerts"><ToggleRow label="Fast burn · 14.4× over 1 hour" checked={enabled} onChange={setEnabled} /><ToggleRow label="Slow burn · 3× over 6 hours" checked={muted} onChange={setMuted} /></Section>
      <Section title="Recent events"><TimelineRow title="Elevated checkout errors" time="09:20 UTC · 14 minutes" /><TimelineRow title="Payment provider latency" time="Yesterday · 8 minutes" /></Section>
      <Button variant="outline" size="sm" onClick={() => { setCopied(true); note("OpenSLO definition copied"); }}><IconCopy />{copied ? "OpenSLO copied" : "Copy as OpenSLO"}</Button>
    </>;
    case "slo-create": return <>
      <Field label="Service"><SelectInput value="Checkout API" /></Field><Field label="Objective name"><Input placeholder="e.g. Checkout availability" /></Field>
      <Section title="Indicator"><div className="grid grid-cols-2 gap-2">{["Availability", "Latency", "Freshness", "Correctness"].map((x) => <button key={x} onClick={() => setTab(x)} aria-pressed={(tab || "Availability") === x} className={`rounded-lg border p-3 text-left text-sm ${(tab || "Availability") === x ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>{x}</button>)}</div></Section>
      <Field label="Target"><SelectInput value="99.9%" /></Field><Field label="Rolling window"><SelectInput value="30 days" /></Field>
      <Section title="Alerting"><ToggleRow label="Fast burn alert" checked={enabled} onChange={setEnabled} /><ToggleRow label="Slow burn alert" checked={muted} onChange={setMuted} /></Section>
      <Notice tone="info">Preview: checkout-api will meet a 99.9% {tab || "availability"} target over 30 days.</Notice><div className="flex justify-end">{action("Create SLO", "Service objective created")}</div>
    </>;
    case "connection": return <>
      <div className="flex items-center gap-2"><Badge variant="success-light">Connected</Badge><span className="text-xs text-muted-foreground">Last sync 4 minutes ago</span></div>
      <Section title="Connection"><Fact label="Source" value="Northstar Warehouse" /><Fact label="Workspace" value="analytics-prod" /><Fact label="Region" value="US East" /><Fact label="Sync schedule" value="Every 15 minutes" /></Section>
      <div className="flex gap-2">{action("Sync now", "Sync started")}<Button variant="outline" size="sm" onClick={() => { setMuted(!muted); note(muted ? "Sync resumed" : "Sync paused"); }}>{muted ? "Resume sync" : "Pause sync"}</Button></div>
      <PillTabs values={["Datasets", "Settings"]} value={tab} onChange={setTab} />
      {tab === "Settings" ? <Section title="Connection settings"><Field label="Warehouse"><SelectInput value="Snowflake" /></Field><ToggleRow label="Include new tables automatically" checked={enabled} onChange={setEnabled} /><Button variant="outline" size="sm" onClick={() => note("Connection test passed")}>Test connection</Button></Section> : <Section title="Linked datasets"><DatasetRow name="orders_daily" detail="18 columns · synced 4 min ago" /><DatasetRow name="customers" detail="12 columns · synced 4 min ago" /><DatasetRow name="payments" detail="Schema changed · 2 columns added" warn /></Section>}
    </>;
    case "connect-wizard": return <>
      <div className="flex items-center gap-2">{[1,2,3].map((n) => <div key={n} className={`flex flex-1 items-center gap-2 border-b-2 pb-2 text-xs ${step >= n ? "border-primary text-foreground" : "border-muted text-muted-foreground"}`}><span className="grid size-5 place-items-center rounded-full bg-muted">{n}</span>{["Source", "Connect", "Datasets"][n-1]}</div>)}</div>
      {step === 1 && <><div className="relative"><IconSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search integrations" className="pl-9" /></div><Section title="Popular"><div className="divide-y rounded-lg border">{["Snowflake", "PostgreSQL", "BigQuery", "Amazon S3"].filter(x=>x.toLowerCase().includes(query.toLowerCase())).map((x)=> <button key={x} className="flex w-full items-center justify-between p-3 text-sm hover:bg-muted/50" onClick={()=>{setLayout(x);setStep(2)}}>{x}<IconArrowRight className="size-4" /></button>)}</div></Section></>}
      {step === 2 && <><p className="text-sm text-muted-foreground">Connect to <b className="text-foreground">{layout}</b> using credentials or OAuth.</p><Field label="Account URL"><Input placeholder="account.region.provider.com" /></Field><Field label="Access token"><Input type="password" placeholder="Paste access token" /></Field><Button variant="outline" size="sm" onClick={()=>note("Connection test passed")}>Test connection</Button></>}
      {step === 3 && <Section title="Select datasets"><ToggleRow label="orders_daily" checked={enabled} onChange={setEnabled} /><ToggleRow label="customers" checked={muted} onChange={setMuted} /><ToggleRow label="payments" checked={true} onChange={()=>note("Dataset selection updated")} /></Section>}
      <div className="flex justify-between">{step>1 ? <Button variant="outline" size="sm" onClick={() => setStep(step-1)}>Back</Button> : <span />}{step<3 ? <Button size="sm" onClick={() => setStep(step+1)}>Continue <IconArrowRight /></Button> : action("Connect source", "Data source connected")}</div>
    </>;
    case "dataset": return <>
      <div className="flex flex-wrap items-center justify-between gap-2"><PillTabs values={["Rows", "Schema"]} value={tab} onChange={setTab} /><ToggleRow label={maskPii ? "PII masked" : "PII visible"} checked={maskPii} onChange={(value)=>{setMaskPii(value);if(!value)note("Confirm before exposing personal data")}} /></div>
      {!maskPii && <Notice tone="warning">Personal data is visible in this preview. Access is recorded in the audit log.</Notice>}
      {tab === "Schema" ? <Section title="Columns"><Fact label="order_id" value="STRING · primary key" /><Fact label="customer_email" value={maskPii ? "STRING · masked" : "STRING · PII"} /><Fact label="total_amount" value="NUMBER(10,2)" /><Fact label="created_at" value="TIMESTAMP" /><Notice tone="warning">2 new columns detected upstream: <b>refund_status</b>, <b>source_region</b></Notice></Section> : <SampleTable maskPii={maskPii} />}
      <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" onClick={() => { setCopied(true); note("Sample query copied"); }}><IconCopy />{copied ? "Query copied" : "Copy query"}</Button>{secondary("Resample", "Sample refreshed")}{action("Accept new columns", "Schema changes accepted")}</div>
    </>;
  }
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="grid gap-1.5 text-sm"><span className="font-medium">{label}</span>{children}</label>; }
function Section({ title, children }: { title: string; children: ReactNode }) { return <section className="space-y-3"><h3 className="text-sm font-semibold">{title}</h3>{children}</section>; }
function GuideList({ guides, note }: { guides:string[];note:(message:string)=>void }) { return <div className="divide-y rounded-lg border">{guides.map((guide,index)=><button key={guide} className="flex w-full items-center gap-3 px-3 py-3 text-left text-sm hover:bg-muted/50" onClick={()=>note(`Opened ${guide}`)}><span className="grid size-8 place-items-center rounded-md bg-muted text-muted-foreground"><IconFile index={index}/></span><span className="min-w-0 flex-1"><span className="block font-medium">{guide}</span><span className="text-xs text-muted-foreground">{index+2} min read · Updated this month</span></span><IconExternalLink className="size-4 text-muted-foreground"/></button>)}{!guides.length&&<p className="px-3 py-2 text-sm text-muted-foreground">No matching guides in this section.</p>}</div>; }
function SelectInput({ value,options }: { value: string;options?:string[] }) { const items=[...new Set([value,...(options??["Open","In progress","Done","Low","Medium","High","Daily","Weekly","UTC","Production","Staging","Maya Brooks","Nora Patel","Platform team","Snowflake","PostgreSQL","BigQuery"])])];return <Select defaultValue={value}><SelectTrigger className="w-full"><SelectValue/></SelectTrigger><SelectContent>{items.map(option=><SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select>; }
function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value:boolean)=>void }) { return <div className="flex items-center justify-between gap-3 text-sm"><span>{label}</span><Switch checked={checked} onCheckedChange={onChange} aria-label={label||"Toggle setting"}/></div>; }
function PillTabs({ values, value, onChange }: { values: string[]; value: string; onChange: (value:string)=>void }) { return <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-lg bg-muted p-1">{values.map((x)=> <button key={x} type="button" onClick={()=>onChange(x)} aria-pressed={value===x} className={`rounded-md px-2.5 py-1 text-xs font-medium ${value===x?"bg-background text-foreground shadow-sm":"text-muted-foreground hover:text-foreground"}`}>{x}</button>)}</div>; }
function Fact({ label, value }: { label:string; value:string }) { return <div className="flex items-start justify-between gap-4 border-b py-2 text-sm last:border-0"><span className="text-muted-foreground">{label}</span><span className="text-right font-medium">{value}</span></div>; }
function Metric({ label, value, detail }: { label:string; value:string; detail:string }) { return <div className="space-y-1 border-y py-3"><p className="text-xs text-muted-foreground">{label}</p><p className="text-xl font-semibold tabular-nums">{value}</p><p className="text-xs text-muted-foreground">{detail}</p></div>; }
function Notice({ tone, children }: { tone:"info"|"warning"|"destructive"|"success"; children:ReactNode }) { const colors={info:"border-primary/30 bg-primary/5",warning:"border-warning/30 bg-warning/5",destructive:"border-destructive/30 bg-destructive/5",success:"border-success/30 bg-success/5"};return <div className={`rounded-lg border px-3 py-2.5 text-sm ${colors[tone]}`}>{children}</div>; }
function CodeBlock({ children,className }: { children:ReactNode;className?:string }) { return <pre className={`overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs leading-5 text-muted-foreground ${className??"whitespace-pre-wrap"}`}>{children}</pre>; }
function TimelineRow({ title, time }: { title:string; time:string }) { return <div className="flex gap-3 border-l pl-3"><span className="mt-1 size-2 shrink-0 rounded-full bg-primary" /><div className="pb-3"><p className="text-sm font-medium">{title}</p><p className="mt-0.5 text-xs text-muted-foreground">{time}</p></div></div>; }
function ShortcutRow({ label, keys }: { label:string; keys:string }) { return <div className="flex justify-between border-b py-2 text-sm"><span>{label}</span><kbd className="rounded border bg-muted px-2 py-0.5 text-xs">{keys}</kbd></div>; }
function Person({ name, detail }: { name:string; detail?:string }) { const initials=name.split(" ").map(x=>x[0]).join("").slice(0,2);return <div className="flex min-w-0 items-center gap-2"><Avatar size="sm"><AvatarImage src={demoAvatarUrl(name)} alt={name}/><AvatarFallback>{initials}</AvatarFallback></Avatar><span className="min-w-0"><span className="block truncate text-sm font-medium">{name}</span>{detail&&<span className="block truncate text-xs text-muted-foreground">{detail}</span>}</span></div>; }
function AvatarRow({ names }: { names:string[] }) { return <div className="flex flex-wrap items-center gap-3">{names.map(name=><Person key={name} name={name}/>)}</div>; }
function ChatMessage({ name, text, assistant=false }: { name:string; text:string; assistant?:boolean }) { return <div className={`flex gap-3 ${assistant?"":"flex-row-reverse"}`}><Avatar size="sm"><AvatarImage src={demoAvatarUrl(name)} alt={name}/><AvatarFallback>{name.slice(0,1)}</AvatarFallback></Avatar><div className={`max-w-[85%] rounded-xl px-3 py-2.5 text-sm leading-5 ${assistant?"bg-muted":"bg-primary text-primary-foreground"}`}><p className="mb-1 text-[11px] font-medium opacity-70">{name}</p>{text}</div></div>; }
function Composer({ value,onChange,onSend,placeholder="Ask a question…" }: { value:string;onChange:(v:string)=>void;onSend:()=>void;placeholder?:string }) { return <div className="space-y-2 rounded-xl border p-2"><Textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={2} className="min-h-16 resize-none border-0 shadow-none focus-visible:ring-0"/><div className="flex items-center justify-between"><Button variant="ghost" size="icon-sm" aria-label="Attach file"><IconPlus/></Button><Button size="sm" onClick={onSend} disabled={!value.trim()}><IconSend/> Send</Button></div></div>; }
function ActivityRow({ name,text,time,unread=false,onRead }: { name:string;text:string;time:string;unread?:boolean;onRead?:()=>void }) { return <button className="flex w-full gap-3 border-b py-3 text-left last:border-0" onClick={onRead}><Person name={name}/><span className="min-w-0 flex-1 text-sm"><span>{text}</span><span className="mt-1 block text-xs text-muted-foreground">{time}</span></span>{unread&&<span className="mt-2 size-2 shrink-0 rounded-full bg-primary"/>}</button>; }
function NotificationCard({ name,text,time,unread=false,onRead,children }: { name:string;text:string;time:string;unread?:boolean;onRead?:()=>void;children:ReactNode }) { return <div className="border-b py-3 last:border-0"><button className="flex w-full gap-3 text-left" onClick={onRead}><Person name={name}/><span className="min-w-0 flex-1 text-sm"><span>{text}</span><span className="mt-1 block text-xs text-muted-foreground">{time}</span></span>{unread&&<span className="mt-2 size-2 shrink-0 rounded-full bg-primary"/>}</button><div className="pl-11">{children}</div></div>; }
function EditableRow({ label,value,onEdit }: { label:string;value:string;onEdit:()=>void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  return <div className="flex items-center gap-3 border-b py-2 last:border-0"><span className="w-24 shrink-0 text-sm text-muted-foreground">{label}</span>{editing ? <Input autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} className="h-8 min-w-0 flex-1" /> : <span className="min-w-0 flex-1 truncate text-sm font-medium">{draft}</span>}{editing ? <Button variant="ghost" size="xs" onClick={() => { setEditing(false); onEdit(); }}>Save</Button> : <Button variant="ghost" size="xs" onClick={() => setEditing(true)}>Edit</Button>}</div>;
}
function DatasetRow({ name,detail,warn=false }: { name:string;detail:string;warn?:boolean }) { return <div className="flex items-start gap-3 border-b py-3 last:border-0"><span className={`mt-1 size-2 rounded-full ${warn?"bg-warning":"bg-success"}`}/><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{name}</span><span className="text-xs text-muted-foreground">{detail}</span></span><Button variant="ghost" size="xs">View</Button></div>; }
function SampleTable({ maskPii }: { maskPii:boolean }) { const rows=[["ord_8042",maskPii?"j•••@example.com":"jamie.chen@example.com","$128.40","Nov 04"],["ord_8041",maskPii?"m•••@example.com":"maya.brooks@example.com","$84.00","Nov 04"],["ord_8040",maskPii?"n•••@example.com":"noah.williams@example.com","$216.70","Nov 03"]];return <div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[28rem] text-left text-xs"><thead className="bg-muted/50 text-muted-foreground"><tr>{["Order", "Customer", "Total", "Created"].map(x=><th key={x} className="px-3 py-2 font-medium">{x}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row[0]} className="border-t">{row.map(cell=><td key={cell} className="px-3 py-2.5">{cell}</td>)}</tr>)}</tbody></table></div>; }
function IconFile({ index }: { index:number }) { return index%2===0?<IconActivity className="size-4"/>:<IconShieldCheck className="size-4"/>; }
