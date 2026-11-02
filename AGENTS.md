<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OrbynAdmin working rules

These rules apply to code, UI, docs, and repository operations in this project.

## Understand the project before changing it

- Check the working tree, relevant source, docs, package scripts, and applicable `AGENTS.md` files before editing. Treat this checkout as the source of truth; use BoardUI and Nextboard as references only when the task calls for them.
- Trace the current behavior and its callers before changing a shared component. Preserve unrelated user changes and keep each edit tied to the request.
- Make the smallest complete change. Prefer existing components, dependencies, and platform features; avoid new abstractions, dependencies, or configuration without a concrete need.
- For Next.js work, read the relevant guide under `node_modules/next/dist/docs/` first. Preserve the generated Next.js rules above.

## Component boundaries

- `src/components/base` contains low-level controls and primitives that can be reused across features, aligned with BoardUI's `components/base`.
- `src/components/application` contains feature compositions built from base controls, following BoardUI's `components/application`. Organize them by feature and use kebab-case filenames named after their component. Application components may be complete example screens with their demo data and interactions when those belong to the showcased feature; they do not need to be reusable across multiple routes.
- Group Application components by product feature. For example, dashboard chart cards belong under `dashboard/chart-cards`, data-grid components under `data-grid`, and data-table components under `data-table`. Shared showcase presentation belongs under `application/docs`, following BoardUI; route groups such as `blocks` and `elements` remain URL/page organization in `src/app`.
- Do not add barrel `index.ts` files under `src/components`; import components from the file that defines them.
- `src/app` owns routes and menu composition. Group routes directly by product function and keep only the root `layout.tsx`. Non-public pages compose the shared `ConsoleLayout` directly, following BoardUI's page-level `AppShell` pattern; public pages stay outside that shell. Do not add nested layout files or duplicate the shell. Export route-only contracts such as metadata and `generateStaticParams` from `page.tsx`; pages may compose a full Application example screen when appropriate. Keep relative imports inside Application components as `@/app/...` imports when the dependency is intentionally route-owned.
- Keep the existing icon system (`@tabler/icons-react`), Tailwind CSS v4, and Radix UI conventions. Check the local component API before adding a parallel implementation. Do not introduce another icon, styling, or primitive system.

## UI and behavior

- Follow existing semantic theme tokens and responsive patterns in `src/styles` and nearby components. Keep accessible names, labels, hints, and confirmation copy when they convey needed information; avoid redundant card descriptions and repeated copy.
- Keep user-visible behavior at the boundary: reusable components receive data and callbacks; pages own example data, navigation, localization, and operation-specific success or error feedback.
- For shared-component changes, search all call sites and verify that their behavior remains coherent.

## Dependencies and verification

- Do not upgrade or add dependencies unless the task requires it. Use the package manager and lockfile already maintained by the project.
- Use the repository's configured scripts. Report exactly which checks ran and distinguish lint, type checking, build, tests, and runtime/browser checks. Never describe an unrun check as passing.
- Keep changes reviewable. Do not commit or push unless requested.
