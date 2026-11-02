"use client";

import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { recentActivity } from "@/data";

export function RecentActivityCard() {
  const t = useTranslations("Dashboard.Overview");

  return (
    <Card className="h-[337px] rounded-2xl border-0 bg-muted/45 p-4 ring-0">
      <CardHeader><CardTitle>{t("recentActivity")}</CardTitle></CardHeader>
      <CardContent className="grid min-h-0 flex-1 gap-2 overflow-auto p-0 sm:grid-cols-2 xl:grid-cols-2">
        <ol className="contents">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="flex min-w-0 items-start gap-3 rounded-xl bg-background/70 p-3 transition-colors hover:bg-background">
              <span className="shrink-0">
                <Avatar className="size-8">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback>{activity.user.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </span>
              <div className="min-w-0">
                <p className="text-sm leading-5">
                  <span className="font-medium">{activity.user}</span> {t.has(`activity.${activity.id}`) ? t(`activity.${activity.id}`) : activity.action}{" "}
                  {activity.target && <span className="font-medium">{activity.target === "Enterprise plan" ? t("enterprisePlan") : activity.target}</span>}
                </p>
                <time className="mt-1 block text-xs text-muted-foreground">{t.has(`times.${activity.time}`) ? t(`times.${activity.time}`) : activity.time}</time>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
