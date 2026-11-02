"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { IconBell, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { AppSidebar } from "@/components/application/app-shell/app-sidebar";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/base/sidebar/sidebar";
import { TooltipProvider } from "@/components/base/tooltip/tooltip";
import { currentUser } from "@/data";
import type { SidebarCollapsible, SidebarVariant } from "@/components/application/theme/theme-config";

type LayoutId = "one" | "two" | "three" | "four" | "five" | "six";
type SidebarMode = { variant: SidebarVariant; collapsible: SidebarCollapsible };

const sidebarModes: Record<LayoutId, SidebarMode> = {
  one: { variant: "sidebar", collapsible: "icon" },
  two: { variant: "sidebar", collapsible: "offcanvas" },
  three: { variant: "inset", collapsible: "icon" },
  four: { variant: "inset", collapsible: "offcanvas" },
  five: { variant: "floating", collapsible: "offcanvas" },
  six: { variant: "sidebar", collapsible: "icon" },
};

function SearchBox({ command = false }: { command?: boolean }) {
  return (
    <div className="relative hidden w-full max-w-[430px] md:block">
      <IconSearch className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
      <input
        aria-label={command ? "Search or type command" : "Search the docs"}
        readOnly
        placeholder={command ? "Search or type command..." : "Search the docs"}
        className="h-11 w-full rounded-lg border bg-background pl-10 pr-14 text-sm outline-none placeholder:text-muted-foreground"
      />
      {command && <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘ K</kbd>}
    </div>
  );
}

function LayoutHeader({ docsLayout }: { docsLayout: boolean }) {
  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center gap-4 border-b bg-background/95 px-5 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="size-11 shrink-0 rounded-lg border bg-background text-muted-foreground hover:bg-muted" />
      {docsLayout ? (
        <>
          <div className="hidden flex-1 md:flex"><SearchBox command /></div>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle className="size-11 rounded-lg border" />
            <Link href="/dashboard" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Get Started</Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1"><SearchBox command /></div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <ThemeToggle className="hidden size-11 rounded-lg border sm:flex" />
            <button type="button" aria-label="Notifications" className="relative hidden size-11 items-center justify-center rounded-lg border text-muted-foreground hover:bg-muted sm:flex">
              <IconBell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-orange-500" />
            </button>
            <button type="button" aria-label="User menu" className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-muted">
              <Avatar className="size-9 rounded-lg">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="rounded-lg">AM</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:block">{currentUser.name}</span>
              <IconChevronDown className="hidden size-4 text-muted-foreground md:block" />
            </button>
          </div>
        </>
      )}
    </header>
  );
}

function SkeletonPanel({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`rounded-xl border bg-muted/30 ${className}`} />;
}

function MainPlaceholder({ layout }: { layout: LayoutId }) {
  const topCards = Array.from({ length: layout === "five" ? 2 : 4 }, (_, index) => (
    <SkeletonPanel key={index} className="h-40" />
  ));

  return (
    <div className="space-y-6">
      <div className={`grid gap-6 ${layout === "five" ? "sm:grid-cols-[1fr_2fr]" : "sm:grid-cols-2 xl:grid-cols-4"}`}>
        {topCards}
      </div>
      {(layout === "one" || layout === "three") && (
        <div className="grid min-h-[60vh] gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <SkeletonPanel />
          <SkeletonPanel />
        </div>
      )}
      {(layout === "two" || layout === "four") && (
        <div className="grid min-h-[60vh] gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((index) => <SkeletonPanel key={index} />)}
        </div>
      )}
      {layout === "five" && (
        <>
          <SkeletonPanel className="min-h-[54vh]" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((index) => <SkeletonPanel key={index} className="h-40" />)}
          </div>
        </>
      )}
      {layout === "six" && <SkeletonPanel className="min-h-[calc(100svh-320px)]" />}
    </div>
  );
}

export function LayoutDemo({ layout }: { layout: LayoutId }) {
  const docsLayout = layout === "three" || layout === "four" || layout === "five";
  const sidebarMode = sidebarModes[layout];
  const sidebarStyle = {
    "--sidebar-width": "290px",
    "--sidebar-width-icon": layout === "six" ? "92px" : "48px",
  } as CSSProperties;

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={layout !== "six"} style={sidebarStyle} className="min-h-svh bg-background text-foreground">
        <AppSidebar
          appearance="tailadmin"
          expandIndicator={layout === "one" ? "plus-minus" : "chevron"}
          collapsible={sidebarMode.collapsible}
          variant={sidebarMode.variant}
          hoverExpand={sidebarMode.collapsible === "icon"}
        />
        <SidebarInset className="min-h-svh min-w-0 bg-background">
          <LayoutHeader docsLayout={docsLayout} />
          <main className="min-w-0 px-5 py-6 sm:px-6 lg:px-7">
            <MainPlaceholder layout={layout} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
