<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

These rules apply to code, UI, docs, and repository operations in this project.

## Before changing the project

- Inspect `git status`, the relevant code and callers, project docs, scripts, and applicable `AGENTS.md` files. Treat this checkout as the source of truth. Preserve unrelated user changes.
- Trace current behavior before changing shared components. Keep each edit focused and make the smallest complete change.
- Check for an existing component, feature component, block, dependency, or platform feature before adding one. Avoid new abstractions, dependencies, and configuration without a concrete need.

## Project structure and component boundaries

- Keep `components/ui` flat. Use singular kebab-case family directories such as `button/`, `badge/`, and `tab/`. Do not add `primitive/` or `composite/` folders or barrel `index.ts` files.
- Classify a UI directory by its imports. A directory is composite only when a file imports another `components/ui/<family>/` directory. Imports between sibling files do not make it composite. Give cross-family compositions their own directory. Keep helpers with the family that owns them unless they become a reusable export with a catalog page. Example pages under `app/components` may compose multiple UI families without changing this classification.
- Organize NextRose-specific feature components under `components/custom/<feature>/`. Keep shared catalog presentation under `components/custom/docs/`. Keep reusable page blocks under `components/blocks/`.
- Compose app-wide providers in the root `app/layout.tsx`. Keep theme configuration, persistence, and customizer code directly under `components/`.
- Keep interactive state with the page or composition that owns the behavior. Use typed props and callbacks at reusable component boundaries. Extract complex or repeated sections into focused components, but leave short one-off markup inline. Avoid pass-through props, one-off contexts, and compound APIs that do not reduce complexity.
- Put parsing, validation, and data transformations in feature-local pure helpers when they can be separated from rendering. Keep reusable controls' variants and styles in the owning component. Prefer the existing variant API over repeated call-site overrides, and add a variant only when more than one use needs it.
- Keep the component catalog at flat `/components/<name>` routes. The root route redirects to `/components/button`. Shared shell navigation and demo workspace data live in `components/custom/app-shell/config.ts`. Group sidebar links under UI, Data, and Visualization through `componentNavSections`. Keep only the root layout and compose the shared `AppShell` from `components/blocks/application/app-shell`. Update navigation and example links when routes change.
- The catalog focuses on base UI controls and their examples. Add external Blocks and Templates only when they are intentionally selected for migration. Treat external products as references. Keep their branding and copied content out of NextRose UI and sample data unless requested.
- Use `@tabler/icons-react`, Tailwind CSS v4, Radix UI, and the local component APIs. Do not add parallel icon, styling, or primitive systems.

## UI and behavior

- Follow semantic theme tokens and responsive patterns from `styles/` and nearby components. Use emphasis colors only for the variant or state an example is meant to demonstrate. Use outline, secondary, or neutral tokens elsewhere. Extend shared theme definitions only when no existing token fits.
- Compose existing Tailwind utilities and shared components. Add reusable styles through established theme or component mechanisms instead of adding custom CSS utility classes.
- Generate demo portraits with `demoAvatarUrl` from `utils/demo-avatar.ts`. Reuse people from `app/components/avatar/avatar-data.ts` for shared demo identities. Use uploaded or product-provided photos only in examples about photo upload or profile imagery.
- Keep card hierarchy flat. Nest cards only when each card represents distinct content, and give nested content clear padding and spacing.
- Keep headings and labels concise. Add descriptions or subtitles only when they explain behavior or context that the title, labels, and layout cannot convey.
- Keep user-facing copy in English. The language menu is presentational and does not change locale.
- Respect reduced-motion preferences for nonessential animation and transitions.
- Keep state that appears in multiple places under one owner or synchronize it through explicit callbacks.
- Keep reusable components focused on data, presentation, and callbacks. Pages own example data, navigation, localization, and operation-specific feedback.
- Search all call sites after changing a shared component and confirm their behavior still fits.

## Component catalog

- Follow [docs/catalog-guidelines.md](docs/catalog-guidelines.md) for page structure, file naming, organization modes, `ComponentPreview` layouts, descriptions, and date-picker route boundaries.
- On base-control pages under `app/components`, organize examples by capability axis. Order sections as appearance, size, icons, states, then a structural change such as a label, addon, card, or range. Keep all sizes together and show the default appearance first.
- Add a separate section only for behavior the capability axes do not show, such as loading, invalid, or read-only. Name the section for that behavior. Keep descriptions only when they add necessary context.
- When a reference catalog splits a control into more sections, keep this project's axis organization and its routes, components, tokens, and copy.

## Charts and tables

- Give responsive charts a defined height through the existing card or layout pattern. Keep chart data, labels, formatting, and tooltip behavior with the owning feature. Reuse shared chart primitives when available.
- Keep table types, columns, and cell formatting with the owning feature. Use existing table components and show loading, empty, or error states when the data flow or example requires them.
- Give stateful or editable rows stable identifiers. Do not key selection, edits, or row actions by array position.

## Workflow and verification

- For behavior changes, test observable behavior first and confirm the test fails for the expected reason. Then implement the smallest fix. If a meaningful test is impractical, explain why and use a reliable alternative check.
- Keep secrets and security-sensitive values in environment or external configuration. Do not add credentials or personal data to source, logs, or examples.
- Do not add or upgrade dependencies unless the task requires it. Use the package manager and lockfile already maintained by the project.
- Run the relevant configured checks. Report exactly which checks ran and distinguish lint, type checking, build, tests, and runtime or browser checks. Do not claim an unrun check passed.
- Keep changes reviewable. Do not commit or push unless requested. Summarize the change and material limitations.
