import { getAllMoments } from "@/lib/life-content";
import LifePageClient from "./LifePageClient";

export default function LifePage() {
  const moments = getAllMoments();
  return <LifePageClient moments={moments} />;
}
