"use client";
import * as React from "react"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field/field"
import { PhoneInput, type PhoneInputProps } from "@/components/ui/phone-input/phone-input"

const examples = ["Basic phone input", "Small phone input", "Large phone input", "Disabled phone input", "Phone input with preset value", "Phone input with error state", "Phone input with specific default country", "Read-only phone input"]

function PhoneDemo({ index }: { index: number }) {
  const initial: PhoneInputProps["value"] = index === 1 ? "+31612345678" : index === 2 ? "+12125550198" : index === 4 ? "+14155550148" : index === 7 ? "+442079460123" : undefined
  const [value, setValue] = React.useState<PhoneInputProps["value"]>(initial)
  if (index === 0) return <Field className="max-w-sm"><FieldLabel htmlFor="phone-basic">Phone number</FieldLabel><PhoneInput inputProps={{id:"phone-basic"}} placeholder="Enter phone number" value={value} onValueChange={setValue}/><FieldDescription>Choose a country or enter an international calling code.</FieldDescription></Field>
  if (index === 1) return <Field className="max-w-sm"><FieldLabel htmlFor="phone-small">Contact number</FieldLabel><PhoneInput inputProps={{id:"phone-small"}} size="sm" defaultCountry="NL" value={value} onValueChange={setValue}/></Field>
  if (index === 2) return <Field className="max-w-md"><FieldLabel htmlFor="phone-large">Office phone</FieldLabel><PhoneInput inputProps={{id:"phone-large"}} size="lg" defaultCountry="US" value={value} onValueChange={setValue}/></Field>
  if (index === 3) return <Field className="max-w-sm"><FieldLabel htmlFor="phone-disabled">Phone number</FieldLabel><PhoneInput inputProps={{id:"phone-disabled"}} disabled placeholder="Unavailable"/></Field>
  if (index === 4) return <Field className="max-w-sm"><FieldLabel htmlFor="phone-preset">Existing contact</FieldLabel><PhoneInput inputProps={{id:"phone-preset"}} value={value} onValueChange={setValue}/><FieldDescription>The country is inferred from the stored international number.</FieldDescription></Field>
  if (index === 5) return <Field className="max-w-sm" invalid><FieldLabel htmlFor="phone-invalid">Mobile number</FieldLabel><PhoneInput inputProps={{id:"phone-invalid"}} invalid placeholder="Enter phone number" aria-invalid="true"/><FieldDescription className="text-destructive">Enter a valid contact number.</FieldDescription></Field>
  if (index === 6) return <Field className="max-w-sm"><FieldLabel htmlFor="phone-france">France phone number</FieldLabel><PhoneInput inputProps={{id:"phone-france"}} defaultCountry="FR" placeholder="06 12 34 56 78"/><FieldDescription>New numbers begin with the selected country.</FieldDescription></Field>
  return <Field className="max-w-sm"><FieldLabel htmlFor="phone-readonly">Account contact</FieldLabel><PhoneInput inputProps={{id:"phone-readonly"}} value={value} readOnly/><FieldDescription>This saved number can be focused and copied.</FieldDescription></Field>
}

export function PhoneInputCatalogExamples() {
  return (
    <>
      {examples.map((title,index)=><ComponentPreview key={title} title={title}><PhoneDemo index={index}/></ComponentPreview>)}
    </>
  );
}
