import { ChartCard } from "@/app/components/charts/showcase-chart-card";

const categories = [
  { name: "Activity", value: 72, color: "var(--chart-1)" },
  { name: "Online Purchases", value: 7, color: "var(--chart-2)" },
  { name: "Groceries", value: 4, color: "var(--chart-3)" },
  { name: "Digital Goods", value: 6, color: "var(--chart-4)" },
  { name: "Stationery", value: 2, color: "var(--chart-5)" },
  { name: "Others", value: 9, color: "var(--muted-foreground)" },
];

export default function BarChartSeven() {
  return (
    <ChartCard title="Bar Chart 7">
      <div className="space-y-5">
        <div className="flex h-7 overflow-hidden rounded-md" role="img" aria-label="Category distribution">
          {categories.map(({ name, value, color }) => (
            <span key={name} title={`${name}: ${value}%`} style={{ width: `${value}%`, backgroundColor: color }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          {categories.map(({ name, color }) => (
            <div key={name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />{name}
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
