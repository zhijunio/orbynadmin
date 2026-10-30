"use client";

import { useState } from "react";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { VisitorsWorldMap } from "@/components/feature/maps/VisitorsWorldMap";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin as IconMapPin, Globe2 as IconWorld } from "lucide-react";

const regions = [
  { code: "US", country: "United States", customers: "24,580", share: "38%" },
  { code: "GB", country: "United Kingdom", customers: "12,420", share: "19%" },
  { code: "JP", country: "Japan", customers: "9,860", share: "15%" },
  { code: "IN", country: "India", customers: "7,210", share: "11%" },
  { code: "DE", country: "Germany", customers: "5,940", share: "9%" },
  { code: "FR", country: "France", customers: "4,860", share: "8%" },
] as const;

export default function VectorMapPage() {
  const [selectedRegions, setSelectedRegions] = useState(["US"]);
  const selectedRegion = regions.find((region) => region.code === selectedRegions[0]);
  return (
    <div className="space-y-6">
      <PageHeader title="Vector Map" description="Explore customer activity by country on an interactive world map." />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">
        <Card className="min-w-0">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm">Region Labels</CardTitle>
              </div>
              <Badge variant="secondary" className="gap-1.5"><IconMapPin className="size-3.5" />{selectedRegion?.country ?? selectedRegions[0] ?? "Select a region"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="overflow-hidden">
            <VisitorsWorldMap selectedRegions={selectedRegions} onSelectedRegionsChange={setSelectedRegions} />
            <p className="mt-2 text-xs text-muted-foreground">One country is highlighted at a time. Drag to pan and use the map controls to zoom.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm"><IconWorld className="size-4 text-primary" />Customers by Region</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {regions.map((region, index) => {
              const selected = region.code === selectedRegions[0];
              return <button key={region.code} type="button" onClick={() => setSelectedRegions([region.code])} aria-pressed={selected} className={`flex w-full items-center gap-3 py-3 text-left transition-colors first:pt-0 last:pb-0 ${selected ? "text-primary" : "hover:bg-muted/40"}`}>
                <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{index + 1}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{region.country}</span><span className="text-xs text-muted-foreground">{region.customers} customers</span></span>
                <span className="text-sm font-medium">{region.share}</span>
              </button>;
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
