import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeConfigProvider } from "@/components/custom/theme/theme-customizer";
import { AppMotionProvider } from "@/components/app-motion-provider";
import { Toaster } from "@/components/ui/notification/sonner";

export const metadata: Metadata = {
  title: {
    default: "OrbynAdmin",
    template: "%s · OrbynAdmin",
  },
  description: "A component library and interface framework.",
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
