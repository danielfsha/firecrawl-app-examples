import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export const components = defineDocs({
  dir: "content/components",
});

export const learn = defineDocs({
  dir: "content/learn",
});

export default defineConfig();
