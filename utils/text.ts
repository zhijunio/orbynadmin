export function getInitials(name: string, uppercase = false): string {
  const initials = name
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return uppercase ? initials.toUpperCase() : initials;
}
