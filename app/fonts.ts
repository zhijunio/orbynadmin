import localFont from "next/font/local";

export const geistSans = localFont({
  src: "../public/fonts/geist-variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const geistMono = localFont({
  src: "../public/fonts/geist-mono-variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
});
