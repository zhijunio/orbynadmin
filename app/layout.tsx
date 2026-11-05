import type { Metadata } from "next";
import { geistMono, geistSans } from "@/app/fonts";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
