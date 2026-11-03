"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function activity(day: number, month: number) {
  if (day === 10 && month === 6) {
    return { move: 35, exercise: 68, run: 72, steps: 32459, moveAmount: "816 kcal", exerciseAmount: "1h 41m", runAmount: "5.2 km" };
  }
  const move = (day * 13 + month * 7) % 100;
  const exercise = (day * 9 + month * 11) % 100;
  const run = (day * 17 + month * 5) % 100;
  return { move, exercise, run, steps: 18000 + ((day * 733 + month * 419) % 17000), moveAmount: `${Math.round(move * 16)} kcal`, exerciseAmount: `${Math.round(exercise * 1.05)} min`, runAmount: `${(run / 19).toFixed(1)} km` };
}

const rings = [
  { key: "move", label: "Move", amount: "moveAmount", color: "var(--chart-3)", radius: 92 },
  { key: "exercise", label: "Exercise", amount: "exerciseAmount", color: "var(--chart-2)", radius: 70 },
  { key: "run", label: "Running", amount: "runAmount", color: "var(--chart-4)", radius: 48 },
] as const;

export default function MostActiveDaysCard() {
  const [selected, setSelected] = useState({ month: 6, day: 10 });
  const [visibleMonth, setVisibleMonth] = useState(6);
  const calendarRef = useRef<HTMLDivElement>(null);
  const monthRefs = useRef<Array<HTMLElement | null>>([]);
  const selectedActivity = activity(selected.day, selected.month);

  function scrollToMonth(month: number) {
    const calendar = calendarRef.current;
    const section = monthRefs.current[month];
    if (!calendar || !section) return;
    const top = section.getBoundingClientRect().top - calendar.getBoundingClientRect().top + calendar.scrollTop;
    calendar.scrollTo({ top, behavior: "smooth" });
  }

  useEffect(() => {
    const calendar = calendarRef.current;
    const section = monthRefs.current[6];
    if (calendar && section) calendar.scrollTop = section.getBoundingClientRect().top - calendar.getBoundingClientRect().top + calendar.scrollTop;
  }, []);

  function handleCalendarScroll() {
    const calendar = calendarRef.current;
    if (!calendar) return;
    const threshold = calendar.getBoundingClientRect().top + 12;
    const month = monthRefs.current.reduce((last, section, index) => section && section.getBoundingClientRect().top <= threshold ? index : last, -1);
    if (month >= 0) setVisibleMonth(month);
  }

  return (
    <div className="space-y-5">
      <div className="grid w-full gap-4 md:grid-cols-2">
            <section className="flex h-[330px] min-w-0 flex-col gap-4 rounded-[20px] bg-muted/45 p-[10px]" aria-label={`${months[selected.month]} activity calendar`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-muted-foreground">Most active days</p>
                  <p className="mt-1 text-[24px] font-semibold leading-none tabular-nums">{selectedActivity.steps.toLocaleString()} <span className="text-[12px] font-normal text-muted-foreground">total steps</span></p>
                </div>
                <div className="sticky top-0 flex h-8 min-w-[128px] shrink-0 items-center justify-between gap-1 rounded-[10px] border bg-background px-1 py-1 shadow-xs" aria-label="Calendar month">
                  <button type="button" aria-label="Previous month" disabled={visibleMonth === 0} onClick={() => scrollToMonth(visibleMonth - 1)} className="grid size-5 shrink-0 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-35"><IconChevronLeft size={16} stroke={2.5} /></button>
                  <span className="min-w-0 flex-1 text-center text-[14px] font-medium">{months[visibleMonth]}</span>
                  <button type="button" aria-label="Next month" disabled={visibleMonth === 11} onClick={() => scrollToMonth(visibleMonth + 1)} className="grid size-5 shrink-0 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-35"><IconChevronRight size={16} stroke={2.5} /></button>
                </div>
              </div>

              <div ref={calendarRef} onScroll={handleCalendarScroll} className="mt-[10px] max-h-[232px] min-h-0 overflow-y-auto rounded-[16px] bg-background p-[12px]" role="grid" aria-label="2026 activity calendar">
                {months.map((month, monthIndex) => {
                  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
                  return <section key={month} ref={(node) => { monthRefs.current[monthIndex] = node; }} aria-label={`${month} 2026`} className="mb-[8px] last:mb-0">
                    <p className="mb-[4px] text-[16px] font-medium">{month.slice(0, 3)}</p>
                    <div className="grid grid-cols-7 gap-x-[4px] gap-y-[4px]">
                      {Array.from({ length: daysInMonth }, (_, index) => {
                        const day = index + 1;
                        const value = activity(day, monthIndex);
                        const isSelected = selected.month === monthIndex && selected.day === day;
                        return <button key={day} type="button" role="gridcell" aria-label={`${month} ${day}, ${value.steps.toLocaleString()} steps`} aria-selected={isSelected} onClick={() => setSelected({ month: monthIndex, day })} className={`flex h-[78px] min-w-0 flex-col items-center justify-center gap-[10px] rounded-[12px] border-2 p-[10px] transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring ${isSelected ? "border-border bg-background" : "border-transparent"}`}>
                          <span className="text-[14px] tabular-nums">{day}</span>
                          <MiniRings value={value} />
                        </button>;
                      })}
                    </div>
                  </section>;
                })}
                </div>
            </section>

            <section className="flex h-[330px] min-w-0 flex-col gap-4 rounded-[20px] bg-muted/45 p-[10px]" aria-label={`Activity for ${months[selected.month]} ${selected.day}, 2026`}>
              <p className="text-[14px] text-muted-foreground">Activity for {months[selected.month]} {selected.day}, 2026</p>
              <div className="mt-[8px] grid grid-cols-3 gap-[8px]">
                {rings.map((ring) => <div key={ring.key} className="min-w-0 rounded-[12px] bg-background px-[10px] py-[8px]">
                  <p className="flex items-center gap-[6px] truncate text-[14px] text-muted-foreground"><i className="size-[10px] shrink-0 rounded-full" style={{ backgroundColor: ring.color }} />{ring.label}</p>
                  <p className="mt-[4px] truncate text-[14px] font-medium tabular-nums">{selectedActivity[ring.amount]}</p>
                </div>)}
              </div>
              <div className="grid flex-1 place-items-center py-3">
                <ActivityRings value={selectedActivity} />
              </div>
            </section>
      </div>
    </div>
  );
}

function MiniRings({ value }: { value: ReturnType<typeof activity> }) {
  return (
    <svg viewBox="0 0 28 28" className="size-[36px]" aria-hidden="true">
      {rings.map((ring) => {
        const circumference = 2 * Math.PI * (ring.radius / 8);
        const progress = value[ring.key];
        const radius = ring.radius / 8;
        return <g key={ring.key} transform="rotate(-90 14 14)"><circle cx="14" cy="14" r={radius} fill="none" stroke={ring.color} strokeOpacity="0.16" strokeWidth="2.5" /><circle cx="14" cy="14" r={radius} fill="none" stroke={ring.color} strokeWidth="2.5" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress / 100)} strokeLinecap="round" /></g>;
      })}
    </svg>
  );
}

function ActivityRings({ value }: { value: ReturnType<typeof activity> }) {
  return (
    <svg viewBox="0 0 240 240" className="size-[190px] max-h-full max-w-full" role="img" aria-label={`Move ${value.move}%, Exercise ${value.exercise}%, Running ${value.run}%`}>
      {rings.map((ring) => {
        const circumference = 2 * Math.PI * ring.radius;
        const progress = value[ring.key];
        return <g key={ring.key} transform="rotate(-90 120 120)"><circle cx="120" cy="120" r={ring.radius} fill="none" stroke={ring.color} strokeOpacity="0.16" strokeWidth="8" /><circle cx="120" cy="120" r={ring.radius} fill="none" stroke={ring.color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress / 100)} strokeLinecap="round" /></g>;
      })}
    </svg>
  );
}
