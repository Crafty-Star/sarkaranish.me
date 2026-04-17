import { ProjectCard } from "@/components/projects/ProjectCard";
import type { ProjectListItem } from "@/types/project";

export function ProjectGrid({ projects }: { projects: ProjectListItem[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-foreground/60">No projects match this filter.</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug} className="h-full min-h-0">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
