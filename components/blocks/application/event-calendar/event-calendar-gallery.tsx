import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { PersonalCalendar } from "@/components/blocks/application/event-calendar/personal-calendar"
import { MiniMonthCalendar } from "@/components/blocks/application/event-calendar/mini-month-calendar"
import { HotelBookingCalendar } from "@/components/blocks/application/event-calendar/hotel-booking-calendar"
import { WorkforceShiftCalendar } from "@/components/blocks/application/event-calendar/workforce-shift-calendar"
import { ClinicChairCalendar } from "@/components/blocks/application/event-calendar/clinic-chair-calendar"
import { DealCalendar } from "@/components/blocks/application/event-calendar/deal-calendar"

export function EventCalendarGallery() {
  return <div className="min-w-0 space-y-5">
    <h1 className="text-2xl font-semibold tracking-tight">Event Calendar</h1>
    <ComponentPreview title="Personal Calendar" previewClassName="block p-3">
      <PersonalCalendar />
    </ComponentPreview>
    <ComponentPreview title="Mini Month Calendar" previewClassName="block p-3">
      <MiniMonthCalendar />
    </ComponentPreview>
    <ComponentPreview title="Hotel Booking Calendar" previewClassName="block p-3">
      <HotelBookingCalendar />
    </ComponentPreview>
    <ComponentPreview title="Workforce Shift Roster" previewClassName="block p-3">
      <WorkforceShiftCalendar />
    </ComponentPreview>
    <ComponentPreview title="Clinic Chair Calendar" previewClassName="block p-3">
      <ClinicChairCalendar />
    </ComponentPreview>
    <ComponentPreview title="Deal Calendar" previewClassName="block p-3">
      <DealCalendar />
    </ComponentPreview>
  </div>
}
