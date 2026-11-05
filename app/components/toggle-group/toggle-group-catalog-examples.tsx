import { IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight, IconArrowDown, IconArrowUp, IconBell, IconBold, IconBrandSlack, IconGrid3x3, IconItalic, IconLayoutGrid, IconList, IconMail, IconMessage, IconMoon, IconPlane, IconUnderline, IconWifi, IconBluetooth } from "@tabler/icons-react"

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { Badge } from "@/components/ui/badge/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group/toggle-group"

export const metadata = { title: "Toggle Group" }

export function ToggleGroupCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Selection">
      <ToggleGroup type="multiple" defaultValue={["bold"]} spacing={1} aria-label="Text formatting"><ToggleGroupItem value="bold" aria-label="Toggle bold"><IconBold /></ToggleGroupItem><ToggleGroupItem value="italic" aria-label="Toggle italic"><IconItalic /></ToggleGroupItem><ToggleGroupItem value="underline" aria-label="Toggle underline"><IconUnderline /></ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="all" variant="outline" aria-label="Filter activity"><ToggleGroupItem value="all">All activity</ToggleGroupItem><ToggleGroupItem value="mentions">Mentions</ToggleGroupItem><ToggleGroupItem value="assigned">Assigned to me</ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="active" variant="outline" size="sm" aria-label="Filter tasks"><ToggleGroupItem value="all">All</ToggleGroupItem><ToggleGroupItem value="active">Active</ToggleGroupItem><ToggleGroupItem value="completed">Completed</ToggleGroupItem><ToggleGroupItem value="archived">Archived</ToggleGroupItem></ToggleGroup>
      </ComponentPreview>
          <ComponentPreview title="Sizes">
      <div className="flex flex-wrap items-center gap-4"><ToggleGroup type="single" defaultValue="overview" size="sm" variant="outline" aria-label="Compact view"><ToggleGroupItem value="overview">Overview</ToggleGroupItem><ToggleGroupItem value="members">Members</ToggleGroupItem></ToggleGroup><ToggleGroup type="single" defaultValue="overview" size="default" variant="outline" aria-label="Standard view"><ToggleGroupItem value="overview">Overview</ToggleGroupItem><ToggleGroupItem value="members">Members</ToggleGroupItem></ToggleGroup><ToggleGroup type="single" defaultValue="overview" size="lg" variant="outline" aria-label="Large view"><ToggleGroupItem value="overview">Overview</ToggleGroupItem><ToggleGroupItem value="members">Members</ToggleGroupItem></ToggleGroup></div>

      <div className="flex flex-wrap items-center gap-6"><ToggleGroup type="single" defaultValue="day" variant="outline" spacing={0} aria-label="Compact period"><ToggleGroupItem value="day">Day</ToggleGroupItem><ToggleGroupItem value="week">Week</ToggleGroupItem><ToggleGroupItem value="month">Month</ToggleGroupItem></ToggleGroup><ToggleGroup type="single" defaultValue="week" variant="outline" spacing={3} aria-label="Spaced period"><ToggleGroupItem value="day">Day</ToggleGroupItem><ToggleGroupItem value="week">Week</ToggleGroupItem><ToggleGroupItem value="month">Month</ToggleGroupItem></ToggleGroup></div>
      </ComponentPreview>
          <ComponentPreview title="Orientation">
      <ToggleGroup type="multiple" orientation="vertical" variant="outline" spacing={1} aria-label="Text formatting"><ToggleGroupItem value="bold" aria-label="Bold"><IconBold /></ToggleGroupItem><ToggleGroupItem value="italic" aria-label="Italic"><IconItalic /></ToggleGroupItem><ToggleGroupItem value="underline" aria-label="Underline"><IconUnderline /></ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="multiple" orientation="vertical" spacing={1} aria-label="Connectivity settings"><ToggleGroupItem className="w-full justify-start" value="wifi" aria-label="Wi-Fi"><IconWifi />Wi-Fi enabled</ToggleGroupItem><ToggleGroupItem className="w-full justify-start" value="bluetooth" aria-label="Bluetooth"><IconBluetooth />Bluetooth enabled</ToggleGroupItem><ToggleGroupItem className="w-full justify-start" value="airplane" aria-label="Maintenance mode"><IconPlane />Maintenance mode</ToggleGroupItem><ToggleGroupItem className="w-full justify-start" value="alerts" aria-label="Alerts"><IconBell />Alerts enabled</ToggleGroupItem></ToggleGroup>
      </ComponentPreview>
          <ComponentPreview title="Controls">
      <ToggleGroup type="single" defaultValue="left" spacing={1} aria-label="Text alignment"><ToggleGroupItem value="left" aria-label="Align left"><IconAlignLeft /></ToggleGroupItem><ToggleGroupItem value="center" aria-label="Align center"><IconAlignCenter /></ToggleGroupItem><ToggleGroupItem value="right" aria-label="Align right"><IconAlignRight /></ToggleGroupItem><ToggleGroupItem value="justify" aria-label="Justify"><IconAlignJustified /></ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="list" variant="outline" aria-label="Choose view"><ToggleGroupItem value="list" aria-label="List view"><IconList />List</ToggleGroupItem><ToggleGroupItem value="grid" aria-label="Grid view"><IconLayoutGrid />Grid</ToggleGroupItem><ToggleGroupItem value="board" aria-label="Board view"><IconGrid3x3 />Board</ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="light" variant="outline" aria-label="Theme preference"><ToggleGroupItem value="light">Light</ToggleGroupItem><ToggleGroupItem value="dark"><IconMoon />Dark</ToggleGroupItem><ToggleGroupItem value="system">System</ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="medium" size="sm" variant="outline" aria-label="Font size"><ToggleGroupItem value="small">Small</ToggleGroupItem><ToggleGroupItem value="medium">Medium</ToggleGroupItem><ToggleGroupItem value="large">Large</ToggleGroupItem><ToggleGroupItem value="extra-large">XL</ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="24h" size="sm" variant="outline" aria-label="Chart time range"><ToggleGroupItem value="1h">1H</ToggleGroupItem><ToggleGroupItem value="6h">6H</ToggleGroupItem><ToggleGroupItem value="24h">24H</ToggleGroupItem><ToggleGroupItem value="7d">7D</ToggleGroupItem><ToggleGroupItem value="30d">30D</ToggleGroupItem><ToggleGroupItem value="all">All</ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="multiple" defaultValue={["email", "push"]} variant="outline" spacing={1} aria-label="Notification channels"><ToggleGroupItem value="email" aria-label="Email notifications"><IconMail />Email</ToggleGroupItem><ToggleGroupItem value="sms" aria-label="SMS notifications"><IconMessage />SMS</ToggleGroupItem><ToggleGroupItem value="push" aria-label="Push notifications"><IconBell />Push</ToggleGroupItem><ToggleGroupItem value="chat" aria-label="Team chat notifications"><IconBrandSlack />Chat</ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="2" variant="outline" aria-label="Dashboard column count">{[1, 2, 3, 4].map(count => <ToggleGroupItem key={count} value={String(count)} aria-label={`${count} columns`}><IconGrid3x3 />{count}</ToggleGroupItem>)}</ToggleGroup>

      <ToggleGroup type="single" defaultValue="ascending" variant="outline" size="sm" aria-label="Sort direction"><ToggleGroupItem value="ascending"><IconArrowUp />Ascending</ToggleGroupItem><ToggleGroupItem value="descending"><IconArrowDown />Descending</ToggleGroupItem></ToggleGroup>

      <ToggleGroup type="single" defaultValue="annual" variant="outline" size="lg" aria-label="Billing period"><ToggleGroupItem value="monthly">Monthly</ToggleGroupItem><ToggleGroupItem value="annual">Annual <Badge variant="secondary">Save 20%</Badge></ToggleGroupItem></ToggleGroup>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
