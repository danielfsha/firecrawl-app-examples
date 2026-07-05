"use client";

import React from "react";

type FigureProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export function Figure({ children, className, ...props }: FigureProps) {
  return (
    <figure
      data-prose-type="figure"
      className={className}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
        background: "var(--fc-surface)",
        borderRadius: "8px",
        border: "1px solid var(--fc-border-faint)",
        marginBlock: "24px",
      }}
      {...props}
    >
      {children}
    </figure>
  );
}

export function Caption({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <figcaption
      data-prose-type="figcaption"
      className={className}
      style={{
        display: "inline-block",
        width: "100%",
        fontSize: "14px",
        fontWeight: 450,
        lineHeight: "24px",
        color: "var(--fc-black-alpha-48)",
        textAlign: "center",
        marginTop: "8px",
      }}
      {...props}
    />
  );
}
