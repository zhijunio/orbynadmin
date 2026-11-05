"use client";

import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { DateSelector, type DateSelectorValue, formatDateSelectorValue } from "@/components/ui/date-picker/date-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";

export function DatePickerSelectorCatalogExamples() {
  const [selectorValue, setSelectorValue] = useState<DateSelectorValue>();
  const [selectorDraft, setSelectorDraft] = useState<DateSelectorValue>();
  const [selectorPopoverOpen, setSelectorPopoverOpen] = useState(false);
  const [selectorDialogOpen, setSelectorDialogOpen] = useState(false);
  const [selectorLocale, setSelectorLocale] = useState("en-US");

  return (
    <CatalogGridItems>
      <ComponentPreview title="Natural Language" layout="panel">
        <DateSelector value={selectorValue} onChange={setSelectorValue} label="Due date" inputHint="Try: 2025, Q4, 05/10/2025" />
      </ComponentPreview>

      <ComponentPreview title="Popover with Apply" description="Edits stay in draft until Apply." layout="panel">
        <div className="grid gap-3">
          <Popover
            open={selectorPopoverOpen}
            onOpenChange={(open) => {
              setSelectorPopoverOpen(open);
              if (open) setSelectorDraft(selectorValue);
            }}
          >
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="w-full justify-start">
                {selectorValue ? formatDateSelectorValue(selectorValue) : "Select a reporting period"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[min(28rem,calc(100vw-2rem))] p-3">
              <DateSelector value={selectorDraft} onChange={setSelectorDraft} allowRange label="Reporting period" />
              <div className="mt-3 flex justify-end gap-2 border-t pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectorDraft(selectorValue);
                    setSelectorPopoverOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setSelectorValue(selectorDraft);
                    setSelectorPopoverOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">Changes stay in draft until Apply; Cancel discards them.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Dialog with Apply" layout="panel">
        <div className="grid gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => {
              setSelectorDraft(selectorValue);
              setSelectorDialogOpen(true);
            }}
          >
            Choose due date
          </Button>
          <Dialog open={selectorDialogOpen} onOpenChange={setSelectorDialogOpen}>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Select due date</DialogTitle>
              </DialogHeader>
              <DateSelector value={selectorDraft} onChange={setSelectorDraft} showInput />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectorDraft(selectorValue);
                    setSelectorDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectorValue(selectorDraft);
                    setSelectorDialogOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {selectorValue ? formatDateSelectorValue(selectorValue) : "No due date selected."}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Localized Selector" description="Formatted output follows the selected locale." layout="panel">
        <div className="grid gap-3">
          <label className="grid max-w-xs gap-1 text-sm font-medium">
            Language and date format
            <select
              value={selectorLocale}
              onChange={(event) => setSelectorLocale(event.currentTarget.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="en-US">English</option>
              <option value="es-ES">Español</option>
              <option value="fr-FR">Français</option>
              <option value="de-DE">Deutsch</option>
              <option value="zh-CN">简体中文</option>
            </select>
          </label>
          <DateSelector value={selectorValue} onChange={setSelectorValue} locale={selectorLocale} label="Reporting date" />
          <p className="text-xs text-muted-foreground">The selected date preview follows the chosen locale.</p>
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
