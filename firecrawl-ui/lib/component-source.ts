import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ComponentPage {
  slug: string;
  title: string;
  description?: string;
  content: string;
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

  return {
    slug,
    title: data.title || slug,
    description: data.description,
    content,
  };
}

export function getAllComponentPages(): ComponentPage[] {
  return getComponentSlugs()
    .map(getComponentPage)
    .filter(Boolean) as ComponentPage[];
}
