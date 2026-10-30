import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Showcase } from "@/components/feature/example/Showcase";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";

import { User as IconUser } from "lucide-react";
import { demoAvatarUrl } from "@/lib/demo-avatar";

function AvatarFallbacksPreview() {
  return (
    <div className="flex w-full items-center gap-8 p-4">
      <Avatar size="lg"><AvatarFallback className="bg-primary/10 font-semibold text-primary">AT</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback className="bg-primary/10 text-primary"><IconUser className="size-5" /></AvatarFallback></Avatar>
    </div>
  );
}

function AvatarGroupPreview() {
  return (
    <div className="flex w-full flex-wrap items-center gap-10 p-4">
      <AvatarGroup>{people.map((person) => <Avatar size="lg" key={person.name}><AvatarImage src={person.src} alt={person.name} /><AvatarFallback>{person.fallback}</AvatarFallback></Avatar>)}</AvatarGroup>
      <AvatarGroup>{people.map((person) => <Avatar size="lg" key={person.name}><AvatarImage src={person.src} alt={person.name} /><AvatarFallback>{person.fallback}</AvatarFallback></Avatar>)}<AvatarGroupCount>5+</AvatarGroupCount></AvatarGroup>
    </div>
  );
}

const people = [
  { name: "Alex Rodriguez", src: demoAvatarUrl("Alex Rodriguez"), fallback: "AR" },
  { name: "Emily Johnson", src: demoAvatarUrl("Emily Johnson"), fallback: "EJ" },
  { name: "Michael Brown", src: demoAvatarUrl("Michael Brown"), fallback: "MB" },
  { name: "Sarah Wilson", src: demoAvatarUrl("Sarah Wilson"), fallback: "SW" },
  { name: "Noah Novak", src: demoAvatarUrl("Noah Novak"), fallback: "NN" },
  { name: "Sophia Fischer", src: demoAvatarUrl("Sophia Fischer"), fallback: "SF" },
];

function AvatarSizesPreview() {
  return (
    <div className="flex w-full items-center justify-center gap-10 overflow-x-auto p-4">
      {avatarSizes.map((member) => (
        <Avatar key={member.id} size={member.size === "xs" || member.size === "sm" ? "sm" : member.size === "xxl" ? "lg" : "default"} className={member.size === "xs" ? "size-5" : member.size === "md" ? "size-9" : member.size === "xl" ? "size-12" : member.size === "xxl" ? "size-14" : undefined}>
          <AvatarImage src={member.src} alt={member.alt} />
          <AvatarFallback>{member.fallback}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

function AvatarStatusPreview({ status }: { status: "online" | "offline" | "busy" }) {
  const statusClass = status === "online" ? "bg-emerald-500" : status === "busy" ? "bg-rose-500" : "bg-muted-foreground";
  return <div className="flex w-full min-w-max items-center justify-center gap-5 overflow-x-auto p-4 sm:gap-7">{avatarSizes.map((member) => <Avatar key={`${status}-${member.id}`} size={member.size === "xs" || member.size === "sm" ? "sm" : member.size === "xxl" ? "lg" : "default"} className={member.size === "xs" ? "size-5" : member.size === "md" ? "size-9" : member.size === "xl" ? "size-12" : member.size === "xxl" ? "size-14" : undefined}><AvatarImage src={member.src} alt={member.alt} /><AvatarFallback>{member.fallback}</AvatarFallback><AvatarBadge className={statusClass} /></Avatar>)}</div>;
}

function AvatarVariantsPreview() {
  return (
    <div className="flex w-full flex-nowrap items-center gap-5 overflow-x-auto p-4">
      <Avatar size="lg" className="bg-primary/10 text-primary"><AvatarFallback className="bg-primary/10 font-semibold text-primary">JS</AvatarFallback></Avatar>
      <div className="flex items-center gap-3">
        <Avatar size="lg"><AvatarImage src={demoAvatarUrl("John Doe")} alt="John Doe" /><AvatarFallback>JD</AvatarFallback></Avatar>
        <div><p className="text-sm font-medium">John Doe</p><p className="text-xs text-muted-foreground">Software Engineer</p></div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="lg"><AvatarImage src={demoAvatarUrl("John Doe")} alt="John Doe" /><AvatarFallback>JD</AvatarFallback><AvatarBadge className="bg-emerald-500" /></Avatar>
        <div><p className="text-sm font-medium">John Doe</p><p className="text-xs text-muted-foreground">Software Engineer</p></div>
      </div>
    </div>
  );
}

const avatarSizes = [
  { id: 1, src: demoAvatarUrl("John Smith"), alt: "John Smith", fallback: "JS", size: "xs" },
  { id: 2, src: demoAvatarUrl("John Smith"), alt: "John Smith", fallback: "JS", size: "sm" },
  { id: 3, src: demoAvatarUrl("John Smith"), alt: "John Smith", fallback: "JS", size: "md" },
  { id: 4, src: demoAvatarUrl("John Smith"), alt: "John Smith", fallback: "JS", size: "lg" },
  { id: 5, src: demoAvatarUrl("John Smith"), alt: "John Smith", fallback: "JS", size: "xl" },
  { id: 6, src: demoAvatarUrl("John Smith"), alt: "John Smith", fallback: "JS", size: "xxl" },
] as const;

export const metadata = { title: "Avatars" };

export default function AvatarsPage() {
  return (
    <Showcase title="Avatars">
      <ComponentPreview title="Avatars Variants"><AvatarVariantsPreview /></ComponentPreview>
      <ComponentPreview title="Avatars Fallback Styles"><AvatarFallbacksPreview /></ComponentPreview>
      <ComponentPreview title="Avatar with online indicator"><AvatarStatusPreview status="online" /></ComponentPreview>
      <ComponentPreview title="Avatar with Offline indicator"><AvatarStatusPreview status="offline" /></ComponentPreview>
      <ComponentPreview title="Avatar with busy indicator"><AvatarStatusPreview status="busy" /></ComponentPreview>
      <ComponentPreview title="Avatar Sizes"><AvatarSizesPreview /></ComponentPreview>
      <ComponentPreview title="Avatars Group"><AvatarGroupPreview /></ComponentPreview>
    </Showcase>
  );
}
