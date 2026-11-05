"use client";

import { useState } from "react";
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


export function AppShellDemoMenu() {

  const [activeChild, setActiveChild] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Pipelines: true,
    Resources: true,
  });
  const toggle = (title: string) => setExpandedItems((current) => ({ ...current, [title]: !current[title] }));

  return (
    <>
      {appShellMenuSections.map((section) => {
        const sectionOpen = expandedItems[section.title] ?? true;
        return (
          <SidebarGroup key={section.title} className={section.collapsible ? "group-data-[collapsible=icon]:hidden" : undefined}>
            {section.collapsible ? (
              <SidebarGroupLabel asChild>
                <button type="button" onClick={() => toggle(section.title)} aria-expanded={sectionOpen} className="w-full justify-between">
                  {section.title}<IconChevronDown className={`transition-transform ${sectionOpen ? "" : "-rotate-90"}`} />
                </button>
              </SidebarGroupLabel>
            ) : (
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
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
                      isActive={item.title === "Overview" || activeChild.startsWith(`${item.title}/`)}
                      tooltip={item.title}
                    >
                      {Icon ? <Icon /> : <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${item.color ?? "bg-muted-foreground"}`} />}
                      <span>{item.title}</span>
                      {item.badge && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.badge}</span>}
                      {item.tag && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium leading-none text-primary">{item.tag}</span>}
                      {item.children && <IconChevronRight className={`ml-auto size-4 transition-transform group-data-[collapsible=icon]:hidden ${itemOpen ? "rotate-90" : ""}`} />}
                    </SidebarMenuButton>
                    {item.children && itemOpen && <SidebarMenuSub>
                      {item.children.map((child) => <SidebarMenuSubItem key={child}><SidebarMenuSubButton asChild isActive={activeChild === `${item.title}/${child}`}><button type="button" onClick={() => setActiveChild(`${item.title}/${child}`)}>{child}</button></SidebarMenuSubButton></SidebarMenuSubItem>)}
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

export function AppShellDemoFooterMenu() {

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
        {appShellFooterItems.map(({ title, icon: Icon }) => (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton tooltip={title}>
              {Icon && <Icon />}<span>{title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
