"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { PageHeader } from "@/components/custom/app-shell/page-header";

import { useState } from "react";
import Link from "next/link";
import { IconAlertTriangle as IconAlertTriangle, IconCheck as IconCheck, IconInfoCircle as IconInfoCircle, IconSettings as IconSettings, IconX as IconX } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/buttons/button";

const alertTypes = [
  { title: "Default", description: "This is a default alert. It provides general information to the user.", icon: IconInfoCircle, className: "border-border bg-muted/40 text-muted-foreground", titleClassName: "text-foreground" },
  { title: "Success", description: "Your changes have been saved successfully.", icon: IconCheck, className: "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400", iconClassName: "bg-green-600 text-white" },
  { title: "Warning", description: "Your subscription will expire in 3 days. Please renew to continue.", icon: IconAlertTriangle, className: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400", iconClassName: "bg-amber-500 text-white" },
  { title: "Error", description: "There was a problem processing your request. Please try again.", icon: IconX, className: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400", iconClassName: "bg-red-600 text-white" },
  { title: "Information", description: "A new software update is available. See what's new.", icon: IconInfoCircle, className: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-400", iconClassName: "bg-sky-500 text-white" },
];

const alertVariants = [
  { key: "default", title: "Email Not Verified", icon: IconInfoCircle, outline: "border-border bg-muted/30 text-foreground", outlineIndicator: "bg-muted text-muted-foreground", solid: "border-slate-600 bg-slate-600 text-white", solidIndicator: "bg-white text-slate-600" },
  { key: "success", title: "Payment Completed Successfully", icon: IconCheck, outline: "border-green-200 bg-green-50/40 text-green-700 dark:border-green-900 dark:bg-green-950/20 dark:text-green-400", outlineIndicator: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400", solid: "border-green-600 bg-green-600 text-white", solidIndicator: "bg-green-50 text-green-700" },
  { key: "info", title: "New Update Available", icon: IconInfoCircle, outline: "border-primary/30 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary", outlineIndicator: "bg-primary text-primary dark:bg-primary/10 dark:text-primary", solid: "border-primary/30 bg-primary text-white", solidIndicator: "bg-primary text-primary" },
  { key: "warning", title: "Your Subscription expires in 3 Days", icon: IconAlertTriangle, outline: "border-amber-200 bg-amber-50/40 text-amber-800 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400", outlineIndicator: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400", solid: "border-amber-500 bg-amber-500 text-white", solidIndicator: "bg-amber-50 text-amber-700" },
  { key: "error", title: "Failed to Connect to server", icon: IconX, outline: "border-red-200 bg-red-50/40 text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400", outlineIndicator: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400", solid: "border-red-600 bg-red-600 text-white", solidIndicator: "bg-red-50 text-red-700" },
];

function AlertsExample() {
  const [showAccountUpdated, setShowAccountUpdated] = useState(true);
  const [showUnreadMessages, setShowUnreadMessages] = useState(true);
  const [showSettingsAlert, setShowSettingsAlert] = useState(true);
  const [dismissedOutlined, setDismissedOutlined] = useState<string[]>([]);
  const [dismissedSolid, setDismissedSolid] = useState<string[]>([]);

  return <>
      <ComponentPreview title="Default Alert">
        <div className="w-full"><Alert className="min-h-[74px] grid-cols-[auto_1fr] gap-x-3 rounded-lg border-border bg-muted/40 px-5 py-5 text-muted-foreground"><IconInfoCircle aria-hidden="true" className="row-span-2 size-5" /><AlertTitle className="text-sm font-semibold text-foreground">Default Message</AlertTitle><AlertDescription className="text-sm leading-5">{alertTypes[0].description}</AlertDescription></Alert></div>
      </ComponentPreview>
      {alertTypes.filter(({ title }) => title !== "Default").map(({ title, description, icon: Icon, className, titleClassName, iconClassName }) => (
        <ComponentPreview key={title} title={`${title === "Information" ? "Info" : title} Alert`}>
          <div className="w-full">
            <Alert className={`min-h-[74px] grid-cols-[auto_1fr] gap-x-3 rounded-lg px-5 py-5 ${className}`}>
              <span className={`row-span-2 flex size-7 items-center justify-center rounded-lg ${iconClassName ?? "bg-muted-foreground text-white"}`}><Icon aria-hidden="true" className="size-4" /></span>
              <AlertTitle className={`text-sm font-semibold ${titleClassName ?? ""}`}>{title} Message</AlertTitle>
              <AlertDescription className="text-sm leading-5">{description}</AlertDescription>
              <Link href="/components/alert" className="col-start-2 mt-2 inline-block text-sm font-medium underline underline-offset-4">Learn more</Link>
            </Alert>
          </div>
        </ComponentPreview>
      ))}
      <ComponentPreview title="Alert Variants">
        <div className="w-full space-y-6">
          {showAccountUpdated && <Alert className="rounded-lg border-border bg-muted/40 px-3 py-3">
            <AlertTitle className="text-sm font-semibold">Your account settings have been updated.</AlertTitle>
            <AlertAction><button type="button" aria-label="Dismiss notification" onClick={() => setShowAccountUpdated(false)} className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"><IconX className="size-4" /></button></AlertAction>
          </Alert>}
          {showUnreadMessages && <Alert className="grid-cols-[auto_1fr] gap-x-3 rounded-lg border-border bg-muted/40 px-5 py-5 text-muted-foreground">
            <span className="row-span-2 flex size-7 items-center justify-center rounded-lg bg-muted-foreground text-white"><IconInfoCircle aria-hidden="true" className="size-4" /></span>
            <AlertTitle className="text-sm font-semibold text-foreground">You have 3 unread messages</AlertTitle>
            <AlertDescription className="text-sm leading-5">Sarah, Mike, and the Design team replied to your threads from earlier today.</AlertDescription>
            <AlertAction><button type="button" aria-label="Dismiss unread messages" onClick={() => setShowUnreadMessages(false)} className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"><IconX className="size-4" /></button></AlertAction>
          </Alert>}
          {showSettingsAlert && <Alert className="grid-cols-[auto_1fr] gap-x-3 rounded-lg border-border bg-muted/40 px-5 py-5 text-muted-foreground">
            <span className="row-span-2 flex size-7 items-center justify-center rounded-lg bg-muted-foreground text-white"><IconSettings aria-hidden="true" className="size-4" /></span>
            <AlertTitle className="text-sm font-semibold text-foreground">Settings</AlertTitle>
            <AlertDescription className="text-sm leading-5">Your changes have been saved successfully.</AlertDescription>
            <div className="col-start-2 mt-1"><Button variant="outline" size="sm" onClick={() => setShowSettingsAlert(false)} className="h-7 bg-background px-2.5">Undo</Button></div>
          </Alert>}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Alert Outlined">
        <div className="flex w-full flex-col gap-6">
          {alertVariants.filter((item) => !dismissedOutlined.includes(item.key)).map(({ key, title, icon: Icon, outline, outlineIndicator }) => (
            <Alert key={key} className={`flex max-w-4xl items-center gap-3 rounded-lg px-3 py-3 has-data-[slot=alert-action]:pr-3 ${outline}`}>
              <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${outlineIndicator}`}><Icon aria-hidden="true" className="size-4" /></span>
              <AlertTitle className="text-sm font-semibold leading-6">{title}</AlertTitle>
              <AlertAction className="static ml-auto"><button type="button" aria-label={`Dismiss ${title}`} onClick={() => setDismissedOutlined((current) => [...current, key])} className="rounded-sm opacity-80 transition-opacity hover:opacity-100"><IconX aria-hidden="true" className="size-4" /></button></AlertAction>
            </Alert>
          ))}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Alert Solid">
        <div className="flex w-full flex-col gap-6">
          {alertVariants.filter((item) => !dismissedSolid.includes(item.key)).map(({ key, title, icon: Icon, solid, solidIndicator }) => (
            <Alert key={key} className={`flex max-w-4xl items-center gap-3 rounded-lg px-3 py-3 has-data-[slot=alert-action]:pr-3 ${solid}`}>
              <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${solidIndicator}`}><Icon aria-hidden="true" className="size-4" /></span>
              <AlertTitle className="text-sm font-semibold leading-6 text-white">{title}</AlertTitle>
              <AlertAction className="static ml-auto"><button type="button" aria-label={`Dismiss ${title}`} onClick={() => setDismissedSolid((current) => [...current, key])} className="rounded-sm text-white opacity-80 transition-opacity hover:opacity-100"><IconX aria-hidden="true" className="size-4" /></button></AlertAction>
            </Alert>
          ))}
        </div>
      </ComponentPreview>
    </>;
}

export default function AlertsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Alerts" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0"><AlertsExample /></div></div>}</ConsoleLayout>;
}
