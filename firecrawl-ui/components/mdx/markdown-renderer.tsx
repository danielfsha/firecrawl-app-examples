"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { ExpandableCode } from "@/components/expandable-code";
import { ComponentPreview } from "@/components/mdx/component-preview";
import { CodeInstall } from "@/components/ui/code-install";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Extract <preview>id</preview> and <install>pkg</install> blocks
  const parts = content.split(
    /(<preview>[^<]+<\/preview>|<install>[^<]+<\/install>)/g
  );

  return (
    <div className={cn("w-full", className)}>
      {parts.map((part, i) => {
        const previewMatch = part.match(/<preview>([^<]+)<\/preview>/);
        if (previewMatch) {
          return <ComponentPreview key={i} id={previewMatch[1].trim()} />;
        }
        const installMatch = part.match(/<install>([^<]+)<\/install>/);
        if (installMatch) {
          const pkg = installMatch[1].trim();
          return (
            <div key={i} style={{ margin: "16px 0" }}>
              <CodeInstall
                tabs={[
                  { label: "npm", code: `npm install ${pkg}` },
                  { label: "pnpm", code: `pnpm add ${pkg}` },
                  { label: "yarn", code: `yarn add ${pkg}` },
                  { label: "bun", code: `bun add ${pkg}` },
                ]}
              />
            </div>
          );
        }
        if (!part.trim()) return null;
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "150%",
                    letterSpacing: "-0.333px",
                    color: "var(--fc-accent-black)",
                    fontFeatureSettings: '"calt"',
                  }}
                >
                  {children}
                </h1>
              ),
              h2: ({ children }) => {
                const text =
                  typeof children === "string" ? children : String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                return (
                  <h2
                    id={id}
                    style={{
                      marginTop: "32px",
                      marginBottom: "16px",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.257px",
                      color: "var(--fc-accent-black)",
                      fontFeatureSettings: '"calt"',
                      scrollMarginTop: "16px",
                    }}
                  >
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const text =
                  typeof children === "string" ? children : String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                return (
                  <h3
                    id={id}
                    style={{
                      marginTop: "24px",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.175px",
                      color: "var(--fc-accent-black)",
                      fontFeatureSettings: '"calt"',
                      scrollMarginTop: "16px",
                    }}
                  >
                    {children}
                  </h3>
                );
              },
              h4: ({ children }) => (
                <h4
                  style={{
                    marginTop: "24px",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "150%",
                    letterSpacing: "-0.087px",
                    color: "var(--fc-accent-black)",
                  }}
                >
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "14px",
                    fontWeight: 450,
                    lineHeight: "24px",
                    letterSpacing: "-0.087px",
                    color: "var(--fc-black-alpha-72)",
                    overflowWrap: "break-word",
                    textWrap: "pretty",
                  }}
                >
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul
                  style={{
                    paddingLeft: "24px",
                    listStyle: "none",
                    margin: "8px 0 16px 0",
                  }}
                >
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol
                  style={{
                    paddingLeft: "24px",
                    listStyle: "none",
                    counterReset: "prose-ol 0",
                    margin: "8px 0 16px 0",
                  }}
                >
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li
                  style={{
                    position: "relative",
                    fontSize: "14px",
                    fontWeight: 450,
                    lineHeight: "24px",
                    letterSpacing: "-0.087px",
                    color: "var(--fc-black-alpha-72)",
                    marginBottom: "8px",
                    paddingLeft: "0",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "-16px",
                      color: "var(--fc-black-alpha-32)",
                    }}
                  >
                    •
                  </span>
                  {children}
                </li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  style={{
                    color: "var(--primary)",
                    textDecoration: "underline",
                    textDecorationThickness: "1px",
                    textDecorationColor:
                      "color-mix(in srgb, currentcolor 20%, transparent)",
                    textUnderlineOffset: "2px",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong
                  style={{
                    fontWeight: 600,
                    color: "var(--fc-accent-black)",
                  }}
                >
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em style={{ fontStyle: "italic" }}>{children}</em>
              ),
              hr: () => (
                <hr
                  style={{
                    width: "100%",
                    height: "0.5px",
                    margin: "24px 0",
                    background: "var(--fc-border-faint)",
                    border: "none",
                  }}
                />
              ),
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    position: "relative",
                    paddingLeft: "16px",
                    marginBottom: "16px",
                    fontSize: "15px",
                    fontWeight: 450,
                    lineHeight: "150%",
                    color: "var(--fc-accent-black)",
                    borderLeft: "2.5px solid var(--fc-border-muted)",
                    borderRadius: "2px",
                  }}
                >
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const isBlock = match !== null;

                if (isBlock) {
                  return (
                    <div
                      style={{
                        margin: "16px 0",
                        borderRadius: "8px",
                        border: "1px solid var(--fc-border-faint)",
                        overflow: "hidden",
                      }}
                    >
                      <ExpandableCode>
                        <CodeBlock
                          code={String(children).replace(/\n$/, "")}
                          language={match[1]}
                          showLineNumbers={true}
                        />
                      </ExpandableCode>
                    </div>
                  );
                }

                return (
                  <code
                    style={{
                      padding: "1px 4px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      fontWeight: 550,
                      lineHeight: "1.3",
                      color: "var(--fc-accent-black)",
                      background: "var(--fc-black-alpha-4)",
                      border: "1px solid var(--fc-border-muted)",
                      borderRadius: "4px",
                      boxDecorationBreak: "clone",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => <>{children}</>,
              table: ({ children }) => (
                <div style={{ overflowX: "auto", margin: "16px 0" }}>
                  <table
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "-0.087px",
                      borderSpacing: 0,
                      borderCollapse: "collapse",
                    }}
                  >
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead
                  style={{
                    borderBottom: "1px solid var(--fc-border-muted)",
                  }}
                >
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th
                  style={{
                    padding: "12px 8px 12px 0",
                    fontWeight: 550,
                    lineHeight: "150%",
                    color: "var(--fc-accent-black)",
                    textAlign: "left",
                  }}
                >
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td
                  style={{
                    padding: "12px 8px 12px 0",
                    fontWeight: 450,
                    lineHeight: "150%",
                    color: "var(--fc-black-alpha-72)",
                    borderBottom: "1px solid var(--fc-border-faint)",
                  }}
                >
                  {children}
                </td>
              ),
            }}
          >
            {part}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}

export { MarkdownRenderer };
