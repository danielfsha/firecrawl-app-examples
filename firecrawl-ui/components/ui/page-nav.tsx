"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageNavItem {
  label: string;
  href: string;
}

interface PageNavProps {
  prev?: PageNavItem | null;
  next?: PageNavItem | null;
  className?: string;
}

export function PageNav({ prev, next, className }: PageNavProps) {
  if (!prev && !next) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-t border-(--fc-border-faint) pt-6 mt-12",
        className
      )}
    >
      {prev ? (
        <a
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-(--fc-black-alpha-56) hover:text-(--fc-accent-black) transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <div className="flex flex-col">
            <span className="text-xs text-(--fc-black-alpha-40)">Previous</span>
            <span className="font-medium">{prev.label}</span>
          </div>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={next.href}
          className="group flex items-center gap-2 text-sm text-(--fc-black-alpha-56) hover:text-(--fc-accent-black) transition-colors text-right"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-(--fc-black-alpha-40)">Next</span>
            <span className="font-medium">{next.label}</span>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      ) : (
        <div />
      )}
    </div>
  );
}
