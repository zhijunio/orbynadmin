import { test } from "node:test";
import assert from "node:assert/strict";
import { matchesFilterQuery } from "./filters-query.ts";

test("filter query combines nested groups and numeric conditions", () => {
  const query = { id: "root", combinator: "and", rules: [
    { id: "a", field: "amount", operator: "gt", value: "100" },
    { id: "nested", combinator: "or", rules: [
      { id: "b", field: "status", operator: "is", value: "paid" },
      { id: "c", field: "name", operator: "contains", value: "design" },
    ] },
  ] };
  assert.equal(matchesFilterQuery({ amount: 120, status: "paid", name: "Hosting" }, query), true);
  assert.equal(matchesFilterQuery({ amount: 90, status: "paid", name: "Design" }, query), false);
  assert.equal(matchesFilterQuery({ amount: 120, status: "draft", name: "Design audit" }, query), true);
  assert.equal(matchesFilterQuery({ amount: 120, status: "draft", name: "Hosting" }, query), false);
});

test("empty queries show all records and missing values do not match", () => {
  assert.equal(matchesFilterQuery({}, { id: "root", combinator: "and", rules: [] }), true);
  assert.equal(matchesFilterQuery({}, { id: "root", combinator: "and", rules: [{ id: "a", field: "amount", operator: "lt", value: "100" }] }), false);
});

test("range and multiple-choice filters preserve typed values", () => {
  const between = { id: "q", combinator: "and", rules: [{ id: "r", field: "amount", operator: "between", value: ["100", "200"] }] };
  assert.equal(matchesFilterQuery({ amount: 150 }, between), true);
  assert.equal(matchesFilterQuery({ amount: 50 }, between), false);
  const choices = { id: "q", combinator: "and", rules: [{ id: "r", field: "status", operator: "in", value: ["paid", "pending"] }] };
  assert.equal(matchesFilterQuery({ status: "paid" }, choices), true);
  assert.equal(matchesFilterQuery({ status: "overdue" }, choices), false);
});
