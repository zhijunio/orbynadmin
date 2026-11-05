"use client";

import { useState, type ComponentProps } from "react";
import { IconAlertTriangle, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { Frame, FramePanel } from "@/components/ui/frame/frame";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Textarea } from "@/components/ui/textarea/textarea";
import { people } from "@/app/components/avatar/avatar-data";
import { cn } from "@/utils/cn";


function ExampleAlert({ example, database = false }: { example: number; database?: boolean }) {
  const [dismissed,setDismissed]=useState(false);
  const [action,setAction]=useState<"view" | "reply" | null>(null);
  const [reply,setReply]=useState("");
  const [sent,setSent]=useState(false);
  const variant: ComponentProps<typeof Alert>["variant"] = [4,8,16].includes(example) ? "destructive" : [5,18].includes(example) ? "info" : [6,13].includes(example) ? "success" : [7,17].includes(example) ? "warning" : [9,15,20].includes(example) ? "invert" : "default";
  const title = database ? "Database connected" : example===4 ? "Payment failed" : example===5 ? "Important information" : example===9 ? "Workspace notification" : example===15 ? "Pro feature" : example>=19 ? "sent you a message" : example===16 ? "Subscription expiring" : example===17 ? "API latency warning" : example===18 ? "Advanced analytics available" : example===13 ? "Deployment successful" : example===12 ? "System update" : example===6 ? "Changes saved" : example===7 ? "Resource limit approaching" : example===8 ? "Unable to connect" : example===1 ? "Notice" : "Security update";
  const description = database ? "All systems operational. Last sync: 2 minutes ago." : example===4 ? "Review your payment details:" : example===5 ? "Review this workspace notice before continuing." : example===9 ? "Your workspace information is up to date." : example===15 ? "Review available plans to access this feature." : example>=19 ? "The updated layout is ready for your review." : example===16 ? "Your workspace subscription expires in 3 days." : example===17 ? "Response times are above the normal range." : example===18 ? "Explore usage trends and compare reporting periods." : example===13 ? "The latest build is ready for your team." : example===12 ? "A workspace update is available." : example===6 ? "Your preferences have been updated." : example===7 ? "Review your usage before adding more resources." : example===8 ? "Check the connection and try again." : example===1 ? "Review the latest workspace information." : "Update your password and enable two-factor authentication.";
  const hasActions = [3,4,5,10,11,14,15,16,17,18,19,20].includes(example);
  if(dismissed)return <div className="flex items-center gap-3 p-3"><span role="status" className="text-sm text-muted-foreground">{"Alert dismissed"}</span><Button variant="outline" size="sm" onClick={()=>setDismissed(false)}>{"Restore"}</Button></div>;
  return <Alert variant={variant} className={cn("min-w-0 gap-y-2 p-3 has-data-[slot=alert-action]:pr-3",example>=12 && "border-0",example>=19 && "grid-cols-[auto_1fr] gap-x-3")}>
    {example>=19 ? <Avatar className="row-span-3"><AvatarImage src={people[example===19 ? 0 : 1].avatar} alt="" /><AvatarFallback>AM</AvatarFallback></Avatar> : example!==1 && (variant==="success" ? <IconCheck aria-hidden /> : variant==="warning" || variant==="destructive" ? <IconAlertTriangle aria-hidden /> : <IconInfoCircle aria-hidden />)}
    {example!==11 && <AlertTitle className={example>=19 ? "col-start-2" : undefined}>{example>=19 && <span className="mr-2">{people[example===19 ? 0 : 1].name}</span>}{title}</AlertTitle>}
    {example!==10 && <AlertDescription className={example>=19 ? "col-start-2" : undefined}>{description}{example===4 && <ul className="mt-1 list-inside list-disc">{[["details", "Card number and expiry"], ["address", "Billing address"], ["funds", "Available funds"]].map(([key, label])=><li key={key}>{label}</li>)}</ul>}</AlertDescription>}
    {hasActions && <AlertAction className={cn("static mt-1 flex flex-wrap gap-2",example!==1 && "col-start-2")}>
      {example!==19 && example!==16 && <Button variant="outline" size="xs" className={variant === "invert" ? "border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background dark:bg-transparent" : undefined} onClick={()=>setDismissed(true)}>{"Dismiss"}</Button>}
      <Button size="xs" onClick={()=>setAction("view")}>{(example===4 ? "Try again" : (example===16 ? "Review billing" : (example===17 ? "Inspect" : (example>=18 ? "View" : "Update"))))}</Button>
      {example===19 && <Button variant="outline" size="xs" onClick={()=>setAction("reply")}>{"Reply"}</Button>}
    </AlertAction>}
    {action && <div className="col-start-2 min-w-0 space-y-2">{example===19 && action==="reply" ? <form className="space-y-2" onSubmit={event=>{event.preventDefault();if(reply.trim())setSent(true);}}><label className="grid gap-1 text-xs">{"Reply"}<Textarea required value={reply} onChange={event=>setReply(event.target.value)} size="sm" autoResize={false} className="min-h-16 dark:bg-transparent" /></label><Button size="xs" disabled={sent} type="submit">{(sent ? "Sent" : "Send")}</Button></form> : <p role="status" className="text-xs">{(example===16 ? "Demo: review your plan and renewal date before proceeding." : (example===17 ? "Latest response time: 420 ms. No outage detected." : (example===18 ? "Compare periods, inspect usage, and export reports." : (example>=19 ? "The updated layout is ready for your review." : "Demo security preferences updated."))))}</p>}</div>}
  </Alert>;
}
export function AlertExample({ example }: { example: number }) {
  if(example<12)return <ExampleAlert example={example} />;
  return <Frame className="w-full min-w-0" stacked={[13,17].includes(example)}><FramePanel className="overflow-hidden p-0"><ExampleAlert example={example===17 ? 6 : example} database={example===17} /></FramePanel>{[13,17].includes(example) && <FramePanel className="overflow-hidden p-0"><ExampleAlert example={example===13 ? 7 : 17} /></FramePanel>}</Frame>;
}
