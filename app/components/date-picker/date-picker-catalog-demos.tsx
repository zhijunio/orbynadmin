"use client";

import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { IconCalendarEvent as CalendarDays, IconClockHour3 as Clock3, IconWorld as Globe2, IconVideo as Video } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card/card";
import { MonthPanel } from "@/components/ui/date-picker/calendar-shared";

export function MeetingSchedulerExample() {
  const [date, setDate] = useState(() => today(getLocalTimeZone()));
  const [selectedTime, setSelectedTime] = useState("14:00");
  const times = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

  return (
    <div className="grid w-full max-w-3xl gap-3 rounded-xl border border-border bg-muted/40 p-3 lg:grid-cols-[200px_minmax(260px,1fr)_150px] lg:items-stretch">
      <Card className="gap-0 border-border py-4 shadow-sm">
        <CardContent className="flex h-full flex-col gap-4 px-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Mertcan Esmergul</p>
              <p className="truncate text-xs text-muted-foreground">hi@mertcan.works</p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold">30 min intro meeting</h3>
            <p className="mt-1 text-sm text-muted-foreground">Let&apos;s discuss your needs and how we can collaborate.</p>
          </div>
          <div className="mt-auto grid gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock3 aria-hidden="true" className="size-4" />
              30 minutes
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe2 aria-hidden="true" className="size-4" />
              English
            </span>
            <span className="inline-flex items-center gap-2">
              <Video aria-hidden="true" className="size-4" />
              Google Meet
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="flex min-w-0 items-start justify-center rounded-xl border border-border bg-card p-3 shadow-sm">
        <MonthPanel date={date} selected={date} onSelect={setDate} aria-label="Choose meeting date" showPrev showNext />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
        <p className="mb-1 text-sm font-medium">Available times</p>
        {times.map((time) => (
          <Button
            key={time}
            type="button"
            variant={selectedTime === time ? "default" : "outline"}
            size="sm"
            aria-pressed={selectedTime === time}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </Button>
        ))}
        <Button type="button" className="mt-auto" size="sm">
          <CalendarDays aria-hidden="true" className="size-4" />
          Continue
        </Button>
      </div>
    </div>
  );
}
