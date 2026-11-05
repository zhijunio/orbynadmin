"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { IconChartBar, IconComponents, IconDotsVertical, IconMinus, IconPlus, IconSparkles, IconStack2, IconTable, IconAdjustmentsHorizontal, IconMoon, IconSun, IconUsers } from "@tabler/icons-react";

import { aiAgentNavigationLinks, componentNavSections, currentUser, solutionsNavigationLinks, workspaces, type ComponentNavItem, type ComponentNavSection } from "@/components/custom/app-shell/config";
import { aiAgentExamples } from "@/components/blocks/ai-agents/ai-agents-data";
import { AppShellDemoFooterMenu, AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import { AppShellUserMenu, AppShellWorkspaceSelector } from "@/components/blocks/application/app-shell/app-shell-navigation";
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar/sidebar";

function isComponentNavSectionActive(items: ComponentNavItem[], pathname: string) {
  return items.some((item) => pathname === item.url || pathname.startsWith(`${item.url}/`));
}


const applicationLinks: { title: string; href: string; includeNestedRoutes?: boolean }[] = [
  { title: "App Shell", href: "/blocks/application/app-shell" },
  { title: "Auth", href: "/blocks/application/auth", includeNestedRoutes: true },
  { title: "Cards", href: "/blocks/application/card" },
  { title: "Dashboard", href: "/blocks/application/dashboard" },
  { title: "Dialog", href: "/blocks/application/dialog" },
  { title: "Empty State", href: "/blocks/application/empty-state" },
  { title: "Event Calendar", href: "/blocks/application/event-calendar" },
  { title: "Flow", href: "/blocks/application/flow" },
  { title: "Form", href: "/blocks/application/form" },
  { title: "Gantt", href: "/blocks/application/gantt" },
  { title: "Kanban", href: "/blocks/application/kanban" },
  { title: "List", href: "/blocks/application/list" },
  { title: "Onboarding", href: "/blocks/application/onboarding" },
  { title: "Profile", href: "/blocks/application/profile" },
  { title: "Rich Text Editor", href: "/blocks/application/rich-text-editor" },
  { title: "Schedule", href: "/blocks/application/schedule" },
  { title: "Settings", href: "/blocks/application/settings" },
  { title: "Drawer", href: "/blocks/application/drawer" },
  { title: "Stats", href: "/blocks/application/stats" },
  { title: "Timeline", href: "/blocks/application/timeline" },
  { title: "Whiteboard", href: "/blocks/application/whiteboard", includeNestedRoutes: true },
  { title: "Wizard", href: "/blocks/application/wizard" },
].sort((left, right) => left.title.localeCompare(right.title, "en"));

export function AppSidebar({ preview = false }: { preview?: boolean }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const { config } = useThemeConfig();
  const { setOpenMobile } = useSidebar();
  const [uiNavExpansion, setUiNavExpansion] = useState<{ pathname: string; open: boolean } | null>(null);
  const [dataNavExpansion, setDataNavExpansion] = useState<{ pathname: string; open: boolean } | null>(null);
  const [visualizationNavExpansion, setVisualizationNavExpansion] = useState<{ pathname: string; open: boolean } | null>(null);
  const [applicationExpansion, setApplicationExpansion] = useState<{ pathname: string; open: boolean } | null>(null);
  const [aiAgentsExpansion, setAiAgentsExpansion] = useState<{ pathname: string; open: boolean } | null>(null);
  const [solutionsExpansion, setSolutionsExpansion] = useState<{ pathname: string; open: boolean } | null>(null);
  const uiNavItems = componentNavSections.find((section) => section.title === "UI")?.items ?? [];
  const dataNavItems = componentNavSections.find((section) => section.title === "Data")?.items ?? [];
  const visualizationNavItems = componentNavSections.find((section) => section.title === "Visualization")?.items ?? [];
  const uiNavOpen = uiNavExpansion?.pathname === pathname ? uiNavExpansion.open : isComponentNavSectionActive(uiNavItems, pathname);
  const dataNavOpen = dataNavExpansion?.pathname === pathname ? dataNavExpansion.open : isComponentNavSectionActive(dataNavItems, pathname);
  const visualizationNavOpen =
    visualizationNavExpansion?.pathname === pathname
      ? visualizationNavExpansion.open
      : isComponentNavSectionActive(visualizationNavItems, pathname);
  const applicationOpen = applicationExpansion?.pathname === pathname ? applicationExpansion.open : pathname.startsWith("/blocks/application");
  const aiAgentsOpen = aiAgentsExpansion?.pathname === pathname ? aiAgentsExpansion.open : pathname.startsWith("/blocks/ai-agents");
  const solutionsOpen = solutionsExpansion?.pathname === pathname ? solutionsExpansion.open : pathname.startsWith("/blocks/solutions");
  const activeAiAgent = aiAgentExamples.find((example) => pathname.endsWith(`/${example.slug}`));
  const activeAiAgentHref = activeAiAgent ? aiAgentNavigationLinks.find((item) => item.category === activeAiAgent.category)?.href : undefined;

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
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent ref={contentRef} className="overscroll-contain">
        {preview ? <AppShellDemoMenu /> : <SidebarGroup>
          <SidebarGroupLabel>{"Components"}</SidebarGroupLabel>
          <SidebarMenu>
            <ComponentNavSectionMenu
              title="UI"
              icon={IconComponents}
              items={uiNavItems}
              open={uiNavOpen}
              onToggle={() => setUiNavExpansion({ pathname, open: !uiNavOpen })}
              pathname={pathname}
              onNavigate={() => setOpenMobile(false)}
              id="component-ui-navigation"
            />
            <ComponentNavSectionMenu
              title="Data"
              icon={IconTable}
              items={dataNavItems}
              open={dataNavOpen}
              onToggle={() => setDataNavExpansion({ pathname, open: !dataNavOpen })}
              pathname={pathname}
              onNavigate={() => setOpenMobile(false)}
              id="component-data-navigation"
            />
            <ComponentNavSectionMenu
              title="Visualization"
              icon={IconChartBar}
              items={visualizationNavItems}
              open={visualizationNavOpen}
              onToggle={() => setVisualizationNavExpansion({ pathname, open: !visualizationNavOpen })}
              pathname={pathname}
              onNavigate={() => setOpenMobile(false)}
              id="component-visualization-navigation"
            />
          </SidebarMenu>
          <SidebarGroupLabel className="mt-3">{"Blocks"}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem className="ml-1 w-[calc(100%-0.25rem)] group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:w-full">
              <SidebarMenuButton
                type="button"
                tooltip={"Application"}
                aria-expanded={applicationOpen}
                aria-controls="application-navigation"
                onClick={() => setApplicationExpansion({ pathname, open: !applicationOpen })}
              >
                <IconStack2 aria-hidden="true" className="size-4 shrink-0" />
                <span>{"Application"}</span>
                {applicationOpen ? <IconMinus aria-hidden="true" className="ml-auto size-4 shrink-0" /> : <IconPlus aria-hidden="true" className="ml-auto size-4 shrink-0" />}
              </SidebarMenuButton>
              {applicationOpen && <SidebarMenuSub id="application-navigation">
                {applicationLinks.map(({ title, href, includeNestedRoutes }) => (
                  <SidebarMenuSubItem key={href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === href || (includeNestedRoutes === true && pathname.startsWith(`${href}/`))}
                    >
                      <Link href={href} onClick={() => setOpenMobile(false)}>{title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>}
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem className="ml-1 w-[calc(100%-0.25rem)] group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:w-full">
              <SidebarMenuButton
                type="button"
                tooltip={"Solutions"}
                aria-expanded={solutionsOpen}
                aria-controls="solutions-navigation"
                onClick={() => setSolutionsExpansion({ pathname, open: !solutionsOpen })}
              >
                <IconUsers aria-hidden="true" className="size-4 shrink-0" />
                <span>{"Solutions"}</span>
                {solutionsOpen ? <IconMinus aria-hidden="true" className="ml-auto size-4 shrink-0" /> : <IconPlus aria-hidden="true" className="ml-auto size-4 shrink-0" />}
              </SidebarMenuButton>
              {solutionsOpen && <SidebarMenuSub id="solutions-navigation">
                {solutionsNavigationLinks.map(({ title, href }) => (
                  <SidebarMenuSubItem key={href}>
                    <SidebarMenuSubButton asChild isActive={pathname === href}>
                      <Link href={href} onClick={() => setOpenMobile(false)}>{title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>}
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem className="ml-1 w-[calc(100%-0.25rem)] group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:w-full">
              <SidebarMenuButton
                type="button"
                tooltip={"AI Agents"}
                aria-expanded={aiAgentsOpen}
                aria-controls="ai-agents-navigation"
                onClick={() => setAiAgentsExpansion({ pathname, open: !aiAgentsOpen })}
              >
                <IconSparkles aria-hidden="true" className="size-4 shrink-0" />
                <span>{"AI Agents"}</span>
                {aiAgentsOpen ? <IconMinus aria-hidden="true" className="ml-auto size-4 shrink-0" /> : <IconPlus aria-hidden="true" className="ml-auto size-4 shrink-0" />}
              </SidebarMenuButton>
              {aiAgentsOpen && <SidebarMenuSub id="ai-agents-navigation">
                {aiAgentNavigationLinks.map(({ title, href }) => (
                  <SidebarMenuSubItem key={href}>
                    <SidebarMenuSubButton asChild isActive={pathname === href || activeAiAgentHref === href}>
                      <Link href={href} onClick={() => setOpenMobile(false)}>{title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>}
      </SidebarContent>
      <SidebarFooter>
        {preview && <AppShellDemoFooterMenu />}
        {preview && <SidebarSeparator className="mx-0 w-full" />}
        <SidebarUserMenu preview={preview} />
      </SidebarFooter>
    </Sidebar>
  );
}

function ComponentNavSectionMenu({
  title,
  icon: Icon,
  items,
  open,
  onToggle,
  pathname,
  onNavigate,
  id,
}: {
  title: ComponentNavSection["title"];
  icon: typeof IconComponents;
  items: ComponentNavItem[];
  open: boolean;
  onToggle: () => void;
  pathname: string;
  onNavigate: () => void;
  id: string;
}) {
  const label = title;
  return (
    <SidebarMenuItem className="ml-1 w-[calc(100%-0.25rem)] group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:w-full">
      <SidebarMenuButton type="button" tooltip={label} aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        <span>{label}</span>
        {open ? <IconMinus aria-hidden="true" className="ml-auto size-4 shrink-0" /> : <IconPlus aria-hidden="true" className="ml-auto size-4 shrink-0" />}
      </SidebarMenuButton>
      {open && (
        <NavigationItems items={items} pathname={pathname} onNavigate={onNavigate} id={id} />
      )}
    </SidebarMenuItem>
  );
}

function NavigationItems({
  items,
  pathname,
  onNavigate,
  id,
  className,
}: {
  items: ComponentNavItem[];
  pathname: string;
  onNavigate: () => void;
  id: string;
  className?: string;
}) {
  const activeItem = items
    .filter((item) => pathname === item.url || pathname.startsWith(`${item.url}/`))
    .sort((left, right) => right.url.length - left.url.length)[0];

  return (
    <SidebarMenuSub id={id} className={className}>
      {items.map((item) => {
        const active = activeItem?.url === item.url;
        return (
          <SidebarMenuSubItem key={item.url}>
            <SidebarMenuSubButton asChild isActive={active}>
              <Link href={item.url} onClick={onNavigate}>
                {item.icon && <item.icon aria-hidden="true" className="size-4 shrink-0" />}
                <span>{item.title}</span>
                {item.badge && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">{item.badge}</span>}
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
}

function TeamSwitcher() {
  const [active, setActive] = useState(workspaces[0]);
  return <AppShellWorkspaceSelector activeWorkspace={active} onChange={setActive} brand sidebar className="w-full" />;
}

function SidebarUserMenu({ preview }: { preview: boolean }) {
  const { isMobile } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();
  const { setOpen } = useThemeConfig();
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
            <DropdownMenuItem onSelect={() => setOpen(true)}><IconAdjustmentsHorizontal className="size-4" /> {"Settings"}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
              {resolvedTheme === "dark" ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
              {"Toggle theme"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

