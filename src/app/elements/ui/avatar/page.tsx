import ConsoleLayout from "@/components/application/app-shell/console-layout";

export const metadata = { title: "Avatars" };




import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/base/avatar/avatar";

import { IconUser as IconUser } from "@tabler/icons-react";
import { demoAvatarUrl } from "@/utils/demo-avatar";

function AvatarFallbacksPreview() {
  return <div className="flex w-full flex-wrap items-center gap-6 p-4">
      <div className="flex items-center gap-3">
        <Avatar><AvatarFallback>MC</AvatarFallback></Avatar>
        <span className="text-sm text-muted-foreground">Neutral initials</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar><AvatarFallback className="bg-primary/10 font-semibold text-primary">MC</AvatarFallback></Avatar>
        <span className="text-sm text-muted-foreground">Primary tint</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar><AvatarFallback className="bg-primary/10 text-primary"><IconUser className="size-4" /></AvatarFallback></Avatar>
        <span className="text-sm text-muted-foreground">Icon fallback</span>
      </div>
    </div>;
}

function AvatarGroupPreview() {
  return <div className="flex w-full flex-wrap items-center gap-10 p-4">
      <AvatarGroup>{people.map((person) => <Avatar size="lg" key={person.name}><AvatarImage src={person.src} alt={person.name} /><AvatarFallback>{person.fallback}</AvatarFallback></Avatar>)}</AvatarGroup>
      <AvatarGroup>{people.map((person) => <Avatar size="lg" key={person.name}><AvatarImage src={person.src} alt={person.name} /><AvatarFallback>{person.fallback}</AvatarFallback></Avatar>)}<AvatarGroupCount>5+</AvatarGroupCount></AvatarGroup>
    </div>;
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
  return <div className="flex w-full flex-wrap items-end justify-center gap-8 p-4">
      {([
        { size: "sm", label: "Small · 24px" },
        { size: "default", label: "Default · 32px" },
        { size: "lg", label: "Large · 40px" },
      ] as const).map(({ size, label }) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <AvatarImage src={demoAvatarUrl("John Smith")} alt="John Smith" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>;
}

function AvatarStatusPreview() {
  const statuses = [
    { label: "Online", name: "Alex Morgan", color: "bg-emerald-500" },
    { label: "Offline", name: "Priya Nair", color: "bg-muted-foreground" },
    { label: "Busy", name: "Marcus Chen", color: "bg-rose-500" },
  ];

  return <div className="flex w-full flex-wrap items-center gap-x-8 gap-y-4 p-4">
      {statuses.map((status) => (
        <div key={status.label} className="flex items-center gap-3">
          <Avatar role="img" aria-label={`${status.name}: ${status.label}`}>
            <AvatarFallback>{status.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback>
            <AvatarBadge className={status.color} />
          </Avatar>
          <span className="text-sm">{status.label}</span>
        </div>
      ))}
    </div>;
}

function AvatarVariantsPreview() {
  return <div className="flex w-full flex-nowrap items-center gap-5 overflow-x-auto p-4">
      <Avatar size="lg" className="bg-primary/10 text-primary"><AvatarFallback className="bg-primary/10 font-semibold text-primary">JS</AvatarFallback></Avatar>
      <div className="flex items-center gap-3">
        <Avatar size="lg"><AvatarImage src={demoAvatarUrl("John Doe")} alt="John Doe" /><AvatarFallback>JD</AvatarFallback></Avatar>
        <div><p className="text-sm font-medium">John Doe</p><p className="text-xs text-muted-foreground">Software Engineer</p></div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="lg"><AvatarImage src={demoAvatarUrl("John Doe")} alt="John Doe" /><AvatarFallback>JD</AvatarFallback><AvatarBadge className="bg-emerald-500" /></Avatar>
        <div><p className="text-sm font-medium">John Doe</p><p className="text-xs text-muted-foreground">Software Engineer</p></div>
      </div>
    </div>;
}



export default function AvatarsPage() {
  return <ConsoleLayout>{<Showcase title="Avatars">
      <ComponentPreview title="Avatars Variants"><AvatarVariantsPreview /></ComponentPreview>
      <ComponentPreview title="Avatars Fallback Styles"><AvatarFallbacksPreview /></ComponentPreview>
      <ComponentPreview title="Avatar Status Indicators"><AvatarStatusPreview /></ComponentPreview>
      <ComponentPreview title="Supported Sizes"><AvatarSizesPreview /></ComponentPreview>
      <ComponentPreview title="Avatars Group"><AvatarGroupPreview /></ComponentPreview>
    </Showcase>}</ConsoleLayout>;
}
