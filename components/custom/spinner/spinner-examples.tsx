"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner/spinner";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import { Input } from "@/components/ui/input/input";
import { cn } from "@/utils/cn";
export function SpinnerExample({ example }: { example: number }) {
  const [loading,setLoading]=useState(false);
  useEffect(()=>{if(!loading)return;const timer=setTimeout(()=>setLoading(false),1200);return ()=>clearTimeout(timer);},[loading]);
  const spinner=<Spinner label={"Loading"} size="sm" />;
  if(example===1)return <>{(["sm","default","lg"] as const).map(size=><Spinner key={size} label={"Loading"} size={size} />)}</>;
  if(example===2)return <><Button disabled>{spinner}{"Saving…"}</Button><Button disabled variant="outline">{spinner}{"Loading"}</Button></>;
  if(example===3)return <><Badge variant="secondary">{spinner}{"Processing"}</Badge><Badge variant="outline">{spinner}{"Syncing"}</Badge></>;
  if(example===4)return <div className="relative w-full max-w-xs"><Input aria-label={"Search"} placeholder={"Search"} className="pr-10" /><span className="absolute top-2 right-3">{spinner}</span></div>;
  if(example===6)return <Button onClick={()=>setLoading(true)} disabled={loading} aria-busy={loading}>{loading && spinner}{(loading ? "Saving\u00e2\u0080\u00a6" : "Save changes")}</Button>;
  if(example===9)return <p className="flex items-center gap-2 text-sm text-muted-foreground">{spinner}{"Fetching records"}</p>;
  if(example===10)return <span role="status" aria-label={"Loading"} className="flex gap-1.5">{[0,1,2].map(index=><span key={index} aria-hidden className="size-2 rounded-full bg-primary motion-safe:animate-bounce" style={{animationDelay:`${index*120}ms`}} />)}</span>;
  if(example===12)return <>{["text-primary","text-destructive","text-muted-foreground"].map(color=><Spinner key={color} label={"Loading"} className={color} />)}</>;
  if([7,11].includes(example))return <div className="relative w-full max-w-sm overflow-hidden rounded-lg border p-5" aria-busy="true"><div className="space-y-3"><p className="font-medium">{"Workspace report"}</p><p className="text-sm text-muted-foreground">{"Your latest activity and usage summary."}</p><Button variant="outline" disabled>{"Export"}</Button></div><div className="absolute inset-0 flex items-center justify-center bg-background/85">{spinner}</div></div>;
  return <div className={cn("flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center",example===8 && "min-h-72")} aria-busy="true"><Spinner label={"Loading"} size={example===8 ? "lg" : "default"} /><p className="text-sm font-medium">{(example===8 ? "Loading workspace" : "Fetching records")}</p><p className="text-xs text-muted-foreground">{"Please wait while your data loads."}</p></div>;
}
