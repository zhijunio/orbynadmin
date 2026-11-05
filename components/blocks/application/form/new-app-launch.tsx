"use client";

import { useState } from "react";
import { IconRocket } from "@tabler/icons-react";

import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Input } from "@/components/ui/input/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Textarea } from "@/components/ui/textarea/textarea";

export function NewAppLaunch() {
  const [brief, setBrief] = useState("Create a service desk app with priority queues, SLA badges, and owner handoff notes.");
  const [starter, setStarter] = useState("response-hub");
  const [source, setSource] = useState("meadow-relay");
  const [name, setName] = useState("Meadow Relay");
  const [slug, setSlug] = useState("meadow-relay");
  const [runtime, setRuntime] = useState("nextjs");
  const [region, setRegion] = useState("us-east");
  const [notice, setNotice] = useState("");

  const select = (label: string, value: string, onValueChange: (value: string) => void, options: [string, string][]) => (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label={label} className="w-full"><SelectValue>{options.find(([key]) => key === value)?.[1]}</SelectValue></SelectTrigger>
      <SelectContent>{options.map(([key, text]) => <SelectItem key={key} value={key}>{text}</SelectItem>)}</SelectContent>
    </Select>
  );
  const row = (label: string, description: string, control: React.ReactNode, align = "center", compact = false) => (
    <div className={`grid gap-3 border-b border-dashed py-3.5 last:border-0 sm:grid-cols-[minmax(0,16.5rem)_minmax(0,1fr)] sm:gap-5 ${compact ? "sm:py-1.5" : "sm:py-3.5"} ${align === "start" ? "sm:items-start" : "sm:items-center"}`}>
      <div className="min-w-0"><div className="text-sm font-medium">{label}</div><p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p></div>
      <div className="min-w-0">{control}</div>
    </div>
  );
  const summaries = [["Source", source], ["Runtime", runtime === "nextjs" ? "Next.js App" : runtime === "edge" ? "Edge Function" : "Static Site"], ["Region", region === "us-east" ? "US East" : region === "eu-west" ? "EU West" : "Asia Pacific"]];

  return <Card className="mx-auto w-full max-w-3xl gap-0 shadow-none">
    <CardHeader className="border-b px-5 py-4 sm:px-6"><CardTitle className="text-base">New App</CardTitle><p className="mt-1 text-sm text-muted-foreground">Create a launch-ready app from a brief, source, and starter.</p></CardHeader>
    <CardContent className="space-y-4 px-5 py-4 sm:px-6">
      <div className="grid gap-4 rounded-lg bg-gradient-to-r from-primary via-chart-5 to-chart-4 p-4 text-primary-foreground sm:min-h-[136px] sm:grid-cols-[minmax(0,1fr)_15.5rem] sm:items-center sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/20 bg-white/15"><IconRocket className="size-4" /></span>
          <div className="min-w-0"><p className="text-xs text-white/75">Launch setup</p><h3 className="mt-0.5 text-base font-semibold">{starter === "response-hub" ? "Response Hub" : starter === "commerce" ? "Commerce Desk" : "Team Portal"}</h3><p className="mt-1 line-clamp-1 text-sm text-white/75">{brief}</p></div>
        </div>
        <div className="rounded-lg bg-background/95 px-3 py-2.5 text-foreground shadow-sm">
          {summaries.map(([label, value]) => <div key={label} className="flex justify-between gap-3 py-0.5 text-sm"><span className="text-muted-foreground">{label}</span><span className="truncate font-medium">{value}</span></div>)}
        </div>
      </div>
      {row("Launch Brief", "Describe the first version.", <Textarea aria-label="Launch Brief" value={brief} onChange={(event) => setBrief(event.target.value)} rows={3} />, "start")}
      {row("Starter", "Base app surface.", select("Starter", starter, setStarter, [["response-hub", "Response Hub"], ["commerce", "Commerce Desk"], ["team-portal", "Team Portal"]]), "center", true)}
      {row("Source", "Repository to connect.", select("Source", source, setSource, [["meadow-relay", "meadow-relay"], ["northstar-ops", "northstar-ops"], ["new-repository", "Connect a repository"]]), "center", true)}
      {row("App Name", "Display name for the app.", <Input aria-label="App Name" value={name} onChange={(event) => setName(event.target.value)} />, "center", true)}
      {row("App URL", "Public route for previews.", <InputGroup><InputGroupAddon className="border-r pr-2">studio.nextrose.dev/</InputGroupAddon><InputGroupInput aria-label="App URL" value={slug} onChange={(event) => setSlug(event.target.value)} /></InputGroup>, "center", true)}
      {row("Runtime", "Where the app executes.", select("Runtime", runtime, setRuntime, [["nextjs", "Next.js App"], ["edge", "Edge Function"], ["static", "Static Site"]]), "center", true)}
      {row("Region", "Deployment location.", select("Region", region, setRegion, [["us-east", "US East"], ["eu-west", "EU West"], ["ap-southeast", "Asia Pacific"]]), "center", true)}
      {notice && <p role="status" className="text-xs text-muted-foreground">{notice}</p>}
    </CardContent>
    <CardFooter className="justify-end gap-2 border-t bg-muted/20 px-5 py-3 sm:px-6">
      <Button variant="outline" onClick={() => setNotice("Changes discarded.")}>Cancel</Button>
      <Button onClick={() => setNotice(`${name || "App"} is ready to create.`)}><IconRocket />Create App</Button>
    </CardFooter>
  </Card>;
}
