"use client";

import { useState } from "react";
import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandChrome,
  IconBrandEdge,
  IconBrandFacebook,
  IconBrandFirefox,
  IconBrandSafari,
  IconBrandWindows,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconLink,
  IconSearch,
  IconWorld,
  type Icon,
} from "@tabler/icons-react";

import { ChartCard } from "@/components/application/charts/chart-card";
import { CountryFlag, type CountryCode } from "@/components/base/flags/country-flag";

type ListTab = "Devices" | "Browsers" | "OS" | "Screens";
type ListItem = { label: string; value: number; icon?: Icon };

const lists: Record<ListTab, ListItem[]> = {
  Devices: [{ label: "Desktop", value: 610, icon: IconDeviceDesktop }, { label: "Mobile", value: 310, icon: IconDeviceMobile }, { label: "Tablet", value: 80, icon: IconDeviceTablet }],
  Browsers: [{ label: "Chrome", value: 5210, icon: IconBrandChrome }, { label: "Safari", value: 2880, icon: IconBrandSafari }, { label: "Firefox", value: 1340, icon: IconBrandFirefox }, { label: "Edge", value: 850, icon: IconBrandEdge }],
  OS: [{ label: "Windows", value: 4180, icon: IconBrandWindows }, { label: "macOS", value: 2740, icon: IconDeviceDesktop }, { label: "iOS", value: 2180, icon: IconBrandApple }, { label: "Android", value: 1560, icon: IconBrandAndroid }],
  Screens: [{ label: "Large", value: 3320, icon: IconDeviceDesktop }, { label: "Medium", value: 2860, icon: IconDeviceTablet }, { label: "Small", value: 2240, icon: IconDeviceMobile }, { label: "Other", value: 710, icon: IconDeviceDesktop }],
} as const;
const listLabels: Record<ListTab, string> = { Devices: "Devices", Browsers: "Browsers", OS: "Operating systems", Screens: "Screen sizes" };
const countryList: { label: string; flag: CountryCode; value: number; icon?: Icon }[] = [
  { label: "United States of America", flag: "US", value: 3120 }, { label: "India", flag: "IN", value: 2160 }, { label: "Brazil", flag: "BR", value: 1430 },
  { label: "Japan", flag: "JP", value: 980 }, { label: "Türkiye", flag: "TR", value: 910 }, { label: "Germany", flag: "DE", value: 840 },
  { label: "United Kingdom", flag: "GB", value: 720 }, { label: "Canada", flag: "CA", value: 620 }, { label: "France", flag: "FR", value: 510 },
];
const sourceList: { label: string; value: number; flag?: CountryCode; icon?: Icon }[] = [{ label: "Direct", value: 5240, icon: IconWorld }, { label: "Organic Search", value: 3810, icon: IconSearch }, { label: "Social", value: 1940, icon: IconBrandFacebook }, { label: "Referral", value: 870, icon: IconLink }];
const pagesList = [{ label: "/", value: 12480 }, { label: "/pricing", value: 6210 }, { label: "/components", value: 4880 }, { label: "/blog/launch", value: 2140 }];

const numberFormat = new Intl.NumberFormat("en-US");

export function BarListChartExample() {
  const [listTab, setListTab] = useState<ListTab>("Devices");
  const list = lists[listTab];
  const total = list.reduce((sum, item) => sum + item.value, 0);
  const max = list[0].value;
  return <ChartCard title="Bar list">
    <div className="mb-5 flex items-end justify-between gap-3 border-b">
      <div className="flex flex-wrap gap-1" role="tablist" aria-label="Bar list category">{(Object.keys(lists) as ListTab[]).map((tab) => <button key={tab} type="button" role="tab" aria-selected={listTab === tab} onClick={() => setListTab(tab)} className={`border-b-2 px-2.5 pb-2 text-sm transition-colors ${listTab === tab ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{listLabels[tab]}</button>)}</div>
      <span className="pb-2 text-xs text-muted-foreground">Visitors</span>
    </div>
    <div className="space-y-3">{list.map(({ label, value, icon: ItemIcon }) => {
      const share = Math.round(value / total * 100);
      return <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-sm">
        <div className="relative h-8 overflow-hidden rounded-md bg-muted"><div className="absolute inset-y-0 left-0 rounded-md transition-[width]" style={{ width: `${value / max * 100}%`, backgroundColor: "color-mix(in srgb, var(--chart-1) 25%, var(--muted))" }} /><span className="absolute inset-y-0 left-2 flex items-center gap-2 text-xs font-medium">{ItemIcon && <ItemIcon aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />}{label}</span></div>
        <span className="min-w-[76px] text-right text-xs tabular-nums text-muted-foreground">{share}%</span>
      </div>;
    })}</div>
  </ChartCard>;
}

export function BarListMonoExample() {
  const max = pagesList[0].value;
  return <ChartCard title="Pages">
    <div className="mb-4 flex items-center justify-between border-b pb-3"><div><p className="text-sm font-medium">Pages</p><p className="mt-1 text-xs text-muted-foreground">Views</p></div></div>
    <div className="space-y-3">{pagesList.map(({ label, value }) => <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><div className="relative h-8 overflow-hidden rounded-md bg-muted"><div className="absolute inset-y-0 left-0 rounded-md bg-foreground/15" style={{ width: `${value / max * 100}%` }} /><span className="absolute inset-y-0 left-2 flex items-center text-xs font-medium">{label}</span></div><span className="min-w-16 text-right text-xs tabular-nums text-muted-foreground">{numberFormat.format(value)}</span></div>)}</div>
  </ChartCard>;
}

export function BarListExpandableExample() {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<"Countries" | "Sources">("Countries");
  const items = tab === "Countries" ? countryList : sourceList;
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const max = items[0].value;
  const visible = expanded ? items : items.slice(0, 5);
  return <ChartCard title="Countries">
    <div className="mb-4 flex items-end justify-between gap-3 border-b"><div className="flex gap-1" role="tablist" aria-label="Bar list breakdown">{(["Countries", "Sources"] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => { setTab(item); setExpanded(false); }} className={`border-b-2 px-2.5 pb-2 text-sm transition-colors ${tab === item ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div><span className="pb-2 text-xs text-muted-foreground">Visitors</span></div>
    <div className="space-y-2">{visible.map(({ label, flag, icon: ItemIcon, value }) => <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><div className="relative h-8 overflow-hidden rounded-md bg-muted"><div className="absolute inset-y-0 left-0 rounded-md" style={{ width: `${value / max * 100}%`, backgroundColor: "color-mix(in srgb, var(--chart-1) 24%, var(--muted))" }} /><span className="absolute inset-y-0 left-2 flex items-center gap-2 text-xs font-medium">{flag && <CountryFlag country={flag} className="h-3 w-[18px] shrink-0 rounded-[1px]" />}{!flag && ItemIcon && <ItemIcon aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />}{label}</span></div><span className="min-w-16 text-right text-xs tabular-nums text-muted-foreground">{Math.round(value / total * 100)}%</span></div>)}</div>
    {!expanded && items.length > visible.length && <div className="relative -mt-4 flex justify-center bg-gradient-to-b from-transparent via-card/90 to-card pt-5"><button type="button" onClick={() => setExpanded(true)} className="rounded-full border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm hover:text-foreground">Show {items.length - visible.length} more</button></div>}
    {expanded && <div className="mt-3 flex justify-center"><button type="button" onClick={() => setExpanded(false)} className="rounded-full border px-3 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground">Show less</button></div>}
  </ChartCard>;
}

export default function BarListCard() {
  return <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2"><BarListChartExample /><BarListMonoExample /><BarListExpandableExample /></div>;
}
