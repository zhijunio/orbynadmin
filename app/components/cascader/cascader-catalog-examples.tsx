"use client";

import { useMemo, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Cascader, CascaderPanel, type CascaderNode } from "@/components/ui/cascader/cascader";
import { Button } from "@/components/ui/button/button";

import {
  flatOptions,
  healthOptions,
  options,
  roles,
  statusOptions,
} from "@/app/components/cascader/cascader-catalog-data";

export function CascaderCatalogExamples() {
  const [selected, setSelected] = useState<string[][]>([]);
  const [multi, setMulti] = useState<string[][]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<"en" | "zh">("en");
  const [asyncOptions, setAsyncOptions] = useState<CascaderNode[]>([{ value: "regions", label: "Regions", hasChildren: true }]);
  const [lazySelected, setLazySelected] = useState<string[][]>([]);
  const many = useMemo(
    () => Array.from({ length: 2500 }, (_, index) => ({ value: `team-${index}`, label: `Team ${String(index + 1).padStart(4, "0")}` })),
    [],
  );

  const localizedOptions: CascaderNode[] =
    locale === "zh"
      ? [{ value: "sales", label: "销售", children: [{ value: "apac", label: "亚太区" }, { value: "emea", label: "欧洲中东非洲" }] }]
      : options;

  return (
    <CatalogGridItems>
      <ComponentPreview title="Default Cascader" layout="panel">
        <Cascader options={options} aria-label="Choose a team" />
      </ComponentPreview>

      <ComponentPreview title="Column Panels" layout="wide" span={2}>
        <Cascader options={options} mode="columns" />
      </ComponentPreview>

      <ComponentPreview title="Tree Layout" description="Multi-select in a nested tree panel." layout="wide" span={2}>
        <Cascader options={options} mode="tree" multiple />
      </ComponentPreview>

      <ComponentPreview title="Deep Search" description="Search matches nested labels under the current branch." layout="panel">
        <Cascader options={options} searchScope="deep" searchable searchPlaceholder="Search teams and departments..." />
      </ComponentPreview>

      <ComponentPreview title="Global Search" description="Search across all levels from one query field." layout="panel">
        <Cascader options={options} searchScope="global" searchable />
      </ComponentPreview>

      <ComponentPreview title="Selection Limit" description="Stops after two paths are chosen." layout="panel">
        <div className="grid gap-2">
          <Cascader options={options} multiple maxSelections={2} selectedPaths={multi} onSelectionChange={setMulti} />
          <p className="text-xs text-muted-foreground">
            Choose up to two teams. {multi.length}/2 selected.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Multiple with Summary" layout="panel">
        <div className="grid gap-3">
          <Cascader options={options} multiple selectedPaths={multi} onSelectionChange={setMulti} />
          <div className="flex flex-wrap gap-1">
            {multi.map((path) => (
              <span key={path.join("/")} className="rounded-full bg-muted px-2 py-1 text-xs">
                {path.join(" / ")}
              </span>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Tree Multi-Select" layout="wide" span={2}>
        <Cascader options={options} mode="tree" multiple selectedPaths={multi} onSelectionChange={setMulti} />
      </ComponentPreview>

      <ComponentPreview title="Custom Options" layout="panel">
        <Cascader
          options={roles}
          renderOption={(node) => (
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-muted">
                <IconUser className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block">{node.label}</span>
                {node.description && <span className="block truncate text-xs text-muted-foreground">{node.description}</span>}
              </span>
              {node.badge && <span className="text-[10px] text-muted-foreground">{node.badge}</span>}
            </span>
          )}
        />
      </ComponentPreview>

      <ComponentPreview title="Path Value Display" layout="panel">
        <Cascader options={options} defaultSelectedPaths={[["engineering", "platform", "api"]]} valueDisplay="path" />
      </ComponentPreview>

      <ComponentPreview title="Leaf Value Display" layout="panel">
        <Cascader options={options} defaultSelectedPaths={[["engineering", "platform", "api"]]} valueDisplay="leaf" />
      </ComponentPreview>

      <ComponentPreview title="Count Value Display" layout="panel">
        <Cascader
          options={options}
          defaultSelectedPaths={[["engineering", "platform", "api"]]}
          valueDisplay="count"
          collapsePath="start"
        />
      </ComponentPreview>

      <ComponentPreview title="Panel Footer" layout="panel">
        <Cascader
          options={options}
          footer={
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Browse all teams</span>
              <Button size="sm" variant="outline">
                Manage teams
              </Button>
            </div>
          }
        />
      </ComponentPreview>

      <ComponentPreview title="Role Badges" layout="panel">
        <Cascader options={roles} />
      </ComponentPreview>

      <ComponentPreview title="Status Tones" layout="panel">
        <Cascader options={statusOptions} />
      </ComponentPreview>

      <ComponentPreview title="Icons and Badges" layout="panel">
        <Cascader options={healthOptions} />
      </ComponentPreview>

      <ComponentPreview title="Inline Panel" layout="wide" span={2}>
        <CascaderPanel options={options} selectedPath={selected[0]} onSelect={(path) => setSelected([path])} />
      </ComponentPreview>

      <ComponentPreview title="Flat Parent Links" description="Options linked by parentId instead of nested children." layout="panel">
        <Cascader options={flatOptions} placeholder="Choose a sales region..." />
      </ComponentPreview>

      <ComponentPreview title="Controlled Open State" layout="panel">
        <div className="grid gap-2">
          <Cascader
            options={options}
            open={isOpen}
            onOpenChange={setIsOpen}
            query={query}
            onQueryChange={setQuery}
            selectedPaths={selected}
            onSelectionChange={setSelected}
          />
          <p className="text-xs text-muted-foreground">
            Open: {String(isOpen)} · Search: {query || "empty"} · Value: {selected[0]?.join(" / ") || "none"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Localized Labels" description="Placeholder and search copy follow the active locale." layout="panel">
        <div className="grid gap-2">
          <div className="flex gap-2">
            <Button size="sm" variant={locale === "en" ? "default" : "outline"} onClick={() => setLocale("en")}>
              English
            </Button>
            <Button size="sm" variant={locale === "zh" ? "default" : "outline"} onClick={() => setLocale("zh")}>
              简体中文
            </Button>
          </div>
          <Cascader
            options={localizedOptions}
            placeholder={locale === "zh" ? "选择团队…" : "Choose a team…"}
            searchPlaceholder={locale === "zh" ? "搜索团队…" : "Search teams…"}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Form Field" layout="panel">
        <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
          <label className="grid gap-2 text-sm">
            Team assignment
            <Cascader options={options} name="team" placeholder="Select a team for this user..." />
          </label>
          <Button type="submit" size="sm">
            Save assignment
          </Button>
        </form>
      </ComponentPreview>

      <ComponentPreview title="Async Children" description="Loads the next level when a node is expanded." layout="panel">
        <div className="grid gap-2">
          <Cascader
            options={asyncOptions}
            selectedPaths={lazySelected}
            onSelectionChange={setLazySelected}
            onLoadChildren={async () => {
              await new Promise((resolve) => setTimeout(resolve, 250));
              const children = [
                {
                  value: "na",
                  label: "North America",
                  children: [
                    { value: "us", label: "United States" },
                    { value: "ca", label: "Canada" },
                  ],
                },
                {
                  value: "eu",
                  label: "Europe",
                  children: [
                    { value: "de", label: "Germany" },
                    { value: "uk", label: "United Kingdom" },
                  ],
                },
              ];
              setAsyncOptions([{ value: "regions", label: "Regions", children }]);
              return children;
            }}
          />
          <span className="text-xs text-muted-foreground">Children load when a region is opened.</span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Virtualized List" description="Level search over thousands of leaf teams." layout="wide" span={2}>
        <Cascader options={[{ value: "teams", label: "All teams", children: many }]} virtualize searchable searchScope="level" />
      </ComponentPreview>
    </CatalogGridItems>
  );
}
