"use client";

import * as React from "react";
import { Highlight } from "prism-react-renderer";
import type { PrismTheme, Token } from "prism-react-renderer";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-clipboard";

type Language =
  | "javascript"
  | "jsx"
  | "typescript"
  | "tsx"
  | "json"
  | "bash"
  | "css"
  | "html"
  | "markdown"
  | "yaml"
  | "python";

const lightTheme: PrismTheme = {
  plain: {
    color: "#374151",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment"],
      style: { color: "#9CA3AF", fontStyle: "italic" },
    },
    {
      types: ["keyword", "operator", "builtin"],
      style: { color: "#E85D04" },
    },
    {
      types: ["string", "char"],
      style: { color: "#B45309" },
    },
    {
      types: ["number", "boolean"],
      style: { color: "#9061FF" },
    },
    {
      types: ["function", "method", "function-variable"],
      style: { color: "#7C3AED" },
    },
    {
      types: ["class-name", "constant", "tag"],
      style: { color: "#E85D04" },
    },
    {
      types: ["attr-name", "property"],
      style: { color: "#7C3AED" },
    },
    {
      types: ["selector"],
      style: { color: "#E85D04" },
    },
    {
      types: ["punctuation"],
      style: { color: "#9CA3AF" },
    },
    {
      types: ["parameter", "variable", "symbol", "plain"],
      style: { color: "#374151" },
    },
  ],
};

function toPrismLanguage(language?: string): Language {
  const normalized = (language ?? "").toLowerCase();
  switch (normalized) {
    case "js":
    case "javascript":
      return "javascript";
    case "jsx":
      return "jsx";
    case "ts":
    case "typescript":
      return "typescript";
    case "tsx":
      return "tsx";
    case "json":
      return "json";
    case "bash":
    case "sh":
    case "shell":
    case "terminal":
      return "bash";
    case "css":
      return "css";
    case "html":
      return "html";
    case "md":
    case "markdown":
      return "markdown";
    case "yaml":
    case "yml":
      return "yaml";
    case "python":
    case "py":
      return "python";
    default:
      return "tsx";
  }
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  className,
  ...props
}: CodeBlockProps) {
  const { isCopied, copy } = useCopyToClipboard();
  const effectiveCode = code.replace(/^\n+/, "").replace(/\s+$/, "");
  const prismLanguage = toPrismLanguage(language);
  const isBash = prismLanguage === "bash";

  return (
    <div
      data-slot="code-block"
      className={cn("relative overflow-hidden rounded-xl bg-[#F7F7F7] border border-(--fc-border-faint) shadow-[0_0px_0px_1px_rgba(0,0,0,0.01),0_2px_8px_0px_rgba(0,0,0,0.04)]", className)}
      {...props}
    >
      {/* Copy button */}
      <div className="absolute top-3 right-3 z-10">
        <button
          type="button"
          onClick={() => copy(effectiveCode)}
          aria-label={isCopied ? "Copied" : "Copy code"}
          className={cn(
            "flex items-center justify-center h-7 w-7 rounded-md transition-colors cursor-pointer",
            isCopied
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-(--fc-black-alpha-4)"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={isCopied ? "check" : "copy"}
              initial={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", damping: 20, stiffness: 400, mass: 0.5 }}
            >
              {isCopied ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <Highlight code={effectiveCode || " "} language={prismLanguage} theme={lightTheme}>
        {({ className: prismClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              prismClassName,
              "overflow-x-auto overflow-y-hidden px-6 text-[14px] leading-7 font-mono w-full",
              showLineNumbers ? "py-5" : "py-3"
            )}
            style={{ ...style }}
          >
            <code className="grid min-w-full w-max">
              {tokens.map((line: Token[], index: number) => {
                const lineNumber = index + 1;
                const formattedLineNumber = String(lineNumber);
                const { key: _lineKey, ...lineProps } = getLineProps({ line, key: index });

                return (
                  <span
                    key={index}
                    className="flex w-full items-start gap-5"
                  >
                    {showLineNumbers && (
                      <span className="w-8 shrink-0 select-none text-right text-[#C8C8C8] font-mono text-[13px]">
                        {isBash ? "$" : formattedLineNumber}
                      </span>
                    )}
                    <span className="whitespace-pre">
                      {line.length === 0
                        ? " "
                        : line.map((token: Token, tokenIndex: number) => {
                            const { key: _key, ...tokenProps } = getTokenProps({ token, key: tokenIndex });
                            return (
                              <span key={tokenIndex} {...tokenProps} />
                            );
                          })}
                    </span>
                  </span>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export { CodeBlock };
