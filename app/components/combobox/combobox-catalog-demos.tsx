"use client";

import { useState } from "react";
import {
  IconCalendar as CalendarIcon,
  IconChevronDown as ChevronDown,
  IconUser as UserIcon,
  IconX,
} from "@tabler/icons-react";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox/combobox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";

const teams: ComboboxOption[] = [
  { value: "design", label: "Design", group: "Product", description: "Design systems and research" },
  { value: "engineering", label: "Engineering", group: "Product", description: "Application development" },
  { value: "finance", label: "Finance", group: "Operations" },
  { value: "operations", label: "Operations", group: "Operations", disabled: true },
];

const people: ComboboxOption[] = [
  { value: "maya", label: "Maya Chen", group: "Design", description: "maya.chen@company.test" },
  { value: "alex", label: "Alex Rivera", group: "Engineering", description: "alex.rivera@company.test" },
  { value: "sam", label: "Sam Patel", group: "Engineering", description: "sam.patel@company.test" },
  { value: "lee", label: "Lee Morgan", group: "Operations", description: "lee.morgan@company.test" },
];

const comboboxWidth = "w-full min-w-0 max-w-md";

export function ComboboxCatalogExamples() {
  const [team, setTeam] = useState<string | string[]>("engineering");
  const [members, setMembers] = useState<string[]>(["maya", "alex"]);
  const [status, setStatus] = useState<string | string[]>("open");
  const [submitted, setSubmitted] = useState(false);
  const [dueDate, setDueDate] = useState<string | string[]>("");
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [customDate, setCustomDate] = useState("");

  return (
    <>
      <CatalogGridItems>
        <ComponentPreview title="Searchable Team Selection" layout="field">
          <div className="grid min-w-0 gap-3">
            <Combobox
              aria-label="Choose a team"
              className={comboboxWidth}
              options={teams}
              value={team}
              onValueChange={setTeam}
              placeholder="Choose a team"
              clearable
            />
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Selected team: {teams.find((item) => item.value === team)?.label ?? "None"}
            </p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Clearable, Invalid, and Disabled States" layout="panel" span={2}>
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <Combobox
              aria-label="Choose reviewer"
              className={comboboxWidth}
              options={people}
              placeholder="Choose a reviewer"
              invalid
              clearable
            />
            <Combobox
              aria-label="Locked team"
              className={comboboxWidth}
              options={teams}
              value="finance"
              disabled
              placeholder="Locked team"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Grouped Options and Auto Highlight" layout="field">
          <div className="grid min-w-0 gap-3">
            <Combobox
              aria-label="Search team directory"
              className={comboboxWidth}
              options={teams}
              autoHighlight
              searchPlaceholder="Search teams..."
              emptyMessage="No team matches this search."
            />
            <p className="text-xs text-muted-foreground">
              Options are grouped by department; disabled teams remain visible.
            </p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Large List, Icon Addon, and Custom Trigger" layout="stack" span={2}>
          <Combobox
            aria-label="Choose a region"
            className={comboboxWidth}
            options={["North America", "South America", "Europe", "Middle East", "Africa", "East Asia", "South Asia", "Oceania"].map(
              (label) => ({ value: label.toLowerCase().replaceAll(" ", "-"), label }),
            )}
            leadingIcon={<span className="text-xs font-semibold text-primary">REG</span>}
            triggerIcon={<ChevronDown className="size-4 text-muted-foreground" />}
            placeholder="Filter regions"
          />
          <Combobox
            aria-label="Assign owner"
            className={comboboxWidth}
            options={people}
            leadingIcon={<UserIcon className="size-4 text-muted-foreground" />}
            renderOption={(option, selected) => (
              <>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">
                  {option.label
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{option.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{option.description}</span>
                </span>
                {selected && <span aria-hidden="true" className="size-2 rounded-full bg-primary" />}
              </>
            )}
          />
        </ComponentPreview>

        <ComponentPreview title="Custom Values and Empty State" layout="field">
          <Combobox
            aria-label="Add a project label"
            className={comboboxWidth}
            options={[]}
            allowCustomValue
            searchPlaceholder="Type a label"
            emptyMessage="No saved label found. Press Enter to use your text."
          />
        </ComponentPreview>

        <ComponentPreview title="Multi-Select Members and Tags" layout="stack" span={2}>
          <Combobox
            aria-label="Select project members"
            className={comboboxWidth}
            options={people}
            value={members}
            multiple
            onValueChange={(value) => setMembers(Array.isArray(value) ? value : [value])}
            placeholder="Add members"
            searchPlaceholder="Search members..."
          />
          <div className="flex min-w-0 flex-wrap gap-2" aria-label="Selected members">
            {members.map((value) => {
              const person = people.find((item) => item.value === value);
              return (
                person && (
                  <span
                    key={value}
                    className="inline-flex max-w-full items-center gap-2 rounded-full border bg-muted/40 py-1 pl-1 pr-2 text-xs"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-background font-medium">
                      {person.label
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span className="truncate">{person.label}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${person.label}`}
                      onClick={() => setMembers((current) => current.filter((item) => item !== value))}
                      className="shrink-0 text-muted-foreground hover:text-foreground"
                    >
                      <IconX className="size-3.5" />
                    </button>
                  </span>
                )
              );
            })}
            <span className="inline-flex items-center rounded-full border bg-muted/40 px-2 py-1 text-xs text-muted-foreground">
              Project owner · fixed
            </span>
          </div>
          <div className="grid min-w-0 gap-2 sm:grid-cols-2">
            <Combobox
              aria-label="Disabled member selection"
              className="w-full min-w-0"
              options={people}
              multiple
              defaultValue={["maya"]}
              disabled
              placeholder="Disabled members"
            />
            <Combobox
              aria-label="Required member selection"
              className="w-full min-w-0"
              options={people}
              multiple
              invalid
              placeholder="Required members"
            />
          </div>
          <p className="text-xs text-muted-foreground">Selected tags stay visible; fixed tags cannot be removed.</p>
        </ComponentPreview>

        <ComponentPreview title="Form Integration and Validation" layout="panel" span={2}>
          <form
            className="grid w-full min-w-0 max-w-lg gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label className="grid gap-1.5 text-sm font-medium">
              Feature
              <Combobox
                aria-label="Choose a feature"
                className={comboboxWidth}
                options={teams}
                value={team}
                onValueChange={setTeam}
                invalid={!team}
                placeholder="Choose a feature"
              />
            </label>
            <p className="text-xs text-muted-foreground">Select a suggestion to submit this form.</p>
            <div className="flex gap-2">
              <Button
                type="reset"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setTeam("");
                  setSubmitted(false);
                }}
              >
                Reset
              </Button>
              <Button type="submit" className="flex-1">
                Submit
              </Button>
            </div>
            {submitted && (
              <p role="status" className="text-sm text-primary">
                Feature saved.
              </p>
            )}
          </form>
        </ComponentPreview>

        <ComponentPreview title="Combobox Inside a Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Assign a lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign project lead</DialogTitle>
              </DialogHeader>
              <Combobox
                aria-label="Select project lead"
                className={comboboxWidth}
                options={people}
                placeholder="Search people"
                leadingIcon={<UserIcon className="size-4" />}
              />
            </DialogContent>
          </Dialog>
        </ComponentPreview>

        <ComponentPreview title="Status, Priority, and Assignee" layout="panel" span={2}>
          <div className="grid min-w-0 gap-3 sm:grid-cols-3">
            <Combobox
              aria-label="Change issue status"
              className="w-full min-w-0"
              options={[
                { value: "open", label: "Open" },
                { value: "progress", label: "In progress" },
                { value: "done", label: "Done" },
              ]}
              value={status}
              onValueChange={setStatus}
              placeholder="Status"
            />
            <Combobox
              aria-label="Set issue priority"
              className="w-full min-w-0"
              options={["Urgent", "High", "Normal", "Low"].map((label) => ({
                value: label.toLowerCase(),
                label,
              }))}
              placeholder="Priority"
            />
            <Combobox
              aria-label="Assign issue"
              className="w-full min-w-0"
              options={people}
              placeholder="Assignee"
              leadingIcon={<UserIcon className="size-4 text-muted-foreground" />}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Date and Multi-Label Selection" layout="stack" span={2}>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <Combobox
              aria-label="Select due date"
              className={comboboxWidth}
              options={["Today", "Tomorrow", "This Friday", "Next Monday"].map((label) => ({
                value: label.toLowerCase().replaceAll(" ", "-"),
                label,
              }))}
              value={dueDate}
              onValueChange={setDueDate}
              leadingIcon={<CalendarIcon className="size-4" />}
              triggerIcon={<ChevronDown className="size-4" />}
              placeholder="Choose a due date"
            />
            <Button type="button" size="sm" variant="outline" onClick={() => setDateDialogOpen(true)}>
              Custom date
            </Button>
          </div>
          <Combobox
            aria-label="Select issue labels"
            className={comboboxWidth}
            options={[
              { value: "bug", label: "Bug" },
              { value: "feature", label: "Feature" },
              { value: "blocked", label: "Blocked" },
            ]}
            multiple
            defaultValue={["bug"]}
            placeholder="Add labels"
          />
          <p className="text-xs text-muted-foreground">
            Date shortcuts and multi-label selection with the same searchable control.
          </p>
        </ComponentPreview>
      </CatalogGridItems>

      <Dialog open={dateDialogOpen} onOpenChange={setDateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a custom due date</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <input
              aria-label="Custom due date"
              type="date"
              value={customDate}
              onChange={(event) => setCustomDate(event.currentTarget.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            />
            <Button
              type="button"
              disabled={!customDate}
              onClick={() => {
                setDueDate(customDate);
                setDateDialogOpen(false);
              }}
            >
              Use this date
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
