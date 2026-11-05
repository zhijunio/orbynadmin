import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { GeneralDisplay } from "@/components/blocks/application/settings/settings-preferences";
import { AccountSettingsHub } from "@/components/blocks/application/profile/account-settings-hub";
import { BillingSettings } from "@/components/blocks/application/profile/billing-settings";
import { DeveloperApiKeys } from "@/components/blocks/application/profile/developer-api-keys";
import { PersonalProfile } from "@/components/blocks/application/profile/personal-profile";
import { ReferralRewards } from "@/components/blocks/application/profile/referral-rewards";
import { ProfileAdministrationTabs } from "@/components/blocks/application/profile/profile-administration-tabs";
import { ProfileNotificationTabs } from "@/components/blocks/application/profile/profile-notification-tabs";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

const examples = [
  { title: "Personal Profile", Component: PersonalProfile },
  { title: "General & Display", Component: GeneralDisplay },
  { title: "Notifications", Component: ProfileNotificationTabs },
  { title: "Account & Workspace", Component: ProfileAdministrationTabs },
  { title: "Referral Rewards", Component: ReferralRewards },
  { title: "Billing Settings", Component: BillingSettings },
  { title: "Account Settings Hub", Component: AccountSettingsHub },
  { title: "Developer API Keys", Component: DeveloperApiKeys },
];

export const metadata = { title: "Profile" };

export default function ProfileBlocksPage() {
  return <AppShell><main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6"><header><h1 className="text-2xl font-semibold tracking-tight">Profile</h1><p className="mt-1 text-sm text-muted-foreground">Account, workspace, and developer settings examples.</p></header><div className="space-y-6">{examples.map(({ title, Component }) => <ComponentPreview key={title} title={title} previewClassName="block w-full"><Component /></ComponentPreview>)}</div></main></AppShell>;
}
