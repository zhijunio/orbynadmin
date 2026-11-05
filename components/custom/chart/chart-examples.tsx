"use client";

import { useId, useState, type ComponentProps } from "react";
import { useReducedMotion } from "motion/react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Label, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, RadialBar, RadialBarChart, Rectangle, ReferenceLine, Sector, XAxis, YAxis, type PieSectorDataItem } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart/chart";
import { Button } from "@/components/ui/button/button";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control/segmented-control";


function monthlyData(locale: string) {
  return [186, 305, 237, 173, 209, 214].map((desktop, index) => ({ desktop, mobile: [80, 200, 120, 190, 130, 140][index], forecast: index >= 3 ? desktop + 60 : undefined, month: new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1)) }));
}

function DepthBar({ x, y, width, height, fill, ...props }: ComponentProps<typeof Rectangle>) {
  const left = Number(x), top = Number(y), w = Number(width), h = Number(height);
  return <g><Rectangle {...props} x={left} y={top} width={w} height={h} fill={fill} /><path d={`M${left},${top} l8,-6 h${w} l-8,6 Z`} fill={fill} opacity={0.65} /><path d={`M${left + w},${top} l8,-6 v${h} l-8,6 Z`} fill={fill} opacity={0.45} /></g>;
}

export function ChartExample({ example }: { example: number }) {
  const locale = "en-US";
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const data = monthlyData(locale);
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" }, forecast: { label: "Forecast", color: "var(--chart-3)" }, paid: { label: "Paid", color: "var(--chart-1)" }, pending: { label: "Pending", color: "var(--chart-2)" }, overdue: { label: "Overdue", color: "var(--chart-3)" }, high: { label: "High", color: "var(--chart-1)" }, medium: { label: "Medium", color: "var(--chart-2)" }, low: { label: "Low", color: "var(--chart-3)" } };
  const patternId = `${id}-pattern`;
  const gradientId = `${id}-gradient`;
  const glowId = `${id}-glow`;
  const defs = <defs>
    <linearGradient id={gradientId} x1="0" y1="0" x2={example === 10 ? "1" : "0"} y2="1"><stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.95} /><stop offset="100%" stopColor={example === 10 ? "var(--color-mobile)" : "var(--color-desktop)"} stopOpacity={0.15} /></linearGradient>
    <pattern id={patternId} patternUnits="userSpaceOnUse" width={8} height={8}><rect width={8} height={8} fill="var(--color-desktop)" opacity={0.1} />{[4, 9, 15].includes(example) ? <circle cx={4} cy={4} r={1.3} fill="var(--color-desktop)" /> : <path d={example === 18 ? "M0,0 L8,8 M0,8 L8,0" : "M-2,2 L2,-2 M0,8 L8,0 M6,10 L10,6"} stroke="var(--color-desktop)" strokeWidth={1.5} />}</pattern>
    <filter id={glowId}><feGaussianBlur stdDeviation={2} result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
  </defs>;
  const axis = <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />;
  const tooltip = <ChartTooltip cursor={false} content={<ChartTooltipContent />} />;
  const legend = <ChartLegend content={<ChartLegendContent />} />;
  if (example <= 12) {
    const horizontal = example === 12;
    const pattern = [3, 4, 5, 9].includes(example);
    const fill = pattern ? `url(#${patternId})` : [6, 7, 10].includes(example) ? `url(#${gradientId})` : "var(--color-desktop)";
    return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={["Basic bar chart","Multi-dataset bar chart","Diagonal stripe bar chart","Dotted pattern bar chart","Striped and solid bar chart","3D gradient bar chart","Gradient bar chart","3D isometric bar chart","Dotted and solid bar chart","Duotone gradient bar chart","Animated monochrome bar chart","Vertical bar chart","Gradient area chart with stripe overlay","Stacked area chart with dashed strokes","Step area chart with dotted pattern fill","Area chart with glowing dot markers","Forecast line chart with stripe pattern zone","Stacked area chart with crosshatch pattern fill","Donut chart with center total","Donut chart with center stats","Bug priority pie with stripe patterns","Active segment donut with center label","Radar chart with gradient fill","Filled radar with glowing stroke","Lighthouse scores radial with labels"][example - 1]}><BarChart accessibilityLayer data={data} layout={horizontal ? "vertical" : "horizontal"} margin={{ top: 12, right: 12 }}>
      {defs}<CartesianGrid vertical={false} />{horizontal ? <><XAxis type="number" hide /><YAxis type="category" dataKey="month" axisLine={false} tickLine={false} width={36} /></> : axis}{tooltip}{legend}
      <Bar dataKey="desktop" fill={fill} radius={example === 8 ? 0 : 4} shape={[6, 8].includes(example) ? <DepthBar /> : undefined} isAnimationActive={example === 11 && reduced === false} />{[2, 5, 9].includes(example) && <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false} />}
    </BarChart></ChartContainer>;
  }
  if (example <= 18) {
    if (example === 17) return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={"Monthly visitors by device"}><ComposedChart accessibilityLayer data={data}>{defs}<CartesianGrid vertical={false} />{axis}{tooltip}{legend}<Area dataKey="forecast" stroke="none" fill={`url(#${patternId})`} legendType="none" tooltipType="none" isAnimationActive={false} /><Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} isAnimationActive={false} /><Line dataKey="forecast" stroke="var(--color-forecast)" strokeDasharray="5 4" strokeWidth={2} isAnimationActive={false} /></ComposedChart></ChartContainer>;
    return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={"Monthly visitors by device"}><AreaChart accessibilityLayer data={data}>{defs}<CartesianGrid vertical={false} />{axis}{tooltip}{legend}
      <Area dataKey="desktop" type={example === 15 ? "step" : "monotone"} stroke="var(--color-desktop)" strokeWidth={2} strokeDasharray={example === 14 ? "5 3" : undefined} stackId={[14, 18].includes(example) ? "visitors" : undefined} fill={[15, 18].includes(example) ? `url(#${patternId})` : `url(#${gradientId})`} dot={example === 16 ? { r: 4, fill: "var(--color-desktop)", filter: `url(#${glowId})` } : false} isAnimationActive={false} />{example === 13 && <Area dataKey="desktop" type="monotone" stroke="none" fill={`url(#${patternId})`} legendType="none" tooltipType="none" isAnimationActive={false} />}{[14, 18].includes(example) && <Area dataKey="mobile" stackId="visitors" type="monotone" stroke="var(--color-mobile)" strokeDasharray="5 3" fill="var(--color-mobile)" fillOpacity={0.2} isAnimationActive={false} />}
    </AreaChart></ChartContainer>;
  }
  if (example <= 22) {
    const totals = example === 21 ? [{ name: "high", value: 48, fill: `url(#${patternId})` }, { name: "medium", value: 32, fill: "var(--color-medium)" }, { name: "low", value: 20, fill: "var(--color-low)" }] : [{ name: "desktop", value: data.reduce((sum, row) => sum + row.desktop, 0), fill: "var(--color-desktop)" }, { name: "mobile", value: data.reduce((sum, row) => sum + row.mobile, 0), fill: "var(--color-mobile)" }];
    const total = totals.reduce((sum, item) => sum + item.value, 0);
    const center = example === 22 ? totals[active].value : total;
    return <div className="w-full"><ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={"Monthly visitors by device"}><PieChart accessibilityLayer>{defs}<ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} /><Pie activeShape={example === 22 ? ({ outerRadius = 0, ...props }: PieSectorDataItem) => <Sector {...props} outerRadius={outerRadius + 10} /> : undefined} data={totals} dataKey="value" nameKey="name" innerRadius={example === 21 ? 0 : 65} outerRadius={95} paddingAngle={3} onClick={(_, index) => { if (example === 22) setActive(index); }} isAnimationActive={false}>{example !== 21 && <Label content={({ viewBox }) => viewBox && "cx" in viewBox ? <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle"><tspan className="fill-foreground text-2xl font-semibold">{center.toLocaleString(locale)}</tspan><tspan x={viewBox.cx} dy={23} className="fill-muted-foreground text-xs">{example === 22 ? config[totals[active].name].label : example === 20 ? "Visitors" : "Total"}</tspan></text> : null} />}</Pie>{legend}</PieChart></ChartContainer>{example === 20 && <p className="text-center text-xs text-muted-foreground">{`Desktop share: ${Math.round(totals[0].value / total * 100)}%`}</p>}{example === 22 && <div className="flex justify-center gap-2">{totals.map((item, index) => <Button key={item.name} size="sm" variant={active === index ? "default" : "outline"} aria-pressed={active === index} onClick={() => setActive(index)}>{config[item.name].label}</Button>)}</div>}</div>;
  }
  if (example === 25) {
    const scores = [{ name: "Performance", score: 92, fill: "var(--chart-1)" }, { name: "Accessibility", score: 98, fill: "var(--chart-2)" }, { name: "Best practices", score: 88, fill: "var(--chart-3)" }];
    return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={"Lighthouse scores radial with labels"}><RadialBarChart accessibilityLayer data={scores} innerRadius="25%" outerRadius="95%" startAngle={90} endAngle={-270}><PolarAngleAxis type="number" domain={[0, 100]} tick={false} /><RadialBar background dataKey="score" label={{ position: "insideStart", fill: "var(--foreground)", fontSize: 12 }} isAnimationActive={false} /><ChartTooltip content={<ChartTooltipContent hideLabel />} /></RadialBarChart></ChartContainer>;
  }
  return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={"Monthly visitors by device"}><RadarChart accessibilityLayer data={data}>{defs}<PolarGrid /><PolarAngleAxis dataKey="month" />{tooltip}{legend}<Radar dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} fill={`url(#${gradientId})`} filter={example === 24 ? `url(#${glowId})` : undefined} fillOpacity={0.5} isAnimationActive={false} /></RadarChart></ChartContainer>;
}

const axisProps = { tickLine: false, axisLine: false, tickMargin: 8 } as const;
const chartClass = "h-72 w-full aspect-auto";

export function VisitorLineChart({ curve }: { curve: "monotone" | "step" }) {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" } };
  return <ChartContainer config={config} className={chartClass} aria-label={curve === "monotone" ? "Smooth line chart" : "Step line chart"}>
    <LineChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Line dataKey="desktop" type={curve} stroke="var(--color-desktop)" strokeWidth={2} dot={false} isAnimationActive={false} />
    </LineChart>
  </ChartContainer>;
}

export function ComboChart() {
  const data = monthlyData("en-US").map((row) => ({ month: row.month, desktop: row.desktop, share: Math.round((row.mobile / (row.desktop + row.mobile)) * 100) }));
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, share: { label: "Mobile share", color: "var(--chart-2)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Desktop visitors and mobile share">
    <ComposedChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} />
      <YAxis yAxisId="count" tickLine={false} axisLine={false} width={32} />
      <YAxis yAxisId="share" orientation="right" tickLine={false} axisLine={false} width={40} tickFormatter={(value) => `${value}%`} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
      <Bar yAxisId="count" dataKey="desktop" fill="var(--color-desktop)" radius={4} isAnimationActive={false} />
      <Line yAxisId="share" dataKey="share" type="monotone" stroke="var(--color-share)" strokeWidth={2} dot={false} isAnimationActive={false} />
    </ComposedChart>
  </ChartContainer>;
}

const lastYearVisitors = [160, 250, 220, 190, 175, 198];

export function YearComparisonChart() {
  const rows = monthlyData("en-US").map((row, index) => ({ month: row.month, current: row.desktop, previous: lastYearVisitors[index] }));
  const [month, setMonth] = useState<string | null>(null);
  const point = rows.find((row) => row.month === month);
  const currentTotal = rows.reduce((sum, row) => sum + row.current, 0);
  const previousTotal = rows.reduce((sum, row) => sum + row.previous, 0);
  const heading = point ? `${point.month}: ${point.current.toLocaleString("en-US")} this year, ${point.previous.toLocaleString("en-US")} last year` : `${currentTotal.toLocaleString("en-US")} this year, ${previousTotal.toLocaleString("en-US")} last year`;
  const config: ChartConfig = { current: { label: "This year", color: "var(--chart-1)" }, previous: { label: "Last year", color: "var(--chart-2)" } };
  return <div className="grid w-full gap-3">
    <p className="text-sm font-medium" data-slot="year-heading">{heading}</p>
    <ChartContainer config={config} className={chartClass} aria-label="Visitors this year and last year">
      <ComposedChart accessibilityLayer data={rows} onMouseMove={(state) => { const label = state?.activeLabel; setMonth(typeof label === "string" || typeof label === "number" ? String(label) : null); }} onMouseLeave={() => setMonth(null)}>
        <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><ChartTooltip cursor={false} content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
        <Area dataKey="current" type="monotone" fill="var(--color-current)" fillOpacity={0.2} stroke="var(--color-current)" strokeWidth={2} isAnimationActive={false} />
        <Line dataKey="previous" type="monotone" stroke="var(--color-previous)" strokeDasharray="5 4" strokeWidth={2} dot={false} isAnimationActive={false} />
      </ComposedChart>
    </ChartContainer>
  </div>;
}

export function PercentStackedAreaChart() {
  const data = monthlyData("en-US").map((row) => {
    const desktop = Math.round((row.desktop / (row.desktop + row.mobile)) * 100);
    return { month: row.month, desktop, mobile: 100 - desktop };
  });
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Desktop and mobile share by month">
    <AreaChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><YAxis tickLine={false} axisLine={false} width={40} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
      <Area dataKey="desktop" type="monotone" stackId="share" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={0.35} isAnimationActive={false} />
      <Area dataKey="mobile" type="monotone" stackId="share" stroke="var(--color-mobile)" fill="var(--color-mobile)" fillOpacity={0.35} isAnimationActive={false} />
    </AreaChart>
  </ChartContainer>;
}

export function VisitorPieChart() {
  const data = monthlyData("en-US");
  const slices = [
    { name: "desktop", value: data.reduce((sum, row) => sum + row.desktop, 0), fill: "var(--color-desktop)" },
    { name: "mobile", value: data.reduce((sum, row) => sum + row.mobile, 0), fill: "var(--color-mobile)" },
  ];
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Desktop and mobile visitor pie">
    <PieChart accessibilityLayer>
      <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
      <Pie data={slices} dataKey="value" nameKey="name" innerRadius={0} outerRadius={95} isAnimationActive={false} />
      <ChartLegend content={<ChartLegendContent />} />
    </PieChart>
  </ChartContainer>;
}

const weekVisitors = [
  { label: "Mon", desktop: 32, mobile: 20 },
  { label: "Tue", desktop: 41, mobile: 22 },
  { label: "Wed", desktop: 28, mobile: 15 },
  { label: "Thu", desktop: 36, mobile: 18 },
  { label: "Fri", desktop: 44, mobile: 25 },
  { label: "Sat", desktop: 18, mobile: 30 },
  { label: "Sun", desktop: 12, mobile: 16 },
];

export function PeriodChart() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const data = period === "week" ? weekVisitors : monthlyData("en-US").map((row) => ({ label: row.month, desktop: row.desktop, mobile: row.mobile }));
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } };
  return <div className="grid w-full gap-3">
    <SegmentedControl aria-label="Chart period" value={period} onValueChange={(value) => setPeriod(value === "month" ? "month" : "week")} className="w-fit">
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
    <ChartContainer config={config} className={chartClass} aria-label={period === "week" ? "Visitors this week" : "Visitors by month"}>
      <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} /><XAxis dataKey="label" {...axisProps} /><ChartTooltip cursor={false} content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} isAnimationActive={false} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  </div>;
}

export function StackedBarChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Stacked desktop and mobile visitors">
    <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><ChartTooltip cursor={false} content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey="desktop" stackId="visitors" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} isAnimationActive={false} />
      <Bar dataKey="mobile" stackId="visitors" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
    </BarChart>
  </ChartContainer>;
}

export function DivergingBarChart() {
  const data = monthlyData("en-US").map((row, index) => ({ month: row.month, change: row.desktop - lastYearVisitors[index] }));
  const config: ChartConfig = { change: { label: "Change", color: "var(--chart-1)" }, increase: { label: "Increase", color: "var(--chart-1)" }, decrease: { label: "Decrease", color: "var(--chart-3)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Change in desktop visitors from last year">
    <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><YAxis tickLine={false} axisLine={false} width={32} /><ReferenceLine y={0} stroke="var(--border)" />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Bar dataKey="change" radius={4} isAnimationActive={false}>{data.map((row) => <Cell key={row.month} fill={row.change >= 0 ? "var(--color-increase)" : "var(--color-decrease)"} />)}</Bar>
    </BarChart>
  </ChartContainer>;
}

const monthlyGoal = 220;

export function GoalLineChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, goal: { label: "Goal", color: "var(--chart-3)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Desktop visitors against a monthly goal">
    <LineChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><YAxis tickLine={false} axisLine={false} width={32} />
      <ReferenceLine y={monthlyGoal} stroke="var(--color-goal)" strokeDasharray="4 4" label={{ value: "Goal", position: "insideTopRight", fill: "var(--muted-foreground)", fontSize: 12 }} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} isAnimationActive={false} />
    </LineChart>
  </ChartContainer>;
}

export function VisitorSlopeChart() {
  const data = monthlyData("en-US");
  const points = [data[0], data[data.length - 1]].map((row) => ({ month: row.month, desktop: row.desktop, mobile: row.mobile }));
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Visitor change from the first month to the last">
    <LineChart accessibilityLayer data={points} margin={{ top: 12, right: 24, left: 12 }}>
      <XAxis dataKey="month" {...axisProps} /><YAxis tickLine={false} axisLine={false} width={32} /><ChartTooltip cursor={false} content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
      <Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={{ r: 4 }} isAnimationActive={false} />
      <Line dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={{ r: 4 }} isAnimationActive={false} />
    </LineChart>
  </ChartContainer>;
}

export function VisitorSparkline() {
  const data = monthlyData("en-US");
  const latest = data[data.length - 1];
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } };
  return <div className="grid w-full gap-2">
    <p className="text-sm text-muted-foreground">{`${latest.month}: ${latest.desktop.toLocaleString("en-US")} desktop, ${latest.mobile.toLocaleString("en-US")} mobile`}</p>
    <ChartContainer config={config} initialDimension={{ width: 320, height: 64 }} className="h-16 w-full aspect-auto" aria-label="Visitor sparkline">
      <LineChart accessibilityLayer data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ChartContainer>
  </div>;
}

function LollipopBar({ x, y, width, height, fill, ...props }: ComponentProps<typeof Rectangle>) {
  const left = Number(x), top = Number(y), barWidth = Number(width), barHeight = Number(height);
  const stem = Math.max(2, barWidth * 0.16);
  return <g><Rectangle {...props} x={left + (barWidth - stem) / 2} y={top} width={stem} height={barHeight} fill={fill} radius={0} /><circle cx={left + barWidth / 2} cy={top} r={5} fill={fill} /></g>;
}

export function DepthBarChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Desktop visitors as depth bars">
    <BarChart accessibilityLayer data={data} margin={{ top: 16, right: 20 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Bar dataKey="desktop" fill="var(--color-desktop)" shape={<DepthBar />} isAnimationActive={false} />
    </BarChart>
  </ChartContainer>;
}

export function LollipopChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" } };
  return <ChartContainer config={config} className={chartClass} aria-label="Desktop visitors as lollipop bars">
    <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
      <CartesianGrid vertical={false} /><XAxis dataKey="month" {...axisProps} /><ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Bar dataKey="desktop" fill="var(--color-desktop)" shape={<LollipopBar />} isAnimationActive={false} />
    </BarChart>
  </ChartContainer>;
}

const hourWeights = [0.35, 0.7, 1.15, 1.3, 0.95, 0.45];
const heatmapHours = ["00", "04", "08", "12", "16", "20"];

export function VisitorHeatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cells = weekVisitors.flatMap((day, dayIndex) => heatmapHours.map((hour, hourIndex) => ({ day: days[dayIndex], hour, value: Math.round((day.desktop + day.mobile) * hourWeights[hourIndex]) })));
  const max = Math.max(...cells.map((cell) => cell.value));
  const tone = (value: number) => value / max < 0.35 ? "bg-primary/15" : value / max < 0.6 ? "bg-primary/40" : value / max < 0.8 ? "bg-primary/70" : "bg-primary";
  return <div className="grid w-full gap-3" role="img" aria-label="Visitors by weekday and hour">
    <div className="grid grid-cols-[2.5rem_repeat(6,minmax(0,1fr))] gap-1">
      <span />
      {heatmapHours.map((hour) => <span key={hour} className="text-center text-[10px] text-muted-foreground">{hour}</span>)}
      {days.map((day) => <div key={day} className="contents">
        <span className="self-center text-[10px] text-muted-foreground">{day}</span>
        {cells.filter((cell) => cell.day === day).map((cell) => <span key={cell.hour} title={`${cell.day} ${cell.hour}:00, ${cell.value} visitors`} className={`h-5 rounded-sm ${tone(cell.value)}`} />)}
      </div>)}
    </div>
    <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span>Fewer</span><span className="size-3 rounded-sm bg-primary/15" /><span className="size-3 rounded-sm bg-primary/40" /><span className="size-3 rounded-sm bg-primary/70" /><span className="size-3 rounded-sm bg-primary" /><span>More</span></p>
  </div>;
}

const visitorRegions = [
  { name: "North America", visitors: 895, share: "41%", color: "var(--chart-1)", d: "M24 53l18-20 30-5 21 10 24-2 25 18-8 17-24 8-8 20-19 8-9-21-21-7-13-15-19 4z" },
  { name: "South America", visitors: 131, share: "6%", color: "var(--chart-2)", d: "M145 100l20-4 17 14-4 23-10 30-10-17-3-23-13-8z" },
  { name: "Europe", visitors: 546, share: "25%", color: "var(--chart-3)", d: "M226 46l15-10 19 5 4 14-14 10-18-5z" },
  { name: "Africa", visitors: 87, share: "4%", color: "var(--chart-4)", d: "M238 82l27-7 21 15-5 28-18 25-13-21-3-20-16-9z" },
  { name: "Asia Pacific", visitors: 459, share: "21%", color: "var(--chart-5)", d: "M270 42l30-10 36 5 27 12 34 1 31 22-11 20-24 9-20-11-25 10-18-14-24 2-19-15-20 1-12-14z" },
  { name: "Australia", visitors: 66, share: "3%", color: "var(--primary)", d: "M388 128l19-9 20 8-7 16-21 3z" },
];

export function VisitorRegionMap() {
  return <div className="grid w-full gap-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(8rem,0.7fr)]">
    <svg viewBox="0 0 500 190" role="img" aria-label="Visitor share by region" className="h-48 w-full">
      {visitorRegions.map((region) => <path key={region.name} d={region.d} fill={region.color} fillOpacity={0.55} stroke="var(--background)" strokeWidth={1.2}><title>{`${region.name}: ${region.visitors.toLocaleString("en-US")} visitors`}</title></path>)}
    </svg>
    <ul className="grid content-center gap-2 text-xs">
      {visitorRegions.map((region) => <li key={region.name} className="flex items-center gap-2"><span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: region.color }} /><span className="min-w-0 flex-1 truncate">{region.name}</span><span className="tabular-nums text-muted-foreground">{region.share}</span></li>)}
    </ul>
  </div>;
}

function flowColumn(items: { id: string; label: string; value: number; color: string }[], x: number) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const gap = 12;
  const usable = 148 - gap * (items.length - 1);
  let y = 8;
  return items.map((item) => {
    const height = (item.value / total) * usable;
    const node = { ...item, x, y, height };
    y += height + gap;
    return node;
  });
}

export function VisitorSankey() {
  const totals = monthlyData("en-US").reduce((sum, row) => ({ desktop: sum.desktop + row.desktop, mobile: sum.mobile + row.mobile }), { desktop: 0, mobile: 0 });
  const desktopNew = Math.round(totals.desktop * 0.56);
  const mobileNew = Math.round(totals.mobile * 0.6);
  const sources = flowColumn([
    { id: "desktop", label: "Desktop", value: totals.desktop, color: "var(--chart-1)" },
    { id: "mobile", label: "Mobile", value: totals.mobile, color: "var(--chart-2)" },
  ], 78);
  const targets = flowColumn([
    { id: "new", label: "New", value: desktopNew + mobileNew, color: "var(--chart-3)" },
    { id: "returning", label: "Returning", value: totals.desktop - desktopNew + totals.mobile - mobileNew, color: "var(--chart-4)" },
  ], 246);
  const links = [
    { from: "desktop", to: "new", value: desktopNew },
    { from: "desktop", to: "returning", value: totals.desktop - desktopNew },
    { from: "mobile", to: "new", value: mobileNew },
    { from: "mobile", to: "returning", value: totals.mobile - mobileNew },
  ];
  const used = new Map<string, number>();
  const span = (id: string, value: number, nodes: typeof sources) => {
    const node = nodes.find((item) => item.id === id)!;
    const start = used.get(id) ?? 0;
    const height = (value / node.value) * node.height;
    used.set(id, start + height);
    return { x: node.x, y: node.y + start, height, color: node.color };
  };
  return <svg viewBox="0 0 360 172" role="img" aria-label="Desktop and mobile visitors flowing to new and returning" className="h-52 w-full">
    {links.map((link) => {
      const source = span(link.from, link.value, sources);
      const target = span(link.to, link.value, targets);
      const path = `M${source.x + 8} ${source.y} C${source.x + 70} ${source.y}, ${target.x - 62} ${target.y}, ${target.x} ${target.y} L${target.x} ${target.y + target.height} C${target.x - 62} ${target.y + target.height}, ${source.x + 70} ${source.y + source.height}, ${source.x + 8} ${source.y + source.height} Z`;
      return <path key={`${link.from}-${link.to}`} d={path} fill={source.color} fillOpacity={0.28} />;
    })}
    {[...sources, ...targets].map((node) => <g key={node.id}><rect x={node.x} y={node.y} width={8} height={node.height} rx={2} fill={node.color} /><text x={node.x < 120 ? node.x - 8 : node.x + 14} y={node.y + node.height / 2} textAnchor={node.x < 120 ? "end" : "start"} dominantBaseline="middle" className="fill-foreground text-[11px]">{node.label}</text></g>)}
  </svg>;
}

export function VisitorStatusTracker() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rows = [
    { label: "Desktop", goal: 30, values: weekVisitors.map((day) => day.desktop) },
    { label: "Mobile", goal: 20, values: weekVisitors.map((day) => day.mobile) },
  ];
  return <div className="grid w-full gap-3" role="img" aria-label="Days that met the visitor goal">
    <div className="grid grid-cols-[4.5rem_repeat(7,minmax(0,1fr))] gap-1 text-center text-[10px] text-muted-foreground"><span /><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
    {rows.map((row) => <div key={row.label} className="grid grid-cols-[4.5rem_repeat(7,minmax(0,1fr))] items-center gap-1">
      <span className="text-xs">{row.label}</span>
      {row.values.map((value, index) => <span key={days[index]} title={`${row.label} ${days[index]}: ${value} visitors, goal ${row.goal}`} className={`h-2.5 rounded-full ${value >= row.goal ? "bg-primary" : "bg-muted"}`} />)}
    </div>)}
    <p className="flex items-center gap-3 text-[10px] text-muted-foreground"><span className="flex items-center gap-1"><span className="size-2 rounded-full bg-primary" />Met goal</span><span className="flex items-center gap-1"><span className="size-2 rounded-full bg-muted" />Below goal</span></p>
  </div>;
}
