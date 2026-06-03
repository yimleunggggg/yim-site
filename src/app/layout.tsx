import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC, IBM_Plex_Mono } from "next/font/google";
import { LocaleProvider } from "@/components";
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

export const metadata: Metadata = {
  title: "Yim Leung · Life × AI Lab",
  description:
    "探索者 · 运营人 · AI 实践者。独立旅行、运动、精酿、AI 应用——持续探索的个人实验站。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} grid-bg min-h-screen`}
      >
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
