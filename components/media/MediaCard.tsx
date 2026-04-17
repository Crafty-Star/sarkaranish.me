import type { MediaEntry } from "@/types/media";

export function MediaCard({ entry }: { entry: MediaEntry }) {
  return (
    <article className="rounded-lg border border-rule p-4">
      <h2 className="font-semibold">{entry.title}</h2>
      <p className="mt-1 text-sm capitalize text-foreground/70">
        {entry.type} · {entry.status} · {entry.rating}/5
      </p>
    </article>
  );
}
