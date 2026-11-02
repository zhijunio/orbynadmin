import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/foundations/providers/theme-provider";
import { ThemeConfigProvider } from "@/components/application/theme/theme-customizer";
import { AppMotionProvider } from "@/components/foundations/providers/app-motion-provider";
import { Toaster } from "@/components/base/notification/sonner";

export const metadata: Metadata = {
  title: {
    default: "OrbynAdmin",
    template: "%s · OrbynAdmin",
  },
  description:
    "An enterprise admin dashboard starter for managing teams, access, integrations and operations.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full" suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppMotionProvider>
              <ThemeConfigProvider>
                {children}
                <Toaster />
              </ThemeConfigProvider>
            </AppMotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
