import { notFound } from "next/navigation";
import { getComponentPage, getComponentSlugs } from "@/lib/component-source";
import { ArticleRoot, ArticleHeader, ArticleContent } from "@/components/article";
import { MarkdownRenderer } from "@/components/mdx/markdown-renderer";
import { ComponentSidebar } from "./sidebar";
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
      {/* Left column: sidebar (hidden on mobile) */}
      <div className="relative hidden lg:block border-r border-(--fc-border-faint)">
        <ComponentSidebar activeSlug={slug} />
      </div>

      {/* Middle column: content */}
      <div className="col-start-2 px-6">
        <div style={{ minHeight: "124px" }} />
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

      {/* Right column: empty gutter */}
      <div className="hidden lg:block border-l border-(--fc-border-faint)" />
    </div>
  );
}
