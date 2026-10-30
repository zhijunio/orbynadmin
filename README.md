<div align="center">

# OrbynAdmin

An open-source enterprise admin dashboard starter built with Next.js, React, Tailwind CSS and shadcn/ui. It includes management views for teams, roles, integrations, activity, support and operations, alongside industry dashboards and reusable examples. Demo data lets you explore the interface without first connecting a backend.

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
- Interactive charts with [ApexCharts](https://apexcharts.com) and reusable tables built on [TanStack Table](https://tanstack.com/table)
- Conversation transitions use [Motion](https://motion.dev) and respect the system reduced-motion preference
- English and Simplified Chinese locale routing with [next-intl](https://next-intl.dev); translations cover navigation, shared controls, page titles, Overview, AI and SaaS dashboards, system settings, notifications, Tasks, Calendar and selected examples, while several page bodies remain English
- MapLibre maps, draggable Kanban boards and persisted theme preferences
- Auth pages: login, register, forgot / reset password, OTP and lock screen
- Written in TypeScript with locale-aware App Router routes

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
- [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- [ApexCharts](https://apexcharts.com) and [react-apexcharts](https://github.com/apexcharts/react-apexcharts) for charts
- [TanStack Table](https://tanstack.com/table) for data tables
- [dnd-kit](https://dndkit.com) for drag-and-drop interactions
- [MapLibre GL](https://maplibre.org), React Map GL and [React JVectorMap](https://github.com/kadoshms/react-jvectormap) for interactive maps
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
- **Examples:** ApexCharts (bar, line, pie, radial and radar), forms, data tables (basic, data and API CRUD), maps, FAQ, loading and error states, layout examples, UI elements and empty states

## Project structure

```
src/
  app/[locale]/
    (app)/           # dashboard pages (sidebar + header)
    (auth)/          # login, register, password reset, otp, lock
    errors/          # 403, 404, 500 and 503
    landing/         # landing, onboarding and utility pages
  components/        # app shell, charts, maps, tables, theme customizer and UI
  config/nav.ts      # sidebar navigation
  data/index.ts      # demo data
  i18n/              # locale routing and request configuration
  messages/          # English and Simplified Chinese translations
  stores/            # persisted theme configuration
```

All data is mock data. Replace `src/data/index.ts` (and the inline datasets on a few pages) with your own API.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zhijunio/orbynadmin)

## Credits

Geist and Geist Mono are licensed under OFL-1.1 and served by [ZeoSeven Fonts](https://fonts.zeoseven.com). Cryptocurrency icons are the respective projects' own brand marks (trademarks of their owners), drawn as inline SVGs in the flat style popularized by [theSVG](https://thesvg.org) and the [cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons) set. Demo avatars are generated with [DiceBear](https://www.dicebear.com). All names, balances, prices and figures throughout the template are fictional and for demonstration only.

## License

[MIT](LICENSE)
