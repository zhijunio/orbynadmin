"use client";

import { useEffect, useRef, useState } from "react";
import { setWorkerUrl } from "maplibre-gl";
import Map, { Marker, NavigationControl, Popup, ScaleControl, type MapRef } from "react-map-gl/maplibre";

setWorkerUrl(new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).toString());

type Location = {
  id: string;
  name: string;
  detail: string;
  latitude: number;
  longitude: number;
};

const locations: Location[] = [
  { id: "home", name: "Home", detail: "Arlington, Virginia", latitude: 38.8799, longitude: -77.1068 },
  { id: "office", name: "Office", detail: "Washington, D.C.", latitude: 38.9072, longitude: -77.0369 },
  { id: "support", name: "Support Center", detail: "Alexandria, Virginia", latitude: 38.8048, longitude: -77.0469 },
];

const mapStyle = "https://tiles.openfreemap.org/styles/bright";

export function WashingtonMap({ variant = "metro" }: { variant?: "metro" | "region" }) {
  const visibleLocations = variant === "region" ? locations.slice(0, 2) : locations.slice(1);
  const [selectedId, setSelectedId] = useState<string | null>(variant === "region" ? "office" : null);
  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLocation = visibleLocations.find((location) => location.id === selectedId);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver(() => mapRef.current?.resize());
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[320px] w-full overflow-hidden rounded-lg border bg-muted/30 sm:h-[380px]">
      <Map
        ref={mapRef}
        initialViewState={{ longitude: -77.06, latitude: 38.895, zoom: variant === "region" ? 11.5 : 10 }}
        mapStyle={mapStyle}
        style={{ width: "100%", height: "100%" }}
        scrollZoom={false}
        cooperativeGestures
        keyboard
        aria-label={variant === "region" ? "Map of home and office locations in Washington, D.C." : "Interactive Washington, D.C. metro area map"}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <ScaleControl position="bottom-left" />
        {visibleLocations.map((location) => (
          <Marker key={location.id} longitude={location.longitude} latitude={location.latitude} anchor="bottom">
            <button
              type="button"
              aria-label={`Show ${location.name}: ${location.detail}`}
              aria-pressed={selectedId === location.id}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedId(location.id);
              }}
              className="relative flex size-8 items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-lg outline-none ring-offset-2 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="size-2 rounded-full bg-white" />
              <span className="absolute -bottom-1 size-2 rotate-45 border-b-2 border-r-2 border-white bg-primary" />
            </button>
          </Marker>
        ))}
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="bottom"
            offset={36}
            closeButton
            closeOnClick={false}
            onClose={() => setSelectedId(null)}
          >
            <div className="min-w-28 py-0.5">
              <p className="font-semibold text-slate-900">{selectedLocation.name}</p>
              <p className="mt-0.5 text-xs text-slate-600">{selectedLocation.detail}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
