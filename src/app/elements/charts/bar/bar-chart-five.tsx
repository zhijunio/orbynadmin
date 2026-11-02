import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];
const activity = [
  [0.35, 0.2, 0.08, 0.62, 0.3, 0.45, 0.72],
  [0.85, 0.9, 0.95, 0.38, 0.42, 0.92, 0.98],
  [0.42, 0.28, 0.06, 0.75, 0.35, 0.78, 0.9],
  [0.3, 0.58, 0.38, 0.22, 0.34, 0.5, 0.62],
  [0.04, 0.35, 0.46, 0.52, 0.25, 0.08, 0.32],
  [0.22, 0.26, 0.05, 0.45, 0.3, 0.18, 0.4],
];

export default function BarChartFive() {
  return (
    <ChartCard title="Bar Chart 5">
      <div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] items-center gap-1.5 sm:gap-2" role="img" aria-label="Weekly activity heatmap by day and hour">
        {hours.flatMap((hour, rowIndex) => [
          <span key={`${hour}-label`} className="text-[10px] text-muted-foreground sm:text-xs">{hour}</span>,
          ...days.map((day, columnIndex) => (
            <span
              key={`${hour}-${day}`}
              className="h-7 rounded-md sm:h-8"
              style={{ backgroundColor: `color-mix(in oklab, var(--chart-1) ${Math.round(activity[rowIndex][columnIndex] * 100)}%, var(--muted))` }}
            />
          )),
        ])}
        <span aria-hidden="true" />
        {days.map((day) => <span key={day} className="pt-1 text-center text-[10px] font-medium text-muted-foreground sm:text-xs">{day}</span>)}
      </div>
    </ChartCard>
  );
}
