"use client";

import { useTranslations } from "next-intl";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { DataGridExample } from "@/components/custom/data-grid/data-grid-examples";

export default function DataGridPage() {
  const t = useTranslations("ComponentMigration.DataGrid");
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Data Grid" /><div className="grid min-w-0 gap-5">{Array.from({ length: 34 }, (_, index) => <ComponentPreview key={index} title={t(`examples.${index + 1}`)} previewClassName="block min-w-0"><DataGridExample example={index + 1} /></ComponentPreview>)}</div></div></AppShell>;
}
