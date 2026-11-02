import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Card, CardContent } from "@/components/base/card/card";
import { team } from "@/data";

export function TeamCard() {
  return (
    <Card className="h-[337px] rounded-2xl border-0 bg-muted/45 p-2 ring-0">
      <div className="flex items-start justify-between px-2 pt-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm text-muted-foreground">Team members</p>
          <p className="text-2xl font-semibold tabular-nums">{team.length}</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/workspace/team">View team <IconArrowUpRight className="size-4" /></Link>
        </Button>
      </div>
      <CardContent className="mt-3 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2 p-0">
        {team.slice(0, 4).map((member) => (
          <div key={member.id} className="flex min-w-0 flex-col items-start justify-between rounded-xl bg-background p-3">
            <Avatar className="size-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 w-full">
              <p className="truncate text-sm font-medium">{member.name}</p>
              <p className="truncate text-xs text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
