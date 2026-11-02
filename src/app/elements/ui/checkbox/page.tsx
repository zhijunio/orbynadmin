"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useId, useState } from "react";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";

const preferences = [
  { id: "billing", label: "Billing updates" },
  { id: "security", label: "Security alerts" },
  { id: "product", label: "Product news" },
];

function CheckboxExamples() {
  const id = useId();
  const [selected, setSelected] = useState<string[]>(["security"]);
  const allSelected = selected.length === preferences.length;
  const someSelected = selected.length > 0 && !allSelected;

  function togglePreference(preferenceId: string, checked: boolean) {
    setSelected((current) =>
      checked
        ? [...current, preferenceId]
        : current.filter((item) => item !== preferenceId),
    );
  }

  return <>
      <ComponentPreview title="Default">
        <div className="grid gap-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox aria-label="Remember this device" />
            <span>Remember this device</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox defaultChecked aria-label="Receive product updates" />
            <span>Receive product updates</span>
          </label>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Indeterminate Group">
        <div className="grid w-full max-w-sm gap-3">
          <label className="flex cursor-pointer items-center gap-3 border-b pb-3 text-sm font-medium">
            <Checkbox
              checked={allSelected ? true : someSelected ? "indeterminate" : false}
              onCheckedChange={(checked) =>
                setSelected(checked ? preferences.map((item) => item.id) : [])
              }
              aria-label="Select all notification preferences"
            />
            <span>Notification preferences</span>
          </label>
          <div className="grid gap-3 pl-7">
            {preferences.map((preference) => (
              <label
                key={preference.id}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={selected.includes(preference.id)}
                  onCheckedChange={(checked) =>
                    togglePreference(preference.id, checked === true)
                  }
                  aria-label={preference.label}
                />
                <span>{preference.label}</span>
              </label>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled and Invalid">
        <div className="grid w-full max-w-sm gap-4">
          <label className="flex cursor-not-allowed items-center gap-3 text-sm opacity-60">
            <Checkbox disabled checked aria-label="Required policy accepted" />
            <span>Required policy accepted</span>
          </label>
          <div className="grid gap-2">
            <div className="flex items-center gap-3">
              <Checkbox id={`${id}-terms`} aria-invalid="true" />
              <Label htmlFor={`${id}-terms`}>Accept the terms</Label>
            </div>
            <HintText variant="error">You must accept the terms to continue.</HintText>
          </div>
        </div>
      </ComponentPreview>
    </>;
}

export default function CheckboxPage() {
  return <ConsoleLayout>{<Showcase title="Checkbox">
      <CheckboxExamples />
    </Showcase>}</ConsoleLayout>;
}
