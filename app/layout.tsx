import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { getLocale } from "next-intl/server";
import "@/styles/globals.css";
import { ThemeConfigProvider } from "@/components/theme-customizer";
import { Toaster } from "@/components/ui/notification/sonner";

export const metadata: Metadata = {
  title: {
    default: "NextRose",
    template: "%s · NextRose",
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
            <MotionConfig reducedMotion="user">
              <ThemeConfigProvider>
                {children}
                <Toaster />
              </ThemeConfigProvider>
            </MotionConfig>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
