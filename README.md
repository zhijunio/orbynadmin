<div align="center">

# NextRose

A component library and interface framework built with Next.js, React, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

</div>

NextRose provides reusable UI components, interface patterns, and adaptable examples for building product interfaces. Explore the component catalog, combine blocks, and use the shared themes and application shells to shape an interface around your needs.

## What you can build with NextRose

- Use the component catalog to find controls and see their behavior.
- Use the Blocks catalog to explore possible page layouts and interactions. Blocks are examples to select, combine, and adapt. They do not define a single required product flow.
- Start from an application shell with navigation, sidebars, workspace controls, and theme settings.
- Build on shared UI components, custom feature components, and theme tokens.

The root route redirects to `/components/button`. Component catalog routes live under `/components/*`. Block examples live under `/blocks/*`.

## Get started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Use these scripts to lint, build, and run the production server:

```bash
npm run lint
npm run build
npm run start
```

## Project structure

```text
app/
  components/   # component catalog routes and examples
  blocks/       # block example routes
  layout.tsx    # root layout and providers
  page.tsx      # redirect to /components/button
components/
  ui/           # reusable base controls
  custom/       # feature components and catalog helpers
  blocks/       # reusable page and application blocks
  theme-config.ts
  theme-config-store.ts
  theme-customizer.tsx
content/        # static English UI copy
hooks/          # shared hooks
styles/         # global styles and theme tokens
utils/          # shared utilities
```

Example data is local and intended for demonstration. Connect the pages to your own backend and data sources when you adapt them.

## Organize component catalog pages

Catalog pages under `/components/*` use a shared page shell and consistent example layouts. The catalog prioritizes clear examples and easy scanning over matching the section counts of reference libraries. See [`docs/catalog-guidelines.md`](docs/catalog-guidelines.md) for the source guidelines.

### Build the page shell

Use a server `page.tsx` with `metadata`, `PageHeader`, and `CatalogPageGrid` from `@/components/custom/docs/catalog-sections`. Compose the page from `AppShell`, `PageHeader`, and this responsive grid:

```tsx
<div className="grid min-w-0 gap-5 xl:grid-cols-2 [&>*]:min-w-0">
```

Put interactive demos in `*-catalog-examples.tsx`. Add `"use client"` only when a demo uses hooks or event handlers. Reuse a renderer under `components/custom/<feature>/*-examples.tsx` when multiple pages need a substantial demo.

Data-family pages that only compose `CatalogSections` and client examples from `components/custom/*` can keep `*-catalog-examples.tsx` as a server module.

If a catalog module renders multiple `ComponentPreview` cards, wrap the cards in `CatalogGridItems` from `@/components/custom/docs/catalog-page-grid`. `CatalogSections` handles this wrapper itself.

### Name catalog files

Keep one primary `{Pascal}CatalogExamples` export per route. The filename uses the singular route slug. Large catalogs can split into focused files that the primary module composes.

| Location | File pattern | Purpose |
| --- | --- | --- |
| `app/components/<route>/` | `<route>-catalog-examples.tsx` | Primary examples module for the route |
| `app/components/<route>/` | `<route>-catalog-data.tsx` | Shared static demo data |
| `app/components/<route>/` | `<route>-catalog-demos.tsx` | Interactive demo bodies imported by the examples module |
| `components/custom/<feature>/` | `*-examples.tsx` | Reusable feature demo renderers |

Focused splits can use names such as `empty-basic-catalog-examples.tsx` or `date-picker-fields-catalog-examples.tsx`. Do not add parallel `*-examples.tsx` files under `app/components`.

### Choose an example layout

Use one of these three organization modes:

| Mode | Use it for | Structure |
| --- | --- | --- |
| Scenario cards | Base controls, calendars, pickers, and cards | Use one `ComponentPreview` per scenario. Put examples side by side only when they vary along the same axis. |
| Axis grid | Variants of one control, such as tab styles or OTP lengths | Put the variants in one `ComponentPreview` with `layout="grid2"`. Use `previewClassName="xl:grid-cols-3"` when three columns help. |
| Stacked demos | Data, visualization, Gantt, and large tables | Use `CatalogSections` with `stack: true`, `exampleLabel`, and `layout="wide"` or `layout="fullBleed"`. Use `columns: 2` only for paired examples with similar heights. |

Choose stacked demos for many numbered examples or wide tables and timelines. Choose an axis grid when one control property changes. Choose scenario cards for distinct user tasks or compositions.

Prefer a `ComponentPreview` layout preset to a custom width class. Use `span={2}` only when an example needs both columns on extra-large screens. Prefer `wide` or `fullBleed` before spanning a card across the page.

### Use `ComponentPreview` layouts

| Layout | Use it for |
| --- | --- |
| `inline` (default) | Buttons, badges, and short rows |
| `field` | Inputs, pickers, and single fields |
| `panel` | Cards, charts, and questionnaires |
| `wide` | Kanban boards, sortable grids, and paginated content |
| `fullBleed` | Event calendars, code blocks, and full-width data grids |
| `stack` | Vertical groups of related demos |
| `grid2` | Two-column variant grids |
| `grid3` | Two- or three-column variant grids, with two columns at `sm` and three at `xl` |
| `fill` | Preview cells that fill their available width |
| `anchor` | Left-aligned demo tiles with `min-w-0` |
| `fullStack` | Full-width vertical stacks, such as code blocks that use `span={2}` |

Use `previewClassName` only for layout details the preset does not cover, such as `min-h-28` on an `anchor` tile when the height matters. Do not repeat standard flex or grid classes in each catalog page.

### Write example titles and descriptions

Use Title Case for section titles. Name the variant or behavior, such as `Default Card`, `Tree Multi-Select`, or `Popover with Apply`. Avoid sentence-length headings and headings that repeat the component name without adding meaning.

Omit a description when the title already explains the scenario. Add one when the behavior needs context, such as an Apply flow, locale or right-to-left behavior, disabled rules, thresholds, auto-dismiss, or shared state across previews.

### Keep date routes distinct

- `/components/date-calendar` documents month grids and calendar surface patterns.
- `/components/date-picker` documents popover fields, range inputs, selectors, schedulers, and inline months connected to picker state.

### Use cards for framing

`ComponentPreview` uses the UI `Card` to frame an example. The example itself can use a borderless or muted article card when that better fits the scenario.

## License

[MIT](LICENSE)
