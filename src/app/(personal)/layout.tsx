import type { Metadata } from "next";
import { DemoHeader } from "@/components/demo/DemoHeader";
import { DemoFooter } from "@/components/demo/DemoFooter";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo-page flex min-h-screen flex-col">
      <DemoHeader />
      <main className="flex-1">{children}</main>
      <DemoFooter />
    </div>
  );
}
