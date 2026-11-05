"use client";

import { useState, type ComponentProps } from "react";
import Link from "next/link";
import flags from "react-phone-number-input/flags";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { StatusDot } from "@/components/ui/badge/status-dot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { people } from "@/app/components/avatar/avatar-data";
const variants = ["default","secondary","destructive","success","info","warning","outline","primary-outline","destructive-outline","info-outline","success-outline","warning-outline","primary-light","destructive-light","success-light","info-light","warning-light"] as const satisfies readonly ComponentProps<typeof Badge>["variant"][];

export function BadgeExample({ example }: { example: number }) {
  const [dismissed,setDismissed]=useState(false);
  if (example <=17) return <Badge variant={variants[example-1]}>{["Default", "Secondary", "Destructive", "Success", "Info", "Warning", "Outline", "Primary Outline", "Destructive Outline", "Info Outline", "Success Outline", "Warning Outline", "Primary Light", "Destructive Light", "Success Light", "Info Light", "Warning Light"][example - 1]}</Badge>;
  if ([18,19].includes(example)) return <div className="flex flex-wrap items-center gap-3">{([["sm", "Small"], ["default", "Default"], ["lg", "Large"]] as const).map(([size, label])=><Badge key={size} size={size} radius={example===19 ? "full" : "default"}>{example===19 ? "3" : label}</Badge>)}</div>;
  if (example===21) return dismissed ? <div className="flex items-center gap-2"><span role="status" className="text-xs text-muted-foreground">{"Badge removed"}</span><Button variant="ghost" size="sm" onClick={()=>setDismissed(false)}>{"Restore"}</Button></div> : <Badge variant="outline">{"Badge"}<button type="button" aria-label={"Dismiss badge"} onClick={()=>setDismissed(true)} className="rounded-full outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"><IconX aria-hidden className="size-3" /></button></Badge>;
  if (example===23) return <Badge variant="outline" asChild><Link href="/components/button">{"Browse buttons"}</Link></Badge>;
  if (example===24) return <Badge variant="outline" size="lg" className="pl-0.5"><Avatar size="xs" className="size-4"><AvatarImage src={people[0].avatar} alt="" /><AvatarFallback>AM</AvatarFallback></Avatar>{people[0].name}</Badge>;
  if (example===25) { const Flag = flags.US; return <Badge variant="outline"><span className="w-4 overflow-hidden rounded-xs">{Flag && <Flag title={"United States"} />}</span>{"United States"}</Badge>; }
  return <Badge variant="outline">{example===20 ? <IconCheck aria-hidden /> : <StatusDot color="success" />}{(example===20 ? "Verified" : "Online")}</Badge>;
}
