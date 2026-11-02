"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { IconCheck as Check, IconRocket as Rocket, IconSparkles as Sparkles } from "@tabler/icons-react";
import { toast } from "sonner";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Announcement } from "@/components/base/announcement/announcement";
import { Button } from "@/components/base/buttons/button";

function AnnouncementExamples() {
  const [showSetup, setShowSetup] = useState(true);

  return <>
      <ComponentPreview title="Onboarding">
        <div className="w-full max-w-sm space-y-3">
          {showSetup ? (
            <Announcement
              icon={<Sparkles aria-hidden="true" className="size-4" />}
              title="Set up your workspace"
              description="Invite your team and choose the tools you use every day."
              actionLabel="Start setup"
              dismissible
              onDismiss={() => setShowSetup(false)}
              onAction={() => toast.success("Workspace setup started")}
            />
          ) : (
            <Button type="button" variant="outline" onClick={() => setShowSetup(true)}>
              Restore announcement
            </Button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom Content">
        <div className="w-full max-w-sm space-y-3">
          <Announcement
            icon={<Rocket aria-hidden="true" className="size-4" />}
            title="What's new in v2"
            description="Saved views and bulk actions are now available."
            actionLabel="See the changelog"
            onAction={() => toast.success("Changelog opened")}
          />
          <Announcement
            icon={<Check aria-hidden="true" className="size-4" />}
            title="Your workspace is ready"
          />
        </div>
      </ComponentPreview>
    </>;
}

export default function AnnouncementPage() {
  return <ConsoleLayout>{<Showcase title="Announcement">
      <AnnouncementExamples />
    </Showcase>}</ConsoleLayout>;
}
