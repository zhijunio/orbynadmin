"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconBook2, IconCheck, IconChevronDown, IconCreditCard, IconDotsVertical, IconLifebuoy, IconLogout, IconSelector, IconSettings, IconUser } from "@tabler/icons-react";

import {
  appShellPrimarySections,
  currentUser,
  workspaces,
  type AppShellMenuItem,
  type Workspace,
} from "@/components/custom/app-shell/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/buttons/button";
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
  const t = useTranslations("Navigation");
  const translate = (value: string) => t.has(value) ? t(value) : value;
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
            aria-label={isRail ? translate(title) : undefined}
            title={isRail ? translate(title) : undefined}
            onClick={() => onSelect({ title, icon: Icon, items })}
            className={isRail
              ? `size-9 shrink-0 p-0 ${active ? "bg-background/15 text-background" : "text-background/70 hover:bg-background/10 hover:text-background"}`
              : `h-9 shrink-0 gap-2 px-3 text-sm ${active ? "bg-muted text-foreground" : "text-muted-foreground"}`}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {!isRail && <span>{translate(title)}</span>}
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
  const t = useTranslations("Navigation");
  const translate = (value: string) => t.has(value) ? t(value) : value;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <nav aria-label={`${translate(section.title)} navigation`} className={`grid content-start gap-1 ${collapsed ? "p-1" : "p-2"}`}>
      {!collapsed && <p className="px-2 py-1 text-xs font-medium text-muted-foreground">{translate(section.title)}</p>}
      {section.items.map((item) => (
        <SectionMenuItem
          key={item.title}
          item={item}
          translate={translate}
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
  translate,
  activeItem,
  collapsed,
  expanded,
  onSelect,
  onToggle,
}: {
  item: AppShellMenuItem;
  translate: (value: string) => string;
  activeItem: string;
  collapsed: boolean;
  expanded: boolean;
  onSelect: (value: string) => void;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const active = activeItem === item.title || activeItem.startsWith(`${item.title}/`);

  return (
    <div className="grid gap-1">
      <Button
        type="button"
        variant="ghost"
        title={translate(item.title)}
        aria-label={translate(item.title)}
        aria-current={active ? "page" : undefined}
        aria-expanded={item.children ? expanded : undefined}
        onClick={() => {
          onSelect(item.title);
          if (item.children) onToggle();
        }}
        className={`h-9 min-w-0 text-sm ${collapsed ? "justify-center px-0" : "justify-start gap-2.5 px-2.5"} ${active ? "bg-muted text-foreground" : "text-muted-foreground"}`}
      >
        {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${item.color ?? "bg-muted-foreground"}`} />}
        {!collapsed && <span className="min-w-0 flex-1 truncate text-left">{translate(item.title)}</span>}
        {!collapsed && item.badge && <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.badge}</span>}
        {!collapsed && item.tag && <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.tag}</span>}
        {!collapsed && item.children && <IconChevronDown className={`size-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />}
      </Button>
      {item.children && expanded && !collapsed && (
        <div className="ml-5 grid gap-1 border-l pl-2">
          {item.children.map((child) => (
            <Button
              key={child}
              type="button"
              variant="ghost"
              aria-current={activeItem === `${item.title}/${child}` ? "page" : undefined}
              onClick={() => onSelect(`${item.title}/${child}`)}
              className={`h-8 justify-start px-2.5 text-sm ${activeItem === `${item.title}/${child}` ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            >
              {translate(child)}
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
  const t = useTranslations("Navigation");
  const translate = (value: string) => t.has(value) ? t(value) : value;
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
            <span>{translate(item.title)}</span>
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
  className,
}: {
  activeWorkspace: Workspace;
  onChange: (workspace: Workspace) => void;
  compact?: boolean;
  responsive?: boolean;
  brand?: boolean;
  className?: string;
}) {
  const t = useTranslations("Navigation");
  const translate = (value: string) => t.has(value) ? t(value) : value;
  const WorkspaceIcon = activeWorkspace.icon;

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
              ? `h-9 w-9 px-0 sm:${brand ? "h-12" : "h-9"} sm:w-auto sm:justify-start sm:gap-2 sm:px-2 group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!gap-0 group-data-[collapsible=icon]:!px-0`
              : `${brand ? "h-12" : "h-9"} min-w-0 justify-start gap-2 px-2`} shrink-0 ${className ?? ""}`}
        >
          <span className={`grid ${brand ? "size-9 rounded-lg" : "size-6 rounded-md"} shrink-0 place-items-center bg-primary text-primary-foreground`}>
            <WorkspaceIcon className={brand ? "size-5" : "size-4"} aria-hidden="true" />
          </span>
          {!compact && <span className={`${responsive ? "hidden sm:grid" : "grid"} group-data-[collapsible=icon]:hidden min-w-0 flex-1 text-left leading-tight`}>
            <span className={`truncate ${brand ? "text-sm font-semibold tracking-tight" : "text-xs font-medium"}`}>{activeWorkspace.name}</span>
            <span className={`truncate ${brand ? "text-xs" : "text-[10px]"} text-muted-foreground`}>{activeWorkspace.plan}</span>
          </span>}
          {!compact && <IconSelector className={`${responsive ? "hidden sm:block" : "block"} group-data-[collapsible=icon]:hidden size-4 shrink-0 text-muted-foreground`} aria-hidden="true" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel className="text-xs text-muted-foreground">{translate("Workspaces")}</DropdownMenuLabel>
        {workspaces.map((workspace) => {
          const Icon = workspace.icon;
          return (
            <DropdownMenuItem key={workspace.name} onSelect={() => onChange(workspace)} className="gap-2 p-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-md border bg-background"><Icon className="size-4" aria-hidden="true" /></span>
              <span className="grid min-w-0 flex-1 leading-tight">
                <span className="truncate text-sm font-medium">{workspace.name}</span>
                <span className="truncate text-xs text-muted-foreground">{workspace.plan}</span>
              </span>
              {workspace.name === activeWorkspace.name && <IconCheck className="size-4 shrink-0 text-primary" aria-label={translate("Selected")} />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShellUserSummary({ compact = false, sidebar = false }: { compact?: boolean; sidebar?: boolean }) {
  if (sidebar) {
    return (
      <div
        role="group"
        aria-label={`Signed in as ${currentUser.name}`}
        className={compact ? "grid size-10 place-items-center rounded-lg" : "flex min-w-0 items-center gap-2 p-2"}
      >
        <Avatar className="size-8 shrink-0 rounded-lg">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" />
          <AvatarFallback className="rounded-lg">AM</AvatarFallback>
        </Avatar>
        {!compact && <span className="grid min-w-0 flex-1 leading-tight">
          <span className="truncate text-sm font-medium">{currentUser.name}</span>
          <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
        </span>}
        {!compact && <IconDotsVertical className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
      </div>
    );
  }

  return (
    <div role="group" aria-label={`Signed in as ${currentUser.name}`} className={compact ? "grid justify-items-center" : "flex min-w-0 items-center gap-2"}>
      <Avatar className="size-8 shrink-0 rounded-lg">
        <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" />
        <AvatarFallback className="rounded-lg">AM</AvatarFallback>
      </Avatar>
      {!compact && <span className="grid min-w-0 leading-tight">
        <span className="truncate text-sm font-medium">{currentUser.name}</span>
        <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
      </span>}
    </div>
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
              className="h-12 gap-2 rounded-lg px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
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

