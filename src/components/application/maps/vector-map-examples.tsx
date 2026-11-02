"use client";

import { useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/card/card";
import { worldShapes, usStateShapes } from "@/components/application/maps/map-shapes";

const distributionPoints = [
  { label: "United States", longitude: -98.5, latitude: 39.8 },
  { label: "United Kingdom", longitude: -3.4, latitude: 55.4 },
  { label: "India", longitude: 79, latitude: 22.8 },
  { label: "Australia", longitude: 134, latitude: -25.7 },
];

const trafficByCountry: Record<string, number> = {
  USA: 0.95, CAN: 0.42, GBR: 0.58, FRA: 0.37, DEU: 0.46, IND: 0.66,
  CHN: 0.52, JPN: 0.45, BRA: 0.34, AUS: 0.36, MEX: 0.3, ITA: 0.32,
};

const customerByState: Record<string, number> = {
  CA: 0.95, WA: 0.6, OR: 0.4, NV: 0.36, AZ: 0.58, CO: 0.48, TX: 0.82,
  FL: 0.86, GA: 0.51, NC: 0.55, VA: 0.62, MD: 0.47, PA: 0.67, NY: 0.9,
  MA: 0.58, IL: 0.73, MI: 0.51, OH: 0.53, TN: 0.45, MN: 0.39,
};

function MapControls({ zoom, onZoomChange }: { zoom: number; onZoomChange: (zoom: number) => void }) {
  return (
    <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm">
      <button type="button" aria-label="Zoom in" onClick={() => onZoomChange(Math.min(zoom + 0.2, 1.8))} disabled={zoom >= 1.8} className="flex size-10 items-center justify-center border-b text-foreground transition-colors hover:bg-muted disabled:opacity-50"><IconPlus className="size-4" /></button>
      <button type="button" aria-label="Zoom out" onClick={() => onZoomChange(Math.max(zoom - 0.2, 1))} disabled={zoom <= 1} className="flex size-10 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-50"><IconMinus className="size-4" /></button>
    </div>
  );
}

function WorldMap({ mode }: { mode: "distribution" | "traffic" }) {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState("USA");
  const selectedCountry = worldShapes.find((country) => country.code === selected);

  return (
    <div className="relative h-[276px] overflow-hidden rounded-xl bg-muted/30 sm:h-[310px]">
      <label htmlFor={`country-${mode}`} className="sr-only">Select a country</label>
      <select id={`country-${mode}`} value={selected} onChange={(event) => setSelected(event.target.value)} className="sr-only">
        {worldShapes.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
      </select>
      <svg viewBox="0 0 960 480" role="img" aria-label={mode === "distribution" ? "World map with user locations" : "World map shaded by traffic volume"} className="size-full">
        <g transform={`translate(480 240) scale(${zoom}) translate(-480 -240)`}>
          {worldShapes.map((country) => {
            const traffic = trafficByCountry[country.code] ?? 0;
            const active = mode === "traffic" && traffic > 0;
            const title = `${country.name}${mode === "traffic" && active ? ` · ${Math.round(traffic * 100)}% traffic index` : ""}`;
            return <path key={country.code} d={country.path} fill={active ? "var(--primary)" : "var(--muted)"} fillOpacity={active ? Math.max(0.18, traffic) : 1} stroke={country.code === selected ? "var(--primary)" : "var(--background)"} strokeWidth={country.code === selected ? "2.5" : "1.2"} vectorEffect="non-scaling-stroke" onClick={() => setSelected(country.code)} className="cursor-pointer transition-opacity hover:opacity-80">
              <title>{title}</title>
            </path>;
          })}
          {mode === "distribution" && distributionPoints.map((point) => {
            const x = ((point.longitude + 180) / 360) * 960;
            const y = ((90 - point.latitude) / 180) * 480;
            return <g key={point.label} role="img" aria-label={point.label}>
              <circle cx={x} cy={y} r="8" fill="var(--primary)" stroke="var(--background)" strokeWidth="2"><title>{point.label}</title></circle>
            </g>;
          })}
        </g>
      </svg>
      <MapControls zoom={zoom} onZoomChange={setZoom} />
      <span className="absolute bottom-3 left-3 rounded-md bg-background/90 px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm" aria-live="polite">
        {selectedCountry?.name ?? "World"}{mode === "traffic" && trafficByCountry[selected] ? ` · ${Math.round(trafficByCountry[selected] * 100)}%` : ""}
      </span>
    </div>
  );
}

function UnitedStatesMap() {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState("CA");
  const selectedState = usStateShapes.find((state) => state.code === selected);

  return (
    <div className="relative h-[276px] overflow-hidden rounded-xl bg-muted/30 sm:h-[310px]">
      <label htmlFor="us-state" className="sr-only">Select a U.S. state</label>
      <select id="us-state" value={selected} onChange={(event) => setSelected(event.target.value)} className="sr-only">
        {usStateShapes.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
      </select>
      <svg viewBox="0 0 960 510" role="img" aria-label="United States state customer heatmap" className="size-full">
        <g transform={`translate(480 255) scale(${zoom}) translate(-480 -255)`}>
          {usStateShapes.map((state) => {
            const value = customerByState[state.code] ?? 0.16;
            const title = `${state.name} · ${Math.round(value * 100)} index`;
            return <path key={state.code} d={state.path} fill={value > 0.35 ? "var(--primary)" : "var(--muted-foreground)"} fillOpacity={value > 0.35 ? Math.max(0.25, value) : 0.18} stroke={state.code === selected ? "var(--primary)" : "var(--background)"} strokeWidth={state.code === selected ? "3" : "1.5"} vectorEffect="non-scaling-stroke" onClick={() => setSelected(state.code)} className="cursor-pointer transition-opacity hover:opacity-80">
              <title>{title}</title>
            </path>;
          })}
        </g>
      </svg>
      <MapControls zoom={zoom} onZoomChange={setZoom} />
      <span className="absolute bottom-3 left-3 rounded-md bg-background/90 px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm" aria-live="polite">
        {selectedState?.name ?? selected} · {Math.round((customerByState[selected] ?? 0.16) * 100)}%
      </span>
    </div>
  );
}

export function VectorMapExamples() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader><CardTitle>Global User Distribution</CardTitle><CardDescription>Active user locations across key regions.</CardDescription></CardHeader>
          <CardContent><WorldMap mode="distribution" /></CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader><CardTitle>Country Traffic Analytics</CardTitle><CardDescription>Compare traffic activity by country.</CardDescription></CardHeader>
          <CardContent><WorldMap mode="traffic" /></CardContent>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader><CardTitle>US Customer Heatmap</CardTitle><CardDescription>Customer density and activity by state.</CardDescription></CardHeader>
          <CardContent><UnitedStatesMap /></CardContent>
        </Card>
      </div>
    </div>
  );
}
