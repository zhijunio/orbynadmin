"use client";

import { useState } from "react";

import { AppShellDemoFooterMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import { AppShellPrimaryNavigation, AppShellSectionMenu, AppShellUserMenu, AppShellWorkspaceSelector, type AppShellPrimarySection } from "@/components/blocks/application/app-shell/app-shell-navigation";
import { appShellPrimarySections, workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb/breadcrumb";
import { Sidebar, SidebarContent, SidebarFooter, SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

export function TopNavigation() {
  const [activeSection, setActiveSection] = useState<AppShellPrimarySection>(appShellPrimarySections[0]);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [activeItem, setActiveItem] = useState(appShellPrimarySections[0].items[0]?.title ?? "");
  const { config } = useThemeConfig();
  const selectSection = (section: AppShellPrimarySection) => {
    setActiveSection(section);
    setActiveItem(section.items[0]?.title ?? "");
  };

  return (
    <div className="h-svh min-h-[24rem] min-w-0 overflow-hidden">
      <div className="relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl bg-background">
        <header className="flex min-h-16 shrink-0 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-4">
          <AppShellWorkspaceSelector activeWorkspace={activeWorkspace} onChange={setActiveWorkspace} responsive brand />
          <div className="min-w-0 flex-1"><AppShellPrimaryNavigation activeSection={activeSection.title} onSelect={selectSection} /></div>
        </header>
        <div className="min-h-0 flex-1">
          <TooltipProvider delayDuration={0}>
            <SidebarProvider cookieName="nextrose-top-navigation-sidebar" disableShortcut className="h-full min-h-0 overflow-hidden">
              <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="md:top-16 md:h-[calc(100svh-4rem)]">
                <SidebarContent className="gap-0"><AppShellSectionMenu section={activeSection} activeItem={activeItem} onSelect={setActiveItem} /></SidebarContent>
                <SidebarFooter className="gap-2 p-2">
                  {activeSection.title !== "Manage" && <AppShellDemoFooterMenu />}
                  <SidebarSeparator className="mx-0 w-full" />
                  <AppShellUserMenu />
                </SidebarFooter>
              </Sidebar>
              <SidebarInset className="min-w-0 overflow-hidden bg-background">
                <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger className="-ml-1 size-7 shrink-0" />
                  <div className="mr-1 h-5 w-px shrink-0 self-center bg-border" aria-hidden="true" />
                  <Breadcrumb>
                    <BreadcrumbList className="gap-2">
                      <BreadcrumbItem><BreadcrumbPage className="text-muted-foreground">{activeWorkspace.name}</BreadcrumbPage></BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem><BreadcrumbPage className="text-muted-foreground">{activeSection.title}</BreadcrumbPage></BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem><BreadcrumbPage className="font-medium">{activeItem}</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </header>
                <main aria-label={`${activeSection.title} ${activeItem} workspace`} className="min-h-0 flex-1" />
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
