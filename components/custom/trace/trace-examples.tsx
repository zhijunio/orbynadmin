"use client";

import { useEffect, useRef, useState } from "react";
import { IconAlertCircle, IconCheck, IconCircle, IconCode, IconCopy, IconLoader2, IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace/trace";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import { NativeSelect } from "@/components/ui/native-select/native-select";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";
import { Progress } from "@/components/ui/progress/progress";


const snippets: Record<number, string> = {
  1: 'frameSrc: ["self", "https://payments.example.test"]\nTests: 12 passed\nLint: unused variable at middleware/csp.ts:14',
  5: 'Plan: 2 to add, 1 to change, 0 to destroy\n+ storage.archive\n~ service.api.capacity: 2 -> 3',
  8: 'pnpm add @example/client\npnpm exec client init',
  10: 'GET /api/orders\n  gateway                 12 ms\n  service                 48 ms\n    database              36 ms',
  11: 'TypeError: Cannot read properties of undefined\n  at loadWorkspace (workspace.ts:42:18)\n  at handleRequest (route.ts:12:7)',
  12: 'Hash Join (actual time=0.8..182.4 rows=240)\n  Seq Scan on orders (rows=84000)\n  Index Scan on accounts_pkey (rows=1)',
  16: 'example-parser 1.2.0 -> 1.2.4\n  app -> importer -> example-parser',
  17: '- const amount = Number(input)\n+ const amount = parseAmount(input)',
};
const failedRows: Record<number, number> = { 1: 2, 5: -1, 9: 1, 11: 2, 13: 1, 14: 0, 15: 2, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1 };
const timedExamples = new Set([2, 4, 9, 13, 15, 22]);
const scenarioSteps = [
  ["Searched the codebase", "Edited the security policy", "Ran tests and lint"],
  ["Read the request", "Prepared a plan", "Generated the answer"],
  ["Read the question", "Retrieved documentation", "Prepared a cited response"],
  ["Started code analysis", "Started test analysis", "Merged the findings"],
  ["Loaded the current state", "Prepared infrastructure changes", "Awaiting approval"],
  ["Found the policy", "Compared the limits", "Answered with citations"],
  ["Looked up the account", "Checked recent invoices", "Prepared a reply"],
  ["Checked the runtime", "Installed the client", "Prepared configuration"],
  ["Installed dependencies", "Ran unit tests", "Built the application"],
  ["Gateway span", "Service span", "Database span"],
  ["Opened the workspace", "Fetched account data", "Encountered an exception"],
  ["Joined the result sets", "Scanned the orders table", "Returned the result"],
  ["Loaded source records", "Checked uniqueness", "Built the reporting model"],
  ["Delivery attempt failed", "Waiting for retry", "Delivery acknowledged"],
  ["Read the CSV file", "Validated the rows", "Imported accepted rows"],
  ["Read the lockfile", "Found a vulnerable package", "Proposed a safe version"],
  ["Reviewed the changed files", "Flagged an unsafe conversion", "Suggested a patch"],
  ["Checked the expected answer", "Compared the model output", "Recorded the judge result"],
  ["Checked workspace membership", "Checked the required role", "Evaluated the access decision"],
  ["Received the identity document", "Rejected an unreadable image", "Requested a replacement"],
  ["Verified the sending domain", "Checked verification records", "Enabled delivery"],
  ["Encoded the renditions", "Generated thumbnails", "Published to the CDN"],
];
const scenarioDetails = [
  "The patch adds the payment endpoint to the allowed frame sources.",
  "The local run advances through each stage and can be stopped.",
  "The answer refers to the workspace documentation below.",
  "Independent checks contribute to the same result.",
  "Review the example plan before approving it locally.",
  "The limits are documented in the linked source excerpt.",
  "Insert the suggested reply into the editable draft.",
  "The command is a copyable example; no process is executed by this page.",
  "One job failed. Re-run the local pipeline to update every job.",
  "Nested spans show the request path and individual durations.",
  "The final event contains the stack trace and the preceding breadcrumbs.",
  "The sequential scan is the hot path. Inspect the proposed index.",
  "Duplicate records block the downstream model until the check passes.",
  "Resend appends a new delivery attempt to this example.",
  "Two records need corrections; their errors can be downloaded.",
  "The dependency chain identifies the package and its upgrade path.",
  "Review the flagged code and resolve this finding locally.",
  "The failed case includes the expected answer and the actual output.",
  "The selected role determines whether all rules pass.",
  "The document image needs to be replaced before verification can finish.",
  "Two of three DNS records are present. Recheck to complete this local example.",
  "Renditions complete before thumbnails and publishing.",
];
const actionLabels = ["Retry checks", "Run", "Show response", "Run analysis", "Approve plan", "Show answer", "Insert draft", "Copy command", "Re-run pipeline", "Refresh spans", "Resolve exception", "Show proposed index", "Re-run build", "Resend", "Import records", "Apply fix", "Resolve finding", "Re-evaluate", "Check access", "Request new document", "Recheck DNS", "Start transcode"];
function TraceGlyph({ state }: { state: "done" | "error" | "running" | "pending" }) {
  return state === "done" ? <IconCheck /> : state === "error" ? <IconAlertCircle /> : state === "running" ? <IconLoader2 className="motion-safe:animate-spin" /> : <IconCircle />;
}
export function TraceExample({ example }: { example: number }) {
  const [resolved, setResolved] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [role, setRole] = useState("viewer");
  const [feedback, setFeedback] = useState("");
  const [draft, setDraft] = useState("");
  const [evalFilter, setEvalFilter] = useState("all");
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!running) return;
    tick.current = setInterval(() => setProgress((value) => Math.min(100, value + 10)), 200);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, [running]);
  useEffect(() => {
    if (running && progress === 100) {
      if (tick.current) clearInterval(tick.current);
      // Completion is scheduled by the same clock that drives the visible run.
      const finish = setTimeout(() => { setRunning(false); setResolved(true); }, 0);
      return () => clearTimeout(finish);
    }
  }, [progress, running]);
  function run() { setProgress(0); setResolved(false); setRunning(true); setFeedback(""); }
  function action() {
    if (timedExamples.has(example)) { run(); return; }
    if (example === 14) setAttempts((value) => value + 1);
    if (example === 7) setDraft("Thanks for reaching out. We reviewed your invoice and will help you resolve the outstanding payment.");
    setResolved(true); setFeedback("Example updated.");
  }
  async function copy(text: string) { try { await navigator.clipboard.writeText(text); setFeedback("Copied."); } catch { setFeedback("Copy failed. Try again."); } }
  function download() {
    const url = URL.createObjectURL(new Blob(["id,error\nrow-18,invalid email\nrow-42,missing name\n"], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "rejected-records.csv"; link.click(); URL.revokeObjectURL(url);
    setFeedback("Rejected records downloaded.");
  }
  const isAllowed = example === 19 && role === "admin";
  const rowCount = example === 14 ? attempts + 1 : 3;
  const rows = Array.from({ length: rowCount }, (_, index) => ({ id: `event-${index + 1}`, index, title: scenarioSteps[example - 1][Math.min(index, 2)] }));
  const filtered = example === 18 && evalFilter === "failed" ? rows.filter((row) => row.index === 1) : rows;
  const failed = failedRows[example];
  const stateFor = (index: number): "done" | "error" | "running" | "pending" => {
    if (resolved || isAllowed) return "done";
    if (!running && [2, 4, 22].includes(example)) return progress >= (index + 1) / 3 * 100 ? "done" : "pending";
    if (running && example === 4) return index < 2 ? (progress >= 80 ? "done" : "running") : progress >= 80 ? "running" : "pending";
    if (running) return progress >= (index + 1) / 3 * 100 ? "done" : progress >= index / 3 * 100 ? "running" : "pending";
    return index === failed ? "error" : failed !== undefined && index > failed ? "pending" : "done";
  };
  return <div className="w-full min-w-0 space-y-4">
    {[3, 6, 7].includes(example) && <p className="rounded-lg bg-muted/40 p-3 text-sm">{scenarioDetails[example - 1]}</p>}
    {example === 19 && <NativeSelect aria-label={"Role"} value={role} onChange={(event) => setRole(event.target.value)}><option value="viewer">{"Viewer"}</option><option value="admin">{"Admin"}</option></NativeSelect>}
    {example === 18 && <NativeSelect aria-label={"Results"} value={evalFilter} onChange={(event) => setEvalFilter(event.target.value)}><option value="all">{"All cases"}</option><option value="failed">{"Failed cases"}</option></NativeSelect>}
    <Trace>{filtered.map(({ id, index, title }) => {
      const state = stateFor(index);
      return <TraceCollapsible key={id} defaultOpen={index === failed || example === 1 && index === 0}><TraceCollapsibleTrigger><TraceLine status={state === "done" ? undefined : state === "error" ? "error" : state === "running" ? "running" : "pending"}><TraceIcon><TraceGlyph state={state} /></TraceIcon><TraceTitle>{title}</TraceTitle><TraceDescription>{example === 10 || example === 12 ? `${[12, 48, 36][index]} ms` : <span className="text-xs">{state === "done" ? "Completed" : state === "error" ? "Failed" : state === "running" ? "Running" : "Pending"}</span>}</TraceDescription></TraceLine></TraceCollapsibleTrigger><TraceCollapsibleContent>
        <p className="mb-2">{resolved || isAllowed ? "The local example has completed successfully." : scenarioDetails[example - 1]}</p>
        {(snippets[example] || example === 12) && <pre className="max-w-full overflow-auto rounded-md bg-muted/60 p-3 text-xs"><code>{example === 12 && resolved ? 'CREATE INDEX orders_account_id_idx ON orders(account_id);' : snippets[example]}</code></pre>}
        {[4, 10, 12].includes(example) && <Trace><TraceLine><TraceIcon><IconCode /></TraceIcon><TraceTitle>{"Child operation completed"}</TraceTitle><TraceDescription>12 ms</TraceDescription></TraceLine></Trace>}
        {[3, 6].includes(example) && <a href={`#trace-source-${example}`} className="text-primary underline underline-offset-4">{"View source excerpt"}</a>}
        {[13, 15, 18].includes(example) && <Table><TableHeader><TableRow><TableHead>{"Record"}</TableHead><TableHead>{example === 18 ? "Expected" : "Problem"}</TableHead><TableHead>{example === 18 ? "Actual" : "Status"}</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>{example === 18 ? "eval-02" : "row-18"}</TableCell><TableCell>{example === 18 ? "42" : "Invalid email address"}</TableCell><TableCell>{example === 18 ? "24" : <Badge variant={resolved ? "secondary" : "destructive"}>{(resolved ? "Completed" : "Failed")}</Badge>}</TableCell></TableRow></TableBody></Table>}
        {example === 21 && <div className="flex items-center justify-between gap-2 rounded-md border p-2"><code className="min-w-0 break-all text-xs">_verify.workspace.example.test TXT demo-verification</code><Button size="icon-sm" variant="ghost" aria-label={"Copy DNS record"} onClick={() => copy("_verify.workspace.example.test TXT demo-verification")}><IconCopy /></Button></div>}
      </TraceCollapsibleContent></TraceCollapsible>;
    })}</Trace>
    {[3, 6].includes(example) && <div id={`trace-source-${example}`} className="space-y-1 rounded-lg border p-3 text-xs"><p className="font-medium">{"Sources"}</p><p>{"Workspace guide: members can review invoices and export their own records."}</p></div>}
    {example === 7 && <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} aria-label={"Reply draft"} placeholder={"Insert or write a reply…"} />}
    {timedExamples.has(example) && ([2, 4, 22].includes(example) || running || progress > 0 || resolved) && <div className="space-y-2"><Progress className="motion-reduce:[&>[data-slot=progress-indicator]]:transition-none" value={progress} aria-label={"Run progress"} /><output aria-live="polite" className="text-xs tabular-nums text-muted-foreground">{progress}%</output></div>}
    <div className="flex flex-wrap gap-2">
      {example === 8 ? <Button size="sm" variant="outline" onClick={() => copy(snippets[8])}><IconCopy />{"Copy command"}</Button> : <Button size="sm" variant="outline" disabled={running || resolved && ![7, 14].includes(example)} onClick={action}>{timedExamples.has(example) && <IconPlayerPlay />}{actionLabels[example - 1]}</Button>}
      {running && <Button size="sm" variant="outline" onClick={() => { setRunning(false); setFeedback("Run stopped."); }}><IconPlayerStop />{"Stop"}</Button>}
      {example === 15 && <Button size="sm" variant="outline" onClick={download}>{"Download rejected records"}</Button>}
      {example === 5 && !resolved && <Button size="sm" variant="ghost" onClick={() => { setResolved(true); setFeedback("Plan cancelled."); }}>{"Cancel"}</Button>}
      {resolved && <Button size="sm" variant="ghost" onClick={() => { setResolved(false); setProgress(0); setAttempts(1); setFeedback(""); }}>{"Reset"}</Button>}
    </div><output role="status" className="block min-h-4 text-xs text-muted-foreground">{feedback}</output>
  </div>;
}
