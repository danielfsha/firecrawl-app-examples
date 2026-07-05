import { notFound } from "next/navigation";
import { componentSource } from "@/lib/source";
import {
  ArticleRoot,
  ArticleHeader,
  ArticleContent,
} from "@/components/article";
import { ComponentSidebar } from "./sidebar";
import { ComponentTOC } from "./component-toc";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";

function extractTocText(title: unknown): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "props" in (title as object)) {
    const el = title as { props?: { children?: unknown } };
    const children = el.props?.children;
    if (typeof children === "string") return children;
    if (Array.isArray(children))
      return children.filter((c: unknown) => typeof c === "string").join("");
  }
  return "";
}

export async function generateStaticParams() {
  return componentSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = componentSource.getPage(params.slug);
  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function ComponentDetailPage(props: {
  params: Promise<{ id: string[] }>;
}) {
  const params = await props.params;
  const page = componentSource.getPage(params.id);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="grid-layout-3col min-h-screen">
      {/* Left gutter: sidebar */}
      <div className="relative hidden lg:flex justify-end border-r border-(--fc-border-faint)">
        <ComponentSidebar activeSlug={params.id?.[0] ?? ""} />
      </div>

      {/* Middle: article */}
      <div className="col-start-2 px-6 lg:px-10">
        <ArticleRoot
          data={{
            title: page.data.title,
            description: page.data.description ?? "",
            slug: params.id?.join("/") ?? "",
          }}
        >
          <ArticleHeader />
          <ArticleContent>
            <MDX components={getMDXComponents()} />
          </ArticleContent>
        </ArticleRoot>
      </div>

      {/* Right gutter: TOC */}
      <div className="relative hidden lg:block border-l border-(--fc-border-faint) px-4">
        <ComponentTOC
          headings={page.data.toc.map((item) => ({
            title: extractTocText(item.title),
            url: item.url,
            depth: item.depth,
          }))}
        />
      </div>
    </div>
  );
}
