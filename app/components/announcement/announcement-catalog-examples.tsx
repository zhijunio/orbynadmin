"use client";

import { Announcement } from "@/components/ui/announcement/announcement";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { IconSparkles } from "@tabler/icons-react";
import { toast } from "sonner";



export function AnnouncementCatalogExamples() {
  return (
    <CatalogGridItems>
              <ComponentPreview title="Announcement With Action">
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
              <ComponentPreview title="Announcement With Leading Icon">
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
    </CatalogGridItems>
  );
}
