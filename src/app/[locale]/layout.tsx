import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeConfigProvider } from "@/components/theme-customizer";
import { AppMotionProvider } from "@/components/app-motion-provider";
import { Toaster } from "@/components/ui/sonner";
import { routing, type Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: {
    default: "OrbynAdmin",
    template: "%s · OrbynAdmin",
  },
  description:
    "An enterprise admin dashboard starter for managing teams, access, integrations and operations.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="h-full antialiased"
    >
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
