"use client";
import { getInitials } from "@/lib/text";

import { useEffect, useRef, useState } from "react";
import { TriangleAlert as IconAlertTriangle, RefreshCw as IconRefresh, Users as IconUsers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DemoState = "ready" | "loading" | "error" | "empty";

export function LoadingStatesExample() {
  const [state, setState] = useState<DemoState>("ready");
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const simulateLoad = (result: "ready" | "error" | "empty") => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setState("loading");
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setState(result);
    }, 900);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-sm">Preview states</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" disabled={state === "loading"} onClick={() => simulateLoad("ready")}><IconRefresh className="size-4" /> Load data</Button>
          <Button variant="outline" disabled={state === "loading"} onClick={() => simulateLoad("error")}>Simulate error</Button>
          <Button variant="outline" disabled={state === "loading"} onClick={() => simulateLoad("empty")}>Simulate empty</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Team members</CardTitle></CardHeader>
        <CardContent>
          {state === "loading" ? (
            <div role="status" aria-label="Loading team members" className="space-y-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-full" />
                  <div className="flex-1 space-y-2"><Skeleton className="h-4 w-36" /><Skeleton className="h-3 w-52 max-w-full" /></div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : state === "error" ? (
            <div role="alert" className="flex flex-col items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-5 py-10 text-center">
              <IconAlertTriangle className="size-6 text-destructive" />
              <div><p className="text-sm font-medium">Couldn&apos;t load team members</p><p className="mt-1 text-sm text-muted-foreground">Check the connection and try again.</p></div>
              <Button size="sm" variant="outline" onClick={() => simulateLoad("ready")}><IconRefresh className="size-4" /> Retry</Button>
            </div>
          ) : state === "empty" ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground"><IconUsers className="size-5" /></span>
              <p className="text-sm font-medium">No team members yet</p>
              <p className="text-sm text-muted-foreground">Invite a teammate to get started.</p>
              <Button size="sm" className="mt-2" onClick={() => simulateLoad("ready")}>Show sample data</Button>
            </div>
          ) : (
            <div className="divide-y">
              {["Wei Zhang", "Sam Rivera", "Maya Chen"].map((name, index) => (
                <div key={name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-medium">{getInitials(name)}</span>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{name}</p><p className="text-xs text-muted-foreground">{["Administrator", "Editor", "Analyst"][index]}</p></div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-400">Active</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
