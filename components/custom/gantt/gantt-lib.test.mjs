import { test } from "node:test";
import assert from "node:assert/strict";
import { moveGanttEvent, ganttPosition } from "./gantt-lib.ts";

test("moving a task preserves its calendar duration across a month boundary", () => {
  const event = { id: "task", resourceId: "design", title: "Design", start: new Date(2026, 0, 30), end: new Date(2026, 1, 2) };
  const moved = moveGanttEvent(event, 3);
  assert.equal(moved.start.getDate(), 2);
  assert.equal(moved.start.getMonth(), 1);
  assert.equal(moved.end.getDate(), 5);
  assert.equal(event.start.getDate(), 30);
});
test("timeline clips tasks to the visible range and hides invalid or outside intervals", () => {
  const start = new Date(2026, 0, 5);
  assert.deepEqual(ganttPosition(new Date(2026, 0, 3), new Date(2026, 0, 8), start, 14), { offset: 0, duration: 3 });
  assert.equal(ganttPosition(new Date(2026, 0, 1), new Date(2026, 0, 4), start, 14), null);
  assert.equal(ganttPosition(new Date(2026, 0, 8), new Date(2026, 0, 7), start, 14), null);
});

test("summary progress is weighted by task duration and dependency constraints reject overlap", async () => {
  const { summarizeGanttResource, canScheduleGanttEvent } = await import('./gantt-lib.ts');
  const rows = [
    { id:'a',resourceId:'design',title:'Design',start:new Date(2026,0,1),end:new Date(2026,0,3),progress:100 },
    { id:'b',resourceId:'build',title:'Build',start:new Date(2026,0,3),end:new Date(2026,0,9),progress:0,dependencies:['a'] },
  ];
  const summary=summarizeGanttResource({id:'project',title:'Project',children:[{id:'design',title:'Design'},{id:'build',title:'Build'}]},rows);
  assert.equal(summary.progress,25);
  assert.equal(summary.start.getDate(),1);
  assert.equal(summary.end.getDate(),9);
  assert.equal(canScheduleGanttEvent(rows,{...rows[1],start:new Date(2026,0,2)}),false);
  assert.equal(canScheduleGanttEvent(rows,{...rows[1],start:new Date(2026,0,4)}),true);
});
