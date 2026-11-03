"use client"

import { useState } from "react"
import AppShell from "@/components/blocks/application/app-shell/app-shell"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { PageHeader } from "@/components/custom/docs/page-header"
import { Button } from "@/components/ui/buttons/button"
import { CodeBlock } from "@/components/ui/code-block/code-block"

const snippet = `export async function getProject(id: string) {\n  const project = await db.project.findUnique({ where: { id } })\n  if (!project) throw new Error("Project not found")\n  return project\n}`
const longSnippet = Array.from({ length: 24 }, (_, index) => `export const metric${index + 1} = await loadMetric("metric-${index + 1}")`).join("\n")

export default function CodeBlockPage() {
  const [notice, setNotice] = useState("Choose a line action to add a review note.")
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Code Block" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Basic Code Block"><CodeBlock code={snippet} language="typescript" fileName="project.ts" /></ComponentPreview>
    <ComponentPreview title="Pinned Copy Action"><CodeBlock code={snippet} language="typescript" fileName="project.ts" className="sticky top-4" /></ComponentPreview>
    <ComponentPreview title="Streaming Output"><CodeBlock code={'Connecting to deployment…\nBuilding assets…\n✓ Build complete'} language="log" terminal /></ComponentPreview>
    <ComponentPreview title="AI Chat Code Fence"><div className="grid w-full gap-2"><p className="text-sm">Here is the project lookup handler:</p><CodeBlock code={snippet} language="typescript" showCopy /></div></ComponentPreview>
    <ComponentPreview title="Diff Summary"><div className="grid w-full gap-2"><p className="text-xs text-muted-foreground">project.ts · +2 −1</p><CodeBlock code={'  const project = await db.project.findUnique({ where: { id } })\n- if (!project) return null\n+ if (!project) throw new Error("Project not found")\n  return project'} language="diff" diffLines={{ 2: "remove", 3: "add" }} /></div></ComponentPreview>
    <ComponentPreview title="Diff Transformer"><CodeBlock code={'- const timeout = 1000\n+ const timeout = 5000\n  await client.connect({ timeout })'} language="diff" diffLines={{ 1: "remove", 2: "add" }} /></ComponentPreview>
    <ComponentPreview title="Highlighted Lines and Words"><CodeBlock code={snippet} language="typescript" highlightedLines={[2, 3]} highlightWords={["project", "throw"]} /></ComponentPreview>
    <ComponentPreview title="Focus Walkthrough"><CodeBlock code={snippet} language="typescript" focusLines={[2]} highlightedLines={[2]} /></ComponentPreview>
    <ComponentPreview title="Terminal Output"><CodeBlock code={'$ pnpm deploy\nPreparing release…\n✓ Deployment complete\nhttps://dashboard.example.test'} terminal language="shell" /></ComponentPreview>
    <ComponentPreview title="Expandable Long File"><CodeBlock code={longSnippet} language="typescript" expandable /></ComponentPreview>
    <ComponentPreview title="Line Actions and Diagnostics"><div className="grid w-full gap-2"><CodeBlock code={'const retries = -1\nawait connect({ retries })\nreturn result'} language="typescript" lineActions diagnostics={{ 1: "Expected a positive number" }} onLineAction={(line) => setNotice(`Review note added to line ${line}.`)} /><span className="text-xs text-muted-foreground" aria-live="polite">{notice}</span></div></ComponentPreview>
    <ComponentPreview title="Line Selection"><CodeBlock code={snippet} language="typescript" selectableLines onLineSelect={(line) => setNotice(`Selected line ${line}.`)} /></ComponentPreview>
    <ComponentPreview title="Search in Code"><CodeBlock code={longSnippet} language="typescript" searchable /></ComponentPreview>
    <ComponentPreview title="File Tabs"><FileTabs /></ComponentPreview>
    <ComponentPreview title="Pre-Highlighted Source"><CodeBlock code={'const status = "healthy"\nconst latency = 42\nconst region = "us-east-1"'} language="typescript" highlightedLines={[1]} highlightWords={["healthy", "42", "us-east-1"]} /></ComponentPreview>
    <ComponentPreview title="Before and After"><div className="grid w-full gap-3 md:grid-cols-2"><div className="min-w-0"><p className="mb-2 text-xs font-medium text-muted-foreground">Before</p><CodeBlock code={'if (user) return user.name\nreturn ""'} language="typescript" /></div><div className="min-w-0"><p className="mb-2 text-xs font-medium text-muted-foreground">After</p><CodeBlock code={'return user?.name ?? "Guest"'} language="typescript" /></div></div></ComponentPreview>
    <ComponentPreview title="Soft-Wrapped Lines"><CodeBlock code={'const endpoint = "https://api.example.test/v1/workspaces/engineering/projects/operations"\nawait fetch(endpoint, { headers: { authorization: `Bearer ${"${token}"}` } })'} language="typescript" wrap /></ComponentPreview>
    <ComponentPreview title="Unified Patch"><CodeBlock code={'@@ -10,3 +10,4 @@ export async function load()\n const workspace = await getWorkspace()\n- return workspace.projects\n+ const projects = await getProjects(workspace.id)\n+ return projects.filter((project) => project.active)'} language="patch" diffLines={{ 2: "remove", 3: "add", 4: "add" }} /></ComponentPreview>
    <ComponentPreview title="Token Theme"><CodeBlock code={'const theme = {\n  accent: "#6366f1",\n  surface: "#ffffff",\n  radius: 12,\n}'} language="json" highlightWords={["accent", "surface", "radius"]} /></ComponentPreview>
    <ComponentPreview title="Always-Dark Code Block"><CodeBlock code={snippet} language="typescript" dark /></ComponentPreview>
    <ComponentPreview title="Dark Terminal"><CodeBlock code={'$ pnpm test\nPASS project.test.ts\nTests: 18 passed, 18 total'} language="shell" terminal dark /></ComponentPreview>
    <ComponentPreview title="Patch Actions"><div className="grid w-full gap-2"><CodeBlock code={'+ await sendReleaseNotice()\n  await publishRelease()'} language="diff" diffLines={{ 1: "add" }} lineActions onLineAction={(line) => setNotice(`Patch action selected for line ${line}.`)} /><span className="text-xs text-muted-foreground" aria-live="polite">{notice}</span></div></ComponentPreview>
    <ComponentPreview title="Fold Nested Regions"><CodeBlock code={'function buildDashboard() {\n  const metrics = loadMetrics()\n  const filters = loadFilters()\n  const chart = buildChart(metrics)\n  return { metrics, filters, chart }\n}'} language="typescript" foldable foldedRanges={[{ start: 1, end: 5, label: "Function body (4 lines)" }]} /></ComponentPreview>
    <ComponentPreview title="Fix a Failing Line"><div className="grid w-full gap-2"><CodeBlock code={'const total = items.reduce((sum, item) => sum + item.amount)\nrenderTotal(total)'} language="typescript" diagnostics={{ 1: "Missing initial value" }} focusLines={[1]} /><Button size="sm" className="w-fit" onClick={() => setNotice("Suggested fix: add 0 as the initial accumulator.")}>Suggest fix</Button><span className="text-xs text-muted-foreground" aria-live="polite">{notice}</span></div></ComponentPreview>
    <ComponentPreview title="Reference Lines in Chat"><div className="grid w-full gap-2"><p className="rounded-lg bg-muted p-2 text-xs">The null check on line 3 should return a typed error.</p><CodeBlock code={snippet} language="typescript" highlightedLines={[3]} /></div></ComponentPreview>
    <ComponentPreview title="External Scroll Area"><div className="max-h-48 w-full overflow-auto rounded-lg border p-2"><CodeBlock code={longSnippet} language="typescript" className="border-0" /></div></ComponentPreview>
    <ComponentPreview title="ANSI Terminal Output"><CodeBlock code={'\u001b[32m✓\u001b[0m API server listening on :3000\n\u001b[33m!\u001b[0m Cache is disabled\n\u001b[31m✗\u001b[0m Worker connection failed'} language="ansi" terminal dark ansi /></ComponentPreview>
  </div></div></AppShell>
}

function FileTabs() {
  const [active, setActive] = useState("route.ts")
  const files: Record<string, string> = { "route.ts": "export async function GET() {\n  return Response.json({ status: \"ok\" })\n}", "schema.ts": "export const Project = {\n  id: \"uuid\",\n  name: \"string\"\n}" }
  return <div className="w-full overflow-hidden rounded-xl border"><div className="flex border-b">{Object.keys(files).map((file) => <button key={file} type="button" aria-pressed={active === file} onClick={() => setActive(file)} className="border-r px-3 py-2 text-xs aria-pressed:bg-muted">{file}</button>)}</div><CodeBlock code={files[active]} language="typescript" fileName={active} className="rounded-none border-0" /></div>
}
