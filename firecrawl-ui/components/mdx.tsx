import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Preview } from "@/components/mdx/preview";
import { CodeInstall } from "@/components/ui/code-install";
import { CodeBlock } from "@/components/ui/code-block";
import { ExpandableCode } from "@/components/expandable-code";
import { Steps, Step } from "@/components/ui/steps";
import { SectionTitle } from "@/components/mdx/section-title";

function Pre({ children, ...props }: React.ComponentProps<"pre">) {
  const codeEl = children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;
  const className = codeEl?.props?.className || "";
  const match = /language-(\w+)/.exec(className);
  const code =
    typeof codeEl?.props?.children === "string"
      ? codeEl.props.children.replace(/\n$/, "")
      : "";

  if (match && code) {
    return (
      <div
        style={{
          margin: "16px 0",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <ExpandableCode>
          <CodeBlock code={code} language={match[1]} showLineNumbers={true} />
        </ExpandableCode>
      </div>
    );
  }

  // Fallback: still try to extract code from non-language-tagged blocks
  if (code) {
    return (
      <div
        style={{
          margin: "16px 0",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <ExpandableCode>
          <CodeBlock code={code} language="tsx" showLineNumbers={true} />
        </ExpandableCode>
      </div>
    );
  }

  return <pre {...props}>{children}</pre>;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components,
    // Override AFTER spreading to ensure our components take priority
    pre: Pre,
    h2: ({ children, id, ...props }: React.ComponentProps<"h2">) => (
      <SectionTitle id={id}>{children}</SectionTitle>
    ),
    Preview,
    CodeInstall,
    CodeBlock,
    ExpandableCode,
    Steps,
    Step,
    SectionTitle,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
