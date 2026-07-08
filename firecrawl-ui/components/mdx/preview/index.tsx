"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";

interface PreviewProps {
  children: React.ReactNode;
  code?: string;
  language?: string;
  className?: string;
}

export function Preview({
  children,
  code,
  language = "tsx",
  className,
}: PreviewProps) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!codeRef.current || !code) return;
    setCanExpand(true);
  }, [code]);

  return (
    <div
      className={cn(
        "rounded-lg border border-(--fc-border-faint) overflow-hidden my-4 max-w-full",
        className
      )}
    >
      {/* Preview area */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "260px",
          padding: "32px 24px",
          background: "transparent",
        }}
      >
        {children}
      </div>

      {/* Code area */}
      {code && (
        <div className="relative border-t border-(--fc-border-faint) bg-white">
          <div
            ref={codeRef}
            className={cn(
              "transition-[max-height] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
              expanded ? "max-h-[600px] overflow-auto" : "max-h-[120px]"
            )}
          >
            <CodeBlock
              code={code}
              language={language}
              showLineNumbers={true}
              className="border-0 rounded-none"
            />
          </div>

          {/* View Code button overlay */}
          {!expanded && (
            <div className="absolute inset-0 flex items-end justify-center pb-4 bg-linear-to-t from-white via-white/80 to-transparent">
              <Button
                size="sm"
                variant={"secondary"}
                type="button"
                onClick={() => setExpanded(true)}
                className="rounded-full text-xs font-medium text-foreground shadow-sm border border-(--fc-border-faint) transition-colors cursor-pointer"
              >
                View Code
              </Button>
            </div>
          )}

          {/* Collapse button */}
          {expanded && (
            <div className="flex items-center justify-center py-2 border-t border-(--fc-border-faint)">
              <Button
                size="sm"
                variant={"secondary"}
                type="button"
                onClick={() => setExpanded(false)}
                className="rounded-full text-xs font-medium text-foreground shadow-sm border border-(--fc-border-faint) transition-colors hover:bg-(--fc-black-alpha-4) cursor-pointer"
              >
                Collapse
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
