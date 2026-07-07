"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Corner } from "./corner";

// ─── Gutter Layout ──────────────────────────────────────────────────────────
// A reusable 3-column layout matching the navbar's grid-layout-3col.
// Left gutter | Middle content | Right gutter
// Gutters show borders + optional corners. Content fills the middle.
// On mobile, gutters collapse to 24px; on desktop, 350px.

interface GutterLayoutProps {
  children: React.ReactNode;
  className?: string;
  /** Show corners on the gutter columns */
  corners?: boolean;
  /** Show border-bottom on the row */
  borderBottom?: boolean;
  /** Custom content for the left gutter */
  left?: React.ReactNode;
  /** Custom content for the right gutter */
  right?: React.ReactNode;
  /** Hide left content on mobile */
  hideLeftOnMobile?: boolean;
  /** Hide right content on mobile */
  hideRightOnMobile?: boolean;
}

function GutterLayout({
  children,
  className,
  corners = false,
  borderBottom = false,
  left,
  right,
  hideLeftOnMobile = true,
  hideRightOnMobile = true,
}: GutterLayoutProps) {
  return (
    <div className={cn("grid-layout-3col h-screen overflow-hidden", className)}>
      {/* Left gutter */}
      <div
        className={cn(
          "relative border-r border-(--fc-border-faint) overflow-hidden",
          borderBottom && "border-b"
        )}
      >
        {corners && (
          <>
            <Corner position="top-right" className="text-(--fc-border-faint)" />
            <Corner position="bottom-right" className="text-(--fc-border-faint)" />
          </>
        )}
        {left && (
          <div className={cn(hideLeftOnMobile && "hidden lg:block")}>
            {left}
          </div>
        )}
      </div>

      {/* Middle */}
      <div
        className={cn(
          "relative col-start-2 min-w-0 overflow-y-auto overflow-x-hidden h-screen",
          borderBottom && "border-b border-(--fc-border-faint)"
        )}
      >
        {corners && (
          <>
            <Corner position="top-left" className="text-(--fc-border-faint)" />
            <Corner position="top-right" className="text-(--fc-border-faint)" />
            <Corner position="bottom-left" className="text-(--fc-border-faint)" />
            <Corner position="bottom-right" className="text-(--fc-border-faint)" />
          </>
        )}
        {children}
      </div>

      {/* Right gutter */}
      <div
        className={cn(
          "relative border-l border-(--fc-border-faint) overflow-hidden",
          borderBottom && "border-b"
        )}
      >
        {corners && (
          <>
            <Corner position="top-left" className="text-(--fc-border-faint)" />
            <Corner position="bottom-left" className="text-(--fc-border-faint)" />
          </>
        )}
        {right && (
          <div className={cn(hideRightOnMobile && "hidden lg:block")}>
            {right}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GutterRow ──────────────────────────────────────────────────────────────
// A single row within a GutterLayout page. Use multiple for stacked sections.

interface GutterRowProps {
  children: React.ReactNode;
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  corners?: boolean;
  borderBottom?: boolean;
  hideLeftOnMobile?: boolean;
  hideRightOnMobile?: boolean;
  /** Middle column padding */
  padding?: string;
}

function GutterRow({
  children,
  className,
  left,
  right,
  corners = false,
  borderBottom = true,
  hideLeftOnMobile = true,
  hideRightOnMobile = true,
  padding = "px-4 lg:px-10",
}: GutterRowProps) {
  return (
    <>
      {/* Left */}
      <div
        className={cn(
          "relative border-r border-(--fc-border-faint)",
          borderBottom && "border-b",
          className
        )}
      >
        {corners && (
          <>
            <Corner position="top-right" className="text-(--fc-border-faint)" />
            <Corner position="bottom-right" className="text-(--fc-border-faint)" />
          </>
        )}
        {left && (
          <div className={cn(hideLeftOnMobile && "hidden lg:block")}>
            {left}
          </div>
        )}
      </div>

      {/* Middle */}
      <div
        className={cn(
          "relative",
          borderBottom && "border-b border-(--fc-border-faint)",
          padding
        )}
      >
        {corners && (
          <>
            <Corner position="top-left" className="text-(--fc-border-faint)" />
            <Corner position="top-right" className="text-(--fc-border-faint)" />
            <Corner position="bottom-left" className="text-(--fc-border-faint)" />
            <Corner position="bottom-right" className="text-(--fc-border-faint)" />
          </>
        )}
        {children}
      </div>

      {/* Right */}
      <div
        className={cn(
          "relative border-l border-(--fc-border-faint)",
          borderBottom && "border-b"
        )}
      >
        {corners && (
          <>
            <Corner position="top-left" className="text-(--fc-border-faint)" />
            <Corner position="bottom-left" className="text-(--fc-border-faint)" />
          </>
        )}
        {right && (
          <div className={cn(hideRightOnMobile && "hidden lg:block")}>
            {right}
          </div>
        )}
      </div>
    </>
  );
}

// ─── GutterPage ─────────────────────────────────────────────────────────────
// Full page wrapper using the 3-col grid. Supports multiple GutterRows inside.

interface GutterPageProps {
  children: React.ReactNode;
  className?: string;
}

function GutterPage({ children, className }: GutterPageProps) {
  return (
    <div className={cn("grid-layout-3col min-h-screen", className)}>
      {children}
    </div>
  );
}

export { GutterLayout, GutterRow, GutterPage };
