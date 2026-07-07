import { notFound } from "next/navigation";
import { learnSource, componentSource } from "@/lib/source";
import {
  ArticleRoot,
  ArticleHeader,
  ArticleContent,
} from "@/components/article";
import { GutterLayout } from "@/components/ui/gutter-layout";
import { Sidebar } from "@/components/ui/sidebar";
import { ComponentTOC } from "@/app/component/[...id]/component-toc";
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
  return learnSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ id?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = learnSource.getPage(params.id);
  if (!page) return {};

  return {
    title: `${page.data.title} - Firecrawl UI`,
    description: page.data.description,
  };
}

export default async function LearnPage(props: {
  params: Promise<{ id: string[] }>;
}) {
  const params = await props.params;
  const page = learnSource.getPage(params.id);
  if (!page) notFound();

  const MDX = page.data.body;
  const slug = params.id?.join("/") ?? "";
  const title = page.data.title;
  const description = page.data.description ?? "";

  const allLearnPages = learnSource.getPages();
  const allComponentPages = componentSource.getPages();

  const sidebarSections = [
    ...(allLearnPages.length > 0
      ? [{
          title: "Get Started",
          items: allLearnPages.map((p) => ({ label: p.data.title, href: p.url })),
        }]
      : []),
    {
      title: "Components",
      count: allComponentPages.length,
      items: allComponentPages.map((p) => ({ label: p.data.title, href: p.url })),
    },
  ];

  return (
    <GutterLayout
      className="h-screen"
      left={<Sidebar sections={sidebarSections} activeHref={page.url} />}
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
      <div className="px-4 lg:px-10 overflow-x-hidden overflow-y-auto">
        <ArticleRoot data={{ title, description, slug }}>
          <ArticleHeader />
          <ArticleContent>
            <MDX components={getMDXComponents()} />
          </ArticleContent>
        </ArticleRoot>
      </div>
    </GutterLayout>
  );
}
