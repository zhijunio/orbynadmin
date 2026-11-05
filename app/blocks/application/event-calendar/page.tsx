import AppShell from "@/components/blocks/application/app-shell/app-shell"
import { EventCalendarGallery } from "@/components/blocks/application/event-calendar/event-calendar-gallery"

export const metadata = { title: "Event Calendar" };

export default function EventCalendarBlocksPage() {
  return <AppShell><EventCalendarGallery /></AppShell>
}
