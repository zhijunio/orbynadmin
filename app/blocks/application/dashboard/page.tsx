import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { FulfillmentDashboard } from "@/components/blocks/application/dashboard/fulfillment-dashboard";
import { ModuleTracker } from "@/components/blocks/application/dashboard/module-tracker";
import { DeliveryDashboard } from "@/components/blocks/application/dashboard/delivery-dashboard";
import { VoiceAnalyticsDashboard } from "@/components/blocks/application/dashboard/voice-analytics-dashboard";
import { EdgeSecurityDashboard } from "@/components/blocks/application/dashboard/edge-security-dashboard";
import { WorkforceCoverageDashboard } from "@/components/blocks/application/dashboard/workforce-coverage-dashboard";
import { RetailRevenueDashboard } from "@/components/blocks/application/dashboard/retail-revenue-dashboard";
import { RoyaltyPayoutsDashboard } from "@/components/blocks/application/dashboard/royalty-payouts-dashboard";

export const metadata = { title: "Dashboard" };

export default function DashboardBlocksPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-[1440px] space-y-6 pb-8">
        <PageHeader title="Dashboards" />
        <div className="space-y-6">
          <ComponentPreview title="Fulfillment Exceptions" previewClassName="w-full items-start">
            <FulfillmentDashboard />
          </ComponentPreview>
          <ComponentPreview title="Module Tracker" previewClassName="w-full items-start">
            <ModuleTracker />
          </ComponentPreview>
          <ComponentPreview title="Delivery Board" previewClassName="w-full items-start">
            <DeliveryDashboard />
          </ComponentPreview>
          <ComponentPreview title="Voice Agent Calls" previewClassName="w-full items-start">
            <VoiceAnalyticsDashboard />
          </ComponentPreview>
          <ComponentPreview title="Edge Security Telemetry" previewClassName="w-full items-start">
            <EdgeSecurityDashboard />
          </ComponentPreview>
          <ComponentPreview title="Workforce Coverage" previewClassName="w-full items-start">
            <WorkforceCoverageDashboard />
          </ComponentPreview>
          <ComponentPreview title="Retail Revenue" previewClassName="w-full items-start">
            <RetailRevenueDashboard />
          </ComponentPreview>
          <ComponentPreview title="Royalty Payouts" previewClassName="w-full items-start">
            <RoyaltyPayoutsDashboard />
          </ComponentPreview>
        </div>
      </main>
    </AppShell>
  );
}
