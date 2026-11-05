import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ApiKeys } from "@/components/blocks/application/form/api-keys";
import { AuthenticationSettings } from "@/components/blocks/application/form/authentication-settings";
import { NewProductForm } from "@/components/blocks/application/form/new-product-form";
import { RolePermissionInvite } from "@/components/blocks/application/form/role-permission-invite";
import { BusinessDetailsVerification, ManagementOwnershipDetails, PublicBusinessDetails } from "@/components/blocks/application/form/business-verification";
import { MemberProfileAdmin } from "@/components/blocks/application/form/member-profile-admin";
import { CheckoutSetup } from "@/components/blocks/application/form/checkout-setup";
import { CustomerOnboarding } from "@/components/blocks/application/form/customer-onboarding";
import { InvoiceCreator } from "@/components/blocks/application/form/invoice-creator";
import { NewAppLaunch } from "@/components/blocks/application/form/new-app-launch";
import { TicketDetails } from "@/components/blocks/application/form/ticket-details";

const examples = [
  ["business-details", "Business Details", BusinessDetailsVerification], ["public-details", "Public Details", PublicBusinessDetails], ["management-ownership", "Management and Ownership", ManagementOwnershipDetails],
  ["checkout-setup", "Checkout Setup", CheckoutSetup], ["invoice-creator", "Invoice Creator", InvoiceCreator],
  ["authentication-settings", "Auth Method Settings", AuthenticationSettings], ["member-profile-admin", "Member Profile Admin", MemberProfileAdmin],
  ["ticket-properties", "Ticket Properties", TicketDetails], ["api-keys", "API Keys Manager", ApiKeys],
  ["role-permission-invite", "Role Permission Invite", RolePermissionInvite], ["customer-onboarding", "Customer Onboarding", CustomerOnboarding],
  ["deploy-app-setup", "Deploy App Setup", NewAppLaunch], ["new-product-form", "New Product Form", NewProductForm],
] as const;

export const metadata = { title: "Forms" };

export default function FormBlocksPage() {
  return <AppShell><main className="mx-auto w-full max-w-6xl space-y-6 pb-8"><PageHeader title="Forms" /><div className="grid gap-5">{examples.map(([id, title, Example]) => <ComponentPreview key={id} title={title} previewClassName="w-full items-start"><Example /></ComponentPreview>)}</div></main></AppShell>;
}
