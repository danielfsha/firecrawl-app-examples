"use client";

import * as React from "react";
import { motion, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  isNew?: boolean;
}

interface SidebarSection {
  title: string;
  count?: number;
  items: SidebarItem[];
}

interface SidebarProps {
  sections: SidebarSection[];
  className?: string;
  activeHref?: string;
}

function Sidebar({ sections, className, activeHref }: SidebarProps) {
  // Flatten all items for indexing
  const allItems = sections.flatMap((s) => s.items);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
  const [activeIdx, setActiveIdx] = React.useState<number | null>(() => {
    if (!activeHref) return null;
    const idx = allItems.findIndex((item) => item.href === activeHref);
    return idx >= 0 ? idx : null;
  });

  let globalIdx = 0;

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen w-[260px] ml-auto shrink-0 overflow-y-auto py-4 px-2 font-sans",
        className
      )}
    >
      <LayoutGroup>
        <nav
          className="flex flex-col"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {sections.map((section, sIdx) => {
            const sectionStart = globalIdx;
            return (
              <div key={sIdx} className="flex flex-col gap-0.5 mb-4">
                <div className="flex items-center gap-2 px-3 pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-(--fc-black-alpha-40)">
                    {section.title}
                  </span>
                  {section.count !== undefined && (
                    <span className="text-xs text-(--fc-black-alpha-32) tabular-nums">
                      {section.count}
                    </span>
                  )}
                </div>
                {section.items.map((item) => {
                  const idx = globalIdx++;
                  const isHovered = hoveredIdx === idx;
                  const isActive = activeIdx === idx;

            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors cursor-pointer",
                  isActive
                    ? "text-primary font-medium"
                    : "text-(--fc-accent-black)"
                )}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIdx(idx);
                  window.location.href = item.href;
                }}
              >
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="sidebar-hover"
                    className="absolute inset-0 rounded-md bg-(--fc-black-alpha-4) pointer-events-none"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-md bg-primary/10 pointer-events-none"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10",
                    isHovered && !isActive && "text-primary"
                  )}
                >
                  {item.label}
                </span>
                {item.isNew && (
                  <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wide text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    New
                  </span>
                )}
              </a>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </LayoutGroup>
    </aside>
  );
}

export { Sidebar };
export type { SidebarItem, SidebarSection };
