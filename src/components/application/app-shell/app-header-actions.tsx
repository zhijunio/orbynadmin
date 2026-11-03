"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconBell, IconCreditCard, IconLogout, IconSettings, IconUserCircle, IconWorld } from "@tabler/icons-react";

import { currentUser } from "@/data";
import { useNotificationStore } from "@/data/notification-store";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { CustomizerButton } from "@/components/application/theme/theme-customizer";
import { Button } from "@/components/base/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { NotificationCenterScreen } from "@/components/application/notification-center/notification-center-screen";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/base/popover/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";

export function AppHeaderActions() {
  return (
    <div className="flex items-center gap-1.5">
      <NotificationsMenu />
      <LanguageMenu />
      <ThemeToggle />
      <CustomizerButton />
      <div className="mx-1 h-6 w-px shrink-0 self-center bg-border" />
      <UserMenu />
    </div>
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

export function NotificationsMenu() {
  const t = useTranslations("Notifications");
  const unreadCount = useNotificationStore((state) => state.items.filter((notification) => notification.unread).length);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-lg" aria-label={t("title")}>
          <IconBell className="size-4" />
          {unreadCount > 0 && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full border-2 border-background bg-[#f3283d] text-[9px] leading-none font-bold text-white">{unreadCount}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-[calc(100vw-1rem)] max-w-[430px] rounded-3xl border-0 bg-transparent p-0 shadow-none ring-0">
        <NotificationCenterScreen title={t("title")} compact />
      </PopoverContent>
    </Popover>
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
        <DropdownMenuGroup>
          <DropdownMenuItem asChild><Link href="/account/profile"><IconUserCircle className="size-4" /> {t("account")}</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/account/settings"><IconSettings className="size-4" /> {t("settings")}</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/account/settings"><IconCreditCard className="size-4" /> {t("billing")}</Link></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/login"><IconLogout className="size-4" /> {t("logout")}</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
