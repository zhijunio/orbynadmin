<div align="center">

# OrbynAdmin

An open-source enterprise admin dashboard starter built with Next.js, React, Tailwind CSS and Radix UI. It includes management views for teams, roles, integrations, activity, support and operations, alongside industry dashboards and reusable examples. Demo data lets you explore the interface without first connecting a backend.

Everything is MIT licensed. No pro tier, no locked components.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

**[Live demo](https://orbynadmin.vercel.app)** · [Getting started](#getting-started) · [What's included](#whats-included)

[Nextboard page coverage and scope](docs/nextboard-parity.md)

![OrbynAdmin dashboard](docs/screenshots/orbynadmin-dashboard.png)

</div>

## Features

- 100+ pages and views, including 15 dashboards: Overview, Analytics, E-Commerce, CRM, Crypto, Healthcare, Logistics, HR, Real Estate, Finance, Marketing, SaaS, Sales, Stocks and AI
- Light and dark mode
- A blue default theme and theme customizer for accent color, radius, font and sidebar layout; preferences persist across reloads
- Responsive down to mobile
- Compact card headers without repeated description copy; page-level guidance and action confirmations remain where they help users
- Command palette (⌘K), collapsible sidebar with nested menus, workspace switcher and account menu
- Interactive charts with [Recharts](https://recharts.org) and reusable tables built on [TanStack Table](https://tanstack.com/table)
- Conversation transitions use [Motion](https://motion.dev) and respect the system reduced-motion preference
- English and Simplified Chinese localization with [next-intl](https://next-intl.dev); translations cover navigation, shared controls, page titles, Overview, AI and SaaS dashboards, system settings, notifications, Tasks, Calendar and selected examples, while several page bodies remain English
- MapLibre maps, draggable Kanban boards and persisted theme preferences
- Auth pages: login, register, forgot / reset password, OTP and lock screen
- Written in TypeScript with feature-based App Router routes

## Screenshots

**Crypto / Web3 dashboard.** Portfolio value over time, allocation, a markets watchlist with sparklines, on-chain transactions and working buy / sell / send / swap / receive flows.

![Crypto dashboard](docs/screenshots/orbynadmin-crypto.png)

**Industry dashboards.** Ready-made starting points for Healthcare, Logistics, Human Resources and Real Estate, each with its own charts, tables and dialogs.

![Healthcare dashboard](docs/screenshots/orbynadmin-healthcare.png)

![Real estate dashboard](docs/screenshots/orbynadmin-real-estate.png)

**Analytics dashboard**

![Analytics dashboard](docs/screenshots/orbynadmin-analytics.png)

**Project management workspace.** Each project has an overview, a Kanban board, a list, a Gantt timeline, members and an activity feed.

![Project board](docs/screenshots/orbynadmin-project-board.png)

**AI assistant**

![AI assistant](docs/screenshots/orbynadmin-ai-assistant.png)

**Reusable data table.** Sorting, column visibility, selection, search and pagination.

![Data table](docs/screenshots/orbynadmin-data-table.png)

**Theme customizer and dark mode**

![Theme customizer](docs/screenshots/orbynadmin-theme-customizer.png)

![Dark mode](docs/screenshots/orbynadmin-dark-mode.png)

## Getting started

```bash
git clone https://github.com/zhijunio/orbynadmin.git
cd orbynadmin
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requires Node.js 20+. The legacy peer flag is needed because the vector map packages declare React 18 peer support while this project uses React 19.

```bash
npm run build   # production build
npm run start   # run the build
```

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com) primitives styled with Tailwind CSS
- [Recharts](https://recharts.org) for composable React charts
- [TanStack Table](https://tanstack.com/table) for data tables
- [dnd-kit](https://dndkit.com) for drag-and-drop interactions
- [MapLibre GL](https://maplibre.org) and React Map GL for interactive street and world maps
- [next-intl](https://next-intl.dev) for English and Simplified Chinese
- [Motion](https://motion.dev) for focused interface transitions with reduced-motion support
- Geist and Geist Mono served through [ZeoSeven Fonts](https://fonts.zeoseven.com) for web typography
- [Zustand](https://zustand.docs.pmnd.rs) for persisted theme configuration
- [Tabler Icons](https://tabler.io/icons)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- [DiceBear](https://www.dicebear.com) for the demo avatars

## What's included

- **Dashboards:** Overview, Analytics, E-Commerce, CRM, Crypto, Healthcare, Logistics, Human Resources, Real Estate, Finance, Marketing, SaaS, Sales, Stocks and AI
- **E-Commerce:** Products (data table + storefront grid), Orders, Customers, Invoices, Categories, Inventory, Discounts, Shipping, Reviews, Cart, Checkout (with list / detail / create / edit where it makes sense)
- **Project management:** Projects, a per-project workspace (Overview / Board / List / Timeline / Members / Activity), Team, Roles & Permissions, Contacts, Activity log
- **Apps:** AI Assistant, Chat, Mail, Calendar, Kanban, Tasks, Notes, File Manager, Support, Blog
- **Pages:** Profile, Settings, Developers (API keys & webhooks), Pricing, Integrations, Notifications, Help Center, Search
- **Auth:** Login, Register, Forgot / Reset password, OTP, Lock screen
- **Utility:** 404 / 403 / 500 / 503, Maintenance, Coming soon, Landing page, Onboarding
- **Chart examples:** 7 bar, 5 line, 5 pie, 3 radar and 6 radial examples, aligned to the current [TailAdmin Bar](https://nextjs-demo.tailadmin.com/bar-chart), [Line](https://nextjs-demo.tailadmin.com/line-chart), [Pie](https://nextjs-demo.tailadmin.com/pie-chart), [Radar](https://nextjs-demo.tailadmin.com/radar-chart) and [Radial](https://nextjs-demo.tailadmin.com/radial-chart) chart pages. They use Recharts and OrbynAdmin theme tokens.
- **Other examples:** Forms, data tables (basic, data and API CRUD), maps, FAQ, loading and error states, layout examples, UI elements and empty states

## Project structure

```
src/
  styles/             # global entry, theme tokens and typography
    globals.css
    theme.css
    typography.css
  app/
    dashboard/       # overview and industry dashboards
    commerce/        # products, orders, customers and operations
    workspace/       # projects, teams, contacts, roles and activity
    apps/            # chat, mail, calendar, tasks and other apps
    account/         # profile, settings, billing, support and authentication
    elements/        # UI element examples
    blocks/          # reusable module and page-block examples
    (public)/        # standalone public pages
    layout.tsx       # global providers; locale comes from cookie/browser language
  components/
    base/            # reusable controls grouped by component family
    application/     # reusable feature components, dashboards and app shell
    foundations/     # providers and app-wide infrastructure
  data/               # shared demo datasets
  utils/              # shared formatting, avatar and class-name helpers
  i18n/              # locale routing and request configuration
  messages/          # English and Simplified Chinese translations
```

`src/app/` groups routes directly by product function. Non-public pages compose the shared `ConsoleLayout` directly, following BoardUI's page-level `AppShell` pattern; the only Next.js layout file is `src/app/layout.tsx`. Module examples shown in the Blocks navigation live under `src/app/blocks/` and use `/blocks/...` URLs; UI element examples live under `src/app/elements/` and use `/elements/...` URLs. Public pages live under `(public)/` and do not use the console shell. English and Chinese messages are selected from the `NEXT_LOCALE` cookie, with the browser language as the initial fallback. Routes do not include a locale segment. `src/components/base/` contains low-level reusable controls, aligned with BoardUI's base layer. `src/components/application/` contains reusable product-feature components such as auth cards, dashboards, data tables, charts, maps and app-shell UI; files are grouped by feature and use kebab-case names, following BoardUI's application organization. Showcase helpers and UI example code live under `src/app/elements/` beside their routes. `/blocks` is a route group; there is no blocks or docs directory under `src/components/application`. `src/components/foundations/` contains providers and app-wide infrastructure. Shared navigation lives in `components/application/app-shell/nav-config.ts`, and theme presets and persisted theme state live together in `components/application/theme/`. Keep page-specific content, demo data, translations, route links, and scenario state with the relevant route. Keep `page.tsx` focused on composing base controls and Application components. `utils/` is for reusable stateless helpers, while `data/` holds shared demo datasets.

All data is mock data. Replace the datasets under `src/data/` (and the inline datasets on a few pages) with your own API.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zhijunio/orbynadmin)

## Credits

Geist and Geist Mono are licensed under OFL-1.1 and served by [ZeoSeven Fonts](https://fonts.zeoseven.com). Cryptocurrency icons are the respective projects' own brand marks (trademarks of their owners), drawn as inline SVGs in the flat style popularized by [theSVG](https://thesvg.org) and the [cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons) set. Demo avatars are generated with [DiceBear](https://www.dicebear.com). All names, balances, prices and figures throughout the template are fictional and for demonstration only.

## License

[MIT](LICENSE)
