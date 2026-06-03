import { getRecentMoments } from "@/lib/life-content";
import HomePage from "@/components/HomePage";

export default function Page() {
  const recentMoments = getRecentMoments(3);
  return <HomePage recentMoments={recentMoments} />;
}
