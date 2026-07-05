import { useState, useCallback } from "react";

export function useCopyToClipboard(resetDelay = 2000) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard API is not supported in this browser.");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, resetDelay);

        return true;
      } catch (error) {
        console.error("Copy failed", error);
        setCopiedText(null);
        setIsCopied(false);
        return false;
      }
    },
    [resetDelay]
  );

  return { copiedText, isCopied, copy };
}
