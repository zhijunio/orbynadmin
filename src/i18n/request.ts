import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, localeFromAcceptLanguage } from "./routing";

export default getRequestConfig(async () => {
  const requestedLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  const browserLocale = localeFromAcceptLanguage((await headers()).get("accept-language"));
  const locale = isLocale(requestedLocale) ? requestedLocale : browserLocale ?? defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
