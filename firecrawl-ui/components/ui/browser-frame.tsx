"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Corner } from "./corner";
import { AnimatePresence, motion } from "motion/react";
import { useCopyToClipboard } from "@/hooks/use-clipboard";
import { Check, Copy } from "lucide-react";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export function BrowserFrame({
  url = "https://example.com",
  children,
  className,
}: BrowserFrameProps) {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <div
      className={cn(
        "border border-(--fc-border-faint) overflow-hidden",
        className
      )}
    >
      {/* Browser toolbar */}
      <div className="relative flex items-center gap-3 border-b border-(--fc-border-faint) px-4 py-3">
        <Corner />
        <Corner position={"top-right"} />
        <Corner position={"bottom-right"} />
        <Corner position={"bottom-left"} />

        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border border-(--fc-border-muted)" />
          <div className="w-3 h-3 rounded-full border border-(--fc-border-muted)" />
          <div className="w-3 h-3 rounded-full border border-(--fc-border-muted)" />
        </div>
        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 bg-(--fc-black-alpha-3) rounded-md px-3 py-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0 text-(--fc-black-alpha-32)"
          >
            <circle
              cx="6"
              cy="6"
              r="5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="text-sm text-(--fc-black-alpha-56) font-mono truncate">
            {url}
          </span>
        </div>
        <button
          type="button"
          onClick={() => copy("component code")}
          aria-label={isCopied ? "Copied" : "Copy code"}
          className={cn(
            "font-sans flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
            isCopied
              ? "bg-primary/20 text-primary"
              : "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isCopied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Check className="h-3.5 w-3.5" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Copy className="h-3.5 w-3.5" />
              </motion.span>
            )}
            {isCopied ? (
              <span>Copied!</span>
            ) : (
              <span>
                Copy
              </span>
            )}
          </AnimatePresence>
        </button>
      </div>
      {/* Content area */}
      <div className="relative">{children}</div>
    </div>
  );
}
