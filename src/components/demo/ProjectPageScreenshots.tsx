import Image from "next/image";
import { ProjectScreenshotGallery } from "@/components/demo/ProjectScreenshotGallery";
import {
  getProjectAboutThumb,
  getProjectScreenshotsForPage,
} from "@/lib/demo/project-screenshots";

export function ProjectPageScreenshots({ slug, title = "" }: { slug: string; title?: string }) {
  const shots = getProjectScreenshotsForPage(slug);
  if (shots?.length) return <ProjectScreenshotGallery shots={shots} />;

  const cover = getProjectAboutThumb(slug, title);
  if (cover.kind !== "image" || cover.vector) return null;

  return (
    <div className="project-page-cover">
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width ?? 1024}
        height={cover.height ?? 682}
        sizes="(max-width: 768px) 100vw, 72rem"
        className="project-page-cover-img"
        priority
      />
    </div>
  );
}
