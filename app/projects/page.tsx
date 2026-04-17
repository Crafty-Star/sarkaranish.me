import { ProjectsFilterBar } from "@/components/projects/ProjectsFilterBar";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto w-full max-w-container flex-1 px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Projects
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-foreground/70">
        Case studies across hardware, software, research, and design. Use the
        filters to narrow the list — everything runs client-side with no reload.
      </p>
      <div className="mt-10">
        <ProjectsFilterBar projects={projects} />
      </div>
    </main>
  );
}
