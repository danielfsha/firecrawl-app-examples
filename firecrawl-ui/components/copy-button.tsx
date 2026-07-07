"use client";

import { Check, ChevronDown, Copy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-clipboard";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <div
      className={cn(
        buttonVariants({
          variant: "secondary",
        }),
        "flex items-center justify-between gap-2"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => copy(text)}
        aria-label={isCopied ? "Copied" : "Copy code"}
        className={cn(
          "relative text-muted-foreground hover:text-foreground",
          className
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
              Copied Page!
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
              Copy page
            </motion.span>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center size-4 overflow-hidden rounded-sm border-l">
          <ChevronDown />
        </div>
      </Button>
    </div>
  );
}
