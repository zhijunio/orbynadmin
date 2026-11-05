"use client";

import { useId, useState } from "react";
import { IconEye, IconEyeOff, IconInfoCircle, IconLink } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Progress } from "@/components/ui/progress/progress";
import { PhoneInput } from "@/components/ui/phone-input/phone-input";
export function InputReferenceExamples() {const id=useId();const [text,setText]=useState("");const [password,setPassword]=useState("");const [visible,setVisible]=useState(false);const [phone,setPhone]=useState<string>();const [counter,setCounter]=useState("");const [sent,setSent]=useState(false);
  const preview=(_number:number,children:React.ReactNode)=><div className="min-w-0 w-full">{children}</div>;
  const section=(title:string,children:React.ReactNode,fullWidth=false)=><ComponentPreview title={title} className={fullWidth ? "xl:col-span-2" : undefined} previewClassName="grid gap-4 xl:grid-cols-2">{children}</ComponentPreview>;
  const labeled=(number:number,kind:"date"|"file"|"time",label:string,props:React.ComponentProps<typeof Input>={})=>preview(number,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-${number}`}>{label}</Label><Input id={`${id}-${number}`} type={kind} {...props} /></div>);
  return <>
    {section("Field", <>
    {preview(1,<Input aria-label={"Full name"} placeholder={"Enter your name"} className="max-w-sm" />)}
    {preview(2,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-name`}>{"Full name"}</Label><Input id={`${id}-name`} placeholder={"Enter your name"} /></div>)}
    {preview(3,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-description`}>{"Email address"}</Label><Input id={`${id}-description`} type="email" /><p className="text-xs text-muted-foreground">{"Use your work email address."}</p></div>)}
    {preview(20,<div className="grid w-full max-w-lg gap-2 sm:grid-cols-[auto_1fr] sm:items-center"><Label htmlFor={`${id}-horizontal`}>{"Email address"}</Label><Input id={`${id}-horizontal`} type="email" /></div>)}
    </>)}
    {section("States", <>
    {preview(4,<Input disabled aria-label={"Full name"} value={"This field is disabled"} className="max-w-sm" />)}
    {preview(5,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-error`}>{"Email address"}</Label><Input id={`${id}-error`} value="alex@" aria-invalid="true" readOnly /><p className="text-xs text-destructive">{"Enter a valid email address."}</p></div>)}
    {preview(13,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-required`}>{"Full name"} <span className="text-destructive" aria-hidden>*</span></Label><Input id={`${id}-required`} required aria-required="true" placeholder={"Enter your name"} /></div>)}
    {preview(21,<form className="grid w-full max-w-sm gap-2" onSubmit={event=>event.preventDefault()}><Label htmlFor={`${id}-multi`}>{"Contact us"}</Label><Input id={`${id}-multi`} type="email" aria-invalid="true" /><p className="text-xs text-destructive">{"Enter a valid email address."}</p><p className="text-xs text-destructive">{"Email is required."}</p></form>)}
    </>)}
    {section("Types", <>
    {preview(7,<div className="relative w-full max-w-sm"><Input type={visible ? "text" : "password"} defaultValue="WorkspacePass123" autoComplete="new-password" aria-label={"Password"} className="pr-10" /><Button type="button" variant="ghost" size="icon" aria-label={"Toggle password visibility"} onClick={()=>setVisible(!visible)} className="absolute right-1 top-1/2 size-7 -translate-y-1/2">{visible ? <IconEyeOff /> : <IconEye />}</Button></div>)}
    {preview(8,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-phone`}>{"Phone number"}</Label><PhoneInput inputProps={{ id: `${id}-phone`, "aria-label": "Phone number" }} value={phone} onValueChange={setPhone} /></div>)}
    {preview(9,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-url`}>{"Website"}</Label><Input id={`${id}-url`} type="url" placeholder="https://example.com" /></div>)}
    {preview(10,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-number`}>{"Quantity"}</Label><Input id={`${id}-number`} type="number" min={0} max={99} defaultValue={3} /></div>)}
    {labeled(11,"date","Date")} {labeled(12,"file","File")} {labeled(14,"time","Time")}
    {preview(28,<div className="flex w-full max-w-sm flex-col gap-2"><Label htmlFor={`${id}-color`}>{"Brand color"}</Label><Input id={`${id}-color`} type="color" defaultValue="#2563eb" className="p-1" /></div>)}
    {preview(29,<label className="grid w-full max-w-sm gap-2 text-sm">{"Volume"}<input aria-label={"Volume"} type="range" min="0" max="100" value={Number(text)||50} onChange={event=>setText(event.target.value)} className="w-full accent-primary" /><output>{text||50}%</output></label>)}
    </>)}
    {section("Label", <>
    {preview(16,<div className="flex w-full max-w-sm items-center gap-2"><Label htmlFor={`${id}-help`}>{"Email address"}</Label><span title={"Use your work email address."}><IconInfoCircle aria-label={"Use your work email address."} className="size-4 text-muted-foreground" /></span><Input id={`${id}-help`} type="email" /></div>)}
    {preview(17,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-team`} className="flex items-center gap-2">{"Workspace name"}<Badge variant="secondary">{"Required"}</Badge></Label><Input id={`${id}-team`} /></div>)}
    {preview(18,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-optional`} className="flex items-center gap-2">{"Phone number"}<Badge variant="outline">{"Optional"}</Badge></Label><Input id={`${id}-optional`} type="tel" /></div>)}
    {preview(19,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-share`}>{"Private link"}</Label><div className="flex gap-2"><Input id={`${id}-share`} type={visible ? "text" : "password"} defaultValue="workspace.example/link" /><Button variant="outline" size="icon" aria-label={"Toggle password visibility"} onClick={()=>setVisible(!visible)}>{visible ? <IconEyeOff /> : <IconEye />}</Button><Button variant="outline" size="icon" aria-label={"Open link"}><IconLink /></Button></div></div>)}
    </>)}
    {section("Feedback", <>
    {preview(6,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-counter`}>{"Message"}</Label><Input id={`${id}-counter`} maxLength={80} value={counter} onChange={event=>setCounter(event.target.value)} /><output className="text-right text-xs text-muted-foreground">{counter.length}/80</output></div>)}
    {preview(22,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-strength`}>{"Password"}</Label><Input id={`${id}-strength`} type="password" value={password} onChange={event=>setPassword(event.target.value)} autoComplete="new-password" /><p aria-live="polite" className="text-xs text-muted-foreground">{(password.length<8 ? "Add more characters for a stronger password." : (password.length<12 ? "Good start. Add a few more characters." : "Strong password length."))}</p></div>)}
    {preview(23,<div className="grid w-full max-w-sm gap-2"><Label htmlFor={`${id}-meter`}>{"Password"}</Label><Input id={`${id}-meter`} type="password" value={password} onChange={event=>setPassword(event.target.value)} autoComplete="new-password" /><Progress value={Math.min(100,password.length*8)} aria-label={"Password strength"} /><p className="text-xs text-muted-foreground">{"Use a mix of characters and at least 12 characters."}</p></div>)}
    </>)}
    {section("Form", <>
    {preview(15,<form className="grid w-full max-w-lg gap-3" onSubmit={event=>{event.preventDefault();setSent(true);}}><div className="grid gap-2 sm:grid-cols-2"><Label className="grid gap-1">{"Full name"}<Input required /></Label><Label className="grid gap-1">{"Email address"}<Input type="email" required /></Label></div><Label className="grid gap-1">{"Subject"}<Input required /></Label><Button className="w-fit" type="submit">{"Send message"}</Button>{sent && <p role="status" className="text-sm text-muted-foreground">{"Message sent."}</p>}</form>)}
    </>, true)}
    {section("Appearance", <>
    {preview(24,<div className="w-full max-w-sm space-y-2"><Label htmlFor={`${id}-pulse`}>{"Search"}</Label><Input id={`${id}-pulse`} placeholder={"Search the workspace"} className="bg-muted motion-safe:animate-pulse" /></div>)}
    {preview(25,<div className="w-full max-w-sm space-y-2"><Label htmlFor={`${id}-focus`}>{"Search"}</Label><Input id={`${id}-focus`} placeholder={"Search the workspace"} className="focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" /></div>)}
    {preview(26,<div className="w-full max-w-sm space-y-2"><Label htmlFor={`${id}-subtle`}>{"Search"}</Label><Input id={`${id}-subtle`} placeholder={"Search the workspace"} className="bg-muted/50" /></div>)}
    {preview(27,<div className="w-full max-w-sm space-y-2"><Label htmlFor={`${id}-border`}>{"Search"}</Label><Input id={`${id}-border`} placeholder={"Search the workspace"} className="rounded-none border-x-0 border-t-0 shadow-none focus-visible:ring-0" /></div>)}
    {preview(30,<div className="w-full max-w-sm rounded-full border"><Input aria-label={"Search"} placeholder={"Search the workspace"} className="rounded-full border-0 bg-transparent shadow-none" /></div>)}
    {preview(31,<div className="w-full max-w-sm"><Input aria-label={"Search"} placeholder={"Search the workspace"} className="border-0 bg-transparent shadow-none focus-visible:ring-0" /></div>)}
    </>, true)}
  </>;
}
