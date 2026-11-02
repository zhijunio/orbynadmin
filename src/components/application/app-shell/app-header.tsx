"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { isLocale } from "@/i18n/routing";
import {
  IconBell,
  IconSearch,
  IconLogout,
  IconUserCircle,
  IconSettings,
  IconCreditCard,
  IconWorld,
} from "@tabler/icons-react";

import { navGroups, type NavChild, type NavItem } from "@/components/application/app-shell/nav-config";
import { currentUser, recentActivity } from "@/data";
import { useIsMac } from "@/hooks/use-platform";
import { Kbd, KbdGroup } from "@/components/base/kbd/kbd";
import { SidebarTrigger } from "@/components/base/sidebar/sidebar";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { CustomizerButton } from "@/components/application/theme/theme-customizer";
import { Button } from "@/components/base/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/base/breadcrumb/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/base/command/command";

// Acronyms that shouldn't be title-cased from the URL segment.
const CRUMB_LABELS: Record<string, string> = {
  hr: "HR",
  crm: "CRM",
  api: "API",
  otp: "OTP",
  faq: "FAQ",
  "loading-state": "Loading States",
  layouts: "Layouts",
  one: "Layout One",
  two: "Layout Two",
  three: "Layout Three",
  four: "Layout Four",
  five: "Layout Five",
  six: "Layout Six",
  saas: "SaaS",
  ai: "AI",
  stocks: "Stocks",
  "real-estate": "Real Estate",
  ecommerce: "E-Commerce",
  elements: "Components",
};

function useBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return segments.map(
    (s) =>
      CRUMB_LABELS[s] ??
      s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function AppHeader() {
  const crumbs = useBreadcrumb();
  const navTranslations = useTranslations("Navigation");
  const t = useTranslations("Header");
  const router = useRouter();
  const isMac = useIsMac();
  const [open, setOpen] = React.useState(false);

  const go = React.useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router]
  );

  function renderNestedNavItems(
    items: NavChild[],
    parentTitles: string[],
    Icon?: NavItem["icon"]
  ): React.ReactNode[] {
    return items.flatMap((item) => {
      const command: React.ReactNode[] = [];

      if (item.url) {
        const url = item.url;
        const searchValue = [...parentTitles, item.title]
          .map((label) => navTranslations.has(label) ? navTranslations(label) : label)
          .join(" ");
        command.push(
          <CommandItem
            key={url}
            value={searchValue}
            onSelect={() => go(url)}
          >
            {Icon && <Icon className="size-4" />}
            <span className="min-w-0 flex-1 truncate">{navTranslations.has(item.title) ? navTranslations(item.title) : item.title}</span>
          </CommandItem>
        );
      }

      return [...command, ...renderNestedNavItems(item.items ?? [], [...parentTitles, item.title], Icon)];
    });
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="mr-1 h-5 w-px shrink-0 self-center bg-border" />
      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={
                    i < crumbs.length - 1 ? "text-muted-foreground" : ""
                  }
                >
                  {navTranslations.has(c) ? navTranslations(c) : c}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {i < crumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="outline"
          className="hidden h-9 w-56 justify-start gap-2 px-3 text-muted-foreground lg:flex"
          onClick={() => setOpen(true)}
        >
          <IconSearch className="size-4" />
          <span className="text-sm">{t("search")}</span>
          <KbdGroup className="ml-auto">
            <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
            <span className="text-[11px] font-medium text-muted-foreground">+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full lg:hidden"
          onClick={() => setOpen(true)}
        >
          <IconSearch className="size-5" />
        </Button>

        <NotificationsMenu />
        <LanguageMenu />
        <ThemeToggle />
        <CustomizerButton />
        <div className="mx-1 h-6 w-px shrink-0 self-center bg-border" />
        <UserMenu />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen} title={t("commandTitle")} description={t("commandDescription")}>
        <CommandInput placeholder={t("commandPlaceholder")} />
        <CommandList aria-label={t("commands")}>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.label} heading={navTranslations.has(group.label) ? navTranslations(group.label) : group.label}>
              {group.items.flatMap((item) => {
                if (item.items?.length) {
                  return renderNestedNavItems(item.items, [item.title], item.icon);
                }
                if (!item.url) return [];
                const url = item.url;
                const label = navTranslations.has(item.title) ? navTranslations(item.title) : item.title;
                return (
                  <CommandItem
                    key={item.title}
                    value={label}
                    onSelect={() => go(url)}
                  >
                    {item.icon && <item.icon className="size-4" />}
                    <span className="min-w-0 flex-1 truncate">{navTranslations.has(item.title) ? navTranslations(item.title) : item.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </header>
  );
}

function LanguageMenu() {
  const locale = useLocale();
  const t = useTranslations("Language");
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

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

function NotificationsMenu() {
  const t = useTranslations("Notifications");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label={t("title")}
        >
          <IconBell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[calc(100vw-1rem)] sm:w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="p-0">{t("title")}</DropdownMenuLabel>
          <Badge variant="secondary">{t("newCount", { count: 3 })}</Badge>
        </div>
        <DropdownMenuSeparator />
        {recentActivity.slice(0, 4).map((a) => (
          <DropdownMenuItem key={a.id} className="items-start gap-3 py-2.5">
            <Avatar className="size-8">
              <AvatarImage src={a.avatar} alt={a.user} />
              <AvatarFallback>{a.user.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 gap-0.5">
              <p className="line-clamp-2 whitespace-normal text-sm leading-snug">
                <span className="font-medium">{a.user}</span> {a.action}{" "}
                <span className="font-medium">{a.target}</span>
              </p>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center text-sm font-medium">
          <Link href="/account/notifications">{t("viewAll")}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  const t = useTranslations("UserMenu");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-2 px-1.5">
          <Avatar className="size-7">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium lg:inline">
            {currentUser.name}
          </span>
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
            <span className="truncate text-xs text-muted-foreground">
              {currentUser.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account/profile">
              <IconUserCircle className="size-4" /> {t("account")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/settings">
              <IconSettings className="size-4" /> {t("settings")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/settings">
              <IconCreditCard className="size-4" /> {t("billing")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">
            <IconLogout className="size-4" /> {t("logout")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
