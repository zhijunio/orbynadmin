import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { DataGridExample } from "@/components/application/data-grid/data-grid-example";

export default function DataGridPage() {
  return <ConsoleLayout>{<div className="space-y-6">
      <PageHeader title="Data Grid" />
      <DataGridExample />
    </div>}</ConsoleLayout>;
}
