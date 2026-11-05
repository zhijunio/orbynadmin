"use client";

import * as React from "react";
import { IconActivity, IconBell, IconChevronDown, IconChevronRight, IconCircleCheck, IconCloud, IconDatabase, IconFileText, IconGlobe, IconStack2, IconNetwork, IconPlus, IconSearch, IconShield, IconShieldCheck, IconSitemap, IconSortAscending, IconWorld } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet/sheet";

type Scope = { id: string; name: string; count?: number; badge?: string; children?: Scope[] };
const initialScopes: Scope[] = [
  { id: "endpoint", name: "Endpoint Security", badge: "Stable", children: [
    { id: "devices", name: "Managed Devices", count: 248 },
    { id: "threat", name: "Threat Detection", count: 12, badge: "Review", children: [{ id: "overview", name: "Overview" }, { id: "suspicious", name: "Suspicious Activity" }, { id: "malware", name: "Malware Events" }, { id: "network", name: "Network Anomalies" }] },
    { id: "vulnerabilities", name: "Vulnerabilities", count: 37, badge: "High" },
    { id: "policies", name: "Security Policies", count: 8 },
    { id: "quarantined", name: "Quarantined", count: 5 },
    { id: "response", name: "Response Tasks", count: 7, badge: "Active" },
  ] },
  { id: "identity", name: "Identity & Access", badge: "Add", children: [{ id: "identities", name: "Identities", count: 84 }, { id: "privileged", name: "Privileged Accounts", count: 16 }] },
  { id: "application", name: "Application Security", children: [{ id: "apps", name: "Applications", count: 32 }, { id: "cloud", name: "Cloud Workloads", count: 14 }] },
  { id: "data", name: "Data Protection", badge: "Review", children: [{ id: "assets", name: "Sensitive Assets", count: 63 }] },
];
const sections = ["Security", "Incidents", "Threats", "Assets", "Reports"];
const scopeIcons = [IconShield, IconGlobe, IconNetwork, IconWorld, IconStack2, IconActivity];

function moveScope(items: Scope[], source: string, target: string): Scope[] {
  const sourceScope = items.find((item) => item.id === source);
  if (sourceScope) {
    const withoutSource = items.filter((item) => item.id !== source);
    const targetIndex = withoutSource.findIndex((item) => item.id === target);
    if (targetIndex >= 0) return [...withoutSource.slice(0, targetIndex), sourceScope, ...withoutSource.slice(targetIndex)];
  }
  return items.map((item) => item.children ? { ...item, children: moveScope(item.children, source, target) } : item);
}

export function SecurityScopeConsole() {
  const [scopes, setScopes] = React.useState(initialScopes);
  const [expanded, setExpanded] = React.useState<string[]>(["endpoint", "threat"]);
  const [selected, setSelected] = React.useState("suspicious");
  const [workspace, setWorkspace] = React.useState("All Workspaces");
  const [section, setSection] = React.useState("Security");
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [dragged, setDragged] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen(true); } };
    window.addEventListener("keydown", listener); return () => window.removeEventListener("keydown", listener);
  }, []);
  const toggleExpanded = (id: string) => setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const addScope = () => setScopes((current) => [...current, { id: `scope-${Date.now()}`, name: "New Security Scope", count: 0 }]);
  const duplicateScope = () => setScopes((current) => [...current, { ...initialScopes[0], id: `copy-${Date.now()}`, name: "Endpoint Security Copy" }]);
  const renderRows = (items: Scope[], depth = 0): React.ReactNode => items.map((item) => {
    const isOpen = expanded.includes(item.id);
    const matches = item.name.toLowerCase().includes(query.toLowerCase());
    const children = item.children ? renderRows(item.children, depth + 1) : null;
    if (query && !matches && !children) return null;
    const Icon = depth === 0 ? (item.id === "endpoint" ? IconGlobe : item.id === "identity" ? IconShield : item.id === "application" ? IconCloud : IconDatabase) : item.children ? IconSitemap : IconCircleCheck;
    return <React.Fragment key={item.id}><div draggable onDragStart={() => setDragged(item.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragged && dragged !== item.id) setScopes((current) => moveScope(current, dragged, item.id)); setDragged(null); }} className={`group flex h-8 items-center gap-1 rounded-md px-1.5 text-xs ${selected === item.id ? "bg-muted font-medium" : "hover:bg-muted/60"}`} style={{ marginLeft: depth * 18 }}><button aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.name}`} onClick={() => item.children && toggleExpanded(item.id)} className="grid size-4 shrink-0 place-items-center text-muted-foreground">{item.children ? isOpen ? <IconChevronDown className="size-3.5" /> : <IconChevronRight className="size-3.5" /> : <IconSortAscending className="size-3.5 opacity-50" />}</button><span className="cursor-grab text-muted-foreground/50">⠿</span><Icon className="size-4 shrink-0 text-muted-foreground" /><button onClick={() => setSelected(item.id)} className="min-w-0 flex-1 truncate text-left">{item.name}</button>{item.count !== undefined && <span className="rounded border px-1 text-[10px]">{item.count}</span>}{item.badge && <span className={`ml-auto rounded px-1.5 py-0.5 text-[10px] ${item.badge === "High" ? "bg-rose-100 text-rose-700" : item.badge === "Stable" || item.badge === "Active" ? "bg-emerald-100 text-emerald-700" : "text-muted-foreground"}`}>{item.badge}</span>}</div>{item.children && isOpen && children}</React.Fragment>;
  });
  return <section className="flex h-svh min-h-0 flex-col overflow-hidden bg-background text-foreground">
    <header className="flex h-[3.125rem] items-center gap-3 border-b px-4"><span className="grid size-7 place-items-center rounded-lg border text-sm font-bold">N</span><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="h-7 text-xs">{workspace}<IconChevronDown className="size-3.5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="start"><DropdownMenuLabel>Choose workspace</DropdownMenuLabel><DropdownMenuSeparator />{["All Workspaces", "North America", "EMEA", "APAC"].map((item) => <DropdownMenuItem key={item} onSelect={() => setWorkspace(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu><nav className="ml-auto hidden items-center gap-1 md:flex">{sections.map((item, i) => { const Icon = [IconShield, IconBell, IconShieldCheck, IconDatabase, IconFileText][i]; return <button key={item} onClick={() => setSection(item)} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs ${section === item ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted"}`}><Icon className="size-3.5" />{item}</button>; })}</nav><div className="ml-auto flex items-center gap-1 md:ml-3"><Button variant="ghost" size="icon" aria-label="Search" onClick={() => setCommandOpen(true)}><IconSearch className="size-4" /></Button><Button variant="ghost" size="icon" aria-label="Settings" onClick={() => setFeedback("Settings opened")}><IconStack2 className="size-4" /></Button><Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => setNotificationsOpen(true)}><IconBell className="size-4" /></Button><span className="mx-1 grid size-6 place-items-center rounded-full bg-muted text-[10px]">JD</span><Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setFeedback("Security scan started")}>Run Scan</Button></div></header>
    <div className="grid min-h-0 flex-1 md:grid-cols-[18rem_minmax(0,1fr)]"><aside className="min-h-0 overflow-y-auto border-r p-3"><div className="mb-2 flex items-center gap-1 rounded-lg border bg-muted/40 p-1">{scopeIcons.map((Icon, index) => <button key={index} aria-label={`Scope view ${index + 1}`} onClick={() => setFeedback(`View ${index + 1} selected`)} className="grid size-6 flex-1 place-items-center rounded text-muted-foreground hover:bg-background"><Icon className="size-3.5" /></button>)}<Button variant="outline" size="icon" className="size-7 shrink-0" aria-label="Add scope" onClick={addScope}><IconPlus className="size-4" /></Button></div><div className="flex items-center justify-between px-1 py-1.5"><h2 className="text-xs text-muted-foreground">Security Scope</h2><DropdownMenu><DropdownMenuTrigger asChild><button aria-label="Scope actions" className="text-xs text-muted-foreground">•••</button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={addScope}>Add scope</DropdownMenuItem><DropdownMenuItem onSelect={duplicateScope}>Duplicate Endpoint Security</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div><div className="max-h-[34rem] overflow-y-auto">{renderRows(scopes)}</div><p className="mt-2 px-2 text-[10px] text-muted-foreground">Drag rows to reorder scopes</p></aside><main className="min-h-0 min-w-0 overflow-y-auto p-4"><div className="grid gap-4 xl:grid-cols-3">{Array.from({ length: 9 }, (_, index) => <article key={index} className={`rounded-2xl border bg-card ${index < 3 ? "h-[9.5rem]" : "h-[18.5rem]"}`}><div className="flex items-start justify-between border-b p-4"><span className="size-7 rounded-lg bg-muted" /><span className="size-7 rounded-lg bg-muted/70" /></div><div className="flex items-center gap-2 p-4"><span className="h-6 w-12 rounded-md bg-muted" /><span className="h-4 w-28 rounded-md bg-muted/70" /></div>{index < 3 && <div className="flex items-center justify-between border-t px-4 py-2"><span className="flex -space-x-2">{[1,2,3,4,5].map((n)=><span key={n} className="size-6 rounded-full border-2 border-card bg-muted" />)}</span><span className="h-3 w-16 rounded-full bg-muted" /></div>}</article>)}</div></main></div>
    {feedback && <div role="status" className="fixed bottom-5 right-5 z-30 rounded-lg border bg-card px-4 py-3 text-sm shadow-lg">{feedback}</div>}
    <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}><SheetContent side="right" className="w-[min(24rem,calc(100vw-2rem))] sm:max-w-sm"><SheetHeader><SheetTitle>Security notifications</SheetTitle></SheetHeader><div className="mt-4 space-y-3">{["Suspicious sign-in detected", "Threat scan completed", "3 devices need review", "Policy change requested"].map((item, index) => <article key={item} className="rounded-lg border p-3"><p className="text-sm">{item}</p><p className="mt-1 text-xs text-muted-foreground">{index + 1}m ago · Security scope</p></article>)}</div></SheetContent></Sheet>
    <Sheet open={commandOpen} onOpenChange={setCommandOpen}><SheetContent side="top" className="mx-auto mt-[10vh] max-w-xl rounded-xl border"><SheetHeader><SheetTitle>Search security scopes</SheetTitle></SheetHeader><div className="relative mt-4"><IconSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder="Search scopes and assets…" className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none" /></div><div className="mt-3 space-y-1">{["Endpoint Security", "Threat Detection", "Suspicious Activity", "Managed Devices"].filter((item) => !query || item.toLowerCase().includes(query.toLowerCase())).map((item) => <button key={item} onClick={() => { setSelected(item.toLowerCase().replaceAll(" ", "-")); setCommandOpen(false); }} className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">{item}</button>)}</div></SheetContent></Sheet>
  </section>;
}
