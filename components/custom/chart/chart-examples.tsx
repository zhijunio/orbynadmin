"use client";

import { useId, useState, type ComponentProps } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, RadialBar, RadialBarChart, Rectangle, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart/chart";
import { Button } from "@/components/ui/buttons/button";

function DepthBar({ x, y, width, height, fill, ...props }: ComponentProps<typeof Rectangle>) {
  const left = Number(x), top = Number(y), w = Number(width), h = Number(height);
  return <g><Rectangle {...props} x={left} y={top} width={w} height={h} fill={fill} /><path d={`M${left},${top} l8,-6 h${w} l-8,6 Z`} fill={fill} opacity={0.65} /><path d={`M${left + w},${top} l8,-6 v${h} l-8,6 Z`} fill={fill} opacity={0.45} /></g>;
}

export function ChartExample({ example }: { example: number }) {
  const t = useTranslations("ComponentMigration.Chart");
  const c = useTranslations("ComponentMigration.Common");
  const locale = useLocale();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const data = [186, 305, 237, 173, 209, 214].map((desktop, index) => ({ desktop, mobile: [80, 200, 120, 190, 130, 140][index], forecast: index >= 3 ? desktop + 60 : undefined, month: new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1)) }));
  const config: ChartConfig = { desktop: { label: t("desktop"), color: "var(--chart-1)" }, mobile: { label: t("mobile"), color: "var(--chart-2)" }, forecast: { label: t("forecast"), color: "var(--chart-3)" }, paid: { label: c("paid"), color: "var(--chart-1)" }, pending: { label: c("pending"), color: "var(--chart-2)" }, overdue: { label: c("overdue"), color: "var(--chart-3)" } };
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
    return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={t(`examples.${example}`)}><BarChart accessibilityLayer data={data} layout={horizontal ? "vertical" : "horizontal"} margin={{ top: 12, right: 12 }}>
      {defs}<CartesianGrid vertical={false} />{horizontal ? <><XAxis type="number" hide /><YAxis type="category" dataKey="month" axisLine={false} tickLine={false} width={36} /></> : axis}{tooltip}{legend}
      <Bar dataKey="desktop" fill={fill} radius={example === 8 ? 0 : 4} shape={[6, 8].includes(example) ? <DepthBar /> : undefined} isAnimationActive={example === 11 && reduced === false} />{[2, 5, 9].includes(example) && <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false} />}
    </BarChart></ChartContainer>;
  }
  if (example <= 18) {
    if (example === 17) return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={t("visitors")}><LineChart accessibilityLayer data={data}>{defs}<CartesianGrid vertical={false} />{axis}{tooltip}{legend}<Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} isAnimationActive={false} /><Line dataKey="forecast" stroke="var(--color-forecast)" strokeDasharray="5 4" strokeWidth={2} isAnimationActive={false} /></LineChart></ChartContainer>;
    return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={t("visitors")}><AreaChart accessibilityLayer data={data}>{defs}<CartesianGrid vertical={false} />{axis}{tooltip}{legend}
      <Area dataKey="desktop" type={example === 15 ? "step" : "monotone"} stroke="var(--color-desktop)" strokeWidth={2} strokeDasharray={example === 14 ? "5 3" : undefined} stackId={example === 14 ? "visitors" : undefined} fill={[13, 15, 18].includes(example) ? `url(#${patternId})` : `url(#${gradientId})`} dot={example === 16 ? { r: 4, fill: "var(--color-desktop)", filter: `url(#${glowId})` } : false} isAnimationActive={false} />{example === 14 && <Area dataKey="mobile" stackId="visitors" type="monotone" stroke="var(--color-mobile)" strokeDasharray="5 3" fill="var(--color-mobile)" fillOpacity={0.2} isAnimationActive={false} />}
    </AreaChart></ChartContainer>;
  }
  if (example <= 22) {
    const totals = example === 21 ? [{ name: "paid", value: 48, fill: `url(#${patternId})` }, { name: "pending", value: 32, fill: "var(--color-pending)" }, { name: "overdue", value: 20, fill: "var(--color-overdue)" }] : [{ name: "desktop", value: 1324, fill: "var(--color-desktop)" }, { name: "mobile", value: 860, fill: "var(--color-mobile)" }];
    const total = totals.reduce((sum, item) => sum + item.value, 0);
    const center = example === 22 ? totals[active].value : total;
    return <div className="w-full"><ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={t("visitors")}><PieChart accessibilityLayer>{defs}<ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} /><Pie data={totals} dataKey="value" nameKey="name" innerRadius={example === 21 ? 0 : 65} outerRadius={95} paddingAngle={3} onClick={(_, index) => { if (example === 22) setActive(index); }} isAnimationActive={false}>{example !== 21 && <Label content={({ viewBox }) => viewBox && "cx" in viewBox ? <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle"><tspan className="fill-foreground text-2xl font-semibold">{center.toLocaleString(locale)}</tspan><tspan x={viewBox.cx} dy={23} className="fill-muted-foreground text-xs">{example === 22 ? config[totals[active].name].label : example === 20 ? t("visitorsLabel") : c("total")}</tspan></text> : null} />}</Pie>{legend}</PieChart></ChartContainer>{example === 22 && <div className="flex justify-center gap-2">{totals.map((item, index) => <Button key={item.name} size="sm" variant={active === index ? "default" : "outline"} aria-pressed={active === index} onClick={() => setActive(index)}>{config[item.name].label}</Button>)}</div>}</div>;
  }
  if (example === 25) {
    const scores = [{ name: t("performance"), score: 92, fill: "var(--chart-1)" }, { name: t("accessibility"), score: 98, fill: "var(--chart-2)" }, { name: t("quality"), score: 88, fill: "var(--chart-3)" }];
    return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={t("examples.25")}><RadialBarChart accessibilityLayer data={scores} innerRadius="25%" outerRadius="95%" startAngle={90} endAngle={-270}><PolarAngleAxis type="number" domain={[0, 100]} tick={false} /><RadialBar background dataKey="score" label={{ position: "insideStart", fill: "var(--foreground)", fontSize: 12 }} isAnimationActive={false} /><ChartTooltip content={<ChartTooltipContent hideLabel />} /></RadialBarChart></ChartContainer>;
  }
  return <ChartContainer config={config} className="h-72 w-full aspect-auto" aria-label={t("visitors")}><RadarChart accessibilityLayer data={data}>{defs}<PolarGrid /><PolarAngleAxis dataKey="month" />{tooltip}{legend}<Radar dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} fill={`url(#${gradientId})`} filter={example === 24 ? `url(#${glowId})` : undefined} fillOpacity={0.5} isAnimationActive={false} /></RadarChart></ChartContainer>;
}
