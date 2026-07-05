"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  GridLoaderCross,
  GridLoaderDense,
  GridLoaderSparse,
  GridLoaderRadial,
} from "@/components/ui/grid-loader";

const PREVIEWS: Record<string, React.ReactNode> = {
  button: (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  switch: (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Switch />
      <Switch defaultChecked />
    </div>
  ),
  input: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "280px",
      }}
    >
      <Input placeholder="Default input" />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
  "grid-loaders": (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "#000",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GridLoaderCross />
      </div>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "#000",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GridLoaderDense />
      </div>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "#000",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GridLoaderSparse />
      </div>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "#000",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GridLoaderRadial />
      </div>
    </div>
  ),
};

export function ComponentPreview({ id }: { id: string }) {
  const preview = PREVIEWS[id];
  if (!preview) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "600px",
        background: "var(--fc-surface)",
        border: "1px solid var(--fc-border-faint)",
        borderRadius: "8px",
        marginBlock: "16px",
      }}
    >
      {preview}
    </div>
  );
}
