"use client";

import { useState } from "react";
import { IconBook2, IconCheck, IconChevronDown, IconCreditCard, IconDotsVertical, IconLifebuoy, IconLogout, IconSelector, IconSettings, IconUser } from "@tabler/icons-react";

import {
  appShellPrimarySections,
  currentUser,
  workspaces,
  type AppShellMenuItem,
  type Workspace,
} from "@/components/custom/app-shell/config";
import { BrandMark } from "@/components/custom/auth/brand-mark";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar/sidebar";


export type AppShellPrimarySection = (typeof appShellPrimarySections)[number];

export function AppShellPrimaryNavigation({
  activeSection,
  onSelect,
  orientation = "horizontal",
}: {
  activeSection: string;
  onSelect: (section: AppShellPrimarySection) => void;
  orientation?: "horizontal" | "rail";
}) {

  const isRail = orientation === "rail";

  return (
    <nav
      aria-label="Primary sections"
      className={isRail ? "flex flex-col items-center gap-1" : "flex min-w-0 items-center gap-1 overflow-x-auto"}
    >
      {appShellPrimarySections.map(({ title, icon: Icon, items }) => {
        const active = activeSection === title;
        return (
          <Button
            key={title}
            type="button"
            variant="ghost"
            aria-pressed={active}
            aria-label={isRail ? title : undefined}
            title={isRail ? title : undefined}
            onClick={() => onSelect({ title, icon: Icon, items })}
            className={isRail
              ? `size-9 shrink-0 p-0 ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`
              : `h-9 shrink-0 gap-2 px-3 text-sm ${active ? "bg-muted text-foreground" : "text-muted-foreground"}`}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {!isRail && <span>{title}</span>}
          </Button>
        );
      })}
    </nav>
  );
}

export function AppShellSectionMenu({
  section,
  activeItem,
  onSelect,
}: {
  section: AppShellPrimarySection;
  activeItem: string;
  onSelect: (value: string) => void;
}) {

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <nav aria-label={`${section.title} navigation`} className="grid content-start gap-0 p-2">
      {!collapsed && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
      {section.items.map((item) => (
        <SectionMenuItem
          key={item.title}
          item={item}
          activeItem={activeItem}
          collapsed={collapsed}
          expanded={expandedItems.includes(item.title)}
          onSelect={onSelect}
          onToggle={() => setExpandedItems((current) => current.includes(item.title)
            ? current.filter((value) => value !== item.title)
            : [...current, item.title])}
        />
      ))}
    </nav>
  );
}

function SectionMenuItem({
  item,
  activeItem,
  collapsed,
  expanded,
  onSelect,
  onToggle,
}: {
  item: AppShellMenuItem;
  activeItem: string;
  collapsed: boolean;
  expanded: boolean;
  onSelect: (value: string) => void;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const active = activeItem === item.title || activeItem.startsWith(`${item.title}/`);

  return (
    <div className={`grid w-full ${collapsed ? "justify-items-center" : ""}`}>
      <Button
        type="button"
        variant="ghost"
        title={item.title}
        aria-label={item.title}
        aria-current={active ? "page" : undefined}
        aria-expanded={item.children ? expanded : undefined}
        onClick={() => {
          onSelect(item.title);
          if (item.children) onToggle();
        }}
        className={`h-8 min-w-0 text-sm ${collapsed ? "w-8 justify-center px-0" : "justify-start gap-2 px-2"} ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`}
      >
        {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${item.color ?? "bg-muted-foreground"}`} />}
        {!collapsed && <span className="min-w-0 flex-1 truncate text-left">{item.title}</span>}
        {!collapsed && item.badge && <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.badge}</span>}
        {!collapsed && item.tag && <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.tag}</span>}
        {!collapsed && item.children && <IconChevronDown className={`size-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />}
      </Button>
      {item.children && expanded && !collapsed && (
        <div className="ml-3.5 grid gap-1 border-l px-2">
          {item.children.map((child) => (
            <Button
              key={child}
              type="button"
              variant="ghost"
              aria-current={activeItem === `${item.title}/${child}` ? "page" : undefined}
              onClick={() => onSelect(`${item.title}/${child}`)}
              className={`h-7 justify-start px-2 text-sm ${activeItem === `${item.title}/${child}` ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`}
            >
              {child}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export function AppShellSectionTabs({
  section,
  activeItem,
  onSelect,
}: {
  section: AppShellPrimarySection;
  activeItem: string;
  onSelect: (item: string) => void;
}) {

  return (
    <nav aria-label={`${section.title} views`} className="flex min-w-0 items-center gap-1 overflow-x-auto">
      {section.items.map((item) => {
        const Icon = item.icon;
        const active = activeItem === item.title;
        return (
          <Button
            key={item.title}
            type="button"
            variant="ghost"
            aria-current={active ? "page" : undefined}
            onClick={() => onSelect(item.title)}
            className={`h-8 shrink-0 gap-2 px-2.5 text-sm ${active ? "bg-muted text-foreground" : "text-muted-foreground"}`}
          >
            {Icon ? <Icon className="size-4" aria-hidden="true" /> : <span aria-hidden="true" className={`size-2 rounded-full ${item.color ?? "bg-muted-foreground"}`} />}
            <span>{item.title}</span>
            {item.badge && <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.badge}</span>}
            {item.tag && <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.tag}</span>}
          </Button>
        );
      })}
    </nav>
  );
}

export function AppShellWorkspaceSelector({
  activeWorkspace,
  onChange,
  compact = false,
  responsive = false,
  brand = false,
  sidebar = false,
  className,
}: {
  activeWorkspace: Workspace;
  onChange: (workspace: Workspace) => void;
  compact?: boolean;
  responsive?: boolean;
  brand?: boolean;
  sidebar?: boolean;
  className?: string;
}) {

  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label={`Workspace: ${activeWorkspace.name}`}
          className={compact
            ? `${brand ? "size-12" : "size-9"} shrink-0 px-0 ${className ?? ""}`
            : `${responsive
              ? brand
                ? `h-9 w-9 px-0 sm:h-12 sm:w-56 sm:justify-start sm:gap-2 sm:px-2 group-data-[collapsible=icon]:!mx-auto group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!gap-0 group-data-[collapsible=icon]:!px-0`
                : `h-9 w-9 px-0 sm:h-9 sm:w-9 group-data-[collapsible=icon]:!mx-auto group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!gap-0 group-data-[collapsible=icon]:!px-0`
              : `${brand ? "h-12" : "h-9"} min-w-0 justify-start gap-2 px-2 ${brand ? "group-data-[collapsible=icon]:!mx-auto group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!gap-0 group-data-[collapsible=icon]:!px-0" : ""}`} shrink-0 ${sidebar ? "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" : ""} ${className ?? ""}`}
        >
          <span className={`grid ${brand ? "size-9 rounded-lg group-data-[collapsible=icon]:!size-8" : "size-6 rounded-md"} shrink-0 place-items-center ${activeWorkspace.kind === "brand" ? "bg-transparent" : "bg-primary text-primary-foreground"}`}>
            {activeWorkspace.kind === "brand" ? <BrandMark size="small" /> : <activeWorkspace.icon className={brand ? "size-5" : "size-4"} aria-hidden="true" />}
          </span>
          {!compact && <span className={`${responsive ? "hidden sm:grid" : "grid"} group-data-[collapsible=icon]:hidden min-w-0 flex-1 text-left leading-tight`}>
            <span className={`truncate ${brand ? "text-sm font-semibold tracking-tight" : "text-xs font-medium"}`}>{activeWorkspace.name}</span>
            <span className={`truncate ${brand ? "text-xs" : "text-[10px]"} text-muted-foreground`}>{activeWorkspace.plan}</span>
          </span>}
          {!compact && <IconSelector className={`${responsive ? "hidden sm:block" : "block"} group-data-[collapsible=icon]:hidden size-4 shrink-0 text-muted-foreground`} aria-hidden="true" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side={sidebar && !isMobile ? "right" : "bottom"}
        sideOffset={sidebar ? 4 : undefined}
        className="w-(--radix-dropdown-menu-trigger-width) min-w-60"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">{"Workspaces"}</DropdownMenuLabel>
        {workspaces.map((workspace) => {
          return (
            <DropdownMenuItem key={workspace.name} onSelect={() => onChange(workspace)} className="gap-2 p-2">
              <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-background">{workspace.kind === "brand" ? <BrandMark size="small" /> : <workspace.icon className="size-4" aria-hidden="true" />}</span>
              <span className="grid min-w-0 flex-1 leading-tight">
                <span className="truncate text-sm font-medium">{workspace.name}</span>
                <span className="truncate text-xs text-muted-foreground">{workspace.plan}</span>
              </span>
              {workspace.name === activeWorkspace.name && <IconCheck className="size-4 shrink-0 text-primary" aria-label={"Selected"} />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShellUserSummary({ compact = false, sidebar = false }: { compact?: boolean; sidebar?: boolean }) {
  const isMobile = useIsMobile();
  const buttonSize = compact ? (sidebar ? "size-10 rounded-lg p-0" : "size-9 rounded-full p-0") : sidebar ? "h-12 w-full justify-start gap-2 rounded-lg px-2" : "h-9 gap-2 rounded-full px-2";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" aria-label={`Account menu for ${currentUser.name}`} className={`shrink-0 ${buttonSize}`}>
          <Avatar className={`${compact && !sidebar ? "size-7" : "size-8"} shrink-0 rounded-lg`}>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" />
            <AvatarFallback className="rounded-lg">AM</AvatarFallback>
          </Avatar>
          {!compact && <span className="grid min-w-0 flex-1 text-left leading-tight">
            <span className="truncate text-sm font-medium">{currentUser.name}</span>
            <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
          </span>}
          {!compact && sidebar && <IconDotsVertical className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={sidebar && !isMobile ? "right" : "bottom"}
        align={sidebar ? "start" : "end"}
        sideOffset={8}
        className="w-72 rounded-xl p-1"
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2 font-normal">
          <Avatar className="size-8 shrink-0 rounded-lg">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" />
            <AvatarFallback className="rounded-lg">AM</AvatarFallback>
          </Avatar>
          <span className="grid min-w-0 gap-0.5">
            <span className="truncate text-sm font-medium">{currentUser.name}</span>
            <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AppShellAccountMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShellAccountMenuItems() {
  return (
    <>
      <DropdownMenuItem><IconUser />Profile<span className="ml-auto text-xs text-muted-foreground">⇧⌘P</span></DropdownMenuItem>
      <DropdownMenuItem><IconCreditCard />Billing &amp; Usage</DropdownMenuItem>
      <DropdownMenuItem><IconSettings />Preferences<span className="ml-auto text-xs text-muted-foreground">⌘</span></DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem><IconLifebuoy />Help &amp; Support</DropdownMenuItem>
      <DropdownMenuItem><IconBook2 />API Reference</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem><IconLogout />Sign Out<span className="ml-auto text-xs text-muted-foreground">⇧⌘Q</span></DropdownMenuItem>
    </>
  );
}

export function AppShellUserMenu({ compact = false }: { compact?: boolean }) {
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {compact ? <button
              type="button"
              aria-label={`Account menu for ${currentUser.name}`}
              className="grid size-10 place-items-center rounded-lg"
            >
              <Avatar className="size-8 shrink-0 rounded-lg">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" />
                <AvatarFallback className="rounded-lg">AM</AvatarFallback>
              </Avatar>
            </button> : <SidebarMenuButton
              size="lg"
              aria-label={`Account menu for ${currentUser.name}`}
              className="h-12 gap-2 rounded-lg px-2 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            >
              <Avatar className="size-8 shrink-0 rounded-lg">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" />
                <AvatarFallback className="rounded-lg">AM</AvatarFallback>
              </Avatar>
              <span className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-medium">{currentUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
              </span>
              <IconDotsVertical className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" aria-hidden="true" />
            </SidebarMenuButton>}
          </DropdownMenuTrigger>
            <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="end" sideOffset={8} className="w-72 rounded-xl p-1">
            <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2 font-normal">
              <Avatar className="size-8 shrink-0 rounded-lg">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" />
                <AvatarFallback className="rounded-lg">AM</AvatarFallback>
              </Avatar>
              <span className="grid min-w-0 gap-0.5">
                <span className="truncate text-sm font-medium">{currentUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AppShellAccountMenuItems />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

