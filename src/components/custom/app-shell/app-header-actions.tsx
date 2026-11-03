"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconAdjustmentsHorizontal, IconUserCircle, IconWorld } from "@tabler/icons-react";

import { currentUser } from "@/data";
import { ThemeToggle } from "@/components/custom/theme/theme-toggle";
import { CustomizerButton, useThemeConfig } from "@/components/custom/theme/theme-customizer";
import { Button } from "@/components/ui/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";

export function AppHeaderActions() {
  return (
    <div className="flex items-center gap-1.5">
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

function UserMenu() {
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
        <DropdownMenuGroup>
          <DropdownMenuItem asChild><Link href="/account/profile"><IconUserCircle className="size-4" /> {t("account")}</Link></DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpen(true)}><IconAdjustmentsHorizontal className="size-4" /> {t("settings")}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
