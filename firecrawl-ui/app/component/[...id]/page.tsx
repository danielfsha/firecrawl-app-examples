import { notFound } from "next/navigation";
import { getComponentPage, getComponentSlugs } from "@/lib/component-source";
import {
  ArticleRoot,
  ArticleHeader,
  ArticleContent,
} from "@/components/article";
import { MarkdownRenderer } from "@/components/mdx/markdown-renderer";
import { ComponentSidebar } from "./sidebar";
import { ComponentTOC } from "./component-toc";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getComponentSlugs().map((slug) => ({ id: [slug] }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.id?.[0];
  if (!slug) return {};

  const page = getComponentPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ComponentDetailPage(props: {
  params: Promise<{ id: string[] }>;
}) {
  const params = await props.params;
  const slug = params.id?.[0];
  if (!slug) notFound();

  const page = getComponentPage(slug);
  if (!page) notFound();

  return (
    <div className="grid-layout-3col min-h-screen">
      {/* Left gutter: sidebar */}
      <div className="relative hidden lg:flex justify-end border-r border-(--fc-border-faint)">
        <ComponentSidebar activeSlug={slug} />
      </div>

      {/* Middle: article */}
      <div className="col-start-2 px-6 lg:px-10">
        <ArticleRoot
          data={{
            title: page.title,
            description: page.description,
            slug: page.slug,
          }}
        >
          <ArticleHeader />
          <ArticleContent>
            <MarkdownRenderer content={page.content} />
          </ArticleContent>
        </ArticleRoot>
      </div>

      {/* Right gutter: TOC */}
      <div className="relative hidden lg:block border-l border-(--fc-border-faint) px-4">
        <ComponentTOC headings={page.headings} />
      </div>
    </div>
  );
}
