"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { codeToChars, type CodeChar, type TokenType } from "@/lib/tokenizer";
import { Copy, Check } from "lucide-react";

function CharSpan({ char, type }: { char: string; type: TokenType }) {
  const color = (() => {
    switch (type) {
      case "comment":
        return "text-[var(--fc-black-alpha-40)]";
      case "keyword":
        return "text-[var(--fc-accent-black)]";
      case "string":
        return "text-[var(--fc-heat-100)]";
      case "number":
        return "text-[var(--fc-accent-honey)]";
      case "classname":
        return "text-[var(--fc-accent-amethyst)]";
      case "command":
        return "text-[var(--fc-accent-amethyst)]";
      case "option":
        return "text-[var(--fc-accent-amethyst)]";
      case "symbol":
        return "text-[var(--fc-black-alpha-40)]";
      default:
        return "text-[var(--fc-accent-black)]";
    }
  })();

  return <span className={color}>{char}</span>;
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

function CodeBlock({
  code,
  language = "bash",
  showLineNumbers = true,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const lines = React.useMemo(
    () => codeToChars(code, language),
    [code, language]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[12px] bg-[var(--fc-background-lighter)] ",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-[11px] font-mono! text-[var(--fc-black-alpha-40)] hover:text-[var(--fc-accent-black)] bg-[var(--fc-black-alpha-3)] hover:bg-[var(--fc-black-alpha-5)] rounded-[6px] transition-all cursor-pointer z-10"
      >
        {copied ? (
          <>
            <Check className="size-4 text-[var(--fc-accent-forest)]" />
            {/* <span className="text-[var(--fc-accent-forest)]">Copied</span> */}
          </>
        ) : (
          <>
            <Copy className="size-4" />
            {/* <span>Copy</span> */}
          </>
        )}
      </button>

      <div className="px-3 py-2 font-mono text-[15px] leading-[28px] overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((lineChars, lineIdx) => (
              <tr key={lineIdx}>
                {showLineNumbers && (
                  <td className="w-8 pr-5 text-right select-none text-[13px] align-top pt-[2px] tabular-nums text-[var(--fc-black-alpha-20)]">
                    {lineIdx + 1}
                  </td>
                )}
                <td className="pl-4 text-left font-mono whitespace-pre select-text">
                  {lineChars.map((c) => (
                    <CharSpan key={c.id} char={c.char} type={c.type} />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { CodeBlock };
