"use client";

import { createContext, useContext, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface ArticlePageData {
  title: string;
  description?: string;
  slug: string;
}

export interface ArticleContextValue {
  page: ArticlePageData;
}

const ArticleContext = createContext<ArticleContextValue | null>(null);

export function useArticle(): ArticleContextValue {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within <ArticleRoot>");
  }
  return context;
}

interface RootProps {
  data: ArticlePageData;
  children: React.ReactNode;
  className?: string;
}

function Root({ data, children, className }: RootProps) {
  const contextValue: ArticleContextValue = useMemo(
    () => ({ page: data }),
    [data]
  );

  return (
    <ArticleContext.Provider value={contextValue}>
      <div
        className={cn(className)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "640px",
          paddingBlockStart: "64px",
          paddingBlockEnd: "256px",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </ArticleContext.Provider>
  );
}

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const { page } = useArticle();

  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "32px",
        paddingBottom: "24px",
        borderBottom: "1px solid var(--fc-border-faint)",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "150%",
          letterSpacing: "-0.333px",
          color: "var(--fc-accent-black)",
          fontFeatureSettings: '"calt"',
          margin: 0,
        }}
      >
        {page.title}
      </h1>
      {page.description && (
        <p
          style={{
            fontSize: "14px",
            fontWeight: 450,
            lineHeight: "24px",
            letterSpacing: "-0.087px",
            color: "var(--fc-black-alpha-48)",
            margin: 0,
          }}
        >
          {page.description}
        </p>
      )}
    </div>
  );
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className }: ContentProps) {
  return (
    <article
      className={cn(className)}
      data-article-content
      style={{ width: "100%" }}
    >
      {children}
    </article>
  );
}

export {
  Root as ArticleRoot,
  Header as ArticleHeader,
  Content as ArticleContent,
};
