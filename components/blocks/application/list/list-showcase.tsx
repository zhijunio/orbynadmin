import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { OrderKpiList } from "@/components/blocks/application/list/order-kpi-list";
import { CryptoActivityFeed } from "@/components/blocks/application/list/crypto-activity-feed";
import { InflowLeaderboard } from "@/components/blocks/application/list/inflow-leaderboard";
import { FundLeaderboard } from "@/components/blocks/application/list/fund-leaderboard";
import { PortfolioSnapshot } from "@/components/blocks/application/list/portfolio-snapshot";
import { SwapTransactionList } from "@/components/blocks/application/list/swap-transaction-list";
import { WalletTransactionList } from "@/components/blocks/application/list/wallet-transaction-list";
import { TopMoversTable } from "@/components/blocks/application/list/top-movers-table";
import { IntegrationDirectory } from "@/components/blocks/application/list/integration-directory";
import { ManualIntegrationPicker } from "@/components/blocks/application/list/manual-integration-picker";
import { RecentInvestmentsTable } from "@/components/blocks/application/list/recent-investments-table";

export function ListShowcase() {
  return <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
    <header><h1 className="text-2xl font-semibold tracking-tight">List</h1></header>
    <div className="grid gap-6 xl:grid-cols-2">
      <ComponentPreview title="Order KPI List" className="min-w-0" previewClassName="min-h-64 justify-center">
        <OrderKpiList />
      </ComponentPreview>
      <ComponentPreview title="Crypto Activity Feed" className="min-w-0" previewClassName="min-h-64 justify-center">
        <CryptoActivityFeed />
      </ComponentPreview>
      <ComponentPreview title="Capital Inflows" className="min-w-0" previewClassName="min-h-64 justify-center">
        <InflowLeaderboard />
      </ComponentPreview>
      <ComponentPreview title="Fund Leaderboard" className="min-w-0" previewClassName="min-h-64 justify-center">
        <FundLeaderboard />
      </ComponentPreview>
      <ComponentPreview title="Portfolio Snapshot" className="min-w-0" previewClassName="min-h-64 justify-center">
        <PortfolioSnapshot />
      </ComponentPreview>
      <ComponentPreview title="Swap Transactions" className="min-w-0" previewClassName="min-h-64 justify-center">
        <SwapTransactionList />
      </ComponentPreview>
      <ComponentPreview title="Wallet Activity" className="min-w-0" previewClassName="min-h-64 justify-center">
        <WalletTransactionList />
      </ComponentPreview>
      <ComponentPreview title="Top Movers" className="min-w-0" previewClassName="min-h-64 justify-center">
        <TopMoversTable />
      </ComponentPreview>
      <ComponentPreview title="Integration Directory" className="min-w-0" previewClassName="min-h-64 justify-center">
        <IntegrationDirectory />
      </ComponentPreview>
      <ComponentPreview title="Manual Integration Picker" className="min-w-0" previewClassName="min-h-64 justify-center">
        <ManualIntegrationPicker />
      </ComponentPreview>
      <ComponentPreview title="Recent Investments" className="min-w-0" previewClassName="min-h-64 justify-center">
        <RecentInvestmentsTable />
      </ComponentPreview>
    </div>
  </main>;
}
