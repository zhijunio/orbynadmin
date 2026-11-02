export const funnelStages = [
  { name: "Link opened", value: 197, fill: "var(--chart-1)" },
  { name: "Started", value: 110, fill: "var(--chart-2)" },
  { name: "Completed", value: 77, fill: "var(--chart-3)" },
  { name: "Converted", value: 38, fill: "var(--chart-4)" },
];

export const funnelMaxValue = funnelStages[0].value;

export const funnelRanges = [
  { id: "7d", label: "Last 7 days", headline: 197, delta: 0.052, stages: funnelStages },
  {
    id: "30d",
    label: "Last 30 days",
    headline: 842,
    delta: 0.034,
    stages: [
      { name: "Link opened", value: 842, fill: "var(--chart-1)" },
      { name: "Started", value: 463, fill: "var(--chart-2)" },
      { name: "Completed", value: 301, fill: "var(--chart-3)" },
      { name: "Converted", value: 152, fill: "var(--chart-4)" },
    ],
  },
  {
    id: "90d",
    label: "Last 90 days",
    headline: 2510,
    delta: -0.018,
    stages: [
      { name: "Link opened", value: 2510, fill: "var(--chart-1)" },
      { name: "Started", value: 1380, fill: "var(--chart-2)" },
      { name: "Completed", value: 902, fill: "var(--chart-3)" },
      { name: "Converted", value: 455, fill: "var(--chart-4)" },
    ],
  },
] as const;

export const pipelineStages = [
  { name: "Visits", value: 1180, fill: "var(--chart-1)" },
  { name: "Sign-up", value: 790, fill: "var(--chart-2)" },
  { name: "Active", value: 460, fill: "var(--chart-3)" },
  { name: "Pro", value: 250, fill: "var(--chart-4)" },
  { name: "Team", value: 120, fill: "var(--chart-5)" },
  { name: "Enterprise", value: 40, fill: "var(--chart-1)" },
];

export const pipelineMaxValue = pipelineStages[0].value;
