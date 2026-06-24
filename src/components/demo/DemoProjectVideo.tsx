import { resolveProjectVideo } from "@/lib/demo/project-video";

export function DemoProjectVideo({ url, title }: { url: string; title: string }) {
  const resolved = resolveProjectVideo(url);
  if (!resolved) return null;

  if (resolved.kind === "video") {
    return (
      <div className="demo-project-video mt-10">
        <video controls playsInline preload="metadata" className="h-auto w-full rounded-md border border-[var(--color-border)]">
          <source src={resolved.src} />
        </video>
      </div>
    );
  }

  return (
    <div className="demo-project-video mt-10 aspect-video overflow-hidden rounded-md border border-[var(--color-border)]">
      <iframe
        src={resolved.src}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
