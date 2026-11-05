"use client"

import { createContext, useContext, useMemo } from "react"
import * as BasePhoneInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { IconSelector, IconWorld } from "@tabler/icons-react"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox/combobox"
import { Input } from "@/components/ui/input/input"
import { cn } from "@/utils/cn"

type PhoneInputSize = "sm" | "default" | "lg"
const PhoneInputContext = createContext<PhoneInputSize>("default")

export type PhoneInputProps = Omit<BasePhoneInput.Props<typeof BasePhoneInput.default>, "onChange" | "value" | "variant" | "countrySelectComponent" | "flagComponent" | "inputComponent"> & {
  value?: BasePhoneInput.Value
  onValueChange?: (value: BasePhoneInput.Value | undefined) => void
  size?: PhoneInputSize
  invalid?: boolean
  inputProps?: React.ComponentProps<"input">
  placeholder?: string
}

export function PhoneInput({ value, onValueChange, size = "default", invalid, className, inputProps, ...props }: PhoneInputProps) {
  return <PhoneInputContext.Provider value={size}>
    <BasePhoneInput.default
      {...props}
      value={value || undefined}
      onChange={(next) => onValueChange?.(next)}
      numberInputProps={{ ...inputProps, "aria-invalid": invalid || inputProps?.["aria-invalid"] || undefined }}
      className={cn("flex min-w-0", invalid && "[&_[data-slot=combobox-trigger]]:border-destructive [&_input]:border-destructive [&_input]:text-destructive", className)}
      countrySelectComponent={CountrySelect}
      flagComponent={FlagComponent}
      inputComponent={PhoneNumberInput}
      smartCaret={false}
    />
  </PhoneInputContext.Provider>
}

type CountryEntry = { label: string; value: BasePhoneInput.Country | undefined }
type CountrySelectProps = {
  disabled?: boolean
  value: BasePhoneInput.Country
  options: CountryEntry[]
  onChange: (country: BasePhoneInput.Country) => void
}

function CountrySelect({ disabled, value: selectedCountry, options, onChange }: CountrySelectProps) {
  const size = useContext(PhoneInputContext)
  const filteredCountries = useMemo(() => options.filter((country) => country.value), [options])
  const selectedLabel = options.find(({ value }) => value === selectedCountry)?.label
  const comboboxOptions: ComboboxOption[] = filteredCountries.map(({ label, value }) => ({
    value: value!,
    label,
    description: `+${BasePhoneInput.getCountryCallingCode(value!)}`,
    icon: <FlagComponent country={value!} countryName={label} />,
  }))

  return <div className="flex min-w-0 items-center">
    <Combobox
      options={comboboxOptions}
      value={selectedCountry || ""}
      onValueChange={(country) => { if (typeof country === "string") onChange(country as BasePhoneInput.Country) }}
      aria-label={selectedLabel ? `${selectedLabel} calling code` : "Choose country calling code"}
      placeholder=""
      searchPlaceholder="Search countries..."
      disabled={disabled}
      className={cn("w-28 shrink-0 [&_[role=combobox]]:rounded-r-none [&_[role=combobox]]:border-r-0", size === "sm" && "[&_[role=combobox]]:h-8", size === "default" && "[&_[role=combobox]]:h-10", size === "lg" && "[&_[role=combobox]]:h-11")}
      displayValue={selectedCountry ? `+${BasePhoneInput.getCountryCallingCode(selectedCountry)}` : ""}
      leadingIcon={selectedCountry ? <FlagComponent country={selectedCountry} countryName={selectedCountry} /> : <IconWorld className="size-4" />}
      triggerIcon={<IconSelector className="size-4 shrink-0 text-muted-foreground" />}
      renderOption={(option) => <>{option.icon}<span className="min-w-0 flex-1 truncate">{option.label}</span><span className="text-xs text-muted-foreground">{option.description}</span></>}
    />
  </div>
}

function PhoneNumberInput({ className, "aria-invalid": ariaInvalid, ...props }: React.ComponentProps<typeof Input>) {
  const size = useContext(PhoneInputContext)
  return <Input
    {...props}
    type="tel"
    aria-invalid={ariaInvalid}
    className={cn("min-w-0 flex-1", size === "sm" && "h-8 rounded-s-none", size === "default" && "rounded-s-none", size === "lg" && "h-11 rounded-s-none", className)}
  />
}

function FlagComponent({ country, countryName }: BasePhoneInput.FlagProps) {
  const Flag = flags[country]
  return <span className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-[3px] [&_svg]:size-full" aria-label={countryName}>
    {Flag ? <Flag title={countryName} /> : <IconWorld aria-hidden="true" className="size-4 text-muted-foreground" />}
  </span>
}
