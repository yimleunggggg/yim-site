import type { Metadata, Viewport } from "next";
import { LocaleProvider } from "@/components";
import { SiteAnalytics } from "@/components/SiteAnalytics";
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
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    { name: siteConfig.author, url: siteConfig.url },
    { name: siteConfig.alias, url: "https://xhslink.com/m/z9m3VbCucI" },
  ],
  creator: `${siteConfig.author} / ${siteConfig.alias}`,
  publisher: siteConfig.author,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    url: siteConfig.url,
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
      <SiteAnalytics />
    </html>
  );
}
