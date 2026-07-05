"use client";

import {
  TOCProvider,
  PageTOC,
  PageTOCItems,
  type TOCItemType,
} from "@/components/ui/toc";

interface TocHeading {
  id: string;
  label: string;
  depth: number;
}

export function ComponentTOC({ headings }: { headings: TocHeading[] }) {
  const tocItems: TOCItemType[] = headings.map((h) => ({
    title: h.label,
    url: `#${h.id}`,
    depth: h.depth,
  }));

  return (
    <TOCProvider toc={tocItems}>
      <PageTOC className="sticky top-0 py-4">
        <p className="text-xs font-medium text-muted-foreground">
          On This Page
        </p>
        <PageTOCItems variant="clerk" />
      </PageTOC>
    </TOCProvider>
  );
}
