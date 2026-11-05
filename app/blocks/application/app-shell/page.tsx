import Link from "next/link";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { appShellExamples, savedAppShellExamples } from "@/components/custom/app-shell/config";

const examples = [...savedAppShellExamples, ...appShellExamples];

export default function AppShellIndexPage() {
  return <AppShell>
    <main className="mx-auto w-full max-w-7xl space-y-6 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">App Shell</h1>
        <p className="text-sm text-muted-foreground">{appShellExamples.length + savedAppShellExamples.length} layouts</p>
      </div>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {examples.map(({ number, title: exampleTitle, url }) => <Link
          key={url}
          href={url}
          className="flex min-h-16 items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {number !== undefined && <span className="w-6 shrink-0 text-muted-foreground tabular-nums">{String(number).padStart(2, "0")}</span>}
          <span className="min-w-0 flex-1 truncate">{exampleTitle}</span>
        </Link>)}
      </div>
    </main>
  </AppShell>;
}
