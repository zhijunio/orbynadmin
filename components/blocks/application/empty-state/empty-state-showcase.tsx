"use client";

import { useState, type ReactNode } from "react";
import { IconActivity, IconAdjustmentsHorizontal, IconBook2, IconBrandCloudflare, IconBrandDropbox, IconBrandGoogleDrive, IconBrandOnedrive, IconBuildingBank, IconCheck, IconChevronRight, IconCopy, IconDatabase, IconFile, IconFileImport, IconFolder, IconFolderPlus, IconInfoCircle, IconLayoutGrid, IconPlayerPlay, IconPlugConnected, IconPlus, IconSearch, IconSparkles, IconTarget, IconUpload, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty/empty";
import { Frame, FramePanel } from "@/components/ui/frame/frame";
import { IconStack } from "@/components/ui/icon-stack/icon-stack";
import { Button } from "@/components/ui/button/button";
import { ButtonGroup } from "@/components/ui/button/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { cn } from "@/utils/cn";

const examples = [
  { title: "Data Import Start", component: <DataImportStart /> },
  { title: "No Search Results", component: <NoSearchResults /> },
  { title: "First Project", component: <FirstProject /> },
  { title: "Team Launch Steps", component: <TeamLaunchSteps /> },
  { title: "Invite First Member", component: <InviteFirstMember /> },
  { title: "Invite Members Prompt", component: <InviteMembersPrompt /> },
  { title: "Reports Workspace", wide: true, component: <ReportsWorkspace /> },
  { title: "Empty Report Brief", wide: true, component: <EmptyReportBrief /> },
  { title: "Settings Setup Tabs", wide: true, component: <SettingsSetupTabs /> },
  { title: "Enable Organizations", wide: true, component: <EnableOrganizations /> },
  { title: "Blueprint Library", wide: true, component: <BlueprintLibrary /> },
  { title: "Section Add Prompt", wide: true, component: <SectionAddPrompt /> },
  { title: "Export Filters", wide: true, component: <ExportFilters /> },
  { title: "Cloud Storage Connect", wide: true, component: <CloudStorageConnect /> },
];
const featuredExampleTitles = new Set(["Data Import Start", "First Project", "Reports Workspace", "Cloud Storage Connect"]);

export function EmptyStateShowcase() {
  return <main className="mx-auto w-full max-w-7xl space-y-6 pb-8">
    <h1 className="text-2xl font-semibold tracking-tight">Empty States</h1>
    <div className="grid min-w-0 gap-5 md:grid-cols-2">
      {examples.filter(({ title }) => featuredExampleTitles.has(title)).map(({ title, wide, component }) => <ComponentPreview key={title} title={title} className={wide ? "md:col-span-2" : undefined} previewClassName="w-full">{component}</ComponentPreview>)}
    </div>
  </main>;
}

function EmptyActions({ primary, secondary }: { primary: string; secondary?: string }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">
    <Button size="sm">{primary}</Button>
    {secondary && <Button size="sm" variant="outline">{secondary}</Button>}
  </div>;
}

function EmptyCopy({ icon: Icon, title, description, actions, media, className, titleClassName }: { icon: typeof IconFile; title: string; description: string; actions: ReactNode; media?: ReactNode; className?: string; titleClassName?: string }) {
  return <Empty className={cn("min-h-72 px-4 py-8", className)}>
    <EmptyHeader>
      {media ?? <EmptyMedia variant="icon"><Icon /></EmptyMedia>}
      <EmptyTitle className={titleClassName}>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>{actions}</EmptyContent>
  </Empty>;
}

function ImportIllustration() {
  return <div aria-hidden="true" className="relative mb-2 h-20 w-52">
    <div className="absolute left-1/2 top-1 h-14 w-40 -translate-x-1/2 rounded-xl border bg-muted/40" />
    <div className="absolute left-1/2 top-4 h-14 w-44 -translate-x-1/2 rounded-xl border bg-muted/60" />
    <div className="absolute left-1/2 top-7 flex h-16 w-52 -translate-x-1/2 items-center gap-3 rounded-xl border bg-card px-4 shadow-sm">
      <span className="size-8 rounded-md bg-muted" /><span className="space-y-1.5"><span className="block h-2 w-24 rounded bg-muted" /><span className="block h-2 w-16 rounded bg-muted" /></span>
    </div>
  </div>;
}

function DataImportStart() {
  return <div className="mx-auto w-full max-w-md py-2">
    <EmptyCopy icon={IconDatabase} media={<ImportIllustration />} title="Your record space is empty" titleClassName="text-2xl" description="Connect a live source or upload a CSV to start organizing people, teams, and attributes in one place." actions={<div className="flex flex-wrap items-center justify-center gap-2"><Button size="sm"><IconPlugConnected />Connect source</Button><Button size="sm" variant="outline"><IconUpload />Upload CSV</Button></div>} className="min-h-72 py-4" />
    <div className="mt-8 space-y-2"><p className="text-sm text-muted-foreground">Quick guides</p>{[{ label: "How records work", icon: IconBook2 }, { label: "CSV setup", icon: IconFile }].map(({ label, icon: Icon }) => <div key={label} className="flex h-11 w-full items-center gap-2 rounded-lg border px-3 text-sm font-medium"><Icon className="size-4 text-muted-foreground" />{label}<IconChevronRight className="ml-auto size-4 text-muted-foreground" /></div>)}</div>
  </div>;
}

function NoSearchResults() {
  const suggestions = ['"meeting transcript"', "#launch-plan", '"handoff notes"'];
  return <div className="mx-auto w-full max-w-md py-3">
    <EmptyCopy icon={IconSearch} title="No search matches yet" titleClassName="text-2xl" description="Broaden your query or browse the library to explore files, notes, and tagged moments across the workspace." actions={<ButtonGroup aria-label="Search actions"><Button size="sm"><IconPlayerPlay />Browse library</Button><Button size="sm" variant="outline"><IconAdjustmentsHorizontal />Refine filters</Button></ButtonGroup>} media={<ImportIllustration />} />
    <div className="mt-8 space-y-2"><p className="text-sm text-muted-foreground">Try these searches</p><div className="flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted/50">{suggestion}</button>)}</div></div>
  </div>;
}

function FirstProject() {
  const quickStarts = [{ title: "Task board", icon: IconLayoutGrid }, { title: "Sprint tracker", icon: IconActivity }];
  return <div className="mx-auto w-full max-w-md py-3">
    <EmptyCopy icon={IconFolderPlus} title="No projects to show" titleClassName="text-2xl" description="Start a project from scratch or pick a template to launch your first workspace and begin tracking tasks, goals, and progress." actions={<div className="flex flex-wrap justify-center gap-2"><Button size="sm"><IconPlus />New project</Button><Button size="sm" variant="outline"><IconLayoutGrid />Explore templates</Button></div>} media={<svg aria-hidden="true" viewBox="0 0 200 112" className="mb-2 h-28 w-52 text-muted-foreground/60" fill="none" stroke="currentColor" strokeWidth="1"><path d="M14 54h172M100 8v96M36 17h128M36 95h128" className="text-muted-foreground/10"/><path d="m62 64 25-15 25 14-25 15-25-14Zm25-15v29m0 0 25-15V49M87 49l25 14M87 49l25-15 25 14-25 15m0-29v29m0 0 25-15V48m-25 15 25 14 25-15-25-14m-25 15v29l25 14 25-15V63m-25 14v29" /></svg>} />
    <div className="mt-8 space-y-2"><p className="text-center text-sm text-muted-foreground">Quick starts</p>{quickStarts.map(({ title, icon: Icon }) => <button key={title} type="button" className="flex h-10 w-full items-center gap-3 rounded-lg border bg-background px-3 text-left text-sm font-medium hover:bg-muted/50"><Icon className="size-4 text-muted-foreground" />{title}<IconChevronRight className="ml-auto size-4 text-muted-foreground" /></button>)}</div>
  </div>;
}

function ReportsWorkspace() {
  return <div className="@container relative mx-auto min-h-[33rem] w-full max-w-3xl overflow-hidden rounded-xl border bg-card p-6 sm:p-8">
    <div className="relative z-10 max-w-sm pt-3 @xl:pt-5">
      <EmptyMedia variant="icon"><IconActivity /></EmptyMedia>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">No reports for this workspace</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Create your first report to turn tracked companies into one clear view your team can share.</p>
      <div className="mt-6 flex flex-wrap gap-2"><Button size="sm"><IconPlus />Add report</Button><Button size="sm" variant="outline"><IconSearch />View sample</Button></div>
    </div>
    <div aria-label="Report preview" className="absolute inset-x-0 bottom-0 flex h-[43%] items-start justify-center rounded-tl-xl border-t border-l bg-muted/20 p-5 sm:left-[24%] sm:w-[76%]">
      <div className="w-full rounded-lg border bg-card p-4 shadow-sm"><div className="flex items-center justify-between"><span className="h-3 w-28 rounded bg-muted" /><span className="size-7 rounded-md bg-muted" /></div><div className="mt-5 grid h-36 grid-cols-6 items-end gap-2 border-b px-2">{[40, 65, 48, 85, 58, 72].map((height, index) => <span key={index} className="rounded-t-sm bg-primary/20" style={{ height: `${height}%` }} />)}</div><div className="mt-3 flex justify-between"><span className="h-2 w-20 rounded bg-muted" /><span className="h-2 w-16 rounded bg-muted" /></div></div>
    </div>
  </div>;
}

function EmptyReportBrief() {
  return <Frame className="@container mx-auto w-full max-w-3xl" spacing="xs"><FramePanel className="grid gap-5 p-5 @2xl:grid-cols-[0.9fr_1.1fr] @2xl:items-center"><div><EmptyMedia variant="icon"><IconFileImport /></EmptyMedia><h3 className="mt-3 text-lg font-semibold">No Brief Is Ready Yet</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">Pull open signals, notes, and decisions into one clear brief before the review starts.</p><div className="mt-4 flex flex-wrap gap-2"><Button size="sm"><IconSparkles />Draft Brief</Button><Button size="sm" variant="outline"><IconSearch />Browse Signals</Button></div></div><div aria-label="Brief preview" className="min-h-56 rounded-lg border bg-background" /></FramePanel></Frame>;
}

function TeamLaunchSteps() {
  const steps = [
    { title: "Link Deliverables", detail: "Keep milestones, owners, and blockers in view.", icon: IconActivity, classes: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/30 dark:text-fuchsia-300" },
    { title: "Open Brief", detail: "Capture context, decisions, and handoff notes.", icon: IconFile, classes: "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300" },
    { title: "Start Check-In", detail: "Gather the team when a thread needs answers.", icon: IconUsers, classes: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" },
  ];
  return <div className="mx-auto w-full max-w-md space-y-5 py-3 text-center">
    <div><h3 className="text-2xl font-semibold tracking-tight">Launch the Team Workspace</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-5 text-muted-foreground">Bring the core team together and sync the roster, so plans and follow-ups stay visible.</p></div>
    <div className="space-y-2"><Button variant="outline" className="w-full"><IconUsers />Add Core Team</Button><Button variant="outline" className="w-full"><IconUpload />Sync Directory</Button></div>
    <div className="space-y-3 text-left">{steps.map(({ title, detail, icon: Icon, classes }) => <button key={title} type="button" className={`flex w-full items-start gap-3 rounded-xl p-4 text-left ${classes}`}><Icon className="mt-0.5 size-4 shrink-0" /><span><span className="block text-sm font-medium text-foreground">{title}</span><span className="mt-1 block text-sm text-muted-foreground">{detail}</span></span></button>)}</div>
  </div>;
}

function InviteFirstMember() {
  return <EmptyCopy icon={IconUserPlus} title="Invite the first people in" titleClassName="text-2xl" description="Bring owners, editors, and reviewers into the workspace with a fast email invite or one secure share link." actions={<div className="flex flex-wrap justify-center gap-2"><Button size="sm" ><IconUserPlus />Invite members</Button><Button size="sm" variant="outline"><IconCopy />Copy invite link</Button></div>} media={<span className="mb-2 grid size-16 place-items-center rounded-full border bg-background"><IconUserPlus className="size-7 text-foreground" /></span>} className="min-h-72" />;
}

const settingsTabs = ["Project states", "Project labels"];
function SettingsSetupTabs() {
  const [tab, setTab] = useState("Project states");
  return <div className="mx-auto w-full max-w-3xl px-2 py-4">
    <h3 className="text-xl font-semibold tracking-tight">Projects</h3>
    <p className="mt-2 text-sm text-muted-foreground">Manage the shared project fields your workspace uses to stay organized.</p>
    <Tabs value={tab} onValueChange={setTab} className="mt-7"><TabsList variant="line" className="w-full justify-start border-b pb-1">{settingsTabs.map((name) => <TabsTrigger key={name} value={name}>{name}</TabsTrigger>)}</TabsList></Tabs>
    <div className="min-h-64 py-8 sm:pl-16"><IconStack className="mb-4"><IconTarget className="size-6" /></IconStack><h4 className="text-base font-semibold">{tab === "Project states" ? "Set up project states" : "Set up project labels"}</h4><p className="mt-2 max-w-sm text-sm leading-5 text-muted-foreground">{tab === "Project states" ? "Create a shared stage system so every project follows the same progress flow." : "Create shared labels so teams can organize and find projects consistently."}</p><Button className="mt-4" size="sm">Enable</Button></div>
  </div>;
}

function InviteMembersPrompt() {
  return <EmptyCopy icon={IconUserPlus} title="Invite the first people in" titleClassName="text-2xl" description="Bring owners, editors, and reviewers into the workspace with a fast email invite or one secure share link." actions={<div className="flex flex-wrap justify-center gap-2"><Button size="sm" ><IconUserPlus />Invite members</Button><Button size="sm" variant="outline"><IconCopy />Copy invite link</Button></div>} media={<IconStack className="mb-2"><IconUserPlus className="size-7" /></IconStack>} className="min-h-72" />;
}

function BlueprintLibrary() {
  return <div className="mx-auto w-full max-w-3xl space-y-4 py-2"><div><h3 className="text-lg font-semibold">Blueprint Library</h3><p className="mt-1 text-sm text-muted-foreground">Turn repeatable launches, onboarding flows, and reports into reusable project blueprints.</p></div><div className="grid min-h-64 place-items-center rounded-xl border border-border bg-card"><EmptyCopy icon={IconLayoutGrid} title="No blueprints yet" description="Create a reusable starting point so every new project starts structured." actions={<EmptyActions primary="Create blueprint" secondary="Import blueprint" />} media={<IconStack className="mb-2"><IconLayoutGrid className="size-7" /></IconStack>} className="min-h-56 py-5" /></div></div>;
}

function SectionAddPrompt() {
  return <div className="w-full space-y-3 py-2"><div><h3 className="text-lg font-semibold">Routing Signals</h3><p className="mt-1 text-sm text-muted-foreground">Shape incoming work before it reaches the roadmap.</p></div><Button size="sm" className="w-full">Add signal</Button><div className="grid min-h-80 place-items-center rounded-xl border bg-muted/50 p-6 text-center"><div><IconStack className="mx-auto mb-4"><IconFile className="size-7" /></IconStack><h4 className="font-semibold">Create signals to route new work</h4><p className="mt-2 text-sm text-muted-foreground">Define signals so every intake item starts with context.</p></div></div></div>;
}

function ExportFilters() {
  const [audience, setAudience] = useState("Everyone");
  const [workspace, setWorkspace] = useState("All workspaces");
  const [range, setRange] = useState("Last 30 days");
  return <div className="mx-auto w-full max-w-3xl space-y-4 py-2"><div><h3 className="text-xl font-semibold tracking-tight">Activity Exports</h3><p className="mt-1 text-sm text-muted-foreground">Download scoped activity packets for billing review, staffing audits, and client handoffs.</p></div><div className="flex flex-wrap gap-2"><ExportFilterMenu label="Audience" value={audience} options={["Everyone", "Owners", "Members"]} onSelect={setAudience} /><ExportFilterMenu label="Workspace" value={workspace} options={["All workspaces", "Current workspace"]} onSelect={setWorkspace} /><ExportFilterMenu label="Date range" value={range} options={["Last 30 days", "Last 7 days", "Last 90 days"]} onSelect={setRange} /></div><ButtonGroup aria-label="Export actions" className="w-full"><Button className="flex-1"><IconPlayerPlay />Execute</Button><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" aria-label="More export options"><IconChevronRight className="rotate-90" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Export CSV</DropdownMenuItem><DropdownMenuItem>Export PDF</DropdownMenuItem></DropdownMenuContent></DropdownMenu></ButtonGroup><div className="border-t pt-6"><EmptyCopy icon={IconFile} title="No exportable activity yet" description="Capture approved activity and this view will assemble your next review packet." actions={<span />} media={<IconStack className="mb-2"><IconFile className="size-7" /></IconStack>} className="min-h-56 py-5" /></div></div>;
}

function ExportFilterMenu({ label, value, options, onSelect }: { label: string; value: string; options: string[]; onSelect: (value: string) => void }) {
  return <DropdownMenu><DropdownMenuTrigger asChild><Button size="sm" variant="outline" aria-label={label}>{value}<IconChevronRight className="rotate-90" /></Button></DropdownMenuTrigger><DropdownMenuContent align="start">{options.map((option) => <DropdownMenuItem key={option} onSelect={() => onSelect(option)}>{option}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>;
}

function CloudStorageConnect() {
  const providers = [{ name: "Dropbox", icon: IconBrandDropbox, color: "text-blue-600" }, { name: "Cloudflare R2", icon: IconBrandCloudflare, color: "text-orange-500" }, { name: "Google Drive", icon: IconBrandGoogleDrive, color: "text-emerald-600" }, { name: "Microsoft OneDrive", icon: IconBrandOnedrive, color: "text-sky-600" }];
  return <div className="mx-auto w-full max-w-3xl space-y-4 py-2"><div><h3 className="text-xl font-semibold tracking-tight">File Sources</h3><p className="mt-1 text-sm text-muted-foreground">Connect governed folders for contracts, exports, and client delivery packets.</p></div><div className="border-t pt-5"><EmptyCopy icon={IconFolder} title="No file sources are linked" description="Attach a storage workspace before review files, billing exports, or signed packets can land in this queue." actions={<span />} media={<IconStack className="mb-2"><IconFolder className="size-7" /></IconStack>} className="min-h-48 py-2" /></div><div className="space-y-1 rounded-xl border bg-muted/20 p-1">{providers.map(({ name, icon: Icon, color }) => <button key={name} type="button" className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border bg-background text-sm font-medium hover:bg-muted/40"><Icon className={`size-4 ${color}`} />{name}</button>)}</div></div>;
}

function EnableOrganizations() {
  return <div className="mx-auto w-full max-w-3xl py-2"><h3 className="text-xl font-semibold tracking-tight">Organizations</h3><div className="mt-5 rounded-2xl border bg-muted/20 p-1"><div className="rounded-xl border bg-card p-5"><EmptyCopy icon={IconBuildingBank} title="Enable organizations" titleClassName="text-base" description="Enable your users to create organizations, manage team members, and control access with role-based permissions." actions={<Button size="sm" ><IconCheck />Enable organizations</Button>} media={<IconStack className="mb-2"><IconBuildingBank className="size-7" /></IconStack>} className="min-h-64 py-2" /><div className="mt-4 flex items-center gap-1.5 border-t pt-3 text-xs text-muted-foreground"><IconInfoCircle className="size-4" /><span>Learn more about Organizations</span></div></div></div></div>;
}
