export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "zh";
}

export function localeFromAcceptLanguage(value: string | null): Locale | undefined {
  return value
    ?.split(",")
    .map((language) => language.trim().split(";")[0].toLowerCase().split("-")[0])
    .find(isLocale);
}
