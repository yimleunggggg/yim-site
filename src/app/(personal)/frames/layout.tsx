import type { Metadata } from "next";
import { FRAMES_INDEX_DESCRIPTION, FRAMES_SITE_NAME } from "@/lib/demo/frames-seo";

export const metadata: Metadata = {
  title: {
    default: "FRAMES",
    template: `%s · ${FRAMES_SITE_NAME}`,
  },
  description: FRAMES_INDEX_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function FramesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
