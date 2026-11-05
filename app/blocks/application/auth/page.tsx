import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AuthPage } from "@/components/blocks/application/auth/auth-page";
import { authExamples } from "@/components/blocks/application/auth/auth-examples";
import { authFlows } from "@/components/blocks/application/auth/auth-flows";
import { AuthFlowPage } from "@/components/blocks/application/auth/auth-flow-page";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

export const metadata = { title: "Auth" };

export default function AuthBlocksPage() {
  return (
    <AppShell>
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header><h1 className="text-2xl font-semibold tracking-tight">Authentication</h1></header>
        <section className="space-y-3" aria-labelledby="auth-patterns-heading">
          <h2 id="auth-patterns-heading" className="text-lg font-semibold tracking-tight">Sign-In Patterns</h2>
          <div className="grid min-w-0 gap-5 xl:grid-cols-2">
            {authExamples.map((example) => (
              <ComponentPreview key={example.id} title={example.title} className={example.layout === "split" ? "xl:col-span-2" : undefined} previewClassName="w-full p-0">
                <AuthPage example={example} preview />
              </ComponentPreview>
            ))}
          </div>
        </section>
        <section className="space-y-3" aria-labelledby="auth-flows-heading">
          <h2 id="auth-flows-heading" className="text-lg font-semibold tracking-tight">Account Flows</h2>
          <div className="grid min-w-0 gap-5 xl:grid-cols-2">
            {authFlows.map((flow) => (
              <ComponentPreview key={flow.slug} title={flow.cardTitle} previewClassName="w-full p-0">
                <AuthFlowPage flow={flow} preview />
              </ComponentPreview>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}
