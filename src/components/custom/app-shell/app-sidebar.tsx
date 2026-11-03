"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { IconChevronRight, IconMinus, IconPlus } from "@tabler/icons-react";

import { cn } from "@/utils/cn";
import { navGroups, type NavChild, type NavItem } from "@/components/custom/app-shell/nav-config";
import { TeamSwitcher } from "@/components/custom/app-shell/team-switcher";
import { NavUser } from "@/components/custom/app-shell/nav-user";
import { useThemeConfig } from "@/components/custom/theme/theme-customizer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar/sidebar";

export function AppSidebar({ appearance = "default", expandIndicator = "chevron", collapsible, variant, hoverExpand = false }: { appearance?: "default" | "tailadmin"; expandIndicator?: "chevron" | "plus-minus"; collapsible?: "offcanvas" | "icon" | "none"; variant?: "sidebar" | "floating" | "inset"; hoverExpand?: boolean } = {}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const expandedByHover = useRef(false);
  const t = useTranslations("Navigation");
  const { config } = useThemeConfig();
  const { isMobile, setOpen, state } = useSidebar();
  const translate = (value: string) => t.has(value) ? t(value) : value;

  const handleMouseEnter = () => {
    if (hoverExpand && !isMobile && state === "collapsed") {
      expandedByHover.current = true;
      setOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (expandedByHover.current) {
      expandedByHover.current = false;
      setOpen(false);
    }
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const content = contentRef.current;
      const activeSubmenuItems = content?.querySelectorAll<HTMLElement>(
        '[data-sidebar="menu-sub-button"][data-active="true"]'
      );
      const activeLink = (activeSubmenuItems?.[activeSubmenuItems.length - 1] ?? null)
        ?? content?.querySelector<HTMLElement>(
        '[data-sidebar="menu-button"][data-active="true"]'
      );

      activeLink?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <Sidebar
      collapsible={collapsible ?? config.sidebarCollapsible}
      variant={variant ?? config.sidebarVariant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader>
        <TeamSwitcher iconOnly={appearance === "tailadmin"} />
      </SidebarHeader>

      <SidebarContent ref={contentRef} className="overscroll-contain">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className={appearance === "tailadmin" ? "gap-1 px-3 py-4" : undefined}>
            <SidebarGroupLabel className={appearance === "tailadmin" ? "h-8 px-3 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/60" : undefined}>{translate(group.label)}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <NavEntry key={item.title} item={item} pathname={pathname} translate={translate} appearance={appearance} expandIndicator={expandIndicator} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser iconOnly={appearance === "tailadmin"} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function badgeClass(badge: string) {
  return /^\d+$/.test(badge)
    ? "bg-sidebar-accent text-sidebar-accent-foreground"
    : "bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground peer-hover/menu-button:text-primary-foreground peer-data-active/menu-button:text-primary-foreground";
}

function BadgeContent({ badge, translate }: { badge: string; translate: (value: string) => string }) {
  return translate(badge);
}

function routeMatches(pathname: string, url: string) {
  return pathname === url || pathname.startsWith(`${url}/`);
}

function findActiveChild(items: NavChild[], pathname: string): NavChild | undefined {
  const matches: NavChild[] = [];
  for (const item of items) {
    if (item.url && routeMatches(pathname, item.url)) matches.push(item);
    if (item.items) {
      const activeDescendant = findActiveChild(item.items, pathname);
      if (activeDescendant) matches.push(activeDescendant);
    }
  }
  return matches.sort((left, right) => (right.url?.length ?? 0) - (left.url?.length ?? 0))[0];
}

const tailadminMenuButton = "h-10 gap-3 rounded-lg px-3 text-[13px] data-[active=true]:!bg-primary/10 data-[active=true]:!text-primary [&_svg]:size-[18px]";

function ExpandIndicator({ style, nested = false }: { style: "chevron" | "plus-minus"; nested?: boolean }) {
  if (style === "plus-minus") {
    return <span className="ml-auto flex size-4 items-center justify-center">
      <IconPlus className={nested ? "size-3.5 group-data-[state=open]/sub-collapsible:hidden" : "size-4 group-data-[state=open]/collapsible:hidden"} />
      <IconMinus className={nested ? "hidden size-3.5 group-data-[state=open]/sub-collapsible:block" : "hidden size-4 group-data-[state=open]/collapsible:block"} />
    </span>;
  }
  return nested
    ? <IconChevronRight className="ml-auto size-3.5 transition-transform group-data-[state=open]/sub-collapsible:rotate-90" />
    : <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />;
}

function NavEntry({ item, pathname, translate, appearance, expandIndicator }: { item: NavItem; pathname: string; translate: (value: string) => string; appearance: "default" | "tailadmin"; expandIndicator: "chevron" | "plus-minus" }) {
  const { setOpenMobile, state } = useSidebar();
  const closeMobile = () => setOpenMobile(false);
  const iconOnly = appearance === "tailadmin" && state === "collapsed";
  const badge = item.badge;

  // Collapsible parent with children.
  if (item.items?.length) {
    const activeChild = findActiveChild(item.items, pathname);
    const childActive = !!activeChild;
    return (
      <Collapsible
        asChild
        defaultOpen={childActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className={appearance === "tailadmin" ? tailadminMenuButton : undefined} tooltip={translate(item.title)} isActive={childActive}>
              {item.icon && <item.icon className={appearance === "tailadmin" ? "size-[18px]" : "size-4"} />}
              {!iconOnly && <span>{translate(item.title)}</span>}
              {!iconOnly && badge && (
                <SidebarMenuBadge
                  className={cn(
                    "group-data-[state=open]/collapsible:hidden",
                    badgeClass(badge)
                  )}
                >
                  <BadgeContent badge={badge} translate={translate} />
                </SidebarMenuBadge>
              )}
              {!iconOnly && <ExpandIndicator style={expandIndicator} />}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden [--tw-animation-duration:260ms] data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub>
              {item.items.map((sub) => (
                <NavSubEntry key={sub.title} item={sub} activeUrl={activeChild?.url} pathname={pathname} translate={translate} appearance={appearance} expandIndicator={expandIndicator} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // Flat link item.
  const active =
    pathname === item.url ||
    (!!item.url && pathname.startsWith(item.url));
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={appearance === "tailadmin" ? tailadminMenuButton : undefined} isActive={active} tooltip={translate(item.title)}>
        <Link href={item.url ?? "#"} onClick={closeMobile}>
          {item.icon && <item.icon className={appearance === "tailadmin" ? "size-[18px]" : "size-4"} />}
          {!iconOnly && <span>{translate(item.title)}</span>}
        </Link>
      </SidebarMenuButton>
      {badge && (
        <SidebarMenuBadge className={badgeClass(badge)}>
          <BadgeContent badge={badge} translate={translate} />
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}

function NavSubEntry({
  item,
  activeUrl,
  pathname,
  translate,
  appearance,
  expandIndicator,
}: {
  item: NavChild;
  activeUrl?: string;
  pathname: string;
  translate: (value: string) => string;
  appearance: "default" | "tailadmin";
  expandIndicator: "chevron" | "plus-minus";
}) {
  const { setOpenMobile } = useSidebar();
  const closeMobile = () => setOpenMobile(false);

  if (item.items?.length) {
    const activeChild = findActiveChild(item.items, pathname);
    return (
      <Collapsible asChild defaultOpen={!!activeChild} className="group/sub-collapsible">
        <SidebarMenuSubItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton asChild isActive={!!activeChild}>
              <button type="button" className="w-full text-left">
                <span>{translate(item.title)}</span>
                {item.badge && <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] leading-none font-semibold text-primary-foreground"><BadgeContent badge={item.badge} translate={translate} /></span>}
                <ExpandIndicator style={expandIndicator} nested />
              </button>
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub className="ml-2.5 border-l-0 pl-1.5">
              {item.items.map((child) => (
                <NavSubEntry key={child.title} item={child} activeUrl={activeUrl} pathname={pathname} translate={translate} appearance={appearance} expandIndicator={expandIndicator} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuSubItem>
      </Collapsible>
    );
  }

  if (!item.url) return null;

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={activeUrl === item.url} className={appearance === "tailadmin" ? "h-9 rounded-md px-3 text-[13px] data-[active=true]:!bg-primary/10 data-[active=true]:!text-primary" : undefined}>
        <Link href={item.url} onClick={closeMobile} className="flex items-center justify-between gap-2">
          <span>{translate(item.title)}</span>
          {item.badge && <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] leading-none font-semibold text-primary-foreground"><BadgeContent badge={item.badge} translate={translate} /></span>}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
