"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsDivider } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

const ICON_MAP: Record<string, string> = {
  npm: "/npm.svg",
  pnpm: "/pnpm.svg",
  yarn: "/yarn.svg",
  bun: "/bun.svg",
};

interface CodeInstallProps {
  tabs: {
    label: string;
    code: string;
    language?: string;
  }[];
  className?: string;
}

function CodeInstall({ tabs, className }: CodeInstallProps) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const active = tabs[activeIdx];

  return (
    <div
      className={cn(
        "w-full flex flex-col overflow-hidden bg-white border shadow-[0_0px_0px_1px_rgba(0,0,0,0.01),0_20px_44px_0px_rgba(0,0,0,0.05)] rounded-lg",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Tabs
          className={"p-1"}
          defaultValue="0"
          onValueChange={(val) => setActiveIdx(Number(val))}
        >
          <TabsList className="h-9 bg-[var(--fc-black-alpha-4)]">
            {tabs.map((tab, idx) => {
              const icon = ICON_MAP[tab.label.toLowerCase()];
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <TabsDivider />}
                  <TabsTrigger value={String(idx)}>
                    {icon && (
                      <Image
                        src={icon}
                        alt={tab.label}
                        width={14}
                        height={14}
                        className="shrink-0"
                      />
                    )}
                    {tab.label}
                  </TabsTrigger>
                </React.Fragment>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
      <div className="py-1">
        <CodeBlock
          className="bg-transparent border-none rounded-none shadow-none"
          code={active.code}
          language={active.language || "bash"}
          showLineNumbers={false}
        />
      </div>
    </div>
  );
}

export { CodeInstall };
