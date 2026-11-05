import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { OnboardingShowcase } from "@/components/blocks/application/onboarding/onboarding-showcase";

const examples = [
  ["Live Preview Wizard", "live-preview"],
  ["Split-Screen Signup", "split-screen"],
  ["Onboarding Dialog", "dialog"],
  ["CLI Agent Setup", "cli"],
  ["Marketing Hero Signup", "marketing"],
] as const;

export const metadata = { title: "Onboarding" };

export default function OnboardingBlocksPage() {
  return <AppShell><main className="mx-auto w-full max-w-6xl space-y-6 pb-8"><header><h1 className="text-2xl font-semibold tracking-tight">Onboarding</h1><p className="mt-1 text-sm text-muted-foreground">Workspace setup flows for profiles, teams, goals, and connected agents.</p></header><div className="grid gap-5">{examples.map(([title, variant]) => <ComponentPreview key={variant} title={title} previewClassName="block w-full"><OnboardingShowcase variant={variant} /></ComponentPreview>)}</div></main></AppShell>;
}
