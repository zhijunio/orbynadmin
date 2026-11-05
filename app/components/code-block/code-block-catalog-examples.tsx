"use client";

import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { CodeBlock } from "@/components/ui/code-block/code-block";

const snippet = `export async function getProject(id: string) {\n  const project = await db.project.findUnique({ where: { id } })\n  if (!project) throw new Error("Project not found")\n  return project\n}`;
const longSnippet = Array.from({ length: 24 }, (_, index) => `export const metric${index + 1} = await loadMetric("metric-${index + 1}")`).join("\n");

function FileTabs() {
  const [active, setActive] = useState("route.ts");
  const files: Record<string, string> = {
    "route.ts": 'export async function GET() {\n  return Response.json({ status: "ok" })\n}',
    "schema.ts": 'export const Project = {\n  id: "uuid",\n  name: "string"\n}',
  };
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl border">
      <div className="flex border-b">
        {Object.keys(files).map((file) => (
          <button
            key={file}
            type="button"
            aria-pressed={active === file}
            onClick={() => setActive(file)}
            className="border-r px-3 py-2 text-xs aria-pressed:bg-muted"
          >
            {file}
          </button>
        ))}
      </div>
      <CodeBlock code={files[active]} language="typescript" fileName={active} className="rounded-none border-0" />
    </div>
  );
}

export function CodeBlockCatalogExamples() {
  const [notice, setNotice] = useState("Choose a line action to add a review note.");

  return (
    <CatalogGridItems>
      <ComponentPreview title="Source" span={2} layout="fullStack">
        <CodeBlock code={snippet} language="typescript" fileName="project.ts" />
        <CodeBlock
          code={'const status = "healthy"\nconst latency = 42\nconst region = "us-east-1"'}
          language="typescript"
          highlightedLines={[1]}
          highlightWords={["healthy", "42", "us-east-1"]}
        />
        <CodeBlock
          code={'const theme = {\n  accent: "#6366f1",\n  surface: "#ffffff",\n  radius: 12,\n}'}
          language="json"
          highlightWords={["accent", "surface", "radius"]}
        />
      </ComponentPreview>

      <ComponentPreview title="Files" span={2} layout="fullStack">
        <div className="max-w-3xl">
          <CodeBlock code={snippet} language="typescript" fileName="project.ts" className="sticky top-4" />
        </div>
        <FileTabs />
      </ComponentPreview>

      <ComponentPreview title="Output" span={2} layout="fullStack">
        <CodeBlock code={"Connecting to deployment…\nBuilding assets…\n✓ Build complete"} language="log" terminal />
        <CodeBlock code={"$ pnpm deploy\nPreparing release…\n✓ Deployment complete\nhttps://dashboard.example.test"} terminal language="shell" />
        <CodeBlock code={"$ pnpm test\nPASS project.test.ts\nTests: 18 passed, 18 total"} language="shell" terminal dark />
        <CodeBlock
          code={"\u001b[32m✓\u001b[0m API server listening on :3000\n\u001b[33m!\u001b[0m Cache is disabled\n\u001b[31m✗\u001b[0m Worker connection failed"}
          language="ansi"
          terminal
          dark
          ansi
        />
      </ComponentPreview>

      <ComponentPreview title="Diff" span={2} layout="fullStack">
        <div className="grid w-full max-w-3xl gap-2">
          <p className="text-xs text-muted-foreground">project.ts · +2 −1</p>
          <CodeBlock
            code={
              '  const project = await db.project.findUnique({ where: { id } })\n- if (!project) return null\n+ if (!project) throw new Error("Project not found")\n  return project'
            }
            language="diff"
            diffLines={{ 2: "remove", 3: "add" }}
          />
        </div>
        <CodeBlock
          code={'- const timeout = 1000\n+ const timeout = 5000\n  await client.connect({ timeout })'}
          language="diff"
          diffLines={{ 1: "remove", 2: "add" }}
        />
        <CodeBlock
          code={
            '@@ -10,3 +10,4 @@ export async function load()\n const workspace = await getWorkspace()\n- return workspace.projects\n+ const projects = await getProjects(workspace.id)\n+ return projects.filter((project) => project.active)'
          }
          language="patch"
          diffLines={{ 2: "remove", 3: "add", 4: "add" }}
        />
        <div className="grid w-full max-w-3xl gap-2">
          <CodeBlock
            code={"+ await sendReleaseNotice()\n  await publishRelease()"}
            language="diff"
            diffLines={{ 1: "add" }}
            lineActions
            onLineAction={(line) => setNotice(`Patch action selected for line ${line}.`)}
          />
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {notice}
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Highlight" span={2} layout="fullStack">
        <CodeBlock code={snippet} language="typescript" highlightedLines={[2, 3]} highlightWords={["project", "throw"]} />
        <CodeBlock code={snippet} language="typescript" focusLines={[2]} highlightedLines={[2]} />
        <div className="grid w-full max-w-3xl gap-3 md:grid-cols-2">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Before</p>
            <CodeBlock code={'if (user) return user.name\nreturn ""'} language="typescript" />
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-xs font-medium text-muted-foreground">After</p>
            <CodeBlock code={'return user?.name ?? "Guest"'} language="typescript" />
          </div>
        </div>
        <div className="grid w-full max-w-3xl gap-2">
          <CodeBlock
            code={"const retries = -1\nawait connect({ retries })\nreturn result"}
            language="typescript"
            lineActions
            diagnostics={{ 1: "Expected a positive number" }}
            onLineAction={(line) => setNotice(`Review note added to line ${line}.`)}
          />
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {notice}
          </span>
        </div>
        <CodeBlock code={snippet} language="typescript" selectableLines onLineSelect={(line) => setNotice(`Selected line ${line}.`)} />
        <CodeBlock
          code={
            "function buildDashboard() {\n  const metrics = loadMetrics()\n  const filters = loadFilters()\n  const chart = buildChart(metrics)\n  return { metrics, filters, chart }\n}"
          }
          language="typescript"
          foldable
          foldedRanges={[{ start: 1, end: 5, label: "Function body (4 lines)" }]}
        />
        <div className="grid w-full max-w-3xl gap-2">
          <CodeBlock
            code={"const total = items.reduce((sum, item) => sum + item.amount)\nrenderTotal(total)"}
            language="typescript"
            diagnostics={{ 1: "Missing initial value" }}
            focusLines={[1]}
          />
          <Button size="sm" className="w-fit" onClick={() => setNotice("Suggested fix: add 0 as the initial accumulator.")}>
            Suggest fix
          </Button>
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {notice}
          </span>
        </div>
        <div className="grid w-full max-w-3xl gap-2">
          <p className="rounded-lg bg-muted p-2 text-xs">The null check on line 3 should return a typed error.</p>
          <CodeBlock code={snippet} language="typescript" highlightedLines={[3]} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Layout" span={2} layout="fullStack">
        <div className="max-w-3xl">
          <CodeBlock code={longSnippet} language="typescript" expandable />
        </div>
        <div className="max-w-3xl">
          <CodeBlock code={longSnippet} language="typescript" searchable />
        </div>
        <div className="max-w-3xl">
          <CodeBlock
            code={
              'const endpoint = "https://api.example.test/v1/workspaces/engineering/projects/operations"\nawait fetch(endpoint, { headers: { authorization: `Bearer ${"${token}"}` } })'
            }
            language="typescript"
            wrap
          />
        </div>
        <div className="max-h-48 w-full max-w-3xl overflow-auto rounded-lg border p-2">
          <CodeBlock code={longSnippet} language="typescript" className="border-0" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Theme" span={2} layout="fullStack">
        <div className="max-w-3xl">
          <CodeBlock code={snippet} language="typescript" dark />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Chat" span={2} layout="fullStack">
        <div className="grid w-full max-w-3xl gap-2">
          <p className="text-sm">Here is the project lookup handler:</p>
          <CodeBlock code={snippet} language="typescript" showCopy />
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
