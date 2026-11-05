import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { BillingSetupWizard } from "@/components/blocks/application/wizard/billing-setup";
import { VendorOnboarding } from "@/components/blocks/application/wizard/vendor-onboarding";
import { SendInvoiceWizard } from "@/components/blocks/application/wizard/send-invoice";
import { PlanUpgradeWizard } from "@/components/blocks/application/wizard/plan-upgrade";
import { TeamInvitationsWizard } from "@/components/blocks/application/wizard/team-invitations";
import { ProductSetupWizard } from "@/components/blocks/application/wizard/product-setup";
import { FundTransferWizard } from "@/components/blocks/application/wizard/fund-transfer";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

export const metadata = { title: "Wizard" };

export default function WizardBlocksPage() {
  const examples = [
    ["Billing Setup", <BillingSetupWizard key="billing" />],
    ["Vendor Onboarding", <VendorOnboarding key="vendor" />],
    ["Send Invoice", <SendInvoiceWizard key="invoice" />],
    ["Plan Upgrade", <PlanUpgradeWizard key="upgrade" />],
    ["Team Invitations", <TeamInvitationsWizard key="team" />],
    ["Product Setup Wizard", <ProductSetupWizard key="product" />],
    ["Fund Transfer", <FundTransferWizard key="transfer" />],
  ] as const;
  return <AppShell><main className="mx-auto w-full max-w-6xl space-y-6 pb-8"><header><h1 className="text-2xl font-semibold tracking-tight">Wizard</h1><p className="mt-1 text-sm text-muted-foreground">Multi-step flows for billing, operations, and product setup.</p></header><div className="grid gap-5">{examples.map(([title, example]) => <ComponentPreview key={title} title={title} previewClassName="block w-full">{example}</ComponentPreview>)}</div></main></AppShell>;
}
