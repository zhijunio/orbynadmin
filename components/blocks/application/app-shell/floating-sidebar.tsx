"use client";

import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";

import { currentUser, workspaces } from "@/components/custom/app-shell/config";
import { BrandMark } from "@/components/custom/auth/brand-mark";
import { useThemeConfig } from "@/components/theme-customizer";
import { AppShellDemoFooterMenu, AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import {
  AppShellUserMenu,
  AppShellUserSummary,
  AppShellWorkspaceSelector,
} from "@/components/blocks/application/app-shell/app-shell-navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd/kbd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

export function FloatingSidebar() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const { config } = useThemeConfig();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="h-svh min-h-[24rem] min-w-0 overflow-hidden">
    <div className="relative isolate h-full min-h-0 w-full transform-gpu overflow-hidden rounded-xl bg-background">
      <TooltipProvider delayDuration={0}>
      <SidebarProvider cookieName="nextrose-floating-sidebar-sidebar" disableShortcut className="h-full min-h-0 overflow-hidden">
      <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="h-full">
        <SidebarHeader className="gap-2 p-2">
          <AppShellWorkspaceSelector
            activeWorkspace={activeWorkspace}
            onChange={setActiveWorkspace}
            brand
            sidebar
            className="w-full"
          />
        </SidebarHeader>

        <SidebarContent className="gap-0 pt-4">
          <AppShellDemoMenu />
        </SidebarContent>

        <SidebarFooter className="gap-2 p-2">
          <AppShellDemoFooterMenu />
          <SidebarSeparator className="mx-0 w-full" />
          <AppShellUserMenu />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1 size-7 shrink-0" />
          <div className="mr-1 h-5 w-px shrink-0 self-center bg-border" aria-hidden="true" />
          <Breadcrumb>
            <BreadcrumbList className="gap-2">
              <BreadcrumbItem className="gap-1.5">
                <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">{activeWorkspace.kind === "brand" ? <BrandMark size="tiny" /> : <activeWorkspace.icon className="size-2.5" />}</span>
                <BreadcrumbPage className="text-muted-foreground">{activeWorkspace.name}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:size-3" />
              <BreadcrumbItem className="gap-1.5">
                <Avatar className="size-4"><AvatarImage src={currentUser.avatar} alt={currentUser.name} /><AvatarFallback>AM</AvatarFallback></Avatar>
                <BreadcrumbPage className="text-muted-foreground">{currentUser.name}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:size-3" />
              <BreadcrumbItem><BreadcrumbPage className="font-medium">Projects</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="outline" className="hidden h-9 w-56 justify-start gap-2 px-3 text-muted-foreground lg:flex" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <IconSearch className="size-4" aria-hidden="true" />
              <span className="text-sm">Search...</span>
              <KbdGroup className="ml-auto">
                <Kbd>⌘</Kbd>
                <span className="text-[11px] font-medium text-muted-foreground">+</span>
                <Kbd>K</Kbd>
              </KbdGroup>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <IconSearch className="size-5" aria-hidden="true" />
            </Button>
            <AppShellUserSummary compact />
          </div>
        </header>
        <main aria-label="Projects workspace" className="min-h-0 flex-1" />
      </SidebarInset>
      </SidebarProvider>
      </TooltipProvider>
    </div>
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen} title="Workspace search">
      <CommandInput placeholder="Search workspace..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {["Overview", "Customers", "Subscriptions", "Revenue", "Automation", "Support"].map((item) => (
            <CommandItem key={item} onSelect={() => setSearchOpen(false)}>{item}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
    </div>
  );
}
