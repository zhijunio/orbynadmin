import { useTranslations } from "next-intl";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { NotificationCenterScreen } from "@/components/application/notification-center/notification-center-screen";

export default function NotificationsPage() {
  const t = useTranslations("Notifications");
  return <ConsoleLayout><NotificationCenterScreen title={t("title")} /></ConsoleLayout>;
}
