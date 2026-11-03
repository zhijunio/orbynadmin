"use client"

import * as React from "react"
import { IconCalendar } from "@tabler/icons-react"
import AppShell from "@/components/blocks/application/app-shell/app-shell"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { PageHeader } from "@/components/custom/docs/page-header"
import { TimePicker } from "@/components/ui/time-picker/time-picker"

const examples=["Inline time panel","Popover picker","Typable time input","12-hour clock with seconds","Hour only","Steps and opening hours","Unavailable slots","Start and end time","Time zone label","Confirm before applying","Localized labels","Form field with validation","Date and time"]
function TimeDemo({index}:{index:number}){
 const [start,setStart]=React.useState("09:00")
 const [end,setEnd]=React.useState("17:30")
 const [submitted,setSubmitted]=React.useState(false)
 const [maintenanceTime,setMaintenanceTime]=React.useState("")
 if(index===0)return <TimePicker label="Choose a time" defaultValue="09:30" inline/>
 if(index===1)return <TimePicker label="Scheduled report" defaultValue="14:00" confirm/>
 if(index===2)return <TimePicker label="Type or select time" defaultValue="10:15"/>
 if(index===3)return <TimePicker label="Appointment" defaultValue="15:24:36" hourCycle={12} granularity="second" step={1}/>
 if(index===4)return <TimePicker label="Hourly schedule" defaultValue="09:00" granularity="hour"/>
 if(index===5)return <TimePicker label="Support hours" defaultValue="09:00" min="08:30" max="17:30" step={15}/>
 if(index===6)return <TimePicker label="Select a slot" defaultValue="09:30" disabledTimes={["10:00","10:30","11:00"]} step={30}/>
 if(index===7){const duration=Math.max(0,(Number(end.slice(0,2))*60+Number(end.slice(3,5)))-(Number(start.slice(0,2))*60+Number(start.slice(3,5))));return <div className="grid w-full max-w-md gap-3 sm:grid-cols-2"><TimePicker label="Start" value={start} onValueChange={v=>{setStart(v);if(v>=end){const [h,m]=v.split(":").map(Number);setEnd(`${String(Math.floor((h*60+m+30)/60)%24).padStart(2,"0")}:${String((m+30)%60).padStart(2,"0")}`)}}} max={end}/><TimePicker label="End" value={end} onValueChange={setEnd} min={start}/><p className="text-xs text-muted-foreground sm:col-span-2">Selected window: {start}–{end} · {Math.floor(duration/60)}h {duration%60}m</p></div>}
 if(index===8)return <TimePicker label="Deployment time" defaultValue="16:45" timeZone="PDT · UTC−07:00"/>
 if(index===9)return <TimePicker label="Confirm scheduled time" defaultValue="13:00" confirm/>
 if(index===10)return <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2"><TimePicker label="Time" defaultValue="09:30" locale="en-US"/><TimePicker label="Uhrzeit" defaultValue="14:30" locale="de-DE"/><TimePicker label="时间" defaultValue="09:30" locale="zh-CN"/><TimePicker label="الوقت" defaultValue="14:30" locale="ar-EG" hourCycle={12}/></div>
 if(index===11)return <form className="grid w-full max-w-sm gap-3" onInvalidCapture={()=>setSubmitted(true)} onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><TimePicker label="Maintenance window" value={maintenanceTime} onValueChange={setMaintenanceTime} min="00:00" max="06:00" invalid={submitted&&!maintenanceTime} required/><p className="text-xs text-muted-foreground">Choose a required time between 00:00 and 06:00.</p><div className="flex gap-2"><button className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">Save schedule</button><button type="reset" onClick={()=>{setMaintenanceTime("");setSubmitted(false)}} className="h-9 rounded-md border border-input px-3 text-sm">Reset</button></div>{submitted&&!maintenanceTime&&<span role="alert" className="text-xs text-destructive">Please choose an available time.</span>}{submitted&&maintenanceTime&&<span role="status" className="text-xs text-muted-foreground">Saved for {maintenanceTime}.</span>}</form>
 return <div className="grid w-full max-w-md gap-3"><label className="grid gap-1.5 text-sm font-medium">Release date<div className="flex h-9 items-center gap-2 rounded-md border border-input px-3"><IconCalendar className="size-4 text-muted-foreground"/><input aria-label="Release date" type="date" defaultValue="2026-11-12" className="flex-1 bg-transparent text-sm outline-none"/></div></label><TimePicker label="Release time" defaultValue="10:30" timeZone="UTC"/></div>
}
export default function TimePickerPage(){return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Time Picker"/><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">{examples.map((title,index)=><ComponentPreview key={title} title={title}><TimeDemo index={index}/></ComponentPreview>)}</div></div></AppShell>}
