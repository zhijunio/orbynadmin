"use client";
import { useState } from "react";
import { IconArchive as Archive, IconChevronDown as ChevronDown, IconCopy as Copy, IconCreditCard as CreditCard, IconDownload as Download, IconDots as Ellipsis, IconEye as Eye, IconFolderPlus as FolderPlus, IconLogout as LogOut, IconPencil as Pencil, IconSettings as Settings, IconShare2 as Share2, IconTrash as Trash2, IconUser as UserRound } from "@tabler/icons-react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { demoAvatarUrl } from "@/utils/demo-avatar";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu/context-menu";

const menuContentClass = "min-w-40 rounded-xl border border-border bg-popover p-1.5 shadow-md ring-0";
const menuItemClass = "gap-3 rounded-md px-1.5 py-1 text-sm text-foreground";

function AccountDropdown() {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="outline">Account Menu <ChevronDown aria-hidden="true" className="size-4" /></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="start" className={menuContentClass}>
      <DropdownMenuItem>View profile</DropdownMenuItem>
      <DropdownMenuItem>Account settings</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Sign out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
}

function DividerOnlyDropdown() {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="outline">Options <ChevronDown aria-hidden="true" className="size-4" /></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="start" className={menuContentClass}>
      <DropdownMenuItem>New project</DropdownMenuItem>
      <DropdownMenuItem>Import project</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Share</DropdownMenuItem>
      <DropdownMenuItem>Archive</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
}

function BasicDropdown() {
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="More options"
          className="size-[52px] rounded-full border border-border p-3 text-foreground hover:bg-muted"
        >
          <Ellipsis aria-hidden="true" className="size-6" strokeWidth={2.2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={menuContentClass}>
        <DropdownMenuItem className={menuItemClass}><Eye className="size-4" />Open</DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass}><Pencil className="size-4" />Rename</DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass}><Copy className="size-4" />Duplicate</DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass}><Trash2 className="size-4" />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}

function CheckableDropdown() {
  const [model, setModel] = useState("Fable 5");

  return <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline" className="min-w-48 justify-between">{model}<ChevronDown aria-hidden="true" className="size-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={menuContentClass}>
        <DropdownMenuLabel>Workspace model</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
          {["Fable 5", "Fable 5 Mini", "Fable 4"].map((name) => <DropdownMenuRadioItem key={name} value={name} className="justify-between">{name}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className={menuItemClass}>Managed by administrator</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}

function DividerDropdown() {
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="group mx-auto h-[34px] gap-2 px-3 py-1.5">
          More Actions
          <ChevronDown aria-hidden="true" className="size-5 transition-transform group-aria-expanded:rotate-180" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={`${menuContentClass} w-60`}>
        <DropdownMenuItem className="gap-3 rounded-md px-1.5 py-2.5 text-sm"><FolderPlus className="size-5" />New Project</DropdownMenuItem>
        <DropdownMenuItem className="gap-3 rounded-md px-1.5 py-2.5 text-sm"><Download className="size-5" />Import Project</DropdownMenuItem>
        <DropdownMenuSeparator className="-mx-1.5 my-1.5" />
        <DropdownMenuItem className="gap-3 rounded-md px-1.5 py-2.5 text-sm"><Share2 className="size-5" />Share</DropdownMenuItem>
        <DropdownMenuItem className="gap-3 rounded-md px-1.5 py-2.5 text-sm"><Copy className="size-5" />Make a Copy</DropdownMenuItem>
        <DropdownMenuSeparator className="-mx-1.5 my-1.5" />
        <DropdownMenuItem className="gap-3 rounded-md px-1.5 py-2.5 text-sm"><Archive className="size-5" />Archive</DropdownMenuItem>
        <DropdownMenuItem className="gap-3 rounded-md px-1.5 py-2.5 text-sm"><Trash2 className="size-5" />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}

function ProfileDropdown() {
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group mx-auto h-auto gap-2.5 rounded-lg border-0 px-2 py-2 hover:bg-muted">
          <Avatar size="sm" className="rounded-lg">
            <AvatarImage src={demoAvatarUrl("John Smith")} alt="John Smith" className="rounded-lg" />
            <AvatarFallback className="rounded-lg">JS</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Jhon Smith</span>
          <ChevronDown aria-hidden="true" className="size-5 transition-transform group-aria-expanded:rotate-180" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px] overflow-hidden rounded-xl border border-border bg-popover p-0 shadow-xl ring-0">
        <header className="flex items-center gap-2 border-b px-4 py-3">
          <Avatar size="sm" className="size-10">
            <AvatarImage src={demoAvatarUrl("John Smith")} alt="John Smith" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <span className="flex min-w-0 flex-col">
            <span className="text-sm font-medium">John Smith</span>
            <span className="truncate text-xs text-muted-foreground">johnsmith@example.com</span>
          </span>
        </header>
        <DropdownMenuGroup className="p-1.5">
          <DropdownMenuItem className="gap-3 px-3 py-2.5"><UserRound className="size-[18px]" /><span className="leading-5">View profile</span></DropdownMenuItem>
          <DropdownMenuItem className="gap-3 px-3 py-2.5"><Settings className="size-[18px]" /><span className="leading-5">Account Settings</span></DropdownMenuItem>
          <DropdownMenuItem className="gap-3 px-3 py-2.5"><CreditCard className="size-[18px]" /><span className="leading-5">Billing and Plan</span></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem className="m-1.5 w-auto gap-3 px-3 py-2.5"><LogOut className="size-[18px]" /><span className="leading-5">Logout</span></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}

function NestedDropdown() {
  return <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline" className="gap-2">Project actions <ChevronDown className="size-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={`${menuContentClass} w-52`}>
        <DropdownMenuItem className={menuItemClass}><Pencil className="size-4" />Edit project</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={menuItemClass}><Download className="size-4" />Export</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={menuContentClass}>
            <DropdownMenuItem className={menuItemClass}>Download CSV</DropdownMenuItem>
            <DropdownMenuItem className={menuItemClass}>Download PDF</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className={menuItemClass}><Archive className="size-4" />Archive unavailable</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}

export function DropdownsExample() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Account Menu">
<div className="flex w-full justify-center"><AccountDropdown /></div>

<div className="flex w-full justify-center"><DividerOnlyDropdown /></div>

<div className="flex w-full justify-center"><BasicDropdown /></div>

<div className="flex w-full justify-center"><DividerDropdown /></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">More options</Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuLabel>Document</DropdownMenuLabel><DropdownMenuItem><Eye className="size-4"/>Preview</DropdownMenuItem><DropdownMenuItem><Copy className="size-4"/>Duplicate</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem disabled>Move unavailable</DropdownMenuItem><DropdownMenuItem variant="destructive"><Trash2 className="size-4"/>Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
</ComponentPreview>
    <ComponentPreview title="Checkable Items">
<div className="flex w-full justify-center"><CheckableDropdown /></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Visible columns</Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuLabel>Show columns</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuCheckboxItem defaultChecked>Owner</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem defaultChecked>Status</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem>Updated</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Appearance and status</Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuLabel>Theme</DropdownMenuLabel><DropdownMenuRadioGroup defaultValue="system"><DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem><DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem><DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem></DropdownMenuRadioGroup><DropdownMenuSeparator/><DropdownMenuItem>Set status: Available</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Model: Balanced<ChevronDown className="size-4"/></Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuLabel>Select model</DropdownMenuLabel><DropdownMenuRadioGroup defaultValue="balanced"><DropdownMenuRadioItem value="fast">Fast</DropdownMenuRadioItem><DropdownMenuRadioItem value="balanced">Balanced</DropdownMenuRadioItem><DropdownMenuRadioItem value="advanced">Advanced</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu></div>
</ComponentPreview>
    <ComponentPreview title="Side Placement">
<div className="flex flex-wrap justify-center gap-3">{(["top","bottom","left","right"] as const).map((side)=><DropdownMenu key={side}><DropdownMenuTrigger asChild><Button variant="outline">{side}</Button></DropdownMenuTrigger><DropdownMenuContent side={side} className={menuContentClass}><DropdownMenuItem>Open {side}</DropdownMenuItem><DropdownMenuItem>View details</DropdownMenuItem></DropdownMenuContent></DropdownMenu>)}</div>
</ComponentPreview>
    <ComponentPreview title="Keyboard Shortcuts">
<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Keyboard shortcuts</Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuItem>Save<DropdownMenuShortcut>⌘ S</DropdownMenuShortcut></DropdownMenuItem><DropdownMenuItem>Search<DropdownMenuShortcut>⌘ K</DropdownMenuShortcut></DropdownMenuItem><DropdownMenuItem>New item<DropdownMenuShortcut>⌘ N</DropdownMenuShortcut></DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
</ComponentPreview>
    <ComponentPreview title="Nested Menu">
<div className="flex w-full justify-center"><NestedDropdown /></div>
</ComponentPreview>
    <ComponentPreview title="Context Menu">
<ContextMenu><ContextMenuTrigger asChild><button type="button" className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed bg-muted/30 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Right-click or press the context menu key</button></ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Open</ContextMenuItem><ContextMenuItem>Rename</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem variant="destructive">Delete</ContextMenuItem></ContextMenuContent></ContextMenu>
</ComponentPreview>
    <ComponentPreview title="Rich Content">
<div className="flex w-full justify-center"><ProfileDropdown /></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><span className="mr-2 grid size-6 place-items-center rounded bg-primary/10 text-xs text-primary">N</span>Northstar team<ChevronDown className="size-4"/></Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuLabel>Workspaces</DropdownMenuLabel><DropdownMenuRadioGroup defaultValue="northstar"><DropdownMenuRadioItem value="northstar">Northstar team</DropdownMenuRadioItem><DropdownMenuRadioItem value="studio">Studio workspace</DropdownMenuRadioItem></DropdownMenuRadioGroup><DropdownMenuSeparator/><DropdownMenuItem><FolderPlus className="size-4"/>Create workspace</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Notifications <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">3</span></Button></DropdownMenuTrigger><DropdownMenuContent className="w-72"><DropdownMenuLabel>Recent activity</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem className="whitespace-normal">Morgan shared a design review<DropdownMenuShortcut>2m</DropdownMenuShortcut></DropdownMenuItem><DropdownMenuItem className="whitespace-normal">A project was updated<DropdownMenuShortcut>1h</DropdownMenuShortcut></DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Record actions</Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuItem><Pencil className="size-4"/>Edit record</DropdownMenuItem><DropdownMenuItem><Copy className="size-4"/>Duplicate</DropdownMenuItem><DropdownMenuItem><Archive className="size-4"/>Archive</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem variant="destructive"><Trash2 className="size-4"/>Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Share / Export</Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuItem><Share2 className="size-4"/>Copy share link</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem><Download className="size-4"/>Export CSV</DropdownMenuItem><DropdownMenuItem><Download className="size-4"/>Export PDF</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>

<div className="flex justify-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Quick actions</Button></DropdownMenuTrigger><DropdownMenuContent className={menuContentClass}><DropdownMenuItem><FolderPlus className="size-4"/>Create project</DropdownMenuItem><DropdownMenuItem><UserRound className="size-4"/>Invite member</DropdownMenuItem><DropdownMenuItem><Settings className="size-4"/>Open settings</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
</ComponentPreview>
    </CatalogGridItems>
  );
}

