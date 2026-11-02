"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useId } from "react"
import type { ReactNode } from "react"

type ValueFormatter = (value: number) => string | number
type AxisConfig = {
  categories?: (string | number)[]
  min?: number
  max?: number
  tickAmount?: number
  tickInterval?: number | "preserveStartEnd"
  type?: string
  labels?: { show?: boolean; formatter?: ValueFormatter; rotate?: number; [key: string]: unknown }
  [key: string]: unknown
}
type ChartSeries = { name?: string; data: unknown[]; type?: string }
type DonutTotalConfig = {
  show?: boolean
  label?: string
  color?: string
  formatter?: (context: { globals: { seriesTotals: number[]; labels: string[] } }) => string
  [key: string]: unknown
}
type RadialTotalConfig = {
  show?: boolean
  label?: string
  color?: string
  formatter?: (context: { globals: { seriesTotals: number[] } }) => string
  [key: string]: unknown
}
type PieConfig = {
  startAngle?: number
  endAngle?: number
  offsetY?: number
  donut?: { size?: string; labels?: { show?: boolean; total?: DonutTotalConfig; [key: string]: unknown }; [key: string]: unknown }
  [key: string]: unknown
}
type RadialConfig = {
  startAngle?: number
  endAngle?: number
  hollow?: { size?: string; [key: string]: unknown }
  track?: { background?: string; [key: string]: unknown }
  dataLabels?: {
    name?: { show?: boolean; [key: string]: unknown }
    value?: { show?: boolean; formatter?: ValueFormatter; [key: string]: unknown }
    total?: RadialTotalConfig
    [key: string]: unknown
  }
  [key: string]: unknown
}

export type RechartsConfig = {
  chart?: { stacked?: boolean; sparkline?: { enabled?: boolean }; [key: string]: unknown }
  colors?: string[]
  labels?: string[]
  dataLabels?: { enabled?: boolean; formatter?: ValueFormatter; [key: string]: unknown }
  fill?: { opacity?: number; gradient?: { opacityFrom?: number; opacityTo?: number; [key: string]: unknown }; [key: string]: unknown }
  grid?: { show?: boolean; borderColor?: string; strokeDashArray?: number | string; [key: string]: unknown }
  legend?: { show?: boolean; [key: string]: unknown }
  markers?: { size?: number; [key: string]: unknown }
  plotOptions?: {
    bar?: { horizontal?: boolean; distributed?: boolean; borderRadius?: number; columnWidth?: string; barHeight?: string; [key: string]: unknown }
    pie?: PieConfig
    radialBar?: RadialConfig
    [key: string]: unknown
  }
  stroke?: { curve?: string; show?: boolean; width?: number; colors?: string[]; [key: string]: unknown }
  tooltip?: { enabled?: boolean; y?: { formatter?: ValueFormatter }; [key: string]: unknown }
  xaxis?: AxisConfig | AxisConfig[]
  yaxis?: AxisConfig | AxisConfig[]
  [key: string]: unknown
}

type ChartType = "area" | "bar" | "line" | "pie" | "donut" | "radar" | "radialBar"

type Props = {
  options: RechartsConfig
  series: ChartSeries[] | number[]
  type: ChartType
  height: number | string
  className?: string
}

const tooltipContentStyle = {
  background: "var(--popover)",
  borderColor: "var(--border)",
  borderRadius: "var(--radius)",
}
const tooltipTextStyle = { color: "var(--popover-foreground)" }

function axisConfig(axis: AxisConfig | AxisConfig[] | undefined): AxisConfig {
  return Array.isArray(axis) ? axis[0] ?? {} : axis ?? {}
}

function numberValue(value: unknown): number {
  if (typeof value === "number") return value
  if (Array.isArray(value)) return numberValue(value[value.length - 1])
  if (value && typeof value === "object" && "y" in value) return numberValue(value.y)
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function pointLabel(value: unknown, index: number): string | number {
  if (value && typeof value === "object" && "x" in value && (typeof value.x === "string" || typeof value.x === "number")) return value.x
  return index + 1
}

function seriesRows(series: ChartSeries[], categories: (string | number)[] | undefined) {
  const count = Math.max(categories?.length ?? 0, ...series.map(({ data }) => data.length))
  return Array.from({ length: count }, (_, index) => {
    const row: Record<string, string | number> = { label: categories?.[index] ?? pointLabel(series[0]?.data[index], index) }
    for (const [seriesIndex, item] of series.entries()) row[`series-${seriesIndex}`] = numberValue(item.data[index])
    return row
  })
}

function toSeries(value: ChartSeries[] | number[]): ChartSeries[] {
  if (value.length === 0) return []
  if (typeof value[0] === "number") return [{ name: "Series", data: value as number[] }]
  return value as ChartSeries[]
}

function tooltipFormatter(options: RechartsConfig) {
  const formatter = options.tooltip?.y?.formatter
  return (value: unknown, name: unknown): [string, string] => [formatter ? String(formatter(numberValue(value))) : String(value ?? ""), String(name ?? "")]
}

function axisFormatter(axis: AxisConfig): ((value: number | string) => string) | undefined {
  const formatter = axis.labels?.formatter
  return formatter ? (value) => String(formatter(Number(value))) : undefined
}

function centerLabel(options: RechartsConfig, values: number[], labels: string[]) {
  const total = options.plotOptions?.pie?.donut?.labels?.total
  if (!total?.show) return null
  const totalValue = total.formatter?.({ globals: { seriesTotals: values, labels } }) ?? String(values.reduce((sum, value) => sum + value, 0))
  return <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-xl font-semibold tabular-nums">{totalValue}</span>{total.label && <span className="text-xs text-muted-foreground">{total.label}</span>}</div>
}

function PieContent({ options, series }: { options: RechartsConfig; series: ChartSeries[] }) {
  const numericSeries = series.flatMap(({ data }) => data.map(numberValue))
  const labels = options.labels ?? numericSeries.map((_, index) => `Item ${index + 1}`)
  const data = numericSeries.map((value, index) => ({ name: labels[index] ?? `Item ${index + 1}`, value }))
  const donut = options.plotOptions?.pie?.donut
  const innerRadius = donut ? donut.size ?? "65%" : 0
  const colors = options.colors ?? ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]
  const total = centerLabel(options, numericSeries, labels)

  return <div className="relative h-full w-full"><ResponsiveContainer width="100%" height="100%"><PieChart>
    {options.tooltip?.enabled !== false && <Tooltip formatter={tooltipFormatter(options)} contentStyle={tooltipContentStyle} itemStyle={tooltipTextStyle} labelStyle={tooltipTextStyle} />}
    <Pie data={data} dataKey="value" nameKey="name" innerRadius={innerRadius} outerRadius="88%" paddingAngle={0} stroke={options.stroke?.colors?.[0] ?? "none"} strokeWidth={options.stroke?.width ?? 0} startAngle={options.plotOptions?.pie?.startAngle} endAngle={options.plotOptions?.pie?.endAngle} cy={options.plotOptions?.pie?.offsetY ? "58%" : "50%"} isAnimationActive>
      {data.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
    </Pie>
    {options.legend?.show && <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: 12 }} />}
  </PieChart></ResponsiveContainer>{total}</div>
}

function RadialContent({ options, series }: { options: RechartsConfig; series: ChartSeries[] }) {
  const values = series.flatMap(({ data }) => data.map(numberValue))
  const names = options.labels ?? series.map(({ name }, index) => name ?? `Series ${index + 1}`)
  const data = values.map((value, index) => ({ name: names[index] ?? `Series ${index + 1}`, value, fill: options.colors?.[index % (options.colors?.length ?? 1)] ?? `var(--chart-${(index % 5) + 1})` }))
  const total = options.plotOptions?.radialBar?.dataLabels?.total
  const valueLabel = options.plotOptions?.radialBar?.dataLabels?.value
  const totalText = total?.show ? total.formatter?.({ globals: { seriesTotals: values } }) ?? `${Math.round(values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1))}%` : null
  const singleValueText = values.length === 1 && valueLabel?.show
    ? valueLabel.formatter?.(values[0]) ?? `${Math.round(values[0])}%`
    : null

  return <div className="relative h-full w-full"><ResponsiveContainer width="100%" height="100%"><RadialBarChart data={data} layout="radial" innerRadius={options.plotOptions?.radialBar?.hollow?.size ?? "38%"} outerRadius="92%" startAngle={options.plotOptions?.radialBar?.startAngle ?? 90} endAngle={options.plotOptions?.radialBar?.endAngle ?? -270}>
    <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
    <PolarRadiusAxis type="category" dataKey="name" tick={false} axisLine={false} />
    <RadialBar dataKey="value" background={{ fill: options.plotOptions?.radialBar?.track?.background ?? "var(--muted)" }} cornerRadius={8} isAnimationActive>
      {data.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
    </RadialBar>
    {options.tooltip?.enabled !== false && <Tooltip formatter={tooltipFormatter(options)} contentStyle={tooltipContentStyle} itemStyle={tooltipTextStyle} labelStyle={tooltipTextStyle} />}
    {options.legend?.show && <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: 12 }} />}
  </RadialBarChart></ResponsiveContainer>{(totalText || singleValueText) && <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">{totalText && <span className="text-xs text-muted-foreground">{total?.label ?? "Average"}</span>}<span className="text-lg font-semibold tabular-nums">{totalText ?? singleValueText}</span></div>}<div className="sr-only">{data.map(({ name, value }) => `${name}: ${value}%`).join("; ")}</div></div>
}

export function RechartsChart({ options, series: inputSeries, type, height, className }: Props) {
  const chartId = useId().replaceAll(":", "")
  const series = toSeries(inputSeries)
  const xAxis = axisConfig(options.xaxis)
  const yAxis = axisConfig(options.yaxis)
  const data = seriesRows(series, xAxis.categories)
  const sparkline = Boolean(options.chart?.sparkline?.enabled)
  const colors = options.colors ?? ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]
  const horizontal = type === "bar" && Boolean(options.plotOptions?.bar?.horizontal)
  const requestedBarSize = horizontal ? options.plotOptions?.bar?.barHeight : options.plotOptions?.bar?.columnWidth
  const barCategoryGap = requestedBarSize ? `${(100 - Number.parseFloat(requestedBarSize)) / 2}%` : "30%"
  const stacked = Boolean(options.chart?.stacked)
  const tick = { fontSize: 12, fill: "var(--muted-foreground)" }
  const commonTooltip = options.tooltip?.enabled === false ? null : <Tooltip formatter={tooltipFormatter(options)} contentStyle={tooltipContentStyle} itemStyle={tooltipTextStyle} labelStyle={tooltipTextStyle} />
  const commonGrid = !sparkline && options.grid?.show !== false && <CartesianGrid stroke={options.grid?.borderColor ?? "var(--border)"} strokeDasharray={String(options.grid?.strokeDashArray ?? 3)} vertical={false} />
  const commonXAxis = !sparkline && <XAxis dataKey={horizontal ? undefined : "label"} type={horizontal ? "number" : "category"} hide={xAxis.labels?.show === false} interval={xAxis.tickInterval} tickFormatter={horizontal ? axisFormatter(xAxis) : undefined} tickLine={false} axisLine={false} tickMargin={8} tick={tick} />
  const commonYAxis = !sparkline && <YAxis dataKey={horizontal ? "label" : undefined} type={horizontal ? "category" : "number"} hide={yAxis.labels?.show === false} width={horizontal ? 100 : 48} domain={horizontal ? undefined : [yAxis.min ?? "auto", yAxis.max ?? "auto"]} tickCount={yAxis.tickAmount} tickFormatter={horizontal ? undefined : axisFormatter(yAxis)} tickLine={false} axisLine={false} tick={tick} />
  const commonLegend = options.legend?.show && <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: 12 }} />
  const rootStyle = { width: "100%", height: typeof height === "number" ? height : height === "100%" ? "100%" : height }

  let content: ReactNode
  if (type === "pie" || type === "donut") {
    content = <PieContent options={options} series={series} />
  } else if (type === "radialBar") {
    content = <RadialContent options={options} series={series} />
  } else if (type === "radar") {
    content = <ResponsiveContainer width="100%" height="100%"><RadarChart data={data}>
      <PolarGrid stroke="var(--border)" />
      <PolarAngleAxis dataKey="label" tick={tick} />
      <PolarRadiusAxis domain={[yAxis.min ?? 0, yAxis.max ?? "auto"]} tickCount={yAxis.tickAmount} tick={tick} axisLine={false} />
      {series.map((item, index) => <Radar key={item.name ?? index} name={item.name ?? `Series ${index + 1}`} dataKey={`series-${index}`} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} fillOpacity={options.fill?.opacity ?? 0.2} dot={{ r: 3, fill: colors[index % colors.length] }} label={options.dataLabels?.enabled ? { fill: "var(--foreground)", fontSize: 11 } : false} />)}
      {commonTooltip}{commonLegend}
    </RadarChart></ResponsiveContainer>
  } else {
    const chartProps = { data, margin: { top: 8, right: 12, bottom: 4, left: 0 } }
    const seriesElements = series.map((item, index) => {
      const color = colors[index % colors.length]
      const dataKey = `series-${index}`
      if (type === "bar") return <Bar key={item.name ?? index} name={item.name ?? `Series ${index + 1}`} dataKey={dataKey} fill={color} stroke={options.stroke?.show ? options.stroke.colors?.[0] : undefined} strokeWidth={options.stroke?.show ? options.stroke.width : undefined} radius={options.plotOptions?.bar?.borderRadius ?? 3} stackId={stacked ? "stack" : undefined} label={options.dataLabels?.enabled ? { position: horizontal ? "right" : "top", fill: "var(--foreground)", fontSize: 11, formatter: options.dataLabels.formatter ? (value) => String(options.dataLabels?.formatter?.(numberValue(value)) ?? value) : undefined } : false} isAnimationActive>{options.plotOptions?.bar?.distributed && data.map((row, cellIndex) => <Cell key={`${String(row.label)}-${cellIndex}`} fill={colors[cellIndex % colors.length]} />)}</Bar>
      if (type === "line") return <Line key={item.name ?? index} name={item.name ?? `Series ${index + 1}`} dataKey={dataKey} type={options.stroke?.curve === "straight" ? "linear" : "monotone"} stroke={color} strokeWidth={options.stroke?.width ?? 2} dot={options.markers?.size !== 0} activeDot={{ r: Math.max(3, options.markers?.size ?? 4) }} isAnimationActive />
      return <Area key={item.name ?? index} name={item.name ?? `Series ${index + 1}`} dataKey={dataKey} type={options.stroke?.curve === "straight" ? "linear" : "monotone"} stroke={color} fill={options.fill?.gradient ? `url(#${chartId}-area-${index})` : color} fillOpacity={options.fill?.gradient ? 1 : options.fill?.opacity ?? 0.2} strokeWidth={options.stroke?.width ?? 2} stackId={stacked ? "stack" : undefined} dot={options.markers?.size !== 0} isAnimationActive />
    })

    if (type === "bar") {
      content = <ResponsiveContainer width="100%" height="100%"><BarChart {...chartProps} layout={horizontal ? "vertical" : "horizontal"} barCategoryGap={barCategoryGap}>
        {commonGrid}{commonXAxis}{commonYAxis}{commonTooltip}{commonLegend}{seriesElements}
      </BarChart></ResponsiveContainer>
    } else if (type === "line") {
      content = <ResponsiveContainer width="100%" height="100%"><LineChart {...chartProps}>
        {commonGrid}{commonXAxis}{commonYAxis}{commonTooltip}{commonLegend}{seriesElements}
      </LineChart></ResponsiveContainer>
    } else {
      content = <ResponsiveContainer width="100%" height="100%"><AreaChart {...chartProps}>
        {options.fill?.gradient && <defs>{series.map((item, index) => <linearGradient key={item.name ?? index} id={`${chartId}-area-${index}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors[index % colors.length]} stopOpacity={options.fill?.gradient?.opacityFrom ?? 0.3} /><stop offset="100%" stopColor={colors[index % colors.length]} stopOpacity={options.fill?.gradient?.opacityTo ?? 0} /></linearGradient>)}</defs>}
        {commonGrid}{commonXAxis}{commonYAxis}{commonTooltip}{commonLegend}{seriesElements}
      </AreaChart></ResponsiveContainer>
    }
  }

  return <div className={className} style={rootStyle} role="img" aria-label={`${type} chart`}>{content}</div>
}
