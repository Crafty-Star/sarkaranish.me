export type ProjectStatus = "completed" | "in-progress";

export type ProjectCategory =
  | "Hardware"
  | "Software"
  | "Research"
  | "Design";

export interface ProjectMdxFrontmatter {
  title: string;
  headline: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  year: number;
  thumbnail: string;
  stackLine: string;
  category: ProjectCategory;
  externalLinks?: { label: string; url: string }[];
}

export type ProjectListItem = ProjectMdxFrontmatter & { slug: string };
