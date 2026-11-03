"use client";

import { useState } from "react";
import { IconAt, IconBellOff, IconCircleCheck, IconCircleDot, IconCloudDownload, IconDots, IconShieldCheck, IconTrash, IconUserPlus } from "@tabler/icons-react";

import type { NotificationCategory, NotificationItem } from "@/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/base/tabs/tabs";
import { cn } from "@/utils/cn";

type Filter = "all" | "mentions" | "system";
type Labels = {
  all: string;
  mentions: string;
  system: string;
  empty: string;
  actions: string;
  markUnread: string;
  markRead: string;
  remove: string;
  markAllRead: string;
  unreadCount: string;
  unread: string;
  times: Record<string, string>;
  actionLabels: Record<string, string>;
  entries: Record<string, { title: string; description: string }>;
};

const categoryIcons: Record<NotificationCategory, typeof IconAt> = {
  mention: IconAt,
  activity: IconUserPlus,
  system: IconShieldCheck,
};

function initials(value: string) {
  return value.split(/\s+/).map((part) => part[0]).join("").slice(0, 2);
}

function NotificationCenter({
  items,
  labels,
  onSetRead,
  onRemove,
  onAction,
  title,
  unreadCount,
  markAllRead,
  compact = false,
}: {
  items: NotificationItem[];
  labels: Labels;
  onSetRead: (id: string, unread: boolean) => void;
  onRemove: (id: string) => void;
  onAction: (item: NotificationItem, actionId: string) => void;
  title: string;
  unreadCount: number;
  markAllRead: () => void;
  compact?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const mentionCount = items.filter((item) => item.category === "mention").length;
  const systemCount = items.filter((item) => item.category === "system").length;
  const filtered = items.filter((item) => filter === "all" || (filter === "mentions" ? item.category === "mention" : item.category === filter));

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: labels.all, count: items.length },
    { value: "mentions", label: labels.mentions, count: mentionCount },
    { value: "system", label: labels.system, count: systemCount },
  ];

  return (
    <section className={cn("flex w-full flex-col overflow-hidden", compact ? "max-w-[430px] rounded-3xl border border-border bg-card shadow-md" : "bg-transparent")}>
      <header className="flex flex-col gap-3 p-4 pb-2">
        {compact && <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2"><h2 className="text-lg font-medium tracking-tight">{title}</h2><span className="text-sm text-muted-foreground">{labels.unreadCount}</span></div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 shrink-0 rounded-lg text-primary" onClick={markAllRead} disabled={!unreadCount}><IconCircleCheck className="size-4" />{labels.markAllRead}</Button>
        </div>}
        <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)}>
          <TabsList className="grid h-9 w-full grid-cols-3 rounded-lg bg-muted p-1">
            {filters.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-full min-w-0 gap-1.5 rounded-md px-2 py-1 text-sm font-normal text-muted-foreground data-[state=active]:bg-background data-[state=active]:font-medium data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                {tab.label}<span className="rounded bg-muted-foreground/10 px-1.5 text-xs leading-5 tabular-nums text-muted-foreground">{tab.count}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </header>
      <div className={cn("overflow-hidden", compact && "mx-1.5 mb-1.5 rounded-2xl bg-muted/40 p-2")}>
        <div className={cn("flex flex-col gap-2 overflow-y-auto", compact ? "max-h-[min(516px,calc(100vh-13rem))]" : "max-h-[680px]")}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center text-muted-foreground">
            <IconBellOff className="size-7 opacity-50" /><p className="text-sm">{labels.empty}</p>
          </div>
        ) : (
          <div className={cn(compact && "flex flex-col gap-2")}>
                  {filtered.map((item) => {
                    const CategoryIcon = categoryIcons[item.category];
                    const entry = labels.entries[item.id] ?? item;
                    return (
                      <article key={item.id} className={cn("group relative flex items-start gap-3", compact ? "rounded-2xl bg-background px-3 py-3" : "border-b border-border/50 px-3 py-4 last:border-0")}>
                        {item.actor ? (
                          <Avatar className="mt-0.5 size-10 shrink-0">
                            <AvatarImage src={item.actor.avatar} alt={item.actor.name} />
                            <AvatarFallback>{initials(item.actor.name)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <span className={cn("mt-0.5 grid size-10 shrink-0 place-items-center rounded-full", item.status === "error" ? "bg-destructive/10 text-destructive" : item.status === "success" ? "bg-lime-100 text-lime-700" : item.category === "activity" ? "bg-blue-100 text-blue-600" : "bg-muted text-muted-foreground")}>
                            {item.category === "activity" ? <IconUserPlus className="size-5" /> : item.status === "success" ? <IconCloudDownload className="size-5" /> : <CategoryIcon className="size-5" />}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex min-w-0 items-center gap-2">
                            <h3 className="min-w-0 flex-1 text-sm font-medium leading-5">{entry.title}</h3>
                            <time className="shrink-0 text-xs text-muted-foreground">{labels.times[item.time] ?? item.time}</time>
                            {item.unread && <span aria-label={labels.unread} className="size-2 shrink-0 rounded-full bg-emerald-500" />}
                          </div>
                          <p className="mt-1 text-sm leading-5 text-muted-foreground">{entry.description}</p>
                          {item.actions.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.actions.map((actionId) => (
                                <Button key={actionId} variant={actionId === "reply" ? "default" : "outline"} size="sm" className={cn("h-8 rounded-lg", actionId === "reply" && "!border-emerald-600 !bg-emerald-600 !text-white hover:!bg-emerald-700")} onClick={() => onAction(item, actionId)}>
                                  {labels.actionLabels[actionId] ?? actionId}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100" aria-label={labels.actions}>
                              <IconDots className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => onSetRead(item.id, !item.unread)}>
                              {item.unread ? <IconCircleCheck className="size-4" /> : <IconCircleDot className="size-4" />}
                              {item.unread ? labels.markRead : labels.markUnread}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onSelect={() => onRemove(item.id)}><IconTrash className="size-4" />{labels.remove}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </article>
                    );
                  })}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

export { NotificationCenter };
export type { Labels as NotificationCenterLabels };
