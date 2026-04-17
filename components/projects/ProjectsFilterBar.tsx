"use client";

import { useMemo, useState } from "react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import type { ProjectCategory, ProjectListItem } from "@/types/project";

const FILTERS: Array<ProjectCategory | "All"> = [
  "All",
  "Hardware",
  "Software",
  "Research",
  "Design",
];

export function ProjectsFilterBar({
  projects,
}: {
  projects: ProjectListItem[];
}) {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category === active);
  }, [projects, active]);

  return (
    <div className="space-y-8">
      <div
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
        role="toolbar"
      >
        {FILTERS.map((key) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-black/15 bg-transparent text-foreground hover:bg-black/[0.04] dark:border-white/20 dark:hover:bg-white/[0.06]"
              }`}
              onClick={() => setActive(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
      <ProjectGrid projects={filtered} />
    </div>
  );
}
