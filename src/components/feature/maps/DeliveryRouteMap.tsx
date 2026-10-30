"use client";

import dynamic from "next/dynamic";
import { worldMill } from "@react-jvectormap/world";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((module) => module.VectorMap),
  { ssr: false },
);

export function DeliveryRouteMap() {
  return (
    <div className="h-[180px] w-full overflow-hidden rounded-xl border bg-muted/20" aria-label="Delivery route map from Berlin to Milan">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={false}
        zoomMin={1}
        zoomMax={6}
        regionStyle={{ initial: { fill: "var(--muted)", stroke: "var(--background)", strokeWidth: 0.6 }, hover: { fill: "var(--primary)" }, selected: { fill: "var(--primary)" } }}
        markers={[
          { latLng: [52.52, 13.405], name: "Berlin · Picked up" },
          { latLng: [45.4642, 9.19], name: "Milan · Destination" },
        ]}
        markerStyle={{ initial: { fill: "var(--primary)", stroke: "var(--background)", r: 5 } }}
      />
    </div>
  );
}
