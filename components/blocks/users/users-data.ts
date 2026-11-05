export const userBlockExamples = [
  { slug: "members-directory", title: "Members Directory", description: "Search workspace members, review access status, and apply role changes in bulk." },
  { slug: "member-details", title: "Member Details", description: "Review one member’s profile, access scope, authentication, and active sessions." },
  { slug: "role-permissions", title: "Role Permissions", description: "Compare workspace roles and edit grouped permissions while protecting Owner access." },
  { slug: "invitations-queue", title: "Invitations Queue", description: "Filter pending invitations and resend or revoke selected invites." },
  { slug: "access-requests", title: "Access Requests", description: "Review time-bound access requests against policy and approve them inline." },
  { slug: "audit-log", title: "Audit Log", description: "Inspect day-grouped member and access events, then export the current log." },
  { slug: "sso-scim-settings", title: "SSO & SCIM Settings", description: "Manage identity providers, provisioning, and sign-in policies." },
  { slug: "team-access-settings", title: "Team Access Settings", description: "Track seats, roles, guest access, pending invites, and admin alerts." },
] as const;

export type UserBlockSlug = (typeof userBlockExamples)[number]["slug"];

export function getUserBlockExample(slug: string) {
  return userBlockExamples.find((example) => example.slug === slug);
}
