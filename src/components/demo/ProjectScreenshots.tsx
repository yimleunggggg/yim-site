"use client";

import {
  projectScreenshotCatalog,
  type ProjectScreenshotSlug,
} from "@/lib/demo/project-screenshots";
import { ProjectScreenshotGallery } from "./ProjectScreenshotGallery";

export function ProjectScreenshots({ slug }: { slug: ProjectScreenshotSlug }) {
  const shots = projectScreenshotCatalog[slug];
  if (!shots?.length) return null;
  return <ProjectScreenshotGallery shots={shots} />;
}
