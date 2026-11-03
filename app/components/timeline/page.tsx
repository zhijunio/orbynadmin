"use client"

import * as React from "react"
import { IconCheck, IconCircleDashed, IconRocket, IconUser } from "@tabler/icons-react"
import AppShell from "@/components/blocks/application/app-shell/app-shell"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { PageHeader } from "@/components/custom/docs/page-header"
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle } from "@/components/ui/timeline/timeline"

const examples=["Basic timeline.","Timeline with roadmap.","Timeline with order status.","Timeline with git activity.","Timeline with milestones.","Timeline with pipeline steps.","Timeline with roadmap items.","Vertical timeline","Horizontal timeline with leading labels","Deployment log timeline","Activity feed timeline with user avatars","Compact horizontal milestone timeline"]
type Entry={date:string;title:string;description?:string;icon?:React.ReactNode}
const sets:Entry[][]=[
 [{date:"Today · 09:00",title:"Project created",description:"Workspace initialized by Alex Morgan."},{date:"Today · 10:30",title:"Team invited",description:"Four members joined the project."},{date:"Today · 13:15",title:"First update",description:"The launch plan is ready for review."}],
 [{date:"Week 1",title:"Planning",description:"Scope and owners confirmed."},{date:"Week 2",title:"Design",description:"Prototype approved by stakeholders."},{date:"Week 4",title:"Development",description:"Core implementation in progress."}],
 [{date:"09:42",title:"Order received",description:"Order #OR-2841 was placed."},{date:"09:45",title:"Payment confirmed",description:"Card payment authorized."},{date:"10:12",title:"Ready to ship",description:"Package handed to the carrier."}],
 [{date:"2 hours ago",title:"Merge pull request #482",description:"Release settings and deployment workflow."},{date:"Yesterday",title:"Fix billing export",description:"Commit 7d90a1c · Jamie Chen."},{date:"Nov 1",title:"Add audit events",description:"Commit 12bc314 · Alex Morgan."}],
 [{date:"Nov 04",title:"Design review",description:"Review the updated dashboard."},{date:"Nov 12",title:"Beta release",description:"Invite the first customer cohort."},{date:"Dec 02",title:"General availability",description:"Launch to all workspaces."}],
 [{date:"Completed",title:"Build",description:"Artifacts compiled successfully.",icon:<IconCheck/>},{date:"Running",title:"Test",description:"Integration suite is running.",icon:<IconCircleDashed/>},{date:"Pending",title:"Deploy",description:"Waiting for test results.",icon:<IconRocket/>}],
 [{date:"Sprint 14",title:"Design system",description:"Shared patterns and tokens."},{date:"Sprint 15",title:"Workspace settings",description:"Role and access controls."},{date:"Sprint 16",title:"Usage analytics",description:"Adoption and activity metrics."}],
 [{date:"08:30",title:"Deployment started",description:"Production · us-east-1"},{date:"08:34",title:"Health checks passed",description:"All services are healthy."},{date:"08:36",title:"Release complete",description:"Version 2.8.1 is live."}],
 [{date:"Phase 1",title:"Discover",description:"Collect needs."},{date:"Phase 2",title:"Build",description:"Ship the solution."},{date:"Phase 3",title:"Improve",description:"Measure and iterate."}],
 [{date:"10:02:14",title:"Build #184 started",description:"main · 2m 31s"},{date:"10:04:45",title:"Tests passed",description:"128 checks · no failures"},{date:"10:05:02",title:"Deployed to production",description:"us-east-1 · v2.8.1",icon:<IconRocket/>}],
 [{date:"5 min ago",title:"Jamie Chen updated the brief",description:"Added the launch checklist.",icon:<IconUser/>},{date:"1 hour ago",title:"Riley Park commented",description:"Looks ready for the next review."},{date:"Yesterday",title:"Alex Morgan created the project",description:"Q4 Product Launch workspace."}],
 [{date:"Nov 04",title:"Design",description:"Review"},{date:"Nov 12",title:"Beta",description:"Invite users"},{date:"Dec 02",title:"Launch",description:"General availability"}],
]
function TimelineDemo({index}:{index:number}){
 const [active,setActive]=React.useState(index===2?2:index===5?2:3)
 const horizontal=[1,4,5,8,11].includes(index)
 const data=sets[index]
 return <div className="w-full overflow-x-auto py-2"><Timeline orientation={horizontal?"horizontal":"vertical"} value={active} className={horizontal?"min-w-[34rem] list-none p-0":"list-none p-0"}>{data.map((entry,i)=><TimelineItem key={`${entry.title}-${i}`} step={i+1} className={index===11?"mt-6":""}><TimelineHeader className={horizontal?"min-h-20":""}><TimelineSeparator className={index===8?"-top-[1.35rem]":""}/><TimelineDate>{entry.date}</TimelineDate><TimelineTitle className={index===11?"text-xs":""}>{entry.title}</TimelineTitle><TimelineIndicator>{entry.icon}</TimelineIndicator></TimelineHeader>{entry.description&&<TimelineContent className={horizontal?"max-w-40 text-xs":""}>{entry.description}</TimelineContent>}</TimelineItem>)}</Timeline>{[0,1,2,3,4,5,6,7,9,10].includes(index)&&<div className="mt-3 flex flex-wrap gap-2">{data.map((entry,i)=><button key={entry.title} onClick={()=>setActive(i+1)} aria-pressed={active===i+1} className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted aria-pressed:bg-primary aria-pressed:text-primary-foreground">Set {entry.title}</button>)}</div>}</div>
}
export default function TimelinePage(){return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Timeline"/><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">{examples.map((title,index)=><ComponentPreview key={title} title={title}><TimelineDemo index={index}/></ComponentPreview>)}</div></div></AppShell>}
