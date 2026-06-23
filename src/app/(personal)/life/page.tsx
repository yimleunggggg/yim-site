import type { Metadata } from "next";
import { DemoLife } from "@/components/demo/DemoLife";

export const metadata: Metadata = {
  title: "Life Archive",
};

export default function LifePage() {
  return <DemoLife />;
}
