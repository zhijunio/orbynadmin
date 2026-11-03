"use client";

import { useState } from "react";
import { IconArrowRight, IconCheck, IconChevronDown, IconDotsVertical, IconEye, IconEyeOff, IconExternalLink, IconInfoCircle, IconSparkles, IconTrendingUp } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badges/badge";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Input } from "@/components/ui/input/input";

export function CardInteractiveExamples() {
  const [showPassword, setShowPassword] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return <>
    <ComponentPreview title="Basic card and compact size">
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <Card><CardHeader><CardTitle>Workspace overview</CardTitle><p className="text-sm text-muted-foreground">A standard card with header and content.</p></CardHeader><CardContent><p className="text-2xl font-semibold">24 projects</p></CardContent></Card>
        <Card size="sm"><CardHeader><CardTitle>Quick status</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">All services are operational.</p></CardContent></Card>
      </div>
    </ComponentPreview>

    <ComponentPreview title="Header, content, and footer separation">
      <Card className="w-full max-w-md gap-0">
        <CardHeader className="border-b"><CardTitle>API access</CardTitle><p className="text-sm text-muted-foreground">Manage credentials for this workspace.</p></CardHeader>
        <CardContent className="py-4"><p className="text-sm">Last rotated <time dateTime="2026-10-28">October 28, 2026</time></p></CardContent>
        <CardFooter className="justify-between"><span className="text-xs text-muted-foreground">1 active key</span><Button size="sm" variant="outline">Manage keys</Button></CardFooter>
      </Card>
    </ComponentPreview>

    <ComponentPreview title="Card actions menu">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>Deployment summary</CardTitle><CardAction><DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="ghost" aria-label="Deployment actions"><IconDotsVertical /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Edit details</DropdownMenuItem><DropdownMenuItem>Copy deployment link</DropdownMenuItem><DropdownMenuItem variant="destructive">Archive deployment</DropdownMenuItem></DropdownMenuContent></DropdownMenu></CardAction></CardHeader>
        <CardContent className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm"><span className="size-2 rounded-full bg-emerald-500" />Healthy</span><span className="text-sm text-muted-foreground">Production · v3.4.2</span></CardContent>
      </Card>
    </ComponentPreview>

    <ComponentPreview title="Image hover and full image cards">
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <Card className="group/card w-full max-w-sm p-0"><div role="img" aria-label="Operations team reviewing a project dashboard" className="aspect-video rounded-t-xl bg-[url('/images/carousel/carousel-03.png')] bg-cover bg-center transition-transform duration-300 group-hover/card:scale-[1.03]" /><CardContent className="flex items-center justify-between p-4"><div><CardTitle>Operations review</CardTitle><p className="mt-1 text-xs text-muted-foreground">Project Atlas · Updated today</p></div><Button size="icon" variant="ghost" aria-label="Open operations review"><IconArrowRight /></Button></CardContent></Card>
        <Card className="relative min-h-52 w-full max-w-sm justify-end overflow-hidden border-0 p-0 text-white"><div role="img" aria-label="Abstract blue data visualization" className="absolute inset-0 bg-[url('/images/carousel/carousel-04.png')] bg-cover bg-center" /><div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /><CardContent className="relative z-10 space-y-2 p-5"><Badge variant="secondary">Release 3.4</Badge><CardTitle className="text-white">Platform update</CardTitle><p className="text-sm text-white/80">Reliability improvements are ready for review.</p></CardContent></Card>
      </div>
    </ComponentPreview>

    <ComponentPreview title="Stacked card depth">
      <div className="relative mx-auto w-full max-w-sm px-3 pb-3 pt-1"><div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-4 rounded-xl border bg-muted" /><div aria-hidden="true" className="absolute inset-x-3 bottom-1 top-2 rounded-xl border bg-card shadow-sm" /><Card className="relative z-10"><CardHeader><CardTitle>Quarterly report</CardTitle><p className="text-sm text-muted-foreground">Three review notes are waiting.</p></CardHeader><CardFooter className="justify-between"><span className="text-xs text-muted-foreground">Updated 10 min ago</span><Button size="sm" variant="outline">Open report</Button></CardFooter></Card></div>
    </ComponentPreview>

    <ComponentPreview title="Sign-in form card">
      <Card className="w-full max-w-sm"><CardHeader className="text-center"><CardTitle className="text-lg">Sign in to your workspace</CardTitle><p className="text-sm text-muted-foreground">Use your organization account to continue.</p></CardHeader><CardContent className="grid gap-3"><label className="grid gap-1.5 text-sm">Work email<Input type="email" placeholder="name@company.com" /></label><label className="grid gap-1.5 text-sm">Password<span className="relative"><Input type={showPassword ? "text" : "password"} placeholder="Enter password" className="pr-10" /><Button type="button" variant="ghost" size="icon" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute top-0 right-0"><span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>{showPassword ? <IconEyeOff /> : <IconEye />}</Button></span></label><Button className="w-full">Continue</Button></CardContent><CardFooter className="justify-center border-t"><Button variant="link" className="h-auto p-0 text-xs">Contact your administrator</Button></CardFooter></Card>
    </ComponentPreview>

    <ComponentPreview title="Expandable billing usage">
      <Card className="w-full max-w-md"><CardHeader><CardTitle>Monthly usage</CardTitle><p className="text-sm text-muted-foreground">Your plan resets in 8 days.</p><CardAction><Badge variant="secondary">Pro plan</Badge></CardAction></CardHeader><CardContent className="space-y-3"><div className="flex justify-between text-sm"><span>API requests</span><span>82,400 / 100,000</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[82%] rounded-full bg-primary" /></div>{expanded && <div className="grid gap-2 border-t pt-3 text-sm text-muted-foreground"><p>Requests this month: 82,400</p><p>Estimated overage: $0.00</p><Button variant="link" className="h-auto justify-start p-0">View usage details <IconExternalLink /></Button></div>}</CardContent><CardFooter><Button variant="outline" size="sm" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "Show less" : "Show usage details"}<IconChevronDown className={expanded ? "rotate-180" : ""} /></Button></CardFooter></Card>
    </ComponentPreview>

    <ComponentPreview title="Status and trend summary cards">
      <div className="grid w-full gap-4 sm:grid-cols-2"><Card><CardHeader><CardTitle className="text-sm">Platform health</CardTitle><CardAction><IconCheck className="size-5 text-emerald-600" /></CardAction></CardHeader><CardContent><p className="text-2xl font-semibold">99.98%</p><p className="mt-1 text-xs text-muted-foreground">Uptime over the last 30 days</p></CardContent></Card><Card><CardHeader><CardTitle className="text-sm">Monthly active users</CardTitle><CardAction><DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="ghost" aria-label="Usage metric actions"><IconDotsVertical /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>View analytics</DropdownMenuItem><DropdownMenuItem>Download report</DropdownMenuItem></DropdownMenuContent></DropdownMenu></CardAction></CardHeader><CardContent className="flex items-end justify-between"><div><p className="text-2xl font-semibold">18,294</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-600"><IconTrendingUp className="size-3.5" />12.8% this month</p></div><IconSparkles className="size-8 text-primary" /></CardContent></Card></div>
    </ComponentPreview>

    <ComponentPreview title="Header badge, icon, and linked action">
      <div className="grid w-full gap-4 sm:grid-cols-2"><Card><CardHeader><span className="mb-2 grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><IconInfoCircle /></span><CardTitle>Audit history</CardTitle><p className="text-sm text-muted-foreground">Review recent workspace changes.</p><CardAction><Badge variant="secondary">New</Badge></CardAction></CardHeader><CardFooter className="justify-between"><span className="text-xs text-muted-foreground">128 events</span><Button variant="link" className="h-auto p-0">Open history <IconArrowRight /></Button></CardFooter></Card><Card><CardHeader><CardTitle>Team activity</CardTitle><CardAction><Badge variant="outline">Live</Badge></CardAction></CardHeader><CardContent className="flex items-center gap-3"><Avatar><AvatarFallback>AM</AvatarFallback></Avatar><div><p className="text-sm font-medium">Alex Morgan</p><p className="text-xs text-muted-foreground">Updated access policies</p></div></CardContent><CardFooter><Button variant="outline" size="sm" className="w-full">View activity</Button></CardFooter></Card></div>
    </ComponentPreview>
  </>;
}
