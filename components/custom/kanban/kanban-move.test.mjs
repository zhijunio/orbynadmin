import { test } from "node:test";
import assert from "node:assert/strict";
import { moveKanbanItem } from "./kanban-move.ts";

const board = {
  backlog: [{ id: "a" }, { id: "b" }],
  doing: [{ id: "c" }],
  done: [],
};

test("reorders a card inside its column", () => {
  const next = moveKanbanItem(board, "b", "a", (item) => item.id);
  assert.deepEqual(next.backlog.map((item) => item.id), ["b", "a"]);
  assert.deepEqual(board.backlog.map((item) => item.id), ["a", "b"]);
});

test("moves a card before another column's card", () => {
  const next = moveKanbanItem(board, "a", "c", (item) => item.id);
  assert.deepEqual(next.backlog.map((item) => item.id), ["b"]);
  assert.deepEqual(next.doing.map((item) => item.id), ["a", "c"]);
});

test("drops a card into an empty column", () => {
  const next = moveKanbanItem(board, "c", "column:done", (item) => item.id);
  assert.deepEqual(next.doing, []);
  assert.deepEqual(next.done.map((item) => item.id), ["c"]);
});

test("ignores a drop that does not change the board", () => {
  assert.equal(moveKanbanItem(board, "a", "a", (item) => item.id), null);
  assert.equal(moveKanbanItem(board, "missing", "column:done", (item) => item.id), null);
});
