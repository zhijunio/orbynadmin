import Link from "next/link";

const whiteboardExamples = [
  { title: "Design review board", url: "/blocks/application/whiteboard/design-review" },
  { title: "Sprint planning board", url: "/blocks/application/whiteboard/sprint-planning" },
];

export function WhiteboardShowcase() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Whiteboard</h1>
        <p className="text-sm text-muted-foreground">{whiteboardExamples.length} boards</p>
      </div>
      <nav aria-label="Whiteboard examples" className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {whiteboardExamples.map(({ title, url }, index) => (
          <Link
            key={url}
            href={url}
            className="flex min-h-16 items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="w-6 shrink-0 text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1 truncate">{title}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
