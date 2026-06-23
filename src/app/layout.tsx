import type { Metadata, Viewport } from "next";
import { LocaleProvider } from "@/components";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

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
      <body className="min-h-screen overflow-x-hidden">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
