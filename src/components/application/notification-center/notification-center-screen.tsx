"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { NotificationCenter, type NotificationCenterLabels } from "@/components/application/notification-center/notification-center";
import { notifications } from "@/data";
import { useNotificationStore } from "@/data/notification-store";

function NotificationCenterScreen({ title, compact = false }: { title: string; compact?: boolean }) {
  const t = useTranslations("Notifications.page");
  const items = useNotificationStore((state) => state.items);
  const setRead = useNotificationStore((state) => state.setRead);
  const setAllRead = useNotificationStore((state) => state.markAllRead);
  const remove = useNotificationStore((state) => state.remove);
  const unreadCount = items.filter((item) => item.unread).length;

  const labels: NotificationCenterLabels = {
    all: t("tabs.all"),
    mentions: t("tabs.mentions"),
    system: t("tabs.system"),
    empty: t("empty"),
    actions: t("actions"),
    markUnread: t("markUnread"),
    markRead: t("markRead"),
    remove: t("remove"),
    markAllRead: t("markAllRead"),
    unreadCount: t("unreadCount", { count: unreadCount }),
    unread: t("unread"),
    times: {
      "2 min ago": t("times.2m"), "18 min ago": t("times.18m"), "1h ago": t("times.1h"),
      Mon: t("times.mon"), Sun: t("times.sun"), Sat: t("times.sat"),
    },
    actionLabels: {
      reply: t("actionLabels.reply"), viewThread: t("actionLabels.viewThread"),
      download: t("actionLabels.download"), review: t("actionLabels.review"),
      retry: t("actionLabels.retry"), viewLogs: t("actionLabels.viewLogs"),
    },
    entries: Object.fromEntries(notifications.map((item) => [item.id, {
      title: t(`entries.${item.id}.title`),
      description: t(`entries.${item.id}.description`),
    }])),
  };
  const markAllRead = () => {
    if (!items.some((item) => item.unread)) return;
    setAllRead();
    toast.success(t("markedAllRead"));
  };

  return (
    <div className={compact ? "" : "space-y-6"}>
      {!compact && <div className="flex items-baseline gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <span className="text-sm text-muted-foreground">{t("unreadCount", { count: unreadCount })}</span>
      </div>}
      <NotificationCenter
        items={items}
        labels={labels}
        title={title}
        unreadCount={unreadCount}
        markAllRead={markAllRead}
        compact={compact}
        onSetRead={setRead}
        onRemove={(id) => {
          remove(id);
          toast.success(t("removed"));
        }}
        onAction={(item, actionId) => {
          setRead(item.id, false);
          toast.info(t("actionCompleted", { action: labels.actionLabels[actionId] ?? actionId }));
        }}
      />
    </div>
  );
}

export { NotificationCenterScreen };
