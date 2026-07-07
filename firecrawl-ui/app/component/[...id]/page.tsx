import { notFound } from "next/navigation";
import { componentSource } from "@/lib/source";
import {
  ArticleRoot,
  ArticleHeader,
  ArticleContent,
} from "@/components/article";
import { ComponentSidebar } from "./sidebar";
import { ComponentTOC } from "./component-toc";
import { GutterLayout } from "@/components/ui/gutter-layout";
import { PageNav } from "@/components/ui/page-nav";
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

  const title = `${page.data.title} - Firecrawl UI`;
  const description =
    page.data.description || `${page.data.title} component documentation.`;
  const url = `https://ui.firecrawl.dev/component/${params.slug?.join("/")}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Firecrawl UI",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ComponentDetailPage(props: {
  params: Promise<{ id: string[] }>;
}) {
  const params = await props.params;
  const page = componentSource.getPage(params.id);
  if (!page) notFound();

  const MDX = page.data.body;
  const slug = params.id?.join("/") ?? "";
  const title = page.data.title;
  const description = page.data.description ?? "";

  const allPages = componentSource.getPages();
  const sidebarItems = allPages.map((p) => ({
    label: p.data.title,
    href: p.url,
  }));

  // Compute prev/next pages
  const currentIdx = allPages.findIndex((p) => p.url === page.url);
  const prevPage = currentIdx > 0 ? allPages[currentIdx - 1] : null;
  const nextPage =
    currentIdx < allPages.length - 1 ? allPages[currentIdx + 1] : null;

  return (
    <GutterLayout
      className="h-screen"
      left={
        <ComponentSidebar
          items={sidebarItems}
          activeSlug={params.id?.[0] ?? ""}
        />
      }
      right={
        <div className="px-4">
          <ComponentTOC
            headings={page.data.toc.map((item) => ({
              title: extractTocText(item.title),
              url: item.url,
              depth: item.depth,
            }))}
          />
        </div>
      }
    >
      <div className="px-4 lg:px-10 overflow-x-hidden overflow-y-scroll">
        <ArticleRoot data={{ title, description, slug }}>
          <ArticleHeader />
          <ArticleContent>
            <MDX components={getMDXComponents()} />
          </ArticleContent>
          <PageNav
            prev={prevPage ? { label: prevPage.data.title, href: prevPage.url } : null}
            next={nextPage ? { label: nextPage.data.title, href: nextPage.url } : null}
          />
        </ArticleRoot>
      </div>
    </GutterLayout>
  );
}
