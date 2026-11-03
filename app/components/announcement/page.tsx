"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Announcement } from "@/components/ui/announcement/announcement";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { IconSparkles } from "@tabler/icons-react";
import { toast } from "sonner";

export default function AnnouncementPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5"><PageHeader title="Announcement" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <ComponentPreview title="Announcement with Action">
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
        <ComponentPreview title="Announcement with Leading Icon">
          <div className="w-full max-w-sm">
            <Announcement
              icon={<IconSparkles aria-hidden="true" className="size-5 text-primary" />}
              title="What’s new in v2"
              description="Charts, command menu, and a new data table."
              actionLabel="See the changelog"
              onAction={() => toast.success("Changelog opened")}
            />
          </div>
        </ComponentPreview>
        <ComponentPreview title="Dismissible Announcement">
          <div className="w-full max-w-sm">
            <Announcement
              title="You’re all set"
              description="Your workspace is ready to go."
              dismissible
            />
          </div>
        </ComponentPreview>
        <ComponentPreview title="Compact Announcement">
          <div className="w-full max-w-sm">
            <Announcement
              title="2 seats left on your plan"
              actionLabel="Upgrade"
              onAction={() => toast.success("Plan options opened")}
            />
          </div>
        </ComponentPreview>
      </div></div>
    </AppShell>
  );
}
