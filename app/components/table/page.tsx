"use client";

import { useTranslations } from "next-intl";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { TableExample } from "@/components/custom/table/table-examples";

export default function TablePage() {
  const t = useTranslations("ComponentMigration.Table");
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Table" /><div className="grid min-w-0 gap-5 xl:grid-cols-2">{Array.from({ length: 17 }, (_, index) => <ComponentPreview key={index} title={t(`examples.${index + 1}`)} previewClassName="block min-w-0"><TableExample example={index + 1} /></ComponentPreview>)}</div></div></AppShell>;
}
