import type { Photo } from "@/types/photo";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return (
      <p className="text-sm text-foreground/60">No photos to show yet.</p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {photos.map((photo) => (
        <li key={photo.id}>
          <span className="text-sm">{photo.alt}</span>
        </li>
      ))}
    </ul>
  );
}
