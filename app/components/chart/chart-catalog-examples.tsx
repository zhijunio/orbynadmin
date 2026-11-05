"use client";

import type { ReactNode } from "react";
import { ChartExample, ComboChart, DepthBarChart, DivergingBarChart, GoalLineChart, LollipopChart, PercentStackedAreaChart, PeriodChart, StackedBarChart, VisitorHeatmap, VisitorLineChart, VisitorPieChart, VisitorRegionMap, VisitorSankey, VisitorSlopeChart, VisitorSparkline, VisitorStatusTracker, YearComparisonChart } from "@/components/custom/chart/chart-examples";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

const chartExamples: { key: string; title: string; description: string; chart: ReactNode }[] = [
  { key: "13", title: "Gradient Area Chart", description: "Area series with gradient fill and a striped overlay band.", chart: <ChartExample example={13} /> },
  { key: "14", title: "Stacked Area Chart", description: "Stack multiple series with dashed strokes between layers.", chart: <ChartExample example={14} /> },
  { key: "percent", title: "100% Stacked Area", description: "Each month fills the chart, so the series show share rather than volume.", chart: <PercentStackedAreaChart /> },
  { key: "year", title: "Year Comparison", description: "This year is an area and last year is a dashed line. Hover a month to put that month in the heading.", chart: <YearComparisonChart /> },
  { key: "1", title: "Basic Bar Chart", description: "Single metric by month with grid, tooltip, and legend.", chart: <ChartExample example={1} /> },
  { key: "2", title: "Multi-Dataset Bar Chart", description: "Compare desktop and mobile visitors in grouped bars.", chart: <ChartExample example={2} /> },
  { key: "stacked-bar", title: "Stacked Bar Chart", description: "Desktop and mobile visitors stack into one bar for each month.", chart: <StackedBarChart /> },
  { key: "diverging", title: "Diverging Bar Chart", description: "Each bar is this year's desktop visitors minus last year. Bars below zero are a decline.", chart: <DivergingBarChart /> },
  { key: "7", title: "Gradient Bar Chart", description: "Fill bars with a vertical gradient instead of a flat color.", chart: <ChartExample example={7} /> },
  { key: "depth", title: "Depth Bar Chart", description: "Each bar has a top and side face so the column reads as a solid.", chart: <DepthBarChart /> },
  { key: "lollipop", title: "Lollipop Chart", description: "A thin stem ends in a dot at the monthly desktop value.", chart: <LollipopChart /> },
  { key: "12", title: "Vertical Bar Chart", description: "Horizontal layout with category labels on the Y axis.", chart: <ChartExample example={12} /> },
  { key: "combo", title: "Combo Chart", description: "Desktop counts as bars, with mobile share on a separate right axis.", chart: <ComboChart /> },
  { key: "17", title: "Forecast Line Chart", description: "Solid lines for actuals and a dashed forecast with a shaded band.", chart: <ChartExample example={17} /> },
  { key: "smooth", title: "Smooth Line Chart", description: "A curved line through monthly desktop visitors.", chart: <VisitorLineChart curve="monotone" /> },
  { key: "step", title: "Step Line Chart", description: "Right-angle steps between the same monthly values.", chart: <VisitorLineChart curve="step" /> },
  { key: "goal", title: "Goal Line", description: "A dashed reference line marks the monthly desktop visitor goal.", chart: <GoalLineChart /> },
  { key: "19", title: "Donut Chart with Center Total", description: "Part-to-whole breakdown with the combined total in the center.", chart: <ChartExample example={19} /> },
  { key: "22", title: "Active Segment Donut", description: "Click a segment or button to emphasize it and update the center label.", chart: <ChartExample example={22} /> },
  { key: "pie", title: "Pie Chart", description: "Desktop and mobile visitor totals as a solid pie.", chart: <VisitorPieChart /> },
  { key: "25", title: "Radial Score Chart", description: "Lighthouse-style scores as labeled radial bars.", chart: <ChartExample example={25} /> },
  { key: "23", title: "Radar Chart", description: "Compare the same metric across months on a polar grid.", chart: <ChartExample example={23} /> },
  { key: "heatmap", title: "Heatmap", description: "Weekday rows and hour columns. Darker cells are busier.", chart: <VisitorHeatmap /> },
  { key: "sankey", title: "Sankey", description: "Desktop and mobile visitors split into new and returning.", chart: <VisitorSankey /> },
  { key: "map", title: "Region Map", description: "The same visitor total split across regions.", chart: <VisitorRegionMap /> },
  { key: "slope", title: "Slope Chart", description: "Desktop and mobile visitors from the first month to the last.", chart: <VisitorSlopeChart /> },
  { key: "sparkline", title: "Sparkline", description: "The same monthly series without axes, for a compact trend.", chart: <VisitorSparkline /> },
  { key: "status", title: "Status Tracker", description: "Each day is marked when that device met its visitor goal.", chart: <VisitorStatusTracker /> },
  { key: "period", title: "Period Switch", description: "Show the same visitor series for the current week or by month.", chart: <PeriodChart /> },
];

export function ChartCatalogExamples() {
  return (
    <CatalogGridItems>
      {chartExamples.map(({ key, title, description, chart }) => (
        <ComponentPreview key={key} title={title} description={description} layout="panel">
          {chart}
        </ComponentPreview>
      ))}
    </CatalogGridItems>
  );
}
