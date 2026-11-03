<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS rules

These rules apply to code, UI, docs, and repository operations in this project.

## Understand the project before changing it

- Check the working tree, relevant source, docs, package scripts, and applicable `AGENTS.md` files before editing. Treat this checkout as the source of truth; use external projects as references only when the task calls for them.
- Trace the current behavior and its callers before changing a shared component. Preserve unrelated user changes and keep each edit tied to the request.
- Make the smallest complete change. Prefer existing components, dependencies, and platform features; avoid new abstractions, dependencies, or configuration without a concrete need.
- For Next.js work, read the relevant guide under `node_modules/next/dist/docs/` first. Preserve the generated Next.js rules above.

## Component boundaries

- `components/ui` contains low-level controls and primitives that can be reused across features, following ReUI's `components/ui` organization.
- `components/custom` contains NextRose-specific feature components and reusable presentation helpers, organized by feature with kebab-case filenames.
- The current catalog focuses on base UI controls and their `/components/*` examples. Add future ReUI Blocks and Templates only when those pages are intentionally migrated.
- Compose app-wide providers in `app/layout.tsx`. Keep theme configuration, persistence, and customizer code directly under `components`; do not add theme or providers directories.
- Before creating a new component, look for an existing UI control, custom feature component, or block module that already fits. Split complex interactive UI into focused components with typed props, separating state/behavior from presentation where that makes ownership clearer. Keep state with the page or composition that owns the behavior; do not split simple examples just to create more files.
- Avoid passing the same props through multiple intermediate components. Prefer composing children, placing state closer to its consumers, or using an existing context/composition pattern when it clarifies ownership; do not add a new context or compound-component API for a one-off case.
- Do not keep repeated or substantial section JSX in inline `renderX()` helper functions. Extract repeated or independently meaningful sections into focused components; leave short, one-off markup inline.
- For reusable controls, expose meaningful visual and behavioral variants through typed props and keep their styles in the component. Prefer the existing variant API over repeated call-site class overrides; do not add a new variant for a one-off appearance.
- Keep parsing, validation, and data transformations in focused feature-local pure helpers when they can be separated from rendering. Components should work with structured values and send user changes through explicit callbacks so the owning page or feature can decide how to persist them.
- Group custom components by framework feature and keep shared showcase presentation under `custom/docs`.
- Do not add barrel `index.ts` files under `components`; import components from the file that defines them.
- `app` owns the component catalog under `/components/*` and the root shell. The root route redirects to `/components/button`. Shared shell navigation and demo workspace/user data belong in `components/custom/app-shell/config.ts`. Keep only the root `layout.tsx`; pages compose the shared `AppShell` block directly from `components/blocks/application/app-shell`. Do not add nested layouts or duplicate the shell. When adding or removing a route, update navigation and example links.
- Keep the existing icon system (`@tabler/icons-react`), Tailwind CSS v4, and Radix UI conventions. Check the local component API before adding a parallel implementation. Do not introduce another icon, styling, or primitive system.

## UI and behavior

- Follow existing semantic theme tokens and responsive patterns in `styles` and nearby components. Keep accessible names, labels, hints, and confirmation copy when they convey needed information; avoid redundant card descriptions and repeated copy.
- Prefer existing semantic theme tokens for colors and other themeable values; check the shared theme definitions before introducing literal values or page-specific overrides. Extend the shared theme only when no existing token expresses the needed role.
- Do not add custom CSS utility classes. Compose existing Tailwind utilities and shared components; add styles through the established theme or component mechanisms when the design needs a reusable style.
- Respect the user's reduced-motion preference for nonessential transitions and animations, using the existing motion and styling conventions.
- When state is shown in multiple places, such as an unread badge and its notification panel, keep it with a shared owner or expose callbacks so every view stays synchronized.
- Keep user-facing copy synchronized across every supported locale. The current locales are defined in `i18n/routing.ts`; update the corresponding message files together and avoid hardcoded copy in localized UI.
- On base-control example pages under `app/components`, group examples within the page by the control's visible variant or behavior, not by broad product categories. Order the default/common example first, then visual variants, compositions such as icons or badges, layout variants, and interaction states such as disabled or loading.
- Give each example section a concise heading that names its difference, such as `Default Tabs`, `Tabs with Icon`, or `Loading State`. Show related sizes together; do not create separate sections for trivial differences or mix unrelated controls in one example page. Keep descriptions only when they add necessary usage context.
- When aligning example organization to a reference such as TailAdmin, follow its component-specific section structure while keeping NextRose's existing routes, components, tokens, and copy conventions.
- Treat external products as references only. Do not put their names, branding, or copied product content in NextRose UI text, filenames, or sample data unless the user explicitly asks for it.
- Keep user-visible behavior at the boundary: reusable components receive data and callbacks; pages own example data, navigation, localization, and operation-specific success or error feedback.
- For shared-component changes, search all call sites and verify that their behavior remains coherent.

## Charts and tables

- Give responsive charts a defined height through the existing card/layout pattern so the chart can measure its container. Keep chart-specific data, labels, formatting, and tooltip behavior with the feature that owns the chart, and reuse shared chart primitives where available.
- Keep table data types, column definitions, and feature-specific cell formatting organized with the owning feature. Use the existing table components and make loading, empty, and error states explicit when the page's data flow or example requires them.
- Stateful or editable collections must use stable item identifiers rather than array positions, so selection, edits, and row actions remain attached to the same item when data is sorted or filtered.

## LLM workflow

- Before editing, establish the goal, facts, constraints, and assumptions from the current checkout. Inspect `git status`, relevant callers, documentation, and project scripts; preserve unrelated work.
- Make one focused, complete change at a time. Remove in-scope complexity before adding abstractions, files, dependencies, or configuration. Do not refactor unrelated working code.
- For behavior changes, use TDD: first add a test of observable behavior and confirm it fails for the expected reason, then implement the smallest fix. If a meaningful test is not practical, explain why and use a reliable alternative check.
- Keep secrets and security-sensitive values in environment or external configuration; do not add credentials or personal data to source, logs, or examples.
- Summarize the change and any important limitations.

## Dependencies and verification

- Do not upgrade or add dependencies unless the task requires it. Use the package manager and lockfile already maintained by the project.
- Use the repository's configured scripts. Report exactly which checks ran and distinguish lint, type checking, build, tests, and runtime/browser checks. Never describe an unrun check as passing.
- Keep changes reviewable. Do not commit or push unless requested.
