"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconBuilding, IconMail, IconMapPin, IconShieldCheck, IconUser } from "@tabler/icons-react";

import { PageHeader } from "@/components/feature/layout/PageHeader";
import { ProfileActions } from "./profile-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser, team } from "@/data";

const account = team.find((member) => member.name === currentUser.name);

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: currentUser.name, email: currentUser.email });
  const accountDetails = [
    { label: "Email address", value: profile.email, icon: IconMail },
    { label: "Role", value: currentUser.role, icon: IconShieldCheck },
    { label: "Department", value: account?.department ?? "—", icon: IconBuilding },
    { label: "Location", value: account?.location ?? "—", icon: IconMapPin },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="size-16 shrink-0">
              <AvatarImage src={currentUser.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-1">
                <CardTitle className="truncate text-lg">{profile.name}</CardTitle>
                <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
                <Badge variant="secondary" className="mt-1">{currentUser.role}</Badge>
              </div>
            </div>
            <ProfileActions name={profile.name} email={profile.email} onSave={setProfile} />
          </CardHeader>
          <CardContent>
            <Separator className="mb-5" />
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {accountDetails.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex min-w-0 items-start gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-1 truncate text-sm font-medium">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconUser className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium">Personal information</p>
                <p className="mt-1 text-sm text-muted-foreground">Manage the name and email shown across your workspace.</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <IconBuilding className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium">Organization access</p>
                <p className="mt-1 text-sm text-muted-foreground">Your role and team details are managed by your organization.</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/settings">
                Open account settings
                <IconArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
