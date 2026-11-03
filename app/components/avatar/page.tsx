import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { people } from "@/app/components/avatar/avatar-data";
import { IconUser } from "@tabler/icons-react";

export const metadata = { title: "Avatars" };

const avatarSizes = [
  { size: "xs", label: "Extra small · 24px" },
  { size: "sm", label: "Small · 32px" },
  { size: "default", label: "Default · 40px" },
  { size: "lg", label: "Large · 48px" },
  { size: "xl", label: "Extra large · 56px" },
] as const;

function DefaultAvatarsPreview() {
  const person = people[0];

  return (
    <div className="flex flex-wrap items-end gap-8 p-4">
      {avatarSizes.map(({ size, label }) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size} aria-label={person.name} role="img">
          <AvatarImage src={person.avatar} alt="" />
          <AvatarFallback>
            {person.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

function AvatarFallbacksPreview() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <div className="flex items-center gap-3">
        <Avatar aria-label="Morgan Chen" role="img">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground">Initials</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar aria-label="Morgan Chen" role="img">
          <AvatarFallback className="bg-primary/10 font-semibold text-primary">
            MC
          </AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground">Tinted initials</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar aria-label="User" role="img">
          <AvatarFallback className="bg-primary/10 text-primary">
            <IconUser aria-hidden="true" className="size-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground">Icon</span>
      </div>
    </div>
  );
}

function AvatarGroupPreview() {
  return (
    <div className="flex items-center gap-4 p-4">
      <AvatarGroup role="group" aria-label="Project team, 6 members">
        {people.slice(0, 4).map((person) => (
          <Avatar key={person.id} aria-label={person.name} role="img">
            <AvatarImage src={person.avatar} alt="" />
            <AvatarFallback>
              {person.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount aria-hidden="true">+2</AvatarGroupCount>
      </AvatarGroup>
      <span className="text-sm text-muted-foreground">4 shown · 6 members</span>
    </div>
  );
}

function AvatarIndicatorPreview({
  person,
  label,
  color,
}: {
  person: (typeof people)[number];
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-wrap items-end gap-8 p-4">
      {avatarSizes.map(({ size, label: sizeLabel }) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar
            size={size}
            role="img"
            aria-label={`${person.name}: ${label}, ${sizeLabel.toLowerCase()} size`}
          >
            <AvatarImage src={person.avatar} alt="" />
            <AvatarFallback>
              {person.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </AvatarFallback>
            <AvatarBadge aria-hidden="true" className={color} />
          </Avatar>
          <span className="text-xs text-muted-foreground">{sizeLabel}</span>
        </div>
      ))}
    </div>
  );
}

export default function AvatarsPage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5"><PageHeader title="Avatars" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <ComponentPreview title="Default Avatar">
          <DefaultAvatarsPreview />
        </ComponentPreview>
        <ComponentPreview title="Avatar Group">
          <AvatarGroupPreview />
        </ComponentPreview>
        <ComponentPreview title="Avatar with Online Indicator">
          <AvatarIndicatorPreview person={people[0]} label="Online" color="bg-emerald-500" />
        </ComponentPreview>
        <ComponentPreview title="Avatar with Offline Indicator">
          <AvatarIndicatorPreview person={people[1]} label="Offline" color="bg-muted-foreground" />
        </ComponentPreview>
        <ComponentPreview title="Avatar with Busy Indicator">
          <AvatarIndicatorPreview person={people[2]} label="Busy" color="bg-rose-500" />
        </ComponentPreview>
        <ComponentPreview title="Avatar Fallbacks">
          <AvatarFallbacksPreview />
        </ComponentPreview>
      </div></div>
    </ConsoleLayout>
  );
}
