"use client";

import * as React from "react";
import { IconActivity, IconChevronDown, IconChevronRight, IconCloud, IconDatabase, IconGridDots, IconKey, IconMapPin, IconPlus, IconSearch, IconShield, IconShieldCheck, IconSitemap, IconStack2, IconUsers } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

const navGroups = [
  { title: "Fleet Overview", items: [["Overview", IconGridDots], ["Security Center", IconShieldCheck], ["Live Map", IconMapPin], ["All Robots", IconUsers], ["Zones", IconStack2]] as const },
  { title: "Fleet Activity", items: [["Live Status", IconActivity], ["Access Requests", IconKey], ["Event Feed", IconActivity]] as const },
];
const startRows = [
  { id: "devices", label: "Devices", count: 248 },
  { id: "overview", label: "Overview" },
  { id: "suspicious", label: "Suspicious Activity" },
  { id: "incidents", label: "Incidents" },
  { id: "anomalies", label: "Anomalies" },
  { id: "risks", label: "Risks", count: 37, badge: "High" },
  { id: "policies", label: "Policies", count: 8, add: true },
  { id: "quarantined", label: "Quarantined", count: 5 },
  { id: "tasks", label: "Tasks", count: 7, badge: "Active" },
];

type ScopeRow = (typeof startRows)[number] & { draft?: boolean };

export function RouteSearchSidebar() {
  const [rows, setRows] = React.useState<ScopeRow[]>(startRows);
  const [search, setSearch] = React.useState("");
  const [active, setActive] = React.useState("Security Center");
  const [tab, setTab] = React.useState("Security");
  const [open, setOpen] = React.useState(true);
  const [dragged, setDragged] = React.useState<string | null>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f") { event.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler);
  }, []);
  const addRow = (parent = "Endpoints") => setRows((current) => [...current, { id: `draft-${Date.now()}`, label: `New ${parent} scope`, draft: true }]);
  const filtered = rows.filter((row) => row.label.toLowerCase().includes(search.toLowerCase()));
  const moveRow = (target: string) => {
    if (!dragged || dragged === target) return;
    setRows((current) => {
      const next = [...current]; const from = next.findIndex((row) => row.id === dragged); const to = next.findIndex((row) => row.id === target);
      if (from < 0 || to < 0) return current;
      const [item] = next.splice(from, 1); next.splice(to, 0, item); return next;
    });
    setDragged(null);
  };
  return <section className="grid h-svh min-h-0 grid-rows-[minmax(0,1fr)] grid-cols-[13rem_16rem_minmax(0,1fr)] overflow-hidden bg-background text-foreground max-lg:grid-cols-[13rem_minmax(15rem,1fr)] max-md:grid-cols-[13rem_minmax(0,1fr)]">
    <aside className="flex min-h-0 min-w-0 flex-col overflow-y-auto border-r px-3 py-4"><a href="#" className="flex h-7 items-center gap-2 px-1 text-[10px] font-semibold tracking-[.18em]"><span className="grid size-6 place-items-center rounded-lg border text-sm font-bold">N</span>NEXTROSE<span className="ml-auto text-muted-foreground">◫</span></a><div className="relative mt-4"><IconSearch className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" /><Input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="h-8 pl-8 pr-10 text-xs" /><kbd className="absolute right-2 top-1.5 rounded border px-1 text-[10px] text-muted-foreground">⌘F</kbd></div><nav className="mt-4 space-y-4">{navGroups.map((group) => <section key={group.title}><h2 className="px-2 py-1.5 text-xs text-muted-foreground">{group.title}</h2>{group.items.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs ${active === label ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/60"}`}><Icon className="size-3.5" />{label}</button>)}</section>)}</nav><div className="mt-auto rounded-xl border bg-card p-3"><div className="grid h-16 place-items-center rounded-lg bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:12px_12px]"><span className="grid size-9 place-items-center rounded-lg border bg-background"><IconCloud className="size-4" /></span></div><p className="mt-2 text-xs font-medium">Integrations</p><p className="mt-1 text-[10px] text-muted-foreground">Connect fleet tools and data</p></div></aside>
    <aside className="min-h-0 min-w-0 overflow-y-auto border-r px-3 py-4 max-lg:hidden"><div className="grid grid-cols-3 rounded-lg border bg-muted/40 p-0.5">{["Security", "Assets", "Events"].map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-md py-1.5 text-[11px] ${tab === item ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}>{item}</button>)}</div><div className="mt-3 flex items-center justify-between px-1"><p className="text-xs text-muted-foreground">Security Scope</p><Button variant="outline" size="icon" className="size-7" aria-label="Add scope" onClick={() => addRow()}><IconPlus className="size-4" /></Button></div><div className="mt-1 flex items-center gap-1 rounded-md px-1.5 py-1.5 text-xs font-medium"><button aria-label={`${open ? "Collapse" : "Expand"} Endpoints`} onClick={() => setOpen(!open)}>{open ? <IconChevronDown className="size-3.5" /> : <IconChevronRight className="size-3.5" />}</button><IconShield className="size-4" /><span>Endpoints</span><span className="ml-auto rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-700">Stable</span></div>{open && <div className="ml-3 border-l pl-2">{filtered.map((row) => <div key={row.id} draggable onDragStart={() => setDragged(row.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveRow(row.id)} className={`group flex h-[1.875rem] items-center gap-1 rounded-md px-1 text-xs ${active === row.label ? "bg-muted font-medium" : "hover:bg-muted/60"}`}><button aria-label={`Reorder ${row.label}`} className="cursor-grab text-muted-foreground/60">⠿</button><button onClick={() => setActive(row.label)} className="min-w-0 flex-1 truncate text-left">{row.label}</button>{row.count !== undefined && <span className="rounded border px-1 text-[10px]">{row.count}</span>}{row.badge && <span className={`rounded px-1.5 py-0.5 text-[10px] ${row.badge === "High" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>{row.badge}</span>}{row.add && <button aria-label={`Add under ${row.label}`} onClick={() => addRow(row.label)} className="px-1 text-muted-foreground opacity-0 hover:text-foreground group-hover:opacity-100"><IconPlus className="size-3.5" /></button>}{row.draft && <span className="text-[9px] text-muted-foreground">Draft</span>}</div>)}</div>}{[["Identity & Access", "Add"], ["Application Security", ""], ["Data Protection", "Review"]].map(([label, action], index) => <div key={label} className="mt-1 flex h-8 items-center gap-1 rounded-md px-1 text-xs text-muted-foreground"><IconChevronRight className="size-3.5" />{index === 0 ? <IconShield className="size-4" /> : index === 1 ? <IconSitemap className="size-4" /> : <IconDatabase className="size-4" />}<span className="flex-1">{label}</span>{action === "Add" ? <Button variant="outline" size="sm" className="h-6 px-2 text-[10px]" onClick={() => addRow(label)}>Add</Button> : action}</div>)}</aside>
    <main className="min-h-0 min-w-0 overflow-y-auto p-4 max-md:hidden"><div className="grid gap-4 xl:grid-cols-3">{Array.from({ length: 9 }, (_, index) => <article key={index} className={`overflow-hidden rounded-2xl border bg-card ${index < 3 ? "h-[9.25rem]" : "h-[18.5rem]"}`}><div className="flex justify-between border-b p-4"><span className="flex items-center gap-2"><span className="size-7 rounded-lg bg-muted" /><span className="h-3 w-24 rounded-full bg-muted" /></span><span className="size-7 rounded-lg bg-muted/70" /></div><div className="flex items-center gap-2 p-4"><span className="h-6 w-12 rounded-md bg-muted" /><span className="h-4 w-28 rounded-md bg-muted/70" /></div>{index < 3 && <div className="flex items-center justify-between border-t px-4 py-2"><span className="flex -space-x-2">{[1,2,3,4,5].map((n)=><span key={n} className="size-6 rounded-full border-2 border-card bg-muted" />)}</span><span className="h-3 w-16 rounded-full bg-muted" /></div>}</article>)}</div></main>
  </section>;
}
