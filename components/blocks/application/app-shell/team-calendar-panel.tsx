"use client";

import * as React from "react";
import { IconActivity, IconCheck, IconChevronRight, IconDots, IconFolder, IconHome2, IconLayoutSidebar, IconSearch, IconShieldCheck, IconUsers } from "@tabler/icons-react";
import { CalendarSidebar, ClaudeWorkspace, NewCalendarEventDialog, ProjectBrand, ShellPreview } from "@/components/blocks/application/app-shell/shell-preview";
import { AvatarStack } from "@/components/blocks/application/app-shell/shell-preview";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

const sections = [
  { label: "Dashboard", icon: IconHome2 },
  { label: "Projects", icon: IconFolder },
  { label: "My Tasks", icon: IconCheck },
  { label: "Issues", icon: IconActivity, nested: true },
  { label: "Team", icon: IconUsers, nested: true },
  { label: "Reports", icon: IconShieldCheck },
];
const members = ["Daniel Parker", "Matthew Reed", "Ryan Brooks", "Lena Dawson", "Sophie Bennett", "Liam Carter"];

export function TeamCalendarPanel() {
  const [panelOpen, setPanelOpen] = React.useState(true);
  const [selected, setSelected] = React.useState("Dashboard");
  const [query, setQuery] = React.useState("");
  const [calendarDate, setCalendarDate] = React.useState({ year: 2026, month: 1, day: 24 });
  const [eventOpen, setEventOpen] = React.useState(false);
  const [shareFeedback, setShareFeedback] = React.useState(false);

  return (
    <ShellPreview>
      <div className="flex h-full min-h-0 min-w-0 bg-background">
        <aside className="flex w-[15.5rem] shrink-0 flex-col bg-neutral-950 p-3 text-neutral-100">
          <div className="flex h-12 items-center px-2"><ProjectBrand /><Button variant="ghost" size="icon" aria-label="Workspace menu" className="ml-auto size-8 text-neutral-300 hover:bg-white/10 hover:text-white"><IconChevronRight className="size-4 rotate-90" /></Button></div>
          <div className="relative mt-3"><IconSearch className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-neutral-400" /><Input aria-label="Search team members" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search..." className="h-9 border-white/15 bg-transparent pl-8 pr-12 text-neutral-100 placeholder:text-neutral-400" /><kbd className="pointer-events-none absolute right-2 top-2 rounded bg-white/10 px-1 text-xs text-neutral-300">⌘K</kbd></div>
          <nav aria-label="Platform" className="mt-4 grid gap-0.5">
            <p className="px-2 py-2 text-xs text-neutral-400">Platform</p>
            {sections.map(({ label, icon: Icon, nested }) => <button key={label} type="button" aria-current={selected === label ? "page" : undefined} onClick={() => setSelected(label)} className={`flex h-9 items-center gap-2 rounded-lg px-2 text-sm transition-colors duration-150 hover:bg-white/10 motion-reduce:transition-none ${selected === label ? "bg-white/10 text-white" : "text-neutral-300"}`}><Icon className="size-4" /><span className="flex-1 text-left">{label}</span>{nested && <IconChevronRight className="size-3.5" />}</button>)}
          </nav>
          <section className="mt-4 min-h-0 flex-1 overflow-auto">
            <div className="mb-2 flex items-center px-2 text-xs text-neutral-400"><span>Team Members</span><IconChevronRight className="ml-auto size-3.5 rotate-90" /></div>
            {members.filter(name => name.toLowerCase().includes(query.toLowerCase())).map(name => { const index = members.indexOf(name); return <div key={name} className="flex h-9 items-center gap-2 px-1.5 text-sm text-neutral-300"><span className="grid size-6 place-items-center rounded-full bg-neutral-800 text-[10px]">{name.split(" ").map(part => part[0]).join("")}</span><span className="min-w-0 flex-1 truncate">{name}</span><span className={`size-2 rounded-full ${index === 2 ? "bg-amber-400" : "bg-emerald-400"}`} /></div>; })}
          </section>
          <div className="mb-2 rounded-xl border border-white/15 p-3">
            <div className="text-xs font-medium text-amber-400">Spending Limit</div>
            <p className="mt-2 text-xs leading-4 text-neutral-400">Consumption and balance will be reset at the end of the month</p>
            <div className="mt-2 h-1.5 rounded-full bg-neutral-800"><div className="h-full w-[82%] rounded-full bg-emerald-500" /></div>
            <div className="mt-1 flex justify-between text-[10px] text-neutral-400"><span><b className="text-neutral-200">82%</b> Used</span><span><b className="text-neutral-200">18%</b> Free</span></div>
          </div>
          <ClaudeWorkspace />
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <div className="flex min-w-0 flex-1 items-center gap-2 text-sm"><IconHome2 className="size-4 shrink-0 text-muted-foreground" /><span className="text-muted-foreground">Home</span><span className="text-muted-foreground">—</span><span className="font-medium">Overview</span></div>
            <AvatarStack names={members.slice(0, 3)} />
            <Button variant="ghost" size="icon" className="size-8" aria-label="More workspace actions"><IconDots className="size-4" /></Button>
            <Button variant="ghost" size="icon" className="size-8" aria-label={panelOpen ? "Hide calendar panel" : "Show calendar panel"} aria-expanded={panelOpen} onClick={() => setPanelOpen(open => !open)}><IconLayoutSidebar className="size-4" /></Button>
          </header>
        </main>
        <aside className={`hidden min-h-0 shrink-0 overflow-hidden transition-[width,opacity] duration-200 motion-reduce:transition-none lg:block ${panelOpen ? "w-[17.5rem] border-l opacity-100" : "w-0 border-l-0 opacity-0"}`} aria-hidden={!panelOpen}>
          {panelOpen && <CalendarSidebar year={calendarDate.year} month={calendarDate.month} selectedDay={calendarDate.day} onSelectDay={day => setCalendarDate(current => ({ ...current, day }))} onMonthChange={(year, month) => setCalendarDate(current => ({ ...current, year, month }))} onNewEvent={() => setEventOpen(true)} onShare={() => setShareFeedback(true)} side="right" timezone />}
        </aside>
      </div>
      <NewCalendarEventDialog open={eventOpen} onOpenChange={setEventOpen} onCreate={() => setEventOpen(false)} />
      {shareFeedback && <div role="status" className="fixed bottom-4 right-4 z-20 rounded-lg border bg-background px-3 py-2 text-sm shadow-lg">Availability link copied</div>}
    </ShellPreview>
  );
}
