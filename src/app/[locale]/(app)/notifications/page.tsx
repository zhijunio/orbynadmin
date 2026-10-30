"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  IconAt,
  IconMessageCircle,
  IconUserPlus,
  IconShieldCheck,
  IconCreditCard,
  IconRocket,
  IconChecks,
  IconSettings,
  IconDots,
  IconCircleCheck,
  IconCircleDot,
  IconTrash,
  IconBellOff,
} from "@tabler/icons-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { notifications, type Notification, type NotificationKind } from "@/data";

const kindConfig: Record<
  NotificationKind,
  { icon: React.ComponentType<{ className?: string }>; tint: string }
> = {
  mention: {
    icon: IconAt,
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  comment: {
    icon: IconMessageCircle,
    tint: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  assign: {
    icon: IconUserPlus,
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  system: {
    icon: IconShieldCheck,
    tint: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
  billing: {
    icon: IconCreditCard,
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  deploy: {
    icon: IconRocket,
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

type TabValue = "all" | "unread" | "mentions" | "system";

export default function NotificationsPage() {
  const t = useTranslations("Notifications.page");
  const [items, setItems] = useState<Notification[]>(notifications);
  const [tab, setTab] = useState<TabValue>("all");

  const counts = useMemo(() => {
    return {
      all: items.length,
      unread: items.filter((n) => !n.read).length,
      mentions: items.filter((n) => n.kind === "mention").length,
      system: items.filter((n) => n.kind === "system").length,
    };
  }, [items]);

  const visible = useMemo(() => {
    return items.filter((n) => {
      if (tab === "unread") return !n.read;
      if (tab === "mentions") return n.kind === "mention";
      if (tab === "system") return n.kind === "system";
      return true;
    });
  }, [items, tab]);

  const markAll = () => {
    if (counts.unread === 0) return;
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success(t("markedAllRead"));
  };

  const setRead = (id: string, read: boolean) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read } : n)));

  const remove = (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
    toast.success(t("removed"));
  };

  const tabs: { value: TabValue; label: string; count: number }[] = [
    { value: "all", label: t("tabs.all"), count: counts.all },
    { value: "unread", label: t("tabs.unread"), count: counts.unread },
    { value: "mentions", label: t("tabs.mentions"), count: counts.mentions },
    { value: "system", label: t("tabs.system"), count: counts.system },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={markAll}
          disabled={counts.unread === 0}
        >
          <IconChecks className="size-4" /> {t("markAllRead")}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("settings")}
          asChild
        >
          <Link href="/settings">
            <IconSettings className="size-4" />
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <div className="overflow-x-auto">
            <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)}>
              <TabsList>
                {tabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>
                    {t.label}
                    <span className="ml-1 rounded-full bg-muted px-1.5 text-[11px] tabular-nums text-muted-foreground">
                      {t.count}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="px-2">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-muted-foreground">
              <IconBellOff className="size-7 opacity-50" />
              <p className="text-sm">{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-1">
              {visible.map((n) => {
                const cfg = kindConfig[n.kind];
                const Icon = cfg.icon;
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "group relative flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/50",
                      !n.read && "bg-muted/40"
                    )}
                  >
                    {!n.read && (
                      <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                    )}

                    <div className="relative shrink-0">
                      {n.actor ? (
                        <>
                          <Avatar className="size-9">
                            <AvatarImage src={n.actor.avatar} alt={n.actor.name} />
                            <AvatarFallback>{initials(n.actor.name)}</AvatarFallback>
                          </Avatar>
                          <span
                            className={cn(
                              "absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full ring-2 ring-card",
                              cfg.tint
                            )}
                          >
                            <Icon className="size-3" />
                          </span>
                        </>
                      ) : (
                        <span
                          className={cn(
                            "grid size-9 place-items-center rounded-full",
                            cfg.tint
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            "text-sm",
                            n.read ? "font-medium" : "font-semibold"
                          )}
                        >
                          {t.has(`entries.${n.id}.title`) ? t(`entries.${n.id}.title`) : n.title}
                        </p>
                        {!n.read && (
                          <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t.has(`entries.${n.id}.description`) ? t(`entries.${n.id}.description`) : n.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.has(`times.${n.time}`) ? t(`times.${n.time}`) : n.time}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100"
                        >
                          <IconDots className="size-4" />
                          <span className="sr-only">{t("actions")}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {n.read ? (
                          <DropdownMenuItem onSelect={() => setRead(n.id, false)}>
                            <IconCircleDot className="size-4" /> {t("markUnread")}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onSelect={() => setRead(n.id, true)}>
                            <IconCircleCheck className="size-4" /> {t("markRead")}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => remove(n.id)}
                        >
                          <IconTrash className="size-4" /> {t("remove")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
