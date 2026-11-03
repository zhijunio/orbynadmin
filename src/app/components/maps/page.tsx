import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { CompactPageHeader as PageHeader } from "@/components/custom/app-shell/page-header";
import { WashingtonMap } from "@/app/components/maps/washington-map";
import { Badge } from "@/components/ui/badges/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card";
import { IconMapPin } from "@tabler/icons-react";

export const metadata = { title: "Maps" };

export default function MapViewPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <PageHeader title="Maps" />
        <div className="grid gap-5 xl:grid-cols-2">
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="text-sm">Map View</CardTitle>
              <CardDescription>Explore locations across the Washington D.C. metro area.</CardDescription>
            </CardHeader>
            <CardContent><WashingtonMap /></CardContent>
          </Card>
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="text-sm">Google Maps Location</CardTitle>
              <CardDescription>Find the Pimjo location and nearby streets on Google Maps.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] overflow-hidden rounded-lg border bg-muted/30 sm:h-[380px]">
                <iframe
                  title="Google Maps location in Dhaka"
                  src="https://maps.google.com/maps?q=23.8002968%2C90.4210572&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full border-0"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <Card className="min-w-0">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-sm">Washington D.C. Region</CardTitle>
                  <CardDescription>Interactive map with Home and Office pinned.</CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1.5"><IconMapPin className="size-3.5" />2 pinned locations</Badge>
              </div>
            </CardHeader>
            <CardContent><WashingtonMap variant="region" /></CardContent>
          </Card>
        </div>
      </div>
    </ConsoleLayout>
  );
}
