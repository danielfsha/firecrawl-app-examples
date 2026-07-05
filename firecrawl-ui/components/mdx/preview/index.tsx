"use client";

import * as React from "react";

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function Preview({ children, className }: PreviewProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "120px",
        padding: "32px 24px",
        background: "var(--fc-surface)",
        border: "1px solid var(--fc-border-faint)",
        borderRadius: "8px",
        marginBlock: "16px",
      }}
    >
      {children}
    </div>
  );
}
