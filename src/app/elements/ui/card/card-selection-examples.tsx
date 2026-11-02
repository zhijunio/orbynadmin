"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { CheckboxCard } from "@/components/base/checkbox/checkbox-card";
import {
  RadioCard,
  RadioCardGroup,
} from "@/components/base/radio/radio-card";
import { SwitchCard } from "@/components/base/switch/switch-card";

export function CardSelectionExamples() {
  const [includeAuditLog, setIncludeAuditLog] = useState(true);
  const [plan, setPlan] = useState("standard");
  const [emailAlerts, setEmailAlerts] = useState(false);

  return (
    <>
      <ComponentPreview title="Checkbox Card">
        <div className="grid w-full max-w-xl gap-3">
          <CheckboxCard
            checked={includeAuditLog}
            onCheckedChange={(checked) => setIncludeAuditLog(checked === true)}
            label="Include audit log"
            description="Keep an export of changes made to this workspace."
          />
          <CheckboxCard
            label="Notify workspace owners"
            description="Send a summary when the export is ready."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Radio Card">
        <RadioCardGroup
          value={plan}
          onValueChange={setPlan}
          aria-label="Export format"
          className="max-w-xl"
        >
          <RadioCard
            value="standard"
            label="Standard export"
            description="CSV files with the selected records."
          />
          <RadioCard
            value="complete"
            label="Complete archive"
            description="CSV files and related attachments."
          />
        </RadioCardGroup>
      </ComponentPreview>

      <ComponentPreview title="Switch Card">
        <div className="w-full max-w-xl space-y-3">
          <SwitchCard
            checked={emailAlerts}
            onCheckedChange={setEmailAlerts}
            label="Email notifications"
            description="Send an email when this export is ready."
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Notifications {emailAlerts ? "enabled" : "disabled"}
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}
