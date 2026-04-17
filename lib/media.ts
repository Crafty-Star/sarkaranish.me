import { mediaLog } from "@/content/media/log";
import type { MediaEntry } from "@/types/media";

export function getAllMedia(): MediaEntry[] {
  return mediaLog;
}
