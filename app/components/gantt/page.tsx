"use client";

import { useTranslations } from "next-intl";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { GanttExample } from "@/components/custom/gantt/gantt-examples";

export default function GanttPage() {
  const t = useTranslations("ComponentMigration.Gantt");
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Gantt" /><div className="grid min-w-0 gap-5">{Array.from({ length: 7 }, (_, index) => <ComponentPreview key={index} title={t(`examples.${index + 1}`)} previewClassName="block min-w-0"><GanttExample example={index + 1} /></ComponentPreview>)}</div></div></AppShell>;
}
