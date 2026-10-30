"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname as useLocalizedPathname, useRouter as useLocalizedRouter } from "@/i18n/navigation";
import {
  IconBell,
  IconSearch,
  IconLogout,
  IconUserCircle,
  IconSettings,
  IconCreditCard,
  IconWorld,
} from "@tabler/icons-react";

import { navGroups } from "@/config/nav";
import { currentUser, recentActivity } from "@/data";
import { useIsMac } from "@/hooks/use-platform";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { CustomizerButton } from "@/components/theme-customizer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
};

function useBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("commandPlaceholder")} />
        <CommandList>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.label} heading={navTranslations.has(group.label) ? navTranslations(group.label) : group.label}>
              {group.items.flatMap((item) => {
                if (item.items?.length) {
                  return item.items.map((sub) => (
                    <CommandItem
                      key={sub.title}
                      value={`${item.title} ${sub.title}`}
                      onSelect={() => go(sub.url)}
                    >
                      {item.icon && <item.icon className="size-4" />}
                      <span className="min-w-0 flex-1 truncate">{navTranslations.has(sub.title) ? navTranslations(sub.title) : sub.title}</span>
                    </CommandItem>
                  ));
                }
                return (
                  <CommandItem
                    key={item.title}
                    value={item.title}
                    onSelect={() => go(item.url ?? "#")}
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
  const pathname = useLocalizedPathname();
  const router = useLocalizedRouter();
  const [isPending, startTransition] = React.useTransition();

  function changeLocale(nextLocale: "en" | "zh") {
    startTransition(() => router.replace(pathname, { locale: nextLocale }));
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
          <Link href="/notifications">{t("viewAll")}</Link>
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
            <Link href="/profile">
              <IconUserCircle className="size-4" /> {t("account")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <IconSettings className="size-4" /> {t("settings")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
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
