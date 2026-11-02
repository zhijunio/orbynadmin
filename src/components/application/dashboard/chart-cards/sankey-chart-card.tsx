"use client";

import { CountUp } from "@/components/application/charts/chart-card-extras";

import { createContext, useContext, useState } from "react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { ResponsiveContainer, Sankey } from "recharts";
import type { SankeyLinkProps, SankeyNodeProps } from "recharts";

import { ChartCard } from "@/components/application/charts/chart-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";

const nodeNames = [
  "Focus", "Meetings", "Breaks", "Admin", "Learning",
  "Browsing", "Writing", "Messaging", "Productivity", "Email", "Video calls", "Everything else",
] as const;
const sourceNames = new Set<string>(nodeNames.slice(0, 5));
const colors: Record<string, string> = {
  Focus: "var(--chart-1)",
  Meetings: "var(--chart-5)",
  Breaks: "var(--chart-2)",
  Admin: "var(--chart-4)",
  Learning: "var(--chart-3)",
};

type Link = { source: string; target: string; value: number };
const weekLinks: Link[] = [
  { source: "Focus", target: "Browsing", value: 10.4 },
  { source: "Focus", target: "Writing", value: 8.2 },
  { source: "Focus", target: "Messaging", value: 6.1 },
  { source: "Focus", target: "Productivity", value: 5 },
  { source: "Focus", target: "Email", value: 2.3 },
  { source: "Meetings", target: "Video calls", value: 9.6 },
  { source: "Meetings", target: "Everything else", value: 3.8 },
  { source: "Meetings", target: "Writing", value: 3 },
  { source: "Meetings", target: "Email", value: 1.6 },
  { source: "Breaks", target: "Everything else", value: 5.6 },
  { source: "Breaks", target: "Browsing", value: 3.6 },
  { source: "Breaks", target: "Video calls", value: 2.8 },
  { source: "Admin", target: "Productivity", value: 5.2 },
  { source: "Admin", target: "Writing", value: 4 },
  { source: "Admin", target: "Messaging", value: 3.2 },
  { source: "Admin", target: "Everything else", value: 1.6 },
  { source: "Learning", target: "Browsing", value: 4.6 },
  { source: "Learning", target: "Email", value: 3.4 },
  { source: "Learning", target: "Messaging", value: 2 },
];

const makeRangeLinks = (values: number[]) => weekLinks.map((link, index) => ({ ...link, value: values[index] }));
const ranges = [
  { id: "this-week", label: "This week", links: weekLinks },
  { id: "last-week", label: "Last week", links: makeRangeLinks([8.6, 9.4, 4.8, 6.2, 3.1, 7.2, 4.4, 2.6, 1.8, 5.1, 4.9, 2.2, 4.8, 3.6, 3.3, 2.5, 3.9, 4.6, 1.5]) },
  { id: "this-month", label: "This month", links: makeRangeLinks([44.8, 36.2, 24.5, 22.6, 9.9, 38.4, 14.2, 12.6, 7.4, 28.8, 15.7, 10.9, 27.2, 17.6, 12.1, 6.5, 19.4, 14.8, 8.3]) },
] as const;
type RangeId = (typeof ranges)[number]["id"];
type ActiveFlow = { type: "node"; name: string } | { type: "link"; source: string; target: string } | null;
type HoverContextValue = {
  active: ActiveFlow;
  setActive: (active: ActiveFlow) => void;
  nodeValues: Record<string, number>;
  sinkShares: Record<string, number>;
  links: Link[];
};
const HoverContext = createContext<HoverContextValue>({
  active: null,
  setActive: () => {},
  nodeValues: {},
  sinkShares: {},
  links: [],
});

const formatHours = (value: number) => `${Number.isInteger(value) ? value : value.toFixed(1)}h`;

function isNodeRelated(active: ActiveFlow, name: string, links: Link[]) {
  if (!active) return true;
  if (active.type === "link") return name === active.source || name === active.target;
  if (name === active.name) return true;
  return links.some((link) => (link.source === active.name || link.target === active.name) && (link.source === name || link.target === name));
}

function SankeyNode({ x, y, width, height, payload }: SankeyNodeProps) {
  const { active, setActive, nodeValues, sinkShares, links } = useContext(HoverContext);
  const name = payload.name;
  const isSource = sourceNames.has(name);
  const value = nodeValues[name] ?? 0;
  const share = sinkShares[name] ?? 0;
  const centerY = y + height / 2;
  const related = isNodeRelated(active, name, links);
  const nodeColor = colors[name] ?? "var(--border)";

  return (
    <g
      className="transition-opacity duration-200 ease-out"
      opacity={related ? 1 : 0.35}
      onMouseEnter={() => setActive({ type: "node", name })}
      onMouseLeave={() => setActive(null)}
    >
      <rect x={x} y={y} width={width} height={height} rx={Math.min(5, height / 2)} fill={nodeColor} />
      {isSource ? (
        <g className="pointer-events-none">
          <text x={x - 8} y={centerY} dy={height >= 26 ? -2 : 4} textAnchor="end" fill="var(--foreground)" fontSize={13} fontWeight={500}>{name}</text>
          {height >= 26 && <text x={x - 8} y={centerY} dy={14} textAnchor="end" fill="var(--muted-foreground)" fontSize={12} className="tabular-nums">{formatHours(value)}</text>}
        </g>
      ) : (
        <text x={x + width + 8} y={centerY} dy={4} textAnchor="start" fontSize={13} className="pointer-events-none">
          <tspan fontWeight={500} fill="var(--foreground)">{name}</tspan>
          <tspan fill="var(--muted-foreground)" className="tabular-nums"> · {share}%</tspan>
        </text>
      )}
    </g>
  );
}

function SankeyLink({ sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth, payload }: SankeyLinkProps) {
  const { active, setActive } = useContext(HoverContext);
  const source = payload.source.name;
  const target = payload.target.name;
  const selected = active?.type === "link" && active.source === source && active.target === target;
  const related = active?.type === "node" && (active.name === source || active.name === target);
  const opacity = active === null ? 0.32 : selected || related ? 0.7 : 0.08;

  return (
    <path
      d={`M${sourceX},${sourceY} C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
      fill="none"
      stroke={colors[source] ?? "var(--muted-foreground)"}
      strokeWidth={Math.max(1, linkWidth)}
      strokeOpacity={opacity}
      className="transition-[stroke-opacity] duration-200 ease-out"
      onMouseEnter={() => setActive({ type: "link", source, target })}
      onMouseLeave={() => setActive(null)}
    />
  );
}

export default function SankeyChartCard() {
  const [active, setActive] = useState<ActiveFlow>(null);
  const [rangeId, setRangeId] = useState<RangeId>(ranges[0].id);
  const range = ranges.find(({ id }) => id === rangeId) ?? ranges[0];
  const nodeValues = Object.fromEntries(nodeNames.map((name) => [
    name,
    range.links.filter((link) => link.source === name).reduce((sum, link) => sum + link.value, 0)
      || range.links.filter((link) => link.target === name).reduce((sum, link) => sum + link.value, 0),
  ]));
  const sinkTotal = nodeNames.filter((name) => !sourceNames.has(name)).reduce((sum, name) => sum + nodeValues[name], 0);
  const sinkShares = Object.fromEntries(nodeNames.filter((name) => !sourceNames.has(name)).map((name) => [name, Math.round(nodeValues[name] / sinkTotal * 100)]));
  const total = range.links.filter((link) => link.source === nodeNames[0]).reduce((sum, link) => sum + link.value, 0);
  const activeFlow = active?.type === "link" ? range.links.find((link) => link.source === active.source && link.target === active.target) : undefined;
  const headline = activeFlow?.value ?? (active?.type === "node" ? nodeValues[active.name] : total);
  const headlineLabel = activeFlow ? `${activeFlow.source} → ${activeFlow.target}` : active?.type === "node" ? active.name : "Tracked time";
  const indexByName = new Map<string, number>(nodeNames.map((name, index): [string, number] => [name, index]));
  const chartData = {
    nodes: nodeNames.map((name) => ({ name })),
    links: range.links.map((link) => ({ source: indexByName.get(link.source)!, target: indexByName.get(link.target)!, value: link.value })),
  };

  return (
    <div className="space-y-5">
      <div className="mx-auto w-full max-w-[896px]">
        <ChartCard title="Tracked time" className="h-[480px]">
          <div className="mb-3 flex shrink-0 items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">{headlineLabel}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums"><CountUp value={headline} format={formatHours} /></p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" aria-label="Change period" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border bg-background px-2.5 text-sm text-foreground shadow-sm transition-colors hover:bg-accent">
                  <span>{range.label}</span><IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ranges.map((option) => <DropdownMenuItem key={option.id} onSelect={() => { setRangeId(option.id); setActive(null); }} aria-current={range.id === option.id ? "true" : undefined}>
                  {option.label}{range.id === option.id && <IconCheck aria-hidden="true" className="ml-auto size-4" />}
                </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="relative min-h-0 w-full flex-1" onMouseLeave={() => setActive(null)}>
            <ResponsiveContainer width="100%" height="100%">
              <HoverContext.Provider value={{ active, setActive, nodeValues, sinkShares, links: range.links }}>
                <Sankey key={range.id} data={chartData} nodeWidth={12} nodePadding={14} linkCurvature={0.55} iterations={32} sort={false} margin={{ top: 2, right: 150, bottom: 2, left: 88 }} node={SankeyNode} link={SankeyLink} />
              </HoverContext.Provider>
            </ResponsiveContainer>
          </div>
          <div className="flex w-full shrink-0 justify-between pb-1 text-[10px] text-muted-foreground"><span>Tracked time</span><span>Share of tracked time</span></div>
        </ChartCard>
      </div>
    </div>
  );
}
