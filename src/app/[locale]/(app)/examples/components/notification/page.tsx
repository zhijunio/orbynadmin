"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { Check as IconCheck, Info as IconInfoCircle, X as IconX } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { demoAvatarUrl } from "@/lib/demo-avatar";
import { getInitials } from "@/lib/text";

function NotificationsExample() {
  return (
    <>
      <ComponentPreview title="Notifications Style 1">
        <div className="flex w-full items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4"><IconCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" /><div className="min-w-0 flex-1"><p className="font-medium">Congratulations</p><p className="mt-1 text-sm text-muted-foreground">Your message sent successfully</p></div><Button variant="ghost" size="icon" className="-mr-2 -mt-2 shrink-0" aria-label="Dismiss notification"><IconX /></Button></div>
      </ComponentPreview>
      <ComponentPreview title="Notifications Style 2">
        <div className="flex w-full items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"><IconX className="mt-0.5 size-5 shrink-0 text-destructive" /><div className="min-w-0 flex-1"><p className="font-medium">Uh oh, something went wrong</p><p className="mt-1 text-sm text-muted-foreground">Sorry! There was a problem with your request</p></div><Button variant="ghost" size="icon" className="-mr-2 -mt-2 shrink-0" aria-label="Dismiss notification"><IconX /></Button></div>
      </ComponentPreview>
      <ComponentPreview title="Notifications Style 3" className="lg:col-span-2">
        <div className="flex w-full items-start gap-3 rounded-lg border bg-card p-4"><IconInfoCircle className="mt-0.5 size-5 shrink-0 text-primary" /><div className="min-w-0 flex-1"><p className="font-medium">New update available!</p><p className="mt-1 text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec ligula at dolor aliquam mollis.</p></div><div className="flex shrink-0 items-center gap-1"><Button size="sm">Update now</Button><Button variant="ghost" size="icon" aria-label="Dismiss notification"><IconX /></Button></div></div>
      </ComponentPreview>
      <ComponentPreview title="Notifications Style 4" className="lg:col-span-2">
        <div className="w-full divide-y rounded-lg border">{notifications.map((item) => <div key={item.name} className="flex items-center gap-3 p-4"><Avatar><AvatarImage src={item.avatar} alt={item.name} /><AvatarFallback>{getInitials(item.name)}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2"><p className="text-sm font-medium">{item.name}</p><span className="text-xs text-muted-foreground">{item.age}</span></div><p className="truncate text-sm text-muted-foreground">{item.message}</p></div><time className="shrink-0 text-xs text-muted-foreground">{item.date}</time></div>)}</div>
      </ComponentPreview>
    </>
  );
}

const notifications = [
  { name: "Dwayne Bero", avatar: demoAvatarUrl("Dwayne Bero"), message: "Project assigned by the manager", age: "3 months ago", date: "24, Nov 2027" },
  { name: "Talan Curtis", avatar: demoAvatarUrl("Talan Curtis"), message: "Approved date for sanction of loan is verified", age: "3 months ago", date: "24, Nov 2027" },
  { name: "Talan Rhiel Madsen", avatar: demoAvatarUrl("Talan Rhiel Madsen"), message: "Admin and other team accepted your work request", age: "3 months ago", date: "12, Jan 2027" },
  { name: "Charlie Botosh", avatar: demoAvatarUrl("Charlie Botosh"), message: "Temporarily your account has been suspended", age: "a year ago", date: "09, Dec 2026" },
  { name: "Jordyn Torff", avatar: demoAvatarUrl("Jordyn Torff"), message: "You have changed your password successfully", age: "a year ago", date: "30, Mar 2026" },
];

export default function NotificationsPage() {
  return <Showcase title="Notifications"><NotificationsExample /></Showcase>;
}
