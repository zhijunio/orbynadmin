"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { IconCheck, IconChevronDown, IconChevronLeft, IconChevronRight, IconComponents, IconDotsVertical, IconStack2, IconAdjustmentsHorizontal, IconMoon, IconSelector, IconSun } from "@tabler/icons-react";

import { blockNavItems, componentNavItems, currentUser, workspaces, type ComponentNavItem } from "@/components/custom/app-shell/config";
import { AppShellDemoFooterMenu, AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import { AppShellUserMenu } from "@/components/blocks/application/app-shell/app-shell-navigation";
import { useThemeConfig } from "@/components/theme-customizer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar/sidebar";
export function AppSidebar({ preview = false }: { preview?: boolean }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Navigation");
  const { config } = useThemeConfig();
  const { setOpenMobile, toggleSidebar, state, isMobile } = useSidebar();
  const [componentsOpen, setComponentsOpen] = useState(true);
  const [blocksOpen, setBlocksOpen] = useState(true);
  const [appShellOpen, setAppShellOpen] = useState(true);
  const translate = (value: string) => t.has(value) ? t(value) : value;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      contentRef.current
        ?.querySelector<HTMLElement>('[data-sidebar="menu-button"][data-active="true"]')
        ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <Sidebar
      collapsible={config.sidebarCollapsible}
      variant={config.sidebarVariant}
      className={preview ? "h-full" : undefined}
    >
      <SidebarHeader className={preview ? "gap-0 p-0" : undefined}>
        <TeamSwitcher preview={preview} />
      </SidebarHeader>
      <SidebarContent ref={contentRef} className="overscroll-contain">
        {preview ? <AppShellDemoMenu variant="icon-rail" /> : <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                type="button"
                tooltip={translate("Components")}
                aria-expanded={componentsOpen}
                aria-controls="component-navigation"
                onClick={() => setComponentsOpen((open) => !open)}
              >
                <IconComponents aria-hidden="true" className="size-4 shrink-0" />
                <span>{translate("Components")}</span>
                <IconChevronDown className={`ml-auto size-4 transition-transform ${componentsOpen ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
              {componentsOpen && <NavigationItems items={componentNavItems} pathname={pathname} translate={translate} onNavigate={() => setOpenMobile(false)} id="component-navigation" />}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                type="button"
                tooltip={translate("Blocks")}
                aria-expanded={blocksOpen}
                aria-controls="block-navigation"
                onClick={() => setBlocksOpen((open) => !open)}
              >
                <IconStack2 aria-hidden="true" className="size-4 shrink-0" />
                <span>{translate("Blocks")}</span>
                <IconChevronDown className={`ml-auto size-4 transition-transform ${blocksOpen ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
              {blocksOpen && (
                <SidebarMenuSub id="block-navigation">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton onClick={() => setAppShellOpen((open) => !open)} aria-expanded={appShellOpen}>
                      <span>{translate("App Shell")}</span>
                      <IconChevronDown className={`ml-auto size-4 transition-transform ${appShellOpen ? "rotate-180" : ""}`} />
                    </SidebarMenuSubButton>
                    {appShellOpen && <NavigationItems items={blockNavItems} pathname={pathname} translate={translate} onNavigate={() => setOpenMobile(false)} id="app-shell-navigation" />}
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>}
      </SidebarContent>
      <SidebarFooter className={preview ? "gap-1 p-1" : undefined}>
        {preview && <AppShellDemoFooterMenu variant="icon-rail" />}
        {preview && <SidebarSeparator className="mx-0 w-full" />}
        <SidebarUserMenu preview={preview} />
      </SidebarFooter>
      {preview && !isMobile && <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={state === "collapsed" ? "Expand" : "Collapse"}
            className="group/sidebar-collapse absolute right-0 top-1/2 z-30 grid size-8 translate-x-[calc(50%+0.625rem)] -translate-y-1/2 place-items-center rounded-md bg-transparent text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span aria-hidden="true" className="absolute h-4 w-[2px] rounded-full bg-neutral-400 shadow-[0_0_0_1px_var(--background)] transition-opacity group-hover/sidebar-collapse:opacity-0 group-focus-visible/sidebar-collapse:opacity-0 dark:bg-neutral-500" />
            {state === "collapsed"
              ? <IconChevronRight className="size-4 opacity-0 transition-opacity group-hover/sidebar-collapse:opacity-100 group-focus-visible/sidebar-collapse:opacity-100" />
              : <IconChevronLeft className="size-4 opacity-0 transition-opacity group-hover/sidebar-collapse:opacity-100 group-focus-visible/sidebar-collapse:opacity-100" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{state === "collapsed" ? "Expand" : "Collapse"}</TooltipContent>
      </Tooltip>}
      {!preview && <SidebarRail />}
    </Sidebar>
  );
}

function NavigationItems({
  items,
  pathname,
  translate,
  onNavigate,
  id,
}: {
  items: ComponentNavItem[];
  pathname: string;
  translate: (value: string) => string;
  onNavigate: () => void;
  id: string;
}) {
  const activeItem = items
    .filter((item) => pathname === item.url || pathname.startsWith(`${item.url}/`))
    .sort((left, right) => right.url.length - left.url.length)[0];

  return (
    <SidebarMenuSub id={id}>
      {items.map((item) => {
        const active = activeItem?.url === item.url;
        return (
          <SidebarMenuSubItem key={item.url}>
            <SidebarMenuSubButton asChild isActive={active}>
              <Link href={item.url} onClick={onNavigate}>
                {item.icon && <item.icon aria-hidden="true" className="size-4 shrink-0" />}
                <span>{translate(item.title)}</span>
                {item.badge && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">{translate(item.badge)}</span>}
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
}

function TeamSwitcher({ preview = false }: { preview?: boolean }) {
  const { isMobile } = useSidebar();
  const t = useTranslations("Navigation");
  const [active, setActive] = useState(workspaces[0]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex size-9 aspect-square items-center justify-center rounded-lg bg-primary text-primary-foreground"><active.icon className="size-5" /></div>
              <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold tracking-tight">{active.name}</span>
                <span className="truncate text-xs text-muted-foreground">{active.plan}</span>
              </div>
              <IconSelector className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-60 rounded-lg" align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">{preview ? "Workspaces" : t("Workspaces")}</DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.name} onClick={() => setActive(workspace)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border"><workspace.icon className="size-3.5 shrink-0" /></div>
                <div className="grid flex-1 leading-tight">
                  <span className="truncate text-sm font-medium">{workspace.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{workspace.plan}</span>
                </div>
                {active.name === workspace.name && <IconCheck className="size-4 shrink-0" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function SidebarUserMenu({ preview }: { preview: boolean }) {
  const { isMobile } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();
  const { setOpen } = useThemeConfig();
  const t = useTranslations("UserMenu");
  if (preview) {
    return <AppShellUserMenu />;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="size-8 rounded-lg"><AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" /><AvatarFallback className="rounded-lg">AM</AvatarFallback></Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-medium">{currentUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-60 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DropdownMenuLabel className="flex items-center gap-2 p-0 font-normal">
              <Avatar className="size-8 rounded-lg"><AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-lg" /><AvatarFallback className="rounded-lg">AM</AvatarFallback></Avatar>
              <div className="grid min-w-0 leading-tight">
                <span className="truncate text-sm font-medium">{currentUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setOpen(true)}><IconAdjustmentsHorizontal className="size-4" /> {t("settings")}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
              {resolvedTheme === "dark" ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
              {t("toggleTheme")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

