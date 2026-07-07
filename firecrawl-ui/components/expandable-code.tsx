"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ExpandableCode({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState<boolean | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkHeight = () => {
      if (el.scrollHeight > 320) {
        setCanExpand(true);
      } else {
        setCanExpand(false);
      }
    };

    const observer = new ResizeObserver(checkHeight);
    observer.observe(el);
    checkHeight();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={cn(
          "transition-[max-height] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]  bg-white border shadow-[0_0px_0px_1px_rgba(0,0,0,0.01),0_20px_44px_0px_rgba(0,0,0,0.05)] rounded-lg",
          expanded
            ? "max-h-[640px] overflow-auto"
            : canExpand === false
              ? "max-h-none"
              : "max-h-[320px] overflow-hidden"
        )}
      >
        {children}
      </div>
      {canExpand && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 flex items-end justify-center pb-4 transition-opacity",
            expanded
              ? "relative h-auto pt-2 bg-transparent"
              : "h-32 bg-gradient-to-t from-card to-transparent"
          )}
        >
          <button
            type="button"
            onClick={() => {
              if (expanded && contentRef.current) {
                contentRef.current.scrollTop = 0;
              }
              setExpanded(!expanded);
            }}
            className="rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background border border-border"
          >
            {expanded ? "Collapse" : "Expand Code"}
          </button>
        </div>
      )}
    </div>
  );
}
