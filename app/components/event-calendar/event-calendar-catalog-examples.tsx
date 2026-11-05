"use client";

import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { EventCalendar, type CalendarEvent, type CalendarResource, type CalendarView } from "@/components/custom/event-calendar/event-calendar";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Switch } from "@/components/ui/switch/switch";

const today = new Date();
const at = (dayOffset: number, hour: number) => {
  const date = new Date(today);
  date.setDate(today.getDate() + dayOffset);
  date.setHours(hour, 0, 0, 0);
  return date;
};

const seedEvents: CalendarEvent[] = [
  { id: "release", title: "Release planning", start: at(0, 10), end: at(0, 11), detail: "Platform team", tone: "default" },
  { id: "review", title: "Design review", start: at(1, 13), end: at(1, 14), detail: "Product design", tone: "success" },
  { id: "incident", title: "Incident follow-up", start: at(2, 9), end: at(2, 10), detail: "Operations", tone: "warning" },
  { id: "roadmap", title: "Quarterly roadmap", start: at(4, 15), end: at(4, 16), detail: "Leadership", tone: "default" },
  { id: "one-on-one", title: "Customer check-in", start: at(6, 11), end: at(6, 12), detail: "Northwind", tone: "success" },
];

const rooms: CalendarResource[] = [
  { id: "atlas", label: "Atlas Room", detail: "8 seats" },
  { id: "birch", label: "Birch Room", detail: "4 seats" },
  { id: "cedar", label: "Cedar Room", detail: "12 seats" },
];

export function EventCalendarCatalogExamples() {
  const [events, setEvents] = useState(seedEvents);
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<CalendarView>("week");
  const [showWeekends, setShowWeekends] = useState(true);
  const [notice, setNotice] = useState("Select an event or drag a time range to try the calendar.");

  const editEvent = (event: CalendarEvent | null) => {
    setActiveEvent(event);
    setEventTitle(event?.title ?? "");
    setEventDetail(event?.detail ?? "");
    setDialogOpen(true);
  };

  const saveEvent = () => {
    if (activeEvent) {
      setEvents((current) =>
        current.map((event) =>
          event.id === activeEvent.id ? { ...event, title: eventTitle, detail: eventDetail } : event,
        ),
      );
      setNotice(`Updated ${eventTitle}.`);
    } else {
      const start = new Date();
      start.setMinutes(0, 0, 0);
      start.setHours(start.getHours() + 1);
      const end = new Date(start);
      end.setHours(start.getHours() + 1);
      setEvents((current) => [
        ...current,
        { id: `event-${Date.now()}`, title: eventTitle || "New event", detail: eventDetail, start, end },
      ]);
      setNotice(`Created ${eventTitle || "a new event"}.`);
    }
    setDialogOpen(false);
  };

  const addBooking = (range: { date: Date; start: string; end: string; resourceId?: string }) => {
    const [hour, minute] = range.start.split(":").map(Number);
    const start = new Date(range.date);
    start.setHours(hour, minute, 0, 0);
    const end = new Date(start);
    const [endHour, endMinute] = range.end.split(":").map(Number);
    end.setHours(endHour, endMinute, 0, 0);
    const event: CalendarEvent = {
      id: `booking-${Date.now()}`,
      title: "New booking",
      start,
      end,
      resourceId: range.resourceId,
      tone: "success",
    };
    setEvents((current) => [...current, event]);
    setNotice(
      `Created a booking${range.resourceId ? ` in ${rooms.find((room) => room.id === range.resourceId)?.label}` : ""} from ${range.start} to ${range.end}.`,
    );
  };

  const customEvents: CalendarEvent[] = [
    { ...seedEvents[0], title: "API health check", tone: "success" },
    { ...seedEvents[1], title: "Security review", tone: "warning" },
    { ...seedEvents[2], title: "Deploy window", tone: "destructive" },
  ];

  return (
    <CatalogGridItems>
      <ComponentPreview title="Views and Settings" description="Switch views and hide weekends." layout="fullBleed" span={2}>
        <div className="grid w-full max-w-4xl gap-3">
          <label className="flex w-fit items-center gap-2 text-xs">
            <Switch checked={showWeekends} onCheckedChange={setShowWeekends} aria-label="Show weekends" />
            Show weekends
          </label>
          <EventCalendar
            events={events}
            view={view}
            onViewChange={setView}
            onEventSelect={editEvent}
            showWeekends={showWeekends}
            locale="en-US"
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {notice}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Resource Bookings" description="Drag on the timeline to book a room." layout="fullBleed" span={2}>
        <div className="w-full max-w-4xl">
          <EventCalendar
            events={events.map((event, index) => ({ ...event, resourceId: rooms[index % rooms.length].id }))}
            resources={rooms}
            view="resource"
            onViewChange={() => {}}
            selectable
            onTimeRangeSelect={addBooking}
            onEventSelect={(event) =>
              setNotice(`${event.title} · ${event.start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`)
            }
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Agenda and Dialog" layout="panel">
        <div className="grid w-full gap-3">
          <Button className="w-fit" onClick={() => editEvent(null)}>
            Create event
          </Button>
          <EventCalendar events={events} view="agenda" onEventSelect={editEvent} />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{activeEvent ? "Edit event" : "Create event"}</DialogTitle>
                <DialogDescription>Review the meeting details and save the calendar entry.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <label className="grid gap-1 text-sm">
                  Title
                  <input
                    value={eventTitle}
                    onChange={(event) => setEventTitle(event.currentTarget.value)}
                    placeholder="Project review"
                    className="h-9 rounded-md border border-input bg-background px-3"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Notes
                  <textarea
                    value={eventDetail}
                    onChange={(event) => setEventDetail(event.currentTarget.value)}
                    placeholder="Add agenda or attendees"
                    className="min-h-20 rounded-md border border-input bg-background p-3"
                  />
                </label>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveEvent}>Save event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom Event Chips" layout="fullBleed" span={2}>
        <div className="w-full max-w-4xl">
          <EventCalendar
            events={customEvents}
            view="week"
            renderEvent={(event) => (
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="size-1.5 shrink-0 rounded-full bg-current" />
                <span className="truncate font-medium">{event.title}</span>
              </span>
            )}
            onEventSelect={(event) => setNotice(`Selected ${event.title}.`)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Drag to Book" description="Select a time range on the week grid." layout="fullBleed" span={2}>
        <div className="grid w-full max-w-4xl gap-2">
          <EventCalendar events={events} view="week" selectable onTimeRangeSelect={addBooking} />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {notice}
          </p>
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
