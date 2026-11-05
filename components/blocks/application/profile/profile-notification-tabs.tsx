"use client";

import { NotificationDigest } from "@/components/blocks/application/profile/notification-digest";
import { NotificationChannels } from "@/components/blocks/application/settings/settings-notifications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";

export function ProfileNotificationTabs() {
  return (
    <Tabs defaultValue="channels" className="w-full">
      <TabsList variant="line" className="mb-5 w-full justify-start">
        <TabsTrigger value="channels">Notification Channels</TabsTrigger>
        <TabsTrigger value="digest">Daily Digest</TabsTrigger>
      </TabsList>
      <TabsContent value="channels" className="mt-0">
        <NotificationChannels />
      </TabsContent>
      <TabsContent value="digest" className="mt-0">
        <NotificationDigest />
      </TabsContent>
    </Tabs>
  );
}
