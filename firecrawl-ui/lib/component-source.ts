import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface TocHeading {
  id: string;
  label: string;
  depth: number;
}

export interface ComponentPage {
  slug: string;
  title: string;
  description?: string;
  content: string;
  headings: TocHeading[];
}

const COMPONENTS_DIR = path.join(process.cwd(), "content/components");

export function getComponentSlugs(): string[] {
  if (!fs.existsSync(COMPONENTS_DIR)) return [];
  return fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getComponentPage(slug: string): ComponentPage | null {
  const filePath = path.join(COMPONENTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Extract headings for TOC
  const headings: TocHeading[] = [];
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const label = match[2].trim();
    headings.push({
      id: label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      label,
      depth: match[1].length,
    });
  }

  return {
    slug,
    title: data.title || slug,
    description: data.description,
    content,
    headings,
  };
}

export function getAllComponentPages(): ComponentPage[] {
  return getComponentSlugs()
    .map(getComponentPage)
    .filter(Boolean) as ComponentPage[];
}
