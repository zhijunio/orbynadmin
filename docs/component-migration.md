# Remaining component migration

Reference: the local `../reui/registry-reui/bases/radix/components` catalog (87 component families), checked on 2026-11-03. All families now have a corresponding NextRose route or an existing shared shell implementation. This is component-family coverage, not a claim that every reference demo or advanced API has been reproduced.

| Component | Route | Included behavior |
| --- | --- | --- |
| Chart | `/components/chart` | Bar, area, line, donut, radar, tooltips, legends, accessible data table |
| Data Grid | `/components/data-grid` | Sorting, search, stable row selection, pagination, column visibility, loading/empty/error states |
| Date Selector | `/components/date-selector` | Existing primitive, independent examples, range/quarter/year selection, quick entry, localized labels |
| Filters | `/components/filters` | Text, number, date and select fields, AND/OR groups, nested groups, observable filtered results |
| Gantt | `/components/gantt` | Resource hierarchy, collapse, three scales, navigation, move/resize by drag or keyboard, date/progress editing, read-only view |
| Stepper | `/components/stepper` | Controlled steps, horizontal/vertical layouts, icons, keyboard navigation, panels, loading/disabled states |
| Table | `/components/table` | Semantic table, overflow container, footer, status badges |
| Trace | `/components/trace` | Status lines, nested expandable details, error and local retry example |

Existing aliases: Calendar → Date Calendar; Dropdown Menu → Dropdowns; Radio Group → Radio; Separator → Divider; Sheet → Drawer; Sonner → Toast; Spinner → Spinners; Tabs → Tabs at `/components/tab`. Sidebar is already implemented by `components/ui/sidebar` and the application shell examples. Blocks and templates are outside this component-family inventory.

State and data remain with the example pages. Reusable components accept structured values and callbacks. New pages use the existing shell, controls, theme tokens and both supported locales. Date Selector's existing API retains English defaults; localized labels are optional. Its quick-entry label now uses a unique ID per instance.

Dependencies added for this migration: `@tanstack/react-table` 8.21.3 and `recharts` 3.10.1. Existing dependency versions were retained. Adapted primitives' license is recorded in `THIRD_PARTY_NOTICES.md`.

## Verification

- Before implementation, the route check failed with the expected 404 for `/components/stepper`.
- `node --test components/ui/filters/filters-query.test.mjs components/custom/gantt/gantt-lib.test.mjs`: query evaluation and task date calculations.
- `pnpm exec tsc --noEmit`: type checking.
- `pnpm lint`: full repository ESLint check. No separate formatter is configured.
- `pnpm build`: production compilation, TypeScript validation and route generation.
- Headless Chrome: all eight new routes, stepper keyboard navigation, data grid sort/selection/pagination/search/visibility/states, filter results and nested groups, Gantt keyboard changes and edit validation, trace retry, quick date entry, five chart types, mobile overflow checks at 390px, all eight Chinese pages, Gantt pointer drag, and dark-mode layout checks. Screenshots were inspected for chart layout and mobile Gantt scrolling.

The examples use local data. Data Grid does not include server pagination or virtualization; Gantt does not reproduce the reference's headless engine, recurrence or automatic summary rollups; Trace retry is a local state example. Advanced reference demos remain possible follow-up work.
