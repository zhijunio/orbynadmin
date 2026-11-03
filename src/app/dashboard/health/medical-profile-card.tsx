"use client";

import { useEffect, useState } from "react";

import { IconCalendar, IconDroplet, IconPlus, IconStethoscope, IconUser } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Card, CardContent } from "@/components/base/card/card";

const profileDetails: { label: string; value: string; icon: Icon }[] = [
  { label: "Date of Birth", value: "28 July, 1997", icon: IconCalendar },
  { label: "Gender", value: "Male", icon: IconUser },
  { label: "Blood Type", value: "A rh+", icon: IconDroplet },
  { label: "GP Doctor", value: "Mattheus Clarkson", icon: IconStethoscope },
];

export default function MedicalProfileCard() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => () => {
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
  }, [avatarUrl]);

  return (
    <Card className="flex h-[330px] min-w-0 flex-col items-center rounded-[20px] border-0 bg-muted/45 p-0 ring-0">
      <CardContent className="flex w-full min-w-0 flex-1 flex-col items-center gap-[15px] px-2.5 pt-6 pb-2.5">
        <div className="relative">
          <Avatar size="lg" className="size-[66px] bg-muted">
            {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
            <AvatarFallback className="text-[24.75px] font-semibold">M</AvatarFallback>
          </Avatar>
          <label className="absolute -right-0.5 -top-0.5 grid size-6 cursor-pointer place-items-center rounded-full border bg-background shadow-xs transition-colors hover:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-ring">
            <span className="sr-only">Upload profile photo</span>
            <input type="file" accept="image/*" className="absolute inset-0 size-full cursor-pointer opacity-0" onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) setAvatarUrl(URL.createObjectURL(file));
              event.currentTarget.value = "";
            }} />
            <IconPlus aria-hidden="true" className="size-3.5" />
          </label>
        </div>
        <h2 className="text-center text-xl font-medium leading-[1.625rem]">Mertcan Esmergül</h2>
        <dl className="grid w-full flex-1 content-start gap-2.5">
          {profileDetails.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex min-w-0 items-center gap-2 rounded-[10px] bg-background px-2.5 py-2">
              <dt className="flex min-w-0 flex-1 items-center gap-1.5 text-sm text-muted-foreground"><Icon aria-hidden="true" className="size-4 shrink-0" /><span className="truncate">{label}</span></dt>
              <dd className="truncate text-right text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
