import { ProjectScreenshotGallery } from "@/components/demo/ProjectScreenshotGallery";
import { getProjectScreenshotsForPage } from "@/lib/demo/project-screenshots";

export function ProjectPageScreenshots({ slug }: { slug: string }) {
  const shots = getProjectScreenshotsForPage(slug);
  if (!shots?.length) return null;
  return <ProjectScreenshotGallery shots={shots} />;
}
