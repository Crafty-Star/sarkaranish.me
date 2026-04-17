export type MediaType = "book" | "manga" | "film" | "anime";

export type MediaStatus = "completed" | "in-progress" | "dropped";

export type MediaRating = 1 | 2 | 3 | 4 | 5;

export interface MediaEntry {
  title: string;
  type: MediaType;
  status: MediaStatus;
  rating: MediaRating;
  genres: string[];
  notes?: string;
}
