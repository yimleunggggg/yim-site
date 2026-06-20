import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, Noto_Serif_SC, IBM_Plex_Mono } from "next/font/google";
import { LocaleProvider } from "@/components";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const sans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const serif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Yim Leung · Life × AI Lab",
    template: "%s · Yim Leung",
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.title,
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} min-h-screen overflow-x-hidden`}
      >
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
