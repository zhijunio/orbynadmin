export const contactRoles = ["Admin", "Editor", "Viewer"] as const;
export const contactStatuses = ["Active", "Invited"] as const;

export type ContactInput = {
  name: string;
  email: string;
  role: (typeof contactRoles)[number];
  status: (typeof contactStatuses)[number];
};
export type Contact = ContactInput & { id: string; createdAt: string };

type ContactField = keyof ContactInput;
type ValidationIssue = { path: ContactField[]; message: string };
type ValidationResult =
  | { success: true; data: ContactInput }
  | {
      success: false;
      error: {
        issues: ValidationIssue[];
        flatten: () => { fieldErrors: Partial<Record<ContactField, string[]>> };
      };
    };

export const contactInputSchema = {
  safeParse(value: unknown): ValidationResult {
    if (!value || typeof value !== "object") {
      return invalid([{ path: ["name"], message: "Enter a valid contact." }]);
    }

    const input = value as Record<string, unknown>;
    const data: ContactInput = {
      name: typeof input.name === "string" ? input.name.trim() : "",
      email: typeof input.email === "string" ? input.email.trim() : "",
      role: input.role as ContactInput["role"],
      status: input.status as ContactInput["status"],
    };
    const issues: ValidationIssue[] = [];

    if (data.name.length < 2) issues.push({ path: ["name"], message: "Enter at least 2 characters." });
    if (data.name.length > 80) issues.push({ path: ["name"], message: "Name must be 80 characters or fewer." });
    if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      issues.push({ path: ["email"], message: "Enter a valid email address." });
    }
    if (!contactRoles.includes(data.role)) issues.push({ path: ["role"], message: "Choose a valid role." });
    if (!contactStatuses.includes(data.status)) issues.push({ path: ["status"], message: "Choose a valid status." });

    return issues.length ? invalid(issues) : { success: true, data };
  },
};

function invalid(issues: ValidationIssue[]): ValidationResult {
  return {
    success: false,
    error: {
      issues,
      flatten: () => {
        const fieldErrors: Partial<Record<ContactField, string[]>> = {};
        for (const issue of issues) {
          const field = issue.path[0];
          if (field) (fieldErrors[field] ??= []).push(issue.message);
        }
        return { fieldErrors };
      },
    },
  };
}
