"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { useState } from "react";
import { Archive, ChevronDown, Copy, CreditCard, Download, Ellipsis, Eye, FolderPlus, LogOut, Pencil, Settings, Share2, Trash2, UserRound } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { demoAvatarUrl } from "@/lib/demo-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const menuContentClass = "min-w-40 rounded-xl border border-border bg-popover p-1.5 shadow-md ring-0";
const menuItemClass = "gap-3 rounded-md px-1.5 py-1 text-sm text-foreground";

function BasicDropdown() {
  return (
    <DropdownMenu>
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
    </DropdownMenu>
  );
}

function CheckableDropdown() {
  const [fruit, setFruit] = useState("");

  return (
    <Select value={fruit} onValueChange={setFruit}>
      <SelectTrigger aria-label="Select a fruit" className="h-[38px] w-[200px] justify-between border-border bg-background px-3 text-sm shadow-sm">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="rounded-lg border border-border bg-popover p-1.5 shadow-md ring-0">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="strawberry">Strawberry</SelectItem>
      </SelectContent>
    </Select>
  );
}

function DividerDropdown() {
  return (
    <DropdownMenu>
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
    </DropdownMenu>
  );
}

function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group mx-auto h-auto gap-2.5 rounded-lg border-0 px-2 py-2 hover:bg-muted">
          <Avatar size="default" className="rounded-lg">
            <AvatarImage src={demoAvatarUrl("John Smith")} alt="John Smith" className="rounded-lg" />
            <AvatarFallback className="rounded-lg">JS</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Jhon Smith</span>
          <ChevronDown aria-hidden="true" className="size-5 transition-transform group-aria-expanded:rotate-180" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px] overflow-hidden rounded-xl border border-border bg-popover p-0 shadow-xl ring-0">
        <header className="flex items-center gap-2 border-b px-4 py-3">
          <Avatar size="default" className="size-10">
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
    </DropdownMenu>
  );
}

function NestedDropdown() {
  return (
    <DropdownMenu>
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
    </DropdownMenu>
  );
}

function DropdownsExample() {
  return (
    <>
      <ComponentPreview title="Basic Dropdown"><div className="flex w-full justify-center"><BasicDropdown /></div></ComponentPreview>
      <ComponentPreview title="Checkable"><div className="flex w-full justify-center"><CheckableDropdown /></div></ComponentPreview>
      <ComponentPreview title="Divider"><div className="flex w-full justify-center"><DividerDropdown /></div></ComponentPreview>
      <ComponentPreview title="Profile Dropdown"><div className="flex w-full justify-center"><ProfileDropdown /></div></ComponentPreview>
      <ComponentPreview title="Nested Menu" className="xl:col-span-2"><div className="flex w-full justify-center"><NestedDropdown /></div></ComponentPreview>
    </>
  );
}

export default function DropdownsPage() {
  return <Showcase title="Dropdowns"><DropdownsExample /></Showcase>;
}
