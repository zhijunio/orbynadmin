import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { ApiIntegrations, WebhookEndpoints } from "@/components/blocks/application/settings/settings-developer";
import { AppConnections, ConnectedApps, IntegrationEvents, IntegrationsGallery } from "@/components/blocks/application/settings/settings-integrations";
import { GeneralSettings, ImportSources, RoleCapabilities, SecuritySettings, WorkspacePreferences } from "@/components/blocks/application/settings/settings-preferences";

const examples = [
  ["Import Sources", ImportSources],
  ["General Settings", GeneralSettings],
  ["App Connections", AppConnections],
  ["Role Capabilities", RoleCapabilities],
  ["Integration Events", IntegrationEvents],
  ["Webhook Endpoints", WebhookEndpoints],
  ["Security Settings", SecuritySettings],
  ["Integrations Gallery", IntegrationsGallery],
  ["API Integrations", ApiIntegrations],
  ["Workspace Preferences", WorkspacePreferences],
  ["Connected Apps", ConnectedApps],
] as const;

export function SettingsShowcase() {
  return <AppShell><main className="mx-auto w-full max-w-[1440px] pb-8"><div className="space-y-6">{examples.map(([title, Example]) => <ComponentPreview key={title} title={title} previewClassName="w-full items-start justify-center"><div className={`w-full ${title === "API Integrations" ? "max-w-6xl" : "max-w-4xl"}`}><Example /></div></ComponentPreview>)}</div></main></AppShell>;
}
