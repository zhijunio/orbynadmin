export function escapeCsvCell(value: string | number): string {
  const raw = String(value);
  const safe = typeof value === "string" && /^[\s]*[=+@-]/.test(raw)
    ? `'${raw}`
    : raw;

  return `"${safe.replaceAll('"', '""')}"`;
}
