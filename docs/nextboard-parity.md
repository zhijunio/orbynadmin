# Nextboard admin dashboard coverage

Reviewed on 2026-10-30 against the local Nextboard checkout at `724b047775aefe88a954086fb17c7a7430a5eeea`. OrbynAdmin was reviewed on branch `chore/align-nextboard-tech-stack` at `76f72be77c45274eef514e9373133bfb7792b21a`, including the current worktree changes.

This is a product-scope comparison. It maps the Nextboard pages that serve an enterprise admin dashboard to OrbynAdmin routes; it does not claim that demo data is backed by production services.

A route inventory counted 108 Nextboard page routes and 132 OrbynAdmin page routes. After applying the aliases in the tables below, every enterprise-admin route has a matching OrbynAdmin route. `/admin/oauth2` remains excluded by request. The generic `/example/page/blank`, `/example/page/mail-success`, `/example/page/error` index, `/privacy` and `/terms` examples are not enterprise admin capabilities and are not carried over.

## Enterprise admin pages

| Nextboard page | OrbynAdmin page | Coverage |
| --- | --- | --- |
| `/dashboard` | `/dashboard` | Overview dashboard |
| `/dashboard/analytics` | `/dashboard/analytics` | Analytics dashboard |
| `/dashboard/commerce` | `/dashboard/ecommerce` | Commerce dashboard; OrbynAdmin keeps its existing e-commerce naming and modules |
| `/dashboard/crm` | `/dashboard/crm` | CRM dashboard |
| `/dashboard/ai` | `/dashboard/ai` | AI dashboard |
| `/dashboard/crypto` | `/dashboard/crypto` | Crypto dashboard |
| `/dashboard/finance` | `/dashboard/finance` | Finance dashboard |
| `/dashboard/logistics` | `/dashboard/logistics` | Logistics dashboard |
| `/dashboard/marketing` | `/dashboard/marketing` | Marketing dashboard |
| `/dashboard/saas` | `/dashboard/saas` | SaaS dashboard |
| `/dashboard/sales` | `/dashboard/sales` | Sales dashboard |
| `/dashboard/stocks` | `/dashboard/stocks` | Stocks dashboard |
| `/system/audit-log` | `/activity` | Activity and audit log |
| `/system/notification` | `/notifications` | Notification center |
| `/admin/permission` | `/roles` | Roles and permission matrix |
| `/admin/settings` and `/system/setting` | `/admin/settings` | Installation identity, administrator MFA and password policy; OAuth provider management is excluded |
| `/admin/profile` and `/user/settings/*` | `/profile` and `/settings` | Enterprise account profile and account preferences, security, notifications and billing |
| `/admin/user` | `/team` | Team directory, invitations and member actions |
| `/system/support` and `/system/support/[id]` | `/support` and `/support/[id]` | Support queue and ticket detail |
| `/system/help` and `/example/page/faq` | `/help` and `/examples/faq` | Help center and FAQ |

`/admin/oauth2` is intentionally excluded, as requested. OrbynAdmin also retains its own Healthcare, HR and Real Estate dashboards, commerce operations, project workspace and other product pages.

## Apps and examples

| Nextboard page | OrbynAdmin page | Coverage |
| --- | --- | --- |
| `/project/chat` | `/apps/chat` | Conversation list and message thread |
| `/project/mail/details` | `/apps/mail` | Mail list with message detail pane |
| `/other/file-manager` | `/apps/file-manager` | File workspace |
| `/other/search` | `/search` | Search results |
| `/example/page/integrations` | `/integrations` | Integration directory |
| `/example/chart/*` | `/examples/charts/*` | Bar, line, pie, radial and radar charts |
| `/example/form/*` | `/examples/forms/*` | Form elements and layouts |
| `/example/table/*` | `/examples/data-table/*` | Basic, data and API CRUD tables |
| `/example/map/*` | `/examples/maps/*` | Interactive and vector maps |
| `/example/layouts/*` | `/examples/layouts/*` | Dashboard shell layouts |
| `/example/ui-element/*` | `/examples/components/*` | Component examples |
| `/example/page/loading-state` | `/examples/loading-state` | Loading, error and empty states |
| `/example/page/empty-state` | `/examples/empty-states` | Empty state examples |
| Auth and individual error pages | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-otp`, `/lock`, `/errors/*` | Authentication and error flows |

OrbynAdmin additionally has dedicated Calendar, Tasks and Pricing pages. The generic Blank, Mail Success, Privacy and Terms pages from Nextboard are not carried over: they are utility, transaction-confirmation or legal-content examples rather than enterprise admin capabilities. Individual error routes are present; the separate error-page index route is not.

## Runtime and dependencies

Both projects use the same core stack for the migrated dashboard surfaces: Next.js App Router, React 19, TypeScript, Tailwind CSS 4, ApexCharts, dnd-kit, MapLibre, next-intl and Zustand. OrbynAdmin also uses Motion for focused transitions. It keeps its existing Radix-based UI components and does not add Nextboard-only packages unless an OrbynAdmin feature needs them.

English and Simplified Chinese locales are available. Translation covers navigation, shared controls, page titles, the Overview, AI and SaaS dashboards, FAQ and loading/layout examples, Tasks and Calendar, system settings, and the notification center including its sample entries and actions. Many other page bodies remain English, so full interface localization is still outstanding.

All listed page data and actions are demonstrations. A production deployment still needs application APIs, persistence, authentication and authorization wired to the host system; the UI parity does not imply those services exist.
