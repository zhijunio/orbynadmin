import { PageHeader } from "@/components/feature/layout/PageHeader";
import { WashingtonMap } from "./_components/WashingtonMap";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin as IconMapPin } from "lucide-react";

export const metadata = { title: "Maps" };

export default function MapViewPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Maps" description="Clear views of locations and regional activity." />
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="text-sm">Map View</CardTitle>
          </CardHeader>
          <CardContent><WashingtonMap /></CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="text-sm">Map 2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] overflow-hidden rounded-lg border bg-muted/30 sm:h-[380px]">
              <iframe
                title="Washington D.C. map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-77.12%2C38.82%2C-76.94%2C38.99&layer=mapnik&marker=38.89%2C-77.03"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="min-w-0">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-sm">Washington D.C. Region</CardTitle>
            </div>
            <Badge variant="secondary" className="gap-1.5"><IconMapPin className="size-3.5" /> 2 pinned locations</Badge>
          </div>
        </CardHeader>
        <CardContent><WashingtonMap variant="region" /></CardContent>
      </Card>
    </div>
  );
}
