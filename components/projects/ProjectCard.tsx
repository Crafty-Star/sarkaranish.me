import Link from "next/link";
import type { ProjectListItem } from "@/types/project";

function initials(title: string) {
  const parts = title.split(/\s+/).filter(Boolean);
  const letters = parts
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return letters || "—";
}

function statusBadgeClass(status: ProjectListItem["status"]) {
  return status === "completed"
    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-800"
    : "border-amber-500/40 bg-amber-500/10 text-amber-900";
}

export function ProjectCard({ project }: { project: ProjectListItem }) {
  const visibleTags = project.tags.slice(0, 3);
  const extra = project.tags.length - visibleTags.length;

  return (
    <Link
      className="group block h-full rounded-xl border border-rule bg-background shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      href={`/projects/${project.slug}`}
    >
      <article className="flex h-full flex-col overflow-hidden">
        <div className="relative aspect-video w-full bg-gradient-to-br from-fg/5 to-fg/[0.12]">
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-lg font-semibold uppercase tracking-widest text-foreground/30"
          >
            {initials(project.title)}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/60">
            <span className="tabular-nums font-medium text-foreground/80">
              {project.year}
            </span>
            <span className="text-foreground/30">·</span>
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusBadgeClass(project.status)}`}
            >
              {project.status.replaceAll("-", " ")}
            </span>
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:underline">
            {project.title}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/70">
            {project.description}
          </p>
          <ul className="mt-auto flex flex-wrap items-center gap-2 pt-1">
            {visibleTags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex rounded-full border border-rule px-2 py-0.5 text-[11px] text-foreground/75">
                  {tag}
                </span>
              </li>
            ))}
            {extra > 0 ? (
              <li>
                <span className="text-[11px] font-medium text-foreground/45">
                  +{extra}
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </article>
    </Link>
  );
}
