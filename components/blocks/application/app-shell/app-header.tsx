"use client";

import { Fragment, useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  IconAdjustmentsHorizontal,
  IconMoon,
  IconSearch,
  IconSun,
  IconWorld,
} from "@tabler/icons-react";

import { appNavItems, blockNavItems, componentNavItems, currentUser } from "@/components/custom/app-shell/config";
import { CustomizerButton, useThemeConfig } from "@/components/theme-customizer";
import { useIsMac } from "@/hooks/use-platform";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/buttons/button";
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
  const t = useTranslations("Navigation");
  if (preview) return ["Dashboard", "Overview"];
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const label = appNavItems.find((item) => item.url === path)?.title
      ?? segment.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
    return t.has(label) ? t(label) : label;
  });
}

export function AppHeader({ preview = false }: { preview?: boolean }) {
  const crumbs = useBreadcrumb(preview);
  return (
    <header className={`sticky top-0 z-30 flex shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${preview ? "h-12" : "h-16"}`}>
      {preview ? (
        <SidebarTrigger className="-ml-1 md:hidden" />
      ) : (
        <SidebarTrigger className="-ml-1" />
      )}
      {!preview && <div className="mr-1 h-5 w-px shrink-0 self-center bg-border" />}
      <Breadcrumb className="hidden sm:block">
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
  const navTranslations = useTranslations("Navigation");
  const t = useTranslations("Header");
  const router = useRouter();
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);
  const go = useCallback((url: string) => {
    setOpen(false);
    router.push(url);
  }, [router]);

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
        <span className="text-sm">{t("search")}</span>
        <KbdGroup className="ml-auto">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <span className="text-[11px] font-medium text-muted-foreground">+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label={t("search")} onClick={() => setOpen(true)}>
        <IconSearch className="size-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title={t("commandTitle")} description={t("commandDescription")}>
        <CommandInput placeholder={t("commandPlaceholder")} />
        <CommandList aria-label={t("commands")}>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          <CommandGroup heading={navTranslations("Components")}>
            {componentNavItems.map((item) => {
              const label = item.title;
              return <CommandItem key={item.url} value={label} onSelect={() => go(item.url)}>{label}</CommandItem>;
            })}
          </CommandGroup>
          <CommandGroup heading={navTranslations("Blocks")}>
            {blockNavItems.map((item) => {
              const label = navTranslations.has(item.title) ? navTranslations(item.title) : item.title;
              return <CommandItem key={item.url} value={label} onSelect={() => go(item.url)}>{label}</CommandItem>;
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function LanguageMenu() {
  const locale = useLocale();
  const t = useTranslations("Language");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: "en" | "zh") {
    document.cookie = `NEXT_LOCALE=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    startTransition(() => router.refresh());
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label={t("label")} disabled={isPending}>
          <IconWorld className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => changeLocale("en")} aria-current={locale === "en" ? "true" : undefined}>{t("english")}</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLocale("zh")} aria-current={locale === "zh" ? "true" : undefined}>{t("chinese")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("ThemeCustomizer");
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
      aria-label={t("toggleTheme")}
    >
      {mounted && resolvedTheme === "dark" ? <IconSun className="size-5" /> : <IconMoon className="size-5" />}
    </Button>
  );
}

function UserMenu({ preview = false }: { preview?: boolean }) {
  const t = useTranslations("UserMenu");
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
        {!preview && <DropdownMenuItem onSelect={() => setOpen(true)}><IconAdjustmentsHorizontal className="size-4" /> {t("settings")}</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
