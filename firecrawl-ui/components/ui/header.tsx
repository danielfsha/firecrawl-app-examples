"use client";

import { CopyButton } from "@/components/copy-button";

export default function Header({ text = "" }: { text?: string }) {
  return (
    <div className="flex items-center justify-end p-2 bg-red-500">
      <CopyButton text={text} />
    </div>
  );
}
