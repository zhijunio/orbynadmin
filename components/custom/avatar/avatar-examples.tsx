"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { IconCheck, IconPlus, IconSelector, IconUser, IconRosetteDiscountCheck, IconLoader2 } from "@tabler/icons-react";
import { people } from "@/app/components/avatar/avatar-data";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown/dropdown-menu";
import { cn } from "@/utils/cn";
function PersonAvatar({ person = people[0], fallbackOnly, imageClassName, children, className, ...props }: ComponentProps<typeof Avatar> & { person?: typeof people[number]; fallbackOnly?: boolean; imageClassName?: string; children?: ReactNode }) {
  return <Avatar role="img" aria-label={person.name} className={className} {...props}>{!fallbackOnly && <AvatarImage src={person.avatar} alt="" className={imageClassName} />}<AvatarFallback className={cn(imageClassName, "text-inherit")}>{person.name.split(" ").map(part => part[0]).join("")}</AvatarFallback>{children}</Avatar>;
}

function PeopleGroup({ example }: { example: number }) {
  const interactive = [22, 23, 24].includes(example);
  const group = <AvatarGroup aria-label={"Project team"} className={cn(interactive && "hover:space-x-1 focus-within:space-x-1 motion-safe:transition-all")}>
    {people.slice(0, 4).map((person, index) => {
      const avatar = <PersonAvatar person={person} fallbackOnly={example === 21} imageClassName={example === 28 ? "grayscale" : undefined}>{example === 18 && index === 0 && <AvatarBadge className="bg-primary" aria-label={"Online"} />}</PersonAvatar>;
      return interactive ? <Tooltip key={person.id}><TooltipTrigger asChild><button type="button" aria-label={person.name} className="relative rounded-full focus-visible:outline-2 focus-visible:outline-ring hover:z-10 focus-visible:z-10 motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1">{avatar}</button></TooltipTrigger>{example !== 23 && <TooltipContent>{person.name}</TooltipContent>}</Tooltip> : <span key={person.id} className="rounded-full ring-2 ring-background">{avatar}</span>;
    })}
    {[11, 12, 29].includes(example) && <AvatarGroupCount>{example === 12 ? <IconPlus aria-label={"More members"} /> : "+5"}</AvatarGroupCount>}
  </AvatarGroup>;
  if ([20,21,25].includes(example)) return <div className={cn("flex flex-wrap items-center gap-3 border p-2", example === 21 ? "rounded-lg" : "rounded-full")}>{group}<span className="text-xs text-muted-foreground">{example === 25 ? "+3" : (example === 20 ? "Trusted by 100K+ users" : "Joined by 500+ developers")}</span></div>;
  return group;
}

export function AvatarExample({ example }: { example: number }) {
  const haloGradientId = useId();
  const [loading, setLoading] = useState(false);
  const [invited, setInvited] = useState(false);
  const [action, setAction] = useState("");
  if ([10,11,12,18,20,21,22,23,24,25].includes(example)) return <PeopleGroup example={example} />;
  if ([3,5].includes(example)) return <div className="flex flex-wrap items-end gap-5">{(["xs","sm","default","lg","xl"] as const).map((size,index) => <PersonAvatar key={size} size={size} className={example === 5 ? ["size-5","size-9","size-14","size-18","size-24"][index] : undefined} />)}</div>;
  if (example === 4) return <div className="flex gap-4">{["rounded-none after:rounded-none","rounded-md after:rounded-md","rounded-xl after:rounded-xl","rounded-full"].map(radius => <PersonAvatar key={radius} className={radius} imageClassName={radius.split(" ")[0]} />)}</div>;
  if ([8,9,31].includes(example)) return <div className="flex gap-6">{["top-0 right-0","top-auto bottom-0 right-0","right-auto top-0 left-0","top-auto right-auto bottom-0 left-0"].map((position,index) => <PersonAvatar key={position} person={people[index]} size="lg" className={example === 9 ? "rounded-md after:rounded-md" : undefined} imageClassName={example === 9 ? "rounded-md" : undefined}><AvatarBadge className={cn(position, example === 31 ? "size-4! bg-background text-primary" : "bg-primary")} aria-label={(example === 31 ? "Verified" : "Online")}>{example === 31 && <IconRosetteDiscountCheck className="size-4!" />}</AvatarBadge></PersonAvatar>)}</div>;
  if ([2,14,15].includes(example)) return <div className="flex gap-4">{people.slice(0,3).map((person,index) => <PersonAvatar key={person.id} person={person} fallbackOnly className={cn(example === 14 && ["text-primary [&>[data-slot=avatar-fallback]]:bg-primary/10","text-primary [&>[data-slot=avatar-fallback]]:bg-primary/10","text-destructive [&>[data-slot=avatar-fallback]]:bg-destructive/10"][index], example === 15 && "text-primary-foreground [&>[data-slot=avatar-fallback]]:bg-primary")} />)}{example === 2 && <Avatar aria-label={"User"}><AvatarFallback><IconUser className="size-4" /></AvatarFallback></Avatar>}</div>;
  if ([19,26,27].includes(example)) return <Button variant={example === 27 ? "default" : "outline"} size="sm" className={example === 19 ? undefined : "rounded-full"} onClick={() => setAction(people[0].name)}><PersonAvatar size="xs" />{action || people[0].name}</Button>;
  if (example === 16) return <div className="flex items-center gap-3"><PersonAvatar size="lg"><AvatarBadge aria-label={"Online"} className="bg-primary" /></PersonAvatar><div><p className="text-sm font-medium">{people[0].name}</p><p className="text-xs text-muted-foreground">{"Product designer"}</p></div><span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{"Pro"}</span></div>;
  if ([28,29].includes(example)) return <div className={cn("flex items-center gap-3",example === 28 && "flex-col text-center")}><PeopleGroup example={example} />{example === 28 && <div><p className="text-sm font-medium">{"No active collaborators"}</p><p className="text-xs text-muted-foreground">{"Invite teammates to start working together."}</p></div>}<Button variant="outline" size={example === 29 ? "icon" : "sm"} aria-label={"Invite teammate"} disabled={invited} onClick={() => setInvited(true)}>{invited ? <IconCheck aria-hidden /> : <IconPlus aria-hidden />}{example === 28 && ((invited ? "Invitation sent" : "Invite teammate"))}</Button><span role="status" className={example === 29 ? "sr-only" : "hidden"}>{invited && "Invitation sent"}</span></div>;
  if (example === 30) return <div className="flex items-center gap-4"><div className="relative" aria-busy={loading}><PersonAvatar size="lg" />{loading && <span className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80"><IconLoader2 className="size-5 motion-safe:animate-spin" aria-label={"Loading avatar"} /></span>}</div><Button variant="outline" size="sm" onClick={() => setLoading(!loading)}>{(loading ? "Finish loading" : "Load avatar")}</Button></div>;
  if (example === 33)
    return (
      <div className="group relative inline-flex size-[3.25rem] items-center justify-center">
        <svg
          aria-hidden
          className="avatar-catalog-halo-ring pointer-events-none absolute inset-0 size-full"
          viewBox="0 0 52 52"
        >
          <defs>
            <linearGradient id={haloGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>
          <circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke={`url(#${haloGradientId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="100 50"
          />
        </svg>
        <PersonAvatar
          size="lg"
          className="relative z-10 bg-background motion-safe:transition-transform motion-safe:group-hover:scale-95"
        />
      </div>
    );
  if (example === 35) return <div className="space-y-2"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="rounded-full"><PersonAvatar size="xs" />{people[0].name}<IconSelector aria-hidden /></Button></DropdownMenuTrigger><DropdownMenuContent align="start"><DropdownMenuLabel>{"Management"}</DropdownMenuLabel>{[{ id: "profile", label: "Profile" }, { id: "settings", label: "Settings" }, { id: "team", label: "Project team" }, { id: "invite", label: "Invite teammate" }].map(({ id, label }) => <DropdownMenuItem key={id} onSelect={() => setAction(label)}>{label}</DropdownMenuItem>)}<DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onSelect={() => setAction("Log out")}>{"Log out"}</DropdownMenuItem></DropdownMenuContent></DropdownMenu><p role="status" className="text-xs text-muted-foreground">{action}</p></div>;
  return <PersonAvatar size="lg" imageClassName={example === 17 ? "grayscale" : undefined} className={cn(example === 13 && "ring-2 ring-primary ring-offset-2 ring-offset-background", example === 32 && "ring-2 ring-primary ring-offset-2 ring-offset-background motion-safe:animate-pulse")}>
    {[6,7,32,34].includes(example) && <AvatarBadge className="bg-primary" aria-label={(example === 7 ? "Verified" : "Online")}>{example === 7 && <IconCheck aria-hidden />}</AvatarBadge>}
    {example === 34 && <span aria-label={`${3} unread notifications`} className="absolute -bottom-1 -left-1 flex size-5 items-center justify-center rounded-full border-2 border-background bg-destructive text-xs text-white">3</span>}
  </PersonAvatar>;
}
