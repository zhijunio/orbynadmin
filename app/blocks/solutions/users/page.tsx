import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { UserBlockExample } from "@/components/blocks/users/users-examples";
import { userBlockExamples } from "@/components/blocks/users/users-data";

export const metadata = { title: "Users" };

export default function UsersBlocksPage() {
  return <AppShell>
    <main className="mx-auto w-full max-w-7xl space-y-5">
      <header><h1 className="text-2xl font-semibold tracking-tight">Users</h1><p className="mt-1 text-sm text-muted-foreground">{userBlockExamples.length} examples</p></header>
      <div className="space-y-6">{userBlockExamples.map((example) => <ComponentPreview key={example.slug} title={example.title} className="w-full" previewClassName="w-full p-0"><UserBlockExample slug={example.slug} /></ComponentPreview>)}</div>
    </main>
  </AppShell>;
}
