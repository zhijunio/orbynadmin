export type FilterOperator = "contains" | "is" | "is-not" | "gt" | "lt" | "between" | "in";
export type FilterValue = string | readonly string[];
export type FilterRule = { id: string; field: string; operator: FilterOperator; value: FilterValue };
export type FilterQuery = { id: string; combinator: "and" | "or"; rules: readonly (FilterRule | FilterQuery)[] };
export type FilterField = { id: string; label: string; path?: readonly string[] } & (
  | { type: "text" | "number" | "date" | "date-range" | "boolean" }
  | { type: "select" | "multi-select"; options: readonly { value: string; label: string; avatar?: string }[] }
);

/** Evaluate structured rules without mutating the record or query. */
export function matchesFilterQuery(record: Record<string, unknown>, query: FilterQuery): boolean {
  if (!query.rules.length) return true;
  const matches = (rule: FilterRule | FilterQuery): boolean => {
    if ("rules" in rule) return matchesFilterQuery(record, rule);
    const raw = Object.hasOwn(record, rule.field) ? record[rule.field] : undefined;
    if (raw === undefined || raw === null) return false;
    const value = String(raw).toLocaleLowerCase();
    const values = typeof rule.value === "string" ? [rule.value.toLocaleLowerCase()] : rule.value.map((item) => item.toLocaleLowerCase());
    const expected = values[0] ?? "";
    switch (rule.operator) {
      case "contains": return value.includes(expected);
      case "is": return value === expected;
      case "is-not": return value !== expected;
      case "gt": return value.trim() !== "" && expected.trim() !== "" && Number(value) > Number(expected);
      case "lt": return value.trim() !== "" && expected.trim() !== "" && Number(value) < Number(expected);
      case "in": return values.includes(value);
      case "between": {
        const last = values[1];
        if (!value || !expected || !last) return false;
        const numeric = [value, expected, last].every((item) => Number.isFinite(Number(item)));
        return numeric ? Number(value) >= Number(expected) && Number(value) <= Number(last) : value >= expected && value <= last;
      }
    }
  };
  return query.combinator === "and" ? query.rules.every(matches) : query.rules.some(matches);
}
