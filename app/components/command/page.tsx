"use client";

import { useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Button } from "@/components/ui/buttons/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd/kbd";
import { useIsMac } from "@/hooks/use-platform";
import { IconArchive as Archive, IconFile as FileIcon, IconFilePlus as FilePlus, IconLayoutDashboard as Dashboard, IconSearch as Search, IconSettings as Settings, IconStar as Star, IconUser as User, IconUsers as Users } from "@tabler/icons-react";

type PaletteMode = "files" | "people" | "actions" | "recent";

export default function CommandPage() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PaletteMode>("actions");
  const isMac = useIsMac();
  const launch = (nextMode: PaletteMode) => { setMode(nextMode); setOpen(true); };
  const run = (message: string) => { setOpen(false); toast.success(message); };

  const basicItems = <Command><CommandInput placeholder="Search workspace commands..." /><CommandList><CommandEmpty>No matching commands.</CommandEmpty><CommandGroup><CommandItem value="Open dashboard"><Dashboard /><span>Open dashboard</span></CommandItem><CommandItem value="Search members"><Users /><span>Search members</span></CommandItem><CommandItem value="Open settings"><Settings /><span>Open settings</span></CommandItem></CommandGroup></CommandList></Command>;

  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Command" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
          <ComponentPreview title="Basic Searchable Command">
            <div className="w-full max-w-lg overflow-hidden rounded-xl border">{basicItems}</div>
          </ComponentPreview>

          <ComponentPreview title="Commands with Keyboard Shortcuts">
            <div className="w-full max-w-lg overflow-hidden rounded-xl border"><Command><CommandInput placeholder="Find a page..." /><CommandList><CommandGroup heading="Navigation"><CommandItem><Dashboard /><span>Dashboard</span><CommandShortcut>G D</CommandShortcut></CommandItem><CommandItem><Users /><span>Members</span><CommandShortcut>G M</CommandShortcut></CommandItem><CommandItem disabled><Archive /><span>Archived reports</span><CommandShortcut>G A</CommandShortcut></CommandItem></CommandGroup></CommandList></Command></div>
          </ComponentPreview>

          <ComponentPreview title="Grouped Commands">
            <div className="w-full max-w-lg overflow-hidden rounded-xl border"><Command><CommandInput placeholder="Search pages and actions..." /><CommandList><CommandEmpty>Nothing matched your search.</CommandEmpty><CommandGroup heading="Pages"><CommandItem><Dashboard />Overview</CommandItem><CommandItem><Users />Team directory</CommandItem></CommandGroup><CommandGroup heading="Actions"><CommandItem><FilePlus />Create project</CommandItem><CommandItem><Settings />Workspace settings</CommandItem></CommandGroup></CommandList></Command></div>
          </ComponentPreview>

          <ComponentPreview title="Many Command Groups">
            <div className="w-full max-w-lg overflow-hidden rounded-xl border"><Command><CommandInput placeholder="Search all workspace tools..." /><CommandList><CommandGroup heading="Workspace"><CommandItem>Overview</CommandItem><CommandItem>Activity</CommandItem></CommandGroup><CommandGroup heading="Projects"><CommandItem>All projects</CommandItem><CommandItem>New project</CommandItem></CommandGroup><CommandGroup heading="People"><CommandItem>Members</CommandItem><CommandItem>Invitations</CommandItem></CommandGroup><CommandGroup heading="Settings"><CommandItem>Preferences</CommandItem><CommandItem>Billing</CommandItem></CommandGroup></CommandList></Command></div>
          </ComponentPreview>

          <ComponentPreview title="File Search Palette">
            <div className="grid w-full max-w-lg gap-3"><Button type="button" variant="outline" className="justify-start" onClick={() => launch("files")}><Search className="mr-2 size-4" />Search reports and files<Kbd className="ml-auto">⌘ P</Kbd></Button><p className="text-xs text-muted-foreground">Search names and open a recent workspace file.</p></div>
          </ComponentPreview>

          <ComponentPreview title="People Search with Avatars">
            <div className="grid w-full max-w-lg gap-3"><Button type="button" variant="outline" className="justify-start" onClick={() => launch("people")}><Users className="mr-2 size-4" />Find a team member</Button><div className="flex -space-x-2" aria-label="Recent teammates">{[["MC", "bg-primary text-primary-foreground"], ["AR", "bg-muted"], ["SP", "bg-muted"]].map(([initials, style]) => <span key={initials} className={`grid size-8 place-items-center rounded-full border-2 border-background text-xs font-medium ${style}`}>{initials}</span>)}</div></div>
          </ComponentPreview>

          <ComponentPreview title="Action Palette and Shortcuts">
            <div className="grid w-full max-w-lg gap-3"><Button type="button" variant="outline" className="justify-start" onClick={() => launch("actions")}><Search className="mr-2 size-4" />Search actions and pages<KbdGroup className="ml-auto"><Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>{!isMac && <span className="text-[11px] text-muted-foreground">+</span>}<Kbd>K</Kbd></KbdGroup></Button><p className="text-xs text-muted-foreground">Choose an action to receive a completion toast.</p></div>
          </ComponentPreview>

          <ComponentPreview title="Recent and Favorite Commands">
            <div className="grid w-full max-w-lg gap-3"><Button type="button" variant="outline" className="justify-start" onClick={() => launch("recent")}><Star className="mr-2 size-4" />Open recent or favorite item</Button><p className="text-xs text-muted-foreground">Favorites stay above recent destinations.</p></div>
          </ComponentPreview>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen} title={mode === "files" ? "Search files" : mode === "people" ? "Search team members" : mode === "recent" ? "Recent and favorites" : "Search commands and pages"}>
          <CommandInput placeholder={mode === "files" ? "Search reports and files..." : mode === "people" ? "Search people..." : "Type a command or search..."} />
          <CommandList><CommandEmpty>No matching results.</CommandEmpty>
            {mode === "files" && <CommandGroup heading="Recent files">{["Quarterly report.pdf", "Product roadmap.docx", "Usage export.csv"].map((name) => <CommandItem key={name} value={name} onSelect={() => run(`${name} opened`)}><FileIcon /><span>{name}</span><CommandShortcut>↵</CommandShortcut></CommandItem>)}</CommandGroup>}
            {mode === "people" && <CommandGroup heading="Team members">{[["Maya Chen", "MC", "Product design"], ["Alex Rivera", "AR", "Engineering"], ["Sam Patel", "SP", "Engineering"]].map(([name, initials, role]) => <CommandItem key={name} value={`${name} ${role}`} onSelect={() => run(`${name} selected`)}><span className="grid size-7 place-items-center rounded-full bg-muted text-[10px] font-medium">{initials}</span><span className="min-w-0 flex-1"><span className="block">{name}</span><span className="block text-xs text-muted-foreground">{role}</span></span></CommandItem>)}</CommandGroup>}
            {mode === "actions" && <><CommandGroup heading="Navigation"><CommandItem value="Dashboard" onSelect={() => run("Dashboard opened")}><Dashboard /><span>Dashboard</span><CommandShortcut>G D</CommandShortcut></CommandItem><CommandItem value="Members" onSelect={() => run("Members opened")}><Users /><span>Members</span><CommandShortcut>G M</CommandShortcut></CommandItem><CommandItem value="Settings" onSelect={() => run("Settings opened")}><Settings /><span>Settings</span><CommandShortcut>G S</CommandShortcut></CommandItem></CommandGroup><CommandGroup heading="Actions"><CommandItem value="Create project" onSelect={() => run("Project creation started")}><FilePlus /><span>Create project</span><CommandShortcut>N P</CommandShortcut></CommandItem><CommandItem value="Archive workspace" onSelect={() => run("Workspace archived")}><Archive /><span>Archive workspace</span></CommandItem></CommandGroup></>}
            {mode === "recent" && <><CommandGroup heading="Favorites"><CommandItem value="Favorite dashboard" onSelect={() => run("Favorite dashboard opened")}><Star className="fill-current" /><span>Operations dashboard</span></CommandItem><CommandItem value="Favorite team directory" onSelect={() => run("Favorite team directory opened")}><Star className="fill-current" /><span>Team directory</span></CommandItem></CommandGroup><CommandGroup heading="Recent"><CommandItem value="Recent billing report" onSelect={() => run("Billing report opened")}><FileIcon /><span>Billing report</span></CommandItem><CommandItem value="Recent member activity" onSelect={() => run("Member activity opened")}><User /><span>Member activity</span></CommandItem></CommandGroup></>}
          </CommandList>
        </CommandDialog>
      </div>
    </AppShell>
  );
}
