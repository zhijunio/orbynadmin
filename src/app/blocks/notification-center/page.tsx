"use client";

import { useTranslations } from "next-intl";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { NotificationCenterScreen } from "@/components/application/notification-center/notification-center-screen";

export default function NotificationCenterExamplePage() {
  const t = useTranslations("Navigation");
  return <ConsoleLayout><NotificationCenterScreen title={t("Notification Center")} /></ConsoleLayout>;
}
