"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/buttons/button";
import { Notification, NotificationViewport, type NotificationStatus } from "@/components/ui/notification/notification";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type DemoNotification = { id: number; status: NotificationStatus | "avatar" | "actions" };
const notificationStatuses = [
  { status: "success", label: "Success", title: "Success! Action completed!", description: "Your workspace settings have been saved." },
  { status: "information", label: "Info", title: "Heads up! New information", description: "A new version is ready to install." },
  { status: "warning", label: "Warning", title: "Double check required", description: "Your workspace is using 90% of its storage." },
  { status: "error", label: "Error", title: "Something went wrong", description: "The file could not be uploaded. Try again." },
] as const;

function NotificationsExample() {
  const [active, setActive] = useState<DemoNotification[]>([]);
  const show = (status: DemoNotification["status"]) => setActive((current) => [...current, { id: Date.now() + Math.random(), status }]);
  const dismiss = (id: number) => setActive((current) => current.filter((notification) => notification.id !== id));

  return (
    <>
      <ComponentPreview title="Release Announcement Banner">
        <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/40 p-4">
          <div><p className="text-sm font-semibold">New update available</p><p className="mt-1 text-sm text-muted-foreground">Enjoy improved functionality and enhancements.</p></div>
          <div className="flex gap-2"><Button variant="outline" size="sm">Later</Button><Button size="sm">Update now</Button></div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Cookie Consent Notice">
        <div className="w-full rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm leading-5 text-muted-foreground">By clicking Accept, you agree to the storing of cookies on your device to enhance navigation and analyze site usage.</p>
          <div className="mt-4 flex flex-wrap justify-end gap-2"><Button variant="outline" size="sm">Cookie settings</Button><Button variant="outline" size="sm">Deny all</Button><Button size="sm">Accept all</Button></div>
        </div>
      </ComponentPreview>
      {notificationStatuses.map((item) => <ComponentPreview key={item.status} title={`${item.label} Notification`}><Notification status={item.status} title={item.title} description={item.description} /></ComponentPreview>)}
      <ComponentPreview title="Avatar and actions">
        <div className="grid w-full gap-3">
          <Notification avatar={{ src: demoAvatarUrl("Livia Saris"), alt: "Livia Saris", presence: "busy" }} title="Livia Saris" timestamp="just now" description="Mentioned you in the launch checklist." actions={[{ label: "Reply", variant: "secondary", onClick: () => show("information") }, { label: "View thread", variant: "primary", onClick: () => show("success") }]} />
          <Notification status="information" title="Backup ready" description="Your latest workspace backup is ready to download." actions={[{ label: "Not now", variant: "secondary", onClick: () => undefined }, { label: "Download", variant: "primary", onClick: () => show("success") }]} />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Timed notifications">
        <div className="flex flex-wrap gap-2">
          {(["information", "success", "warning", "error", "avatar", "actions"] as const).map((status) => (
            <Button key={status} variant="outline" onClick={() => show(status)}>{status === "avatar" ? "With avatar" : status === "actions" ? "With actions" : status}</Button>
          ))}
        </div>
        <NotificationViewport position="bottom-right">
          <AnimatePresence initial={false}>
            {active.map((notification, index) => {
              const dismissSelf = () => dismiss(notification.id);
              const common = { onDismiss: dismissSelf, autoDismissDuration: 5000, introDelay: index * 80 };
              if (notification.status === "avatar") return <Notification key={notification.id} {...common} avatar={{ src: demoAvatarUrl("Livia Saris"), alt: "Livia Saris", presence: "online" }} title="Livia Saris" timestamp="just now" description="Mentioned you in the launch checklist." />;
              if (notification.status === "actions") return <Notification key={notification.id} {...common} status="information" title="Backup ready" description="Your latest workspace backup is ready to download." actions={[{ label: "Not now", variant: "secondary", onClick: dismissSelf }, { label: "Download", variant: "primary", onClick: dismissSelf }]} />;
              const copy = notificationStatuses.find((item) => item.status === notification.status)!;
              return <Notification key={notification.id} {...common} status={notification.status} title={copy.title} description={copy.description} />;
            })}
          </AnimatePresence>
        </NotificationViewport>
      </ComponentPreview>
    </>
  );
}

export default function NotificationsPage() {
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Notifications" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0"><NotificationsExample /></div></div></AppShell>;
}
