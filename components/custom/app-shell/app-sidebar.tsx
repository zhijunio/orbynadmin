"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { IconCheck, IconDotsVertical, IconAdjustmentsHorizontal, IconMoon, IconSelector, IconSun } from "@tabler/icons-react";

import { componentNavItems, currentUser, workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
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
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar/sidebar";

export function AppSidebar() {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Navigation");
  const { config } = useThemeConfig();
  const { setOpenMobile } = useSidebar();
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
    <Sidebar collapsible={config.sidebarCollapsible} variant={config.sidebarVariant}>
      <SidebarHeader><TeamSwitcher /></SidebarHeader>
      <SidebarContent ref={contentRef} className="overscroll-contain">
        <SidebarGroup>
          <SidebarGroupLabel>{translate("Components")}</SidebarGroupLabel>
          <SidebarMenu>
            {componentNavItems.map((item) => {
              const active = pathname === item.url || pathname.startsWith(`${item.url}/`);
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={active} tooltip={translate(item.title)}>
                    <Link href={item.url} onClick={() => setOpenMobile(false)}><span>{translate(item.title)}</span></Link>
                  </SidebarMenuButton>
                  {item.badge && <SidebarMenuBadge className="bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground peer-hover/menu-button:text-primary-foreground peer-data-active/menu-button:text-primary-foreground">{translate(item.badge)}</SidebarMenuBadge>}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter><SidebarUserMenu /></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const [active, setActive] = useState(workspaces[0]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><active.icon className="size-5" /></div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold tracking-tight">{active.name}</span>
                <span className="truncate text-xs text-muted-foreground">{active.plan}</span>
              </div>
              <IconSelector className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-60 rounded-lg" align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
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

function SidebarUserMenu() {
  const { isMobile } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();
  const { setOpen } = useThemeConfig();
  const t = useTranslations("UserMenu");
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="size-8 rounded-lg"><AvatarImage src={currentUser.avatar} alt={currentUser.name} /><AvatarFallback className="rounded-lg">AM</AvatarFallback></Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-medium">{currentUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-60 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DropdownMenuLabel className="flex items-center gap-2 p-0 font-normal">
              <Avatar className="size-8 rounded-lg"><AvatarImage src={currentUser.avatar} alt={currentUser.name} /><AvatarFallback className="rounded-lg">AM</AvatarFallback></Avatar>
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
