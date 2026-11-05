"use client";

import * as React from "react";
import { IconBell, IconCheck, IconChevronDown, IconCircleCheck, IconCommand, IconCpu, IconGridDots, IconLayoutGrid, IconMapPin, IconPlus, IconRobot, IconSettings, IconStar, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet/sheet";

const navigation = [
  { title: "Robot Fleet", icon: IconCpu, links: ["Overview", "Robots", "Stations", "Fleet Map", "Device Groups", "Robot Health"] },
  { title: "Mission Control", icon: IconCommand, links: ["Missions", "Requests", "Schedules", "Issue Reports"] },
  { title: "System Tools", icon: IconSettings, links: ["Integrations", "Automations", "Team Access", "Activity Logs"] },
];
const workspaces = ["Operations Team", "Field Services", "R&D Lab"];
const projects = ["Fleet Control", "North America", "Recharge Pilot"];
const notifications = [
  "Mission #204 is ready for approval", "R1-06 requested station access", "Inspection report needs review", "Recharge route was updated", "Robot R2-11 needs attention", "New station added to the fleet", "Mission #198 completed", "Team access request received", "Weekly fleet summary is ready",
];
const apps = ["Fleet", "Missions", "Stations", "Maps", "Reports", "Devices", "Requests", "Team", "Settings"];

export function TeamProjectSwitcher() {
  const [team, setTeam] = React.useState(workspaces[0]);
  const [project, setProject] = React.useState(projects[0]);
  const [active, setActive] = React.useState("Stations");
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [appsOpen, setAppsOpen] = React.useState(false);
  const [notice, setNotice] = React.useState("2 pending approvals");
  const [feedback, setFeedback] = React.useState("");

  return (
    <section className="flex h-svh min-h-0 flex-col overflow-hidden bg-background text-foreground">
      <header className="flex h-[3.125rem] items-center justify-between border-b px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <a href="#" aria-label="Home" className="flex items-center gap-1.5 rounded-md border px-1.5 py-1 text-[10px] font-semibold tracking-[.18em]"><span className="grid size-4 place-items-center rounded border text-xs font-bold">N</span><span>NEXTROSE</span></a>
          <span className="mx-1 h-5 w-px bg-border" />
          <DropdownMenu><DropdownMenuTrigger asChild><button className="flex max-w-40 items-center gap-1 rounded-md px-2 py-1.5 font-medium hover:bg-muted"><span className="truncate">{team}</span><IconChevronDown className="size-3.5 shrink-0" /></button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Switch team</DropdownMenuLabel><DropdownMenuSeparator />{workspaces.map((item) => <DropdownMenuItem key={item} onSelect={() => setTeam(item)}>{item}{team === item && <IconCheck className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
          <span className="text-muted-foreground">/</span>
          <DropdownMenu><DropdownMenuTrigger asChild><button className="flex max-w-40 items-center gap-1 rounded-md px-2 py-1.5 font-medium hover:bg-muted"><span className="truncate">{project}</span><IconChevronDown className="size-3.5 shrink-0" /></button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Switch project</DropdownMenuLabel><DropdownMenuSeparator />{projects.map((item) => <DropdownMenuItem key={item} onSelect={() => setProject(item)}>{item}{project === item && <IconCheck className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <DropdownMenu open={appsOpen} onOpenChange={setAppsOpen}><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Apps"><IconLayoutGrid className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-64 p-3"><div className="grid grid-cols-3 gap-2">{apps.map((app, i) => <button key={app} onClick={() => { setFeedback(`${app} opened`); setAppsOpen(false); }} className="flex flex-col items-center gap-2 rounded-lg p-3 text-xs hover:bg-muted"><span className="grid size-9 place-items-center rounded-xl border bg-background">{i % 3 === 0 ? <IconRobot className="size-4" /> : i % 3 === 1 ? <IconGridDots className="size-4" /> : <IconMapPin className="size-4" />}</span>{app}</button>)}</div></DropdownMenuContent></DropdownMenu>
          <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => setFeedback("Settings opened")}><IconSettings className="size-4" /></Button>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative" onClick={() => setNotificationsOpen(true)}><IconBell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-amber-500" /></Button>
          <button aria-label="User profile" className="mx-1 grid size-7 place-items-center rounded-full bg-muted text-xs font-medium">JD</button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => setFeedback("New mission created")}>New Mission</Button>
          <Button variant="outline" size="icon" className="sm:hidden" aria-label="New mission" onClick={() => setFeedback("New mission created")}><IconPlus className="size-4" /></Button>
        </div>
      </header>
      <div className="grid min-h-0 flex-1 md:grid-cols-[16.25rem_minmax(0,1fr)]">
        <aside className="hidden min-h-0 overflow-y-auto border-r p-4 md:block">
          {navigation.map((group) => <section key={group.title} className="mb-3"><h2 className="flex items-center gap-2 px-2 py-2 text-sm font-medium"><group.icon className="size-4 text-muted-foreground" />{group.title}</h2><nav className="space-y-0.5">{group.links.map((link) => <button key={link} onClick={() => link !== "Activity Logs" && setActive(link)} disabled={link === "Activity Logs"} className={`block w-full rounded-md px-3 py-1.5 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:text-muted-foreground/50 ${active === link ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}>{link}</button>)}</nav></section>)}
          <div className="mt-4 rounded-xl border bg-card p-3"><div className="grid h-24 place-items-center rounded-lg bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:12px_12px]"><span className="grid size-10 place-items-center rounded-lg border bg-background shadow-sm"><IconRobot className="size-5" /></span></div><p className="mt-2 text-xs font-medium">Fleet status</p><p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><span className="size-1.5 rounded-full bg-emerald-500" />All systems operational</p></div>
        </aside>
        <main className="min-h-0 min-w-0 overflow-y-auto bg-muted/20 p-4 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-2">{Array.from({ length: 6 }, (_, index) => <article key={index} className={`rounded-2xl border bg-card p-4 shadow-sm ${index === 3 ? "lg:row-span-1" : ""}`}><div className="space-y-2"><div className="h-4 rounded-full bg-muted" /><div className="h-4 rounded-full bg-muted" /></div><div className={`mt-6 rounded-xl bg-muted/80 ${index === 3 ? "h-44" : "h-16"}`} /></article>)}</div>
          {feedback && <div role="status" className="fixed bottom-5 right-5 z-20 rounded-lg border bg-card px-4 py-3 text-sm shadow-lg">{feedback}</div>}
        </main>
      </div>
      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}><SheetContent side="right" className="w-[min(26rem,calc(100vw-2rem))] p-0 sm:max-w-md"><SheetHeader className="border-b px-5 py-4"><div className="flex items-center justify-between"><SheetTitle>Notifications</SheetTitle><span className="text-xs text-muted-foreground">9 updates</span></div></SheetHeader><div className="divide-y">{notifications.map((item, index) => <div key={item} className="flex gap-3 px-5 py-3.5"><span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-muted"><IconCircleCheck className="size-4 text-muted-foreground" /></span><div className="min-w-0 flex-1"><p className="text-sm">{item}</p><p className="mt-1 text-xs text-muted-foreground">{index + 1}h ago</p>{index < 2 && <div className="mt-2 flex gap-1"><Button size="sm" className="h-7 px-2.5" onClick={() => { setNotice("Approval recorded"); setFeedback("Approval recorded"); }}><IconCheck className="mr-1 size-3.5" />Approve</Button><Button size="sm" variant="ghost" className="h-7 px-2.5" onClick={() => setNotice("Request dismissed")}><IconX className="mr-1 size-3.5" />Dismiss</Button></div>}{index === 2 && <div className="mt-2 flex gap-0.5" aria-label="Rate inspection"><button aria-label="Rate 1 star" onClick={() => setNotice("Rated 1 star")}><IconStar className="size-4" /></button><button aria-label="Rate 2 stars" onClick={() => setNotice("Rated 2 stars")}><IconStar className="size-4" /></button><button aria-label="Rate 3 stars" onClick={() => setNotice("Rated 3 stars")}><IconStar className="size-4" /></button></div>}</div></div>)}</div><div className="border-t px-5 py-3 text-xs text-muted-foreground">{notice}</div></SheetContent></Sheet>
    </section>
  );
}
