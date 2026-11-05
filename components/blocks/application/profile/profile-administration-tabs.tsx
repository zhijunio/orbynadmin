"use client";

import { AccountTeamSettings } from "@/components/blocks/application/profile/account-team-settings";
import { AdminPermissions } from "@/components/blocks/application/profile/admin-permissions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";

export function ProfileAdministrationTabs() {
  return (
    <Tabs defaultValue="account-team" className="w-full">
      <TabsList variant="line" className="mb-5 w-full justify-start">
        <TabsTrigger value="account-team">Account & Team</TabsTrigger>
        <TabsTrigger value="admin">Workspace Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="account-team" className="mt-0">
        <AccountTeamSettings />
      </TabsContent>
      <TabsContent value="admin" className="mt-0">
        <AdminPermissions />
      </TabsContent>
    </Tabs>
  );
}
