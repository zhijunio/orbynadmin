"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, XAxis } from "recharts";
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronDown,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconFile,
  IconFilter,
  IconGridDots,
  IconHome2,
  IconPlus,
  IconSearch,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart/chart";
import { Input } from "@/components/ui/input/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type ModuleStatus = "In Progress" | "Planned" | "Backlog";
type ModuleRecord = { id: string; name: string; category: string; owner: string; initials: string; domain: string; progress: number; tasks: string; window: string; duration: number; status: ModuleStatus; favorite: boolean };
type ModuleFilter = "In Progress" | "Planned" | "Backlog";

const initialModules: ModuleRecord[] = [
  { id: "access-matrix", name: "Access Matrix", category: "System", owner: "Nora Vale", initials: "NV", domain: "admin.example", progress: 42, tasks: "11/26 tasks", window: "Apr 22 - May 06", duration: 14, status: "In Progress", favorite: true },
  { id: "api-console", name: "API Console", category: "Feature", owner: "Lena Wade", initials: "LW", domain: "api.example", progress: 91, tasks: "29/32 tasks", window: "Apr 12 - Apr 26", duration: 14, status: "In Progress", favorite: true },
  { id: "block-library", name: "Block Library", category: "Feature", owner: "Sofia Romero", initials: "SR", domain: "blocks.example", progress: 33, tasks: "10/30 tasks", window: "Apr 24 - May 10", duration: 16, status: "Planned", favorite: false },
  { id: "data-retention", name: "Data Retention", category: "System", owner: "Kenji Tan", initials: "KT", domain: "privacy.example", progress: 22, tasks: "7/32 tasks", window: "Apr 27 - May 14", duration: 17, status: "Backlog", favorite: false },
  { id: "docs-portal", name: "Docs Portal", category: "Area", owner: "Nina Santos", initials: "NS", domain: "docs.example", progress: 0, tasks: "2/14 tasks", window: "Apr 21 - May 05", duration: 14, status: "In Progress", favorite: false },
  { id: "help-center", name: "Help Center", category: "Area", owner: "Sofia Romero", initials: "SR", domain: "help.example", progress: 39, tasks: "9/23 tasks", window: "Apr 23 - May 11", duration: 18, status: "Planned", favorite: false },
  { id: "integration-hub", name: "Integration Hub", category: "Area", owner: "Kenji Tan", initials: "KT", domain: "integrations.example", progress: 58, tasks: "14/24 tasks", window: "Apr 20 - May 04", duration: 14, status: "In Progress", favorite: false },
  { id: "license-billing", name: "License Billing", category: "Feature", owner: "Elijah Morgan", initials: "EM", domain: "billing.example", progress: 64, tasks: "21/33 tasks", window: "Apr 18 - May 02", duration: 14, status: "In Progress", favorite: false },
  { id: "pro-onboarding", name: "Pro Onboarding", category: "Area", owner: "Jonah Lee", initials: "JL", domain: "pro.example", progress: 0, tasks: "0/18 tasks", window: "Apr 19 - May 03", duration: 14, status: "Backlog", favorite: false },
  { id: "registry-sync", name: "Registry Sync", category: "System", owner: "Nora Vale", initials: "NV", domain: "registry.example", progress: 25, tasks: "8/32 tasks", window: "Apr 17 - May 01", duration: 14, status: "Planned", favorite: false },
  { id: "release-checklist", name: "Release Checklist", category: "Area", owner: "Nina Santos", initials: "NS", domain: "release.example", progress: 84, tasks: "26/31 tasks", window: "Apr 16 - May 01", duration: 15, status: "In Progress", favorite: false },
  { id: "release-notes", name: "Release Notes", category: "Area", owner: "Priya Shah", initials: "PS", domain: "changelog.example", progress: 18, tasks: "5/28 tasks", window: "Apr 23 - May 09", duration: 16, status: "Backlog", favorite: false },
  { id: "role-automation", name: "Role Automation", category: "System", owner: "Nora Vale", initials: "NV", domain: "admin.example", progress: 12, tasks: "3/25 tasks", window: "Apr 25 - May 12", duration: 17, status: "Backlog", favorite: false },
  { id: "security-review", name: "Security Review", category: "System", owner: "Omar Haddad", initials: "OH", domain: "trust.example", progress: 69, tasks: "18/26 tasks", window: "Apr 18 - May 07", duration: 19, status: "In Progress", favorite: false },
  { id: "team-invites", name: "Team Invites", category: "Feature", owner: "Jonah Lee", initials: "JL", domain: "teams.example", progress: 47, tasks: "15/32 tasks", window: "Apr 19 - May 06", duration: 17, status: "Planned", favorite: false },
  { id: "trust-audit", name: "Trust Audit", category: "System", owner: "Omar Haddad", initials: "OH", domain: "trust.example", progress: 76, tasks: "19/25 tasks", window: "Apr 15 - Apr 30", duration: 15, status: "In Progress", favorite: false },
  { id: "usage-digest", name: "Usage Digest", category: "Feature", owner: "Priya Shah", initials: "PS", domain: "reports.example", progress: 5, tasks: "2/38 tasks", window: "Apr 28 - May 16", duration: 18, status: "Backlog", favorite: false },
];

const revenueData = [32, 36, 34, 40, 37, 42, 39, 47, 43, 51, 46, 50, 48, 57, 52, 60, 56, 62].map((value, day) => ({ value, day }));
const signupData = [22, 24, 22, 27, 25, 28, 26, 35, 30, 34, 31, 40, 35, 43, 38, 46, 40, 48].map((value, day) => ({ value, day }));
const licenseData = [43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 52].map((value, day) => ({ value, day }));
const filterOptions: ModuleFilter[] = ["In Progress", "Planned", "Backlog"];

export function ModuleTracker() {
  const [modules, setModules] = useState<ModuleRecord[]>(initialModules);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ModuleFilter[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortDescending, setSortDescending] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [notice, setNotice] = useState("");
  const [archivedRecord, setArchivedRecord] = useState<ModuleRecord | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const rows = modules.filter((record) => {
      const matchesSearch = !query || `${record.name} ${record.category} ${record.owner} ${record.domain}`.toLowerCase().includes(query);
      return matchesSearch && (!filters.length || filters.includes(record.status));
    });
    return [...rows].sort((left, right) => sortDescending ? right.name.localeCompare(left.name) : left.name.localeCompare(right.name));
  }, [filters, modules, search, sortDescending]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleModules = filtered.slice((page - 1) * pageSize, page * pageSize);

  function notify(message: string) {
    setArchivedRecord(null);
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function addModule() {
    const row: ModuleRecord = { id: `module-${Date.now()}`, name: "New Module", category: "System", owner: "Admin", initials: "AD", domain: "new-module.example", progress: 0, tasks: "0/12 tasks", window: "May 12 - May 26", duration: 14, status: "Backlog", favorite: false };
    setModules((current) => [...current, row]);
    setFilters([]);
    setSearch("");
    setPage(1);
  }

  function toggleFilter(status: ModuleFilter) {
    setFilters((current) => current.includes(status) ? current.filter((item) => item !== status) : [...current, status]);
    setPage(1);
  }

  function toggleFavorite(id: string) {
    setModules((current) => current.map((record) => record.id === id ? { ...record, favorite: !record.favorite } : record));
  }

  function duplicateModule(record: ModuleRecord) {
    setModules((current) => [...current, { ...record, id: `module-${Date.now()}`, name: `${record.name} copy`, favorite: false }]);
    notify(`${record.name} duplicated`);
  }

  function archiveModule(id: string) {
    const archivedRecord = modules.find((item) => item.id === id);
    setModules((current) => current.filter((item) => item.id !== id));
    if (archivedRecord) setArchivedRecord(archivedRecord);
    setNotice(`${archivedRecord?.name ?? "Module"} archived`);
    window.setTimeout(() => setNotice(""), 5000);
    if (visibleModules.length === 1 && page > 1) setPage((current) => current - 1);
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1216px] text-foreground">
      <header className="flex min-h-12 items-center gap-2 border-b px-4">
        <IconHome2 className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Home</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium">Operations</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden -space-x-2 sm:flex" aria-label="Team members">{["Nora Vale", "Lena Wade", "Sofia Romero"].map((name) => <Avatar key={name} size="sm" className="ring-2 ring-background"><AvatarImage src={demoAvatarUrl(name)} alt="" /><AvatarFallback className="text-[9px]">{name.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar>)}<span className="grid size-7 place-items-center rounded-full border-2 border-background bg-muted text-[9px]">+8</span></div>
          <Button variant="outline" size="sm" className="h-8" onClick={() => notify("Invite link copied")}><IconUsers className="size-4" />Invite</Button>
          <button type="button" className="grid size-8 place-items-center rounded-md hover:bg-muted" aria-label="More workspace actions" onClick={() => notify("Workspace actions opened")}><IconDots className="size-4" /></button>
        </div>
      </header>

      <div className="space-y-8.5 pt-8">
        <div className="grid gap-3 md:grid-cols-3">
          <MetricCard title="Revenue" caption="Operations, 28 days" value="$62.4K" data={revenueData} color="var(--success)" />
          <MetricCard title="Signups" caption="Last 28 days" value="4,238" data={signupData} color="var(--chart-1)" />
          <MetricCard title="Active Licenses" caption="Cloud services, 28 days" value="3,297" data={licenseData} color="var(--info)" />
        </div>

        <section aria-label="Modules">
          <div className="flex flex-wrap items-center gap-2 pb-2.5">
            <span className="flex items-center gap-2 text-xs text-muted-foreground"><IconGridDots className="size-4" />Operations</span>
            <span className="text-muted-foreground">›</span>
            <h2 className="mr-auto text-sm font-medium">Modules</h2>
            <label className="relative min-w-40 flex-1 sm:max-w-48"><IconSearch className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search..." aria-label="Search modules" className="h-8 pl-8 text-xs" /></label>
            <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={() => setSortDescending((current) => !current)} aria-label="Sort by module name" aria-pressed={sortDescending}><span className="text-xs">Name</span>{sortDescending ? <IconArrowDown className="size-3.5" /> : <IconArrowUp className="size-3.5" />}<IconChevronDown className="size-3" /></Button>
            <div className="relative">
              <Button variant="outline" size="sm" className="h-8" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)}><IconFilter className="size-3.5" />Filters{filters.length > 0 && <span className="rounded bg-muted px-1 text-[10px]">{filters.length}</span>}</Button>
              {filtersOpen && <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border bg-popover p-1 shadow-md" role="group" aria-label="Filter by status">{filterOptions.map((status) => <button key={status} type="button" aria-pressed={filters.includes(status)} onClick={() => toggleFilter(status)} className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-xs hover:bg-muted">{status}{filters.includes(status) && <span aria-hidden="true">✓</span>}</button>)}</div>}
            </div>
            <Button size="sm" className="h-8" onClick={addModule}><IconPlus className="size-3.5" />Add Module</Button>
          </div>

          <div className="overflow-x-auto border-t">
            <Table>
              <TableHeader><TableRow className="h-8 hover:bg-transparent"><TableHead className="h-8 min-w-48 py-0 pl-3"><button type="button" className="flex items-center gap-1" onClick={() => setSortDescending((current) => !current)}>Progress<IconArrowUp className="size-3.5" /></button></TableHead><TableHead className="h-8 min-w-64 py-0"><button type="button" className="flex items-center gap-1" onClick={() => setSortDescending((current) => !current)}>Module<IconArrowUp className="size-3.5" /></button></TableHead><TableHead className="h-8 min-w-44 py-0">Window</TableHead><TableHead className="h-8 py-0">Status</TableHead><TableHead className="h-8 w-28 py-0">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {visibleModules.length ? visibleModules.map((record) => <TableRow key={record.id} className="h-16 [&>td]:py-2">
                  <TableCell className="pl-3"><div className="flex items-center gap-2"><ProgressRing value={record.progress} /><div className="min-w-0"><span className="block whitespace-nowrap text-sm font-medium">{record.progress}% ready</span><span className="block whitespace-nowrap text-xs text-muted-foreground">{record.tasks}</span></div></div></TableCell>
                  <TableCell><div className="flex min-w-0 items-center gap-2"><span className="min-w-0"><span className="block truncate text-sm font-medium">{record.name}</span><span className="mt-0.5 flex min-w-0 items-center gap-1 text-xs text-muted-foreground"><span>{record.category}</span><span>·</span><Avatar className="size-4"><AvatarImage src={demoAvatarUrl(record.owner)} alt="" /><AvatarFallback className="text-[7px]">{record.initials}</AvatarFallback></Avatar><span className="truncate">{record.owner}</span><span>·</span><span className="truncate font-mono">{record.domain}</span></span></span></div></TableCell>
                  <TableCell><span className="block whitespace-nowrap text-sm">{record.window}</span><span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><IconCalendar className="size-3.5" />{record.duration}-day window</span></TableCell>
                  <TableCell><Badge variant={record.status === "In Progress" ? "warning-outline" : record.status === "Planned" ? "primary-outline" : "outline"}><span className={`mr-1 size-1.5 rounded-full ${record.status === "In Progress" ? "bg-warning" : record.status === "Planned" ? "bg-primary" : "bg-muted-foreground"}`} />{record.status}</Badge></TableCell>
                  <TableCell><div className="flex items-center gap-1"><button type="button" className="grid size-7 place-items-center rounded hover:bg-muted" aria-label={`Open ${record.name}`} onClick={() => notify(`${record.name} opened`)}><IconFile className="size-4" /></button><button type="button" className="grid size-7 place-items-center rounded hover:bg-muted" aria-label={record.favorite ? `Unfavorite ${record.name}` : `Favorite ${record.name}`} aria-pressed={record.favorite} onClick={() => toggleFavorite(record.id)}><IconStar className={`size-4 ${record.favorite ? "fill-warning text-warning" : ""}`} /></button><details className="group relative"><summary className="grid size-7 cursor-pointer list-none place-items-center rounded hover:bg-muted" aria-label={`More actions for ${record.name}`}><IconDots className="size-4" /></summary><div className="absolute right-0 top-8 z-20 w-28 rounded-lg border bg-popover p-1 shadow-md"><button className="block w-full rounded px-2 py-1.5 text-left text-xs hover:bg-muted" onClick={() => duplicateModule(record)}>Duplicate</button><button className="block w-full rounded px-2 py-1.5 text-left text-xs text-destructive hover:bg-muted" onClick={() => archiveModule(record.id)}>Archive</button></div></details></div></TableCell>
                </TableRow>) : <TableRow><TableCell colSpan={5} className="h-24 text-center text-sm text-muted-foreground">No modules found.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t px-3 py-2.5 text-[11px] text-muted-foreground"><label className="flex items-center gap-2">Rows per page<select aria-label="Rows per page" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="h-8 rounded-md border bg-background px-2 text-xs text-foreground"><option value={10}>10</option><option value={20}>20</option></select></label><div className="flex items-center gap-2"><span>{filtered.length ? `${(page - 1) * pageSize + 1} - ${Math.min(page * pageSize, filtered.length)} of ${filtered.length} modules` : "0 modules"}</span><Button variant="ghost" size="icon-xs" aria-label="Go to previous page" disabled={page === 1} onClick={() => setPage((current) => current - 1)}><IconChevronLeft /></Button><span>{page}</span><Button variant="ghost" size="icon-xs" aria-label="Go to next page" disabled={page >= pageCount} onClick={() => setPage((current) => current + 1)}><IconChevronRight /></Button></div></footer>
        </section>
      </div>
      {notice && <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg border bg-popover px-4 py-3 text-sm shadow-lg">{notice}{archivedRecord && <button className="font-medium text-primary underline underline-offset-4" onClick={() => { setModules((current) => [archivedRecord, ...current]); setArchivedRecord(null); setNotice(`${archivedRecord.name} restored`); window.setTimeout(() => setNotice(""), 2400); }}>Undo</button>}</div>}
    </section>
  );
}

function MetricCard({ title, caption, value, data, color }: { title: string; caption: string; value: string; data: Array<{ value: number; day: number }>; color: string }) {
  const config = { value: { label: title, color } } satisfies ChartConfig;
  return <article className="flex h-[138px] items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3.5"><div className="min-w-0"><h3 className="text-sm font-medium">{title}</h3><p className="mt-6 truncate text-xs text-muted-foreground">{caption}</p><strong className="mt-0.5 block text-xl font-semibold tabular-nums">{value}</strong></div><ChartContainer config={config} className="h-[52px] w-[150px] shrink-0 aspect-auto" aria-label={`${title} for last 28 days`}><AreaChart accessibilityLayer data={data} margin={{ top: 3, right: 0, bottom: 0, left: 0 }}><XAxis dataKey="day" hide /><Area dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={1.75} fill="var(--color-value)" fillOpacity={0.08} isAnimationActive={false} /></AreaChart></ChartContainer></article>;
}

function ProgressRing({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 15;
  const color = value >= 80 ? "var(--success)" : value >= 40 ? "var(--warning)" : value > 0 ? "var(--primary)" : "var(--border)";
  return <span className="relative size-9 shrink-0" role="img" aria-label={`${value}% complete`}><svg viewBox="0 0 36 36" className="size-full -rotate-90"><circle cx="18" cy="18" r="15" fill="none" stroke="var(--muted)" strokeWidth="2.5" /><circle cx="18" cy="18" r="15" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} strokeLinecap="round" /></svg><span className="absolute inset-0 flex items-center justify-center text-[8px] text-muted-foreground">{value}%</span></span>;
}
