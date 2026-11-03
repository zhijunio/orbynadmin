import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Badge } from "@/components/ui/badges/badge";
import { StatusDot } from "@/components/ui/badges/status-dot";
import { IconArrowRight, IconArrowUp, IconCheck } from "@tabler/icons-react";

export const metadata = { title: "Badges" };

const tones = [
  { label: "Primary", light: "bg-primary/10 text-primary", solid: "bg-primary text-primary-foreground" },
  { label: "Success", light: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", solid: "bg-emerald-600 text-white" },
  { label: "Error", light: "bg-rose-500/10 text-rose-700 dark:text-rose-400", solid: "bg-rose-600 text-white" },
  { label: "Warning", light: "bg-amber-500/10 text-amber-800 dark:text-amber-400", solid: "bg-amber-500 text-white" },
  { label: "Info", light: "bg-sky-500/10 text-sky-700 dark:text-sky-400", solid: "bg-sky-600 text-white" },
  { label: "Light", light: "bg-muted text-foreground", solid: "bg-muted-foreground text-background" },
  { label: "Dark", light: "bg-foreground/10 text-foreground", solid: "bg-foreground text-background" },
];

function ToneBadges({
  appearance,
  icon,
}: {
  appearance: "light" | "solid";
  icon?: "leading" | "trailing";
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {tones.map((tone) => (
        <Badge
          key={tone.label}
          className={tone[appearance]}
        >
          {icon === "leading" && <IconCheck aria-hidden="true" data-icon="inline-start" />}
          {tone.label}
          {icon === "trailing" && <IconCheck aria-hidden="true" data-icon="inline-end" />}
        </Badge>
      ))}
    </div>
  );
}

function BadgeExamples() {
  return (
    <>
      <ComponentPreview title="With Light Background">
        <ToneBadges appearance="light" />
      </ComponentPreview>
      <ComponentPreview title="With Solid Background">
        <ToneBadges appearance="solid" />
      </ComponentPreview>
      <ComponentPreview title="Light Background with Leading Icon">
        <ToneBadges appearance="light" icon="leading" />
      </ComponentPreview>
      <ComponentPreview title="Solid Background with Trailing Icon">
        <ToneBadges appearance="solid" icon="trailing" />
      </ComponentPreview>
      <ComponentPreview title="Badges with Leading and Trailing Icons">
        <div className="flex flex-wrap items-center gap-3">
          <Badge><IconCheck aria-hidden="true" data-icon="inline-start" />Approved</Badge>
          <Badge variant="secondary"><IconCheck aria-hidden="true" data-icon="inline-start" />Verified</Badge>
          <Badge variant="outline">View details<IconArrowRight aria-hidden="true" data-icon="inline-end" /></Badge>
          <Badge variant="destructive">Needs review<IconArrowRight aria-hidden="true" data-icon="inline-end" /></Badge>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Neutral and Subtle Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">Neutral</Badge>
          <Badge variant="ghost">Subtle</Badge>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Count Badges">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 text-sm">
            Notifications
            <Badge variant="secondary" className="min-w-5 justify-center rounded-full px-1.5">
              <span className="sr-only">Unread: </span>91
            </Badge>
          </span>
          <span className="inline-flex items-center gap-2 text-sm">
            Tasks
            <Badge className="min-w-5 justify-center rounded-full px-1.5">5</Badge>
          </span>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Status Dots">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2"><StatusDot color="success" />Operational</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="warning" />Needs attention</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="error" />Unavailable</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="info" />In progress</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="neutral" />Unknown</span>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Trend Badges">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Weekly sign-ins</span>
          <Badge variant="secondary" className="gap-1 text-emerald-700 dark:text-emerald-400">
            <IconArrowUp aria-hidden="true" data-icon="inline-start" />14.8%
          </Badge>
        </div>
      </ComponentPreview>
    </>
  );
}

export default function BadgePage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5"><PageHeader title="Badges" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <BadgeExamples />
      </div></div>
    </ConsoleLayout>
  );
}
