import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const groups = [
  { name: "Website", count: 18, color: "var(--chart-1)" },
  { name: "Email", count: 17, color: "var(--chart-2)" },
  { name: "Social Media", count: 17, color: "var(--muted-foreground)" },
];

export default function BarChartSix() {
  return (
    <ChartCard title="Bar Chart 6">
      <div className="space-y-6">
        <div className="flex h-8 w-full items-stretch gap-1" role="img" aria-label="Website, email, and social media share">
          {groups.flatMap(({ name, count, color }) => Array.from({ length: count }, (_, index) => (
            <span key={`${name}-${index}`} className="min-w-0 flex-1 rounded-[2px]" style={{ backgroundColor: color }} />
          )))}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {groups.map(({ name, color }) => (
            <div key={name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full" style={{ backgroundColor: color }} />{name}
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
