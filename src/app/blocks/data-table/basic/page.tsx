import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import {
  LeadsReportTable,
  PackagesTable,
  TopChannelsTable,
  TopProductsTable,
  TransactionsTable,
  UsersTable,
  ProjectTeamTable,
  RecentOrdersTable,
} from "@/components/application/data-table/basic/basic-tables-page";

export default function BasicTablesPage() {
  return <ConsoleLayout>{<div className="space-y-6">
      <PageHeader title="Basic Tables" />
      <div className="space-y-5">
        <ProjectTeamTable />
        <RecentOrdersTable />
        <TopProductsTable />
        <LeadsReportTable />
        <PackagesTable />
        <TransactionsTable />
        <TopChannelsTable />
        <UsersTable />
      </div>
    </div>}</ConsoleLayout>;
}
