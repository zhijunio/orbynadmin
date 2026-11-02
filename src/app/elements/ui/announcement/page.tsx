"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { Showcase } from "@/components/application/docs/showcase";
import { Announcement } from "@/components/base/announcement/announcement";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { IconSparkles } from "@tabler/icons-react";
import { toast } from "sonner";

export default function AnnouncementPage() {
  return (
    <ConsoleLayout>
      <Showcase title="Announcement" columns={1}>
        <ComponentPreview title="Preview">
          <div className="flex w-full justify-center">
          <Announcement
            className="max-w-[260px]"
            title="Setting up your account"
            description="Take the tour and learn how to use your workspace."
            actionLabel="Take the tour"
            dismissible
            onAction={() => toast.success("Tour opened")}
          />
          </div>
        </ComponentPreview>
        <ComponentPreview title="Variations" className="xl:col-span-1">
          <div className="grid w-full gap-4 sm:grid-cols-3">
            <Announcement
              className="h-full"
              icon={<IconSparkles aria-hidden="true" className="size-5 text-primary" />}
              title="What’s new in v2"
              description="Charts, command menu, and a new data table."
              actionLabel="See the changelog"
              onAction={() => toast.success("Changelog opened")}
            />
            <Announcement
              className="h-full"
              title="You’re all set"
              description="Your workspace is ready to go."
              dismissible
            />
            <Announcement
              className="h-full"
              title="2 seats left on your plan"
              actionLabel="Upgrade"
              onAction={() => toast.success("Plan options opened")}
            />
          </div>
        </ComponentPreview>
      </Showcase>
    </ConsoleLayout>
  );
}
