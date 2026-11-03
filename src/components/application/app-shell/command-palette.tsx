"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { IconSearch } from "@tabler/icons-react";

import { navGroups, type NavChild, type NavItem } from "@/components/application/app-shell/nav-config";
import { useIsMac } from "@/hooks/use-platform";
import { Kbd, KbdGroup } from "@/components/base/kbd/kbd";
import { Button } from "@/components/base/buttons/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/base/command/command";

export function CommandPalette() {
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

  function renderNestedItems(
    items: NavChild[],
    parentTitles: string[],
    Icon?: NavItem["icon"]
  ): ReactNode[] {
    return items.flatMap((item) => {
      const commands: ReactNode[] = [];
      if (item.url) {
        const url = item.url;
        commands.push(
          <CommandItem
            key={url}
            value={[...parentTitles, item.title]
              .map((label) => navTranslations.has(label) ? navTranslations(label) : label)
              .join(" ")}
            onSelect={() => go(url)}
          >
            {Icon && <Icon className="size-4" />}
            <span className="min-w-0 flex-1 truncate">
              {navTranslations.has(item.title) ? navTranslations(item.title) : item.title}
            </span>
          </CommandItem>
        );
      }

      return [...commands, ...renderNestedItems(item.items ?? [], [...parentTitles, item.title], Icon)];
    });
  }

  return (
    <>
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
        aria-label={t("search")}
        onClick={() => setOpen(true)}
      >
        <IconSearch className="size-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title={t("commandTitle")} description={t("commandDescription")}>
        <CommandInput placeholder={t("commandPlaceholder")} />
        <CommandList aria-label={t("commands")}>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.label} heading={navTranslations.has(group.label) ? navTranslations(group.label) : group.label}>
              {group.items.flatMap((item) => {
                if (item.items?.length) return renderNestedItems(item.items, [item.title], item.icon);
                if (!item.url) return [];
                const label = navTranslations.has(item.title) ? navTranslations(item.title) : item.title;
                return (
                  <CommandItem key={item.url} value={label} onSelect={() => go(item.url!)}>
                    {item.icon && <item.icon className="size-4" />}
                    <span className="min-w-0 flex-1 truncate">{label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
