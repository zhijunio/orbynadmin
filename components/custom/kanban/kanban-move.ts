export function moveKanbanItem<T>(value: Record<string, T[]>, activeId: string, overId: string, getItemValue: (item: T) => string): Record<string, T[]> | null {
  const from = Object.keys(value).find((columnId) => value[columnId]?.some((item) => getItemValue(item) === activeId));
  if (!from || activeId === overId) return null;
  const fromItems = value[from];
  const fromIndex = fromItems.findIndex((item) => getItemValue(item) === activeId);
  const item = fromItems[fromIndex];
  const to = overId.startsWith("column:") ? overId.slice("column:".length) : Object.keys(value).find((columnId) => value[columnId]?.some((entry) => getItemValue(entry) === overId));
  if (!to || !(to in value)) return null;
  if (from === to) {
    if (overId.startsWith("column:")) return null;
    const toIndex = fromItems.findIndex((entry) => getItemValue(entry) === overId);
    if (toIndex < 0 || toIndex === fromIndex) return null;
    const next = fromItems.slice();
    next.splice(fromIndex, 1);
    next.splice(toIndex, 0, item);
    return { ...value, [from]: next };
  }
  const target = value[to].filter((entry) => getItemValue(entry) !== activeId);
  const overIndex = overId.startsWith("column:") ? target.length : target.findIndex((entry) => getItemValue(entry) === overId);
  const insertAt = overIndex < 0 ? target.length : overIndex;
  return {
    ...value,
    [from]: fromItems.filter((entry) => getItemValue(entry) !== activeId),
    [to]: [...target.slice(0, insertAt), item, ...target.slice(insertAt)],
  };
}
