<div align="center">

# NextRose

A clean component catalog built with Next.js, React, TypeScript and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

</div>

## What is included

- Base UI components and focused examples under `/components/*`
- A responsive application shell with a component menu and workspace switcher
- Light, dark and system appearance modes; theme customization for accent color, font, radius and layout
- English and Simplified Chinese language switching
- Account avatar menu with direct access to theme settings
- Shared UI primitives and focused interaction examples

The root route opens the Button component examples. Blocks and full-page templates will be added in a later migration.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm run start
```

## Project structure

```text
app/
  components/   # component example routes
  layout.tsx    # global providers
  page.tsx      # redirect to /components/button
components/
  ui/           # reusable base controls
  custom/       # application shell and showcase helpers
  theme-config.ts
  theme-config-store.ts
  theme-customizer.tsx
hooks/          # shared hooks
i18n/           # locale configuration
messages/       # English and Chinese messages
styles/         # global styles and theme tokens
utils/          # shared utilities
```

All example data is local and intended for showcase purposes. The project currently has no backend integration.

## License

[MIT](LICENSE)
