import type { Metadata } from "next";
import { DemoAbout } from "@/components/demo/DemoAbout";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <DemoAbout />;
}
