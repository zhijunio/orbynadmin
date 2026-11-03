"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import { appShellFooterItems, appShellMenuSections } from "@/components/custom/app-shell/config";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar/sidebar";

type AppShellMenuVariant = "icon-rail" | "floating" | "inset";

export function AppShellDemoMenu({ variant }: { variant: AppShellMenuVariant }) {
  const t = useTranslations("Navigation");
  const translate = (value: string) => t.has(value) ? t(value) : value;
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Pipelines: variant === "floating",
    Resources: true,
  });
  const compact = variant === "icon-rail";
  const toggle = (title: string) => setExpandedItems((current) => ({ ...current, [title]: !current[title] }));

  return (
    <>
      {appShellMenuSections.map((section) => {
        const sectionOpen = expandedItems[section.title] ?? true;
        return (
          <SidebarGroup key={section.title} className={`${section.collapsible ? "group-data-[collapsible=icon]:hidden " : ""}${compact ? "px-2 py-1" : "p-0"}`}>
            {section.collapsible ? (
              <SidebarGroupLabel asChild className={compact ? "h-7 px-2" : "px-2 text-[11px]"}>
                <button type="button" onClick={() => toggle(section.title)} aria-expanded={sectionOpen} className="w-full justify-between">
                  {translate(section.title)}<IconChevronDown className={`transition-transform ${sectionOpen ? "" : "-rotate-90"}`} />
                </button>
              </SidebarGroupLabel>
            ) : (
              <SidebarGroupLabel className={compact ? "h-7 px-2" : "px-2 text-[11px]"}>{translate(section.title)}</SidebarGroupLabel>
            )}
            {sectionOpen && <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const itemOpen = expandedItems[item.title] ?? false;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      type={item.children ? "button" : undefined}
                      aria-expanded={item.children ? itemOpen : undefined}
                      onClick={item.children ? () => toggle(item.title) : undefined}
                      isActive={item.title === "Overview"}
                      tooltip={translate(item.title)}
                      className={compact ? "h-7 px-2 py-1 text-[13px] leading-4" : undefined}
                    >
                      {Icon ? <Icon className={compact ? "size-4 shrink-0" : undefined} /> : <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${item.color ?? "bg-muted-foreground"}`} />}
                      <span>{translate(item.title)}</span>
                      {item.badge && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.badge}</span>}
                      {item.tag && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.tag}</span>}
                      {item.children && <IconChevronRight className={`ml-auto size-4 transition-transform group-data-[collapsible=icon]:hidden ${itemOpen ? "rotate-90" : ""}`} />}
                    </SidebarMenuButton>
                    {item.children && itemOpen && <SidebarMenuSub>
                      {item.children.map((child) => <SidebarMenuSubItem key={child}><SidebarMenuSubButton asChild><span>{translate(child)}</span></SidebarMenuSubButton></SidebarMenuSubItem>)}
                    </SidebarMenuSub>}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>}
          </SidebarGroup>
        );
      })}
    </>
  );
}

export function AppShellDemoFooterMenu({ variant }: { variant: AppShellMenuVariant }) {
  const t = useTranslations("Navigation");
  const translate = (value: string) => t.has(value) ? t(value) : value;
  const compact = variant === "icon-rail";

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
        {appShellFooterItems.map(({ title, icon: Icon }) => (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton tooltip={translate(title)} className={compact ? "h-7 px-2 py-1 text-[13px] leading-4" : undefined}>
              {Icon && <Icon />}<span>{translate(title)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
