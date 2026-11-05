"use client";

import { useState } from "react";
import { IconCheck, IconFile } from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress/progress";
import { Slider } from "@/components/ui/slider/slider";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/utils/cn";
export function ProgressExample({ example }: { example: number }) {
  const [value,setValue]=useState(40);
  const [step,setStep]=useState(1);
  if (example===5) return <div className="w-full space-y-4">{[45,78,12,100].map((progress,index)=><div key={index} className="space-y-2"><div className="flex items-center justify-between gap-2 text-xs"><span className="flex items-center gap-2"><IconFile className="size-4" aria-hidden />{["document.pdf","presentation.pptx","spreadsheet.xlsx","image.jpg"][index]}</span><span>{progress===100 ? "Complete" : `${progress}%`}</span></div><Progress value={progress} aria-label={`File ${index+1} upload`} /></div>)}</div>;
  if (example===6) return <div className="w-full space-y-4"><Progress value={value} aria-label={"Progress"} /><Slider label={"Adjust progress"} value={value} onValueChange={setValue} /><output className="text-sm tabular-nums">{value}%</output></div>;
  if (example===7) return <div className="w-full space-y-4"><ol className="flex justify-between gap-2">{["Plan","Build","Review","Done"].map((label,index)=><li key={label} aria-current={step===index ? "step" : undefined} className={cn("text-xs text-muted-foreground",index<=step && "font-medium text-foreground")}><span className="mb-2 flex size-6 items-center justify-center rounded-full border">{index<step ? <IconCheck aria-hidden className="size-3" /> : index+1}</span>{label}</li>)}</ol><Progress value={step*100/3} aria-label={"Progress"} /><div className="flex gap-2"><Button variant="outline" size="sm" disabled={step===0} onClick={()=>setStep(step-1)}>{"Previous"}</Button><Button size="sm" disabled={step===3} onClick={()=>setStep(step+1)}>{"Next"}</Button></div></div>;
  if (example===8) return <div className="w-full space-y-4">{["[&>[data-slot=progress-indicator]]:bg-primary","[&>[data-slot=progress-indicator]]:bg-success","[&>[data-slot=progress-indicator]]:bg-destructive"].map((color,index)=><Progress key={color} value={40+index*20} className={cn("h-2",color)} aria-label={"Progress"} />)}</div>;
  return <div className="w-full space-y-2">{example===4 && <div className="flex justify-between text-xs"><span>{"Processing files"}</span><span>55%</span></div>}<Progress value={55} aria-label={"Progress"} className={cn(example===2 ? "h-1" : example===3 ? "h-3" : "h-2")} />{example===4 && <p className="text-xs text-muted-foreground">{"About 2 minutes remaining"}</p>}</div>;
}
