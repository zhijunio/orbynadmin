"use client";

import { useTranslations } from "next-intl";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { ChartExample } from "@/components/custom/chart/chart-examples";

export default function ChartPage() {
  const t = useTranslations("ComponentMigration.Chart");
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Chart" /><div className="grid min-w-0 gap-5 xl:grid-cols-2">{Array.from({ length: 25 }, (_, index) => <ComponentPreview key={index} title={t(`examples.${index + 1}`)} previewClassName="block min-w-0"><ChartExample example={index + 1} /></ComponentPreview>)}</div></div></AppShell>;
}
