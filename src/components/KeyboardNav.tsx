"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  prevSlug?: string | null;
  nextSlug?: string | null;
};

export function KeyboardNav({ prevSlug, nextSlug }: Props) {
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "j" && nextSlug) {
        e.preventDefault();
        router.push(`/ai-playbook/${nextSlug}`);
      }
      if (e.key === "k" && prevSlug) {
        e.preventDefault();
        router.push(`/ai-playbook/${prevSlug}`);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prevSlug, nextSlug]);

  return null;
}
