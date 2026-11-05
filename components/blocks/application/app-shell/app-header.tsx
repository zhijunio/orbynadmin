"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  IconAdjustmentsHorizontal,
  IconMoon,
  IconSearch,
  IconSun,
  IconWorld,
} from "@tabler/icons-react";

import { appNavItems, blockNavItems, componentNavSections, currentUser } from "@/components/custom/app-shell/config";
import { CustomizerButton, useThemeConfig } from "@/components/theme-customizer";
import { useIsMac } from "@/hooks/use-platform";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar/sidebar";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd/kbd";


function useBreadcrumb(preview: boolean) {
  const pathname = usePathname();
  if (preview) return ["Dashboard", "Overview"];
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const label = appNavItems.find((item) => item.url === path)?.title
      ?? segment.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
    return label;
  });
}

export function AppHeader({ preview = false, fullBleed = false }: { preview?: boolean; fullBleed?: boolean }) {
  const crumbs = useBreadcrumb(preview);
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="mr-1 hidden h-5 w-px shrink-0 self-center bg-border sm:block" />
      <Breadcrumb className={fullBleed ? "hidden lg:block" : "hidden sm:block"}>
        <BreadcrumbList>
          {crumbs.map((crumb, index) => (
            <Fragment key={`${index}-${crumb}`}>
              <BreadcrumbItem>
                <BreadcrumbPage className={index < crumbs.length - 1 ? "text-muted-foreground" : ""}>
                  {crumb}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {index < crumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-1.5">
        {!preview && <CommandPalette />}
        {!preview && <HeaderActions preview={preview} />}
      </div>
    </header>
  );
}

function HeaderActions({ preview }: { preview: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {!preview && <LanguageMenu />}
      <ThemeToggle />
      {!preview && <CustomizerButton />}
      <div className="mx-1 h-6 w-px shrink-0 self-center bg-border" />
      <UserMenu preview={preview} />
    </div>
  );
}

function CommandPalette() {
  const router = useRouter();
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);
  const go = useCallback((url: string) => {
    setOpen(false);
    router.push(url);
  }, [router, setOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button variant="outline" className="hidden h-9 w-56 justify-start gap-2 px-3 text-muted-foreground lg:flex" onClick={() => setOpen(true)}>
        <IconSearch className="size-4" />
        <span className="text-sm">{"Search…"}</span>
        <KbdGroup className="ml-auto">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <span className="text-[11px] font-medium text-muted-foreground">+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label={"Search…"} onClick={() => setOpen(true)}>
        <IconSearch className="size-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title={"Search commands and pages"} description={"Navigate to pages or run an action."}>
        <CommandInput placeholder={"Type a command or search…"} />
        <CommandList aria-label={"Commands"}>
          <CommandEmpty>{"No results found."}</CommandEmpty>
          {componentNavSections.map((section) => (
            <CommandGroup key={section.title} heading={`Components · ${section.title}`}>
              {section.items.map((item) => (
                <CommandItem key={item.url} value={item.title} onSelect={() => go(item.url)}>
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandGroup heading={`${"Blocks"} · ${"Application"}`}>
            {blockNavItems.map((item) => {
              const label = item.title;
              return <CommandItem key={item.url} value={label} onSelect={() => go(item.url)}>{label}</CommandItem>;
            })}
          </CommandGroup>
          <CommandGroup heading={`${"Blocks"} · ${"Application"}`}>
            <CommandItem value={"Auth"} onSelect={() => go("/blocks/application/auth")}>{"Auth"}</CommandItem>
            <CommandItem value={"Cards"} onSelect={() => go("/blocks/application/card")}>{"Cards"}</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function LanguageMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label={"Language"}>
          <IconWorld className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{"Language"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem aria-current="true">{"English"}</DropdownMenuItem>
        <DropdownMenuItem disabled>{"简体中文"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={"Toggle theme"}
    >
      {mounted && resolvedTheme === "dark" ? <IconSun className="size-5" /> : <IconMoon className="size-5" />}
    </Button>
  );
}

function UserMenu({ preview = false }: { preview?: boolean }) {
  const { setOpen } = useThemeConfig();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-2 px-1.5">
          <Avatar className="size-7">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium lg:inline">{currentUser.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="grid min-w-0">
            <span className="truncate text-sm font-medium">{currentUser.name}</span>
            <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!preview && <DropdownMenuItem onSelect={() => setOpen(true)}><IconAdjustmentsHorizontal className="size-4" /> {"Settings"}</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
