"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { worldMill } from "@react-jvectormap/world";

const VectorMap = dynamic(() => import("@react-jvectormap/core").then((module) => module.VectorMap), { ssr: false });

type VisitorsWorldMapProps = {
  selectedRegions?: string[];
  onSelectedRegionsChange?: (regions: string[]) => void;
  className?: string;
};

export function VisitorsWorldMap({ selectedRegions, onSelectedRegionsChange, className = "h-64 min-w-0 w-full sm:h-80" }: VisitorsWorldMapProps) {
  const [internalSelectedRegions, setInternalSelectedRegions] = useState(["US"]);
  const activeRegions = selectedRegions ?? internalSelectedRegions;
  return <div className={className}>
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      zoomOnScroll={false}
      zoomMin={1}
      zoomMax={8}
      regionsSelectable
      regionsSelectableOne
      selectedRegions={activeRegions}
      onRegionSelected={(_event, _code, _isSelected, regions) => {
        if (!selectedRegions) setInternalSelectedRegions(regions);
        onSelectedRegionsChange?.(regions);
      }}
      regionStyle={{ initial: { fill: "#dbe3f2", stroke: "#fff", strokeWidth: 0.5 }, hover: { fill: "#3758f9", cursor: "pointer" }, selected: { fill: "#3758f9" } }}
      markersSelectable
      markers={[
        { latLng: [37.0902, -95.7129], name: "United States" },
        { latLng: [51.5072, -0.1276], name: "United Kingdom" },
        { latLng: [35.6762, 139.6503], name: "Japan" },
        { latLng: [19.076, 72.8777], name: "India" },
      ]}
      markerStyle={{ initial: { fill: "#3758f9", stroke: "#fff", r: 5 } }}
    />
  </div>;
}
