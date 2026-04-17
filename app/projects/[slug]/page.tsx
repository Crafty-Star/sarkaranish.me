import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { projectMdxComponents } from "@/components/mdx/project-mdx";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";
import type { ProjectListItem } from "@/types/project";

function stackPills(stackLine: string, fallbackTags: string[]): string[] {
  const parts = stackLine
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length ? parts : fallbackTags;
}

function statusClass(status: ProjectListItem["status"]) {
  return status === "completed"
    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
    : "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-100";
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) {
    return { title: "Project" };
  }
  const p = getProjectBySlug(slug);
  return {
    title: p.title,
    description: p.description,
  };
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) {
    notFound();
  }

  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);
  const pills = stackPills(project.stackLine, project.tags);
  const links = project.externalLinks ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-start">
        <div className="min-w-0 space-y-10">
          <header className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.headline}
            </h1>
            <ul className="flex flex-wrap gap-2">
              {pills.map((pill) => (
                <li key={pill}>
                  <span className="inline-flex rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium text-foreground/90 dark:border-white/15 dark:bg-white/[0.06]">
                    {pill}
                  </span>
                </li>
              ))}
            </ul>
          </header>

          <div className="max-w-none border-t border-black/10 pt-8 dark:border-white/10">
            {await MDXRemote({
              source: project.content,
              components: projectMdxComponents,
            })}
          </div>

          {links.length > 0 ? (
            <section className="border-t border-black/10 pt-8 dark:border-white/10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                Links
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.url + link.label}>
                    <a
                      className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                      href={link.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <nav
            aria-label="Project pagination"
            className="flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:justify-between dark:border-white/10"
          >
            <div className="min-w-0 sm:max-w-[50%]">
              {prev ? (
                <Link
                  className="group block rounded-lg border border-black/10 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10"
                  href={`/projects/${prev.slug}`}
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                    Previous
                  </span>
                  <p className="mt-1 font-semibold text-foreground group-hover:underline">
                    {prev.title}
                  </p>
                </Link>
              ) : null}
            </div>
            <div className="min-w-0 sm:max-w-[50%] sm:text-right">
              {next ? (
                <Link
                  className="group block rounded-lg border border-black/10 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10"
                  href={`/projects/${next.slug}`}
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                    Next
                  </span>
                  <p className="mt-1 font-semibold text-foreground group-hover:underline">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </div>
          </nav>
        </div>

        <aside className="space-y-6 border-t border-black/10 pt-8 text-sm lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 dark:border-white/10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              Status
            </p>
            <span
              className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusClass(project.status)}`}
            >
              {project.status.replaceAll("-", " ")}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              Year
            </p>
            <p className="mt-2 text-lg font-semibold tabular-nums text-foreground">
              {project.year}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              Tags
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex rounded-full border border-black/10 px-2 py-0.5 text-xs text-foreground/85 dark:border-white/15">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              Stack
            </p>
            <p className="mt-2 leading-relaxed text-foreground/85">
              {project.stackLine}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
