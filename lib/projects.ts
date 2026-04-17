import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  ProjectCategory,
  ProjectListItem,
  ProjectMdxFrontmatter,
  ProjectStatus,
} from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

const CATEGORIES: ProjectCategory[] = [
  "Hardware",
  "Software",
  "Research",
  "Design",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProjectCategory(v: unknown): v is ProjectCategory {
  return typeof v === "string" && CATEGORIES.includes(v as ProjectCategory);
}

function isProjectStatus(v: unknown): v is ProjectStatus {
  return v === "completed" || v === "in-progress";
}

function parseExternalLinks(
  raw: unknown,
): { label: string; url: string }[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: { label: string; url: string }[] = [];
  for (const item of raw) {
    if (!isRecord(item)) continue;
    const label = item.label;
    const url = item.url;
    if (typeof label === "string" && typeof url === "string") {
      out.push({ label, url });
    }
  }
  return out.length ? out : undefined;
}

function assertFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): ProjectMdxFrontmatter {
  const title = data.title;
  const headline = data.headline;
  const description = data.description;
  const tags = data.tags;
  const status = data.status;
  const year = data.year;
  const thumbnail = data.thumbnail;
  const stackLine = data.stackLine;
  const category = data.category;

  if (typeof title !== "string") {
    throw new Error(`Project "${slug}": missing or invalid title`);
  }
  if (typeof headline !== "string") {
    throw new Error(`Project "${slug}": missing or invalid headline`);
  }
  if (typeof description !== "string") {
    throw new Error(`Project "${slug}": missing or invalid description`);
  }
  if (!Array.isArray(tags) || !tags.every((t) => typeof t === "string")) {
    throw new Error(`Project "${slug}": missing or invalid tags`);
  }
  if (!isProjectStatus(status)) {
    throw new Error(`Project "${slug}": status must be completed | in-progress`);
  }
  if (typeof year !== "number" || !Number.isFinite(year)) {
    throw new Error(`Project "${slug}": missing or invalid year`);
  }
  if (typeof thumbnail !== "string") {
    throw new Error(`Project "${slug}": missing or invalid thumbnail`);
  }
  if (typeof stackLine !== "string") {
    throw new Error(`Project "${slug}": missing or invalid stackLine`);
  }
  if (!isProjectCategory(category)) {
    throw new Error(`Project "${slug}": invalid category`);
  }

  return {
    title,
    headline,
    description,
    tags,
    status,
    year,
    thumbnail,
    stackLine,
    category,
    externalLinks: parseExternalLinks(data.externalLinks),
  };
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .filter((slug) => slug.length > 0);
}

export function parseProjectFile(slug: string): {
  slug: string;
  data: ProjectMdxFrontmatter;
  content: string;
} {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Project not found: ${slug}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (!isRecord(data)) {
    throw new Error(`Invalid frontmatter for "${slug}"`);
  }
  const frontmatter = assertFrontmatter(data, slug);
  return { slug, data: frontmatter, content };
}

export function getAllProjects(): ProjectListItem[] {
  const items = getProjectSlugs().map((slug) => {
    const { data } = parseProjectFile(slug);
    return { ...data, slug };
  });
  return items.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
}

export function getProjectBySlug(
  slug: string,
): ProjectListItem & { content: string } {
  const parsed = parseProjectFile(slug);
  return { ...parsed.data, slug: parsed.slug, content: parsed.content };
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectListItem | null;
  next: ProjectListItem | null;
} {
  const sorted = getAllProjects();
  const idx = sorted.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? sorted[idx - 1]! : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1]! : null,
  };
}
