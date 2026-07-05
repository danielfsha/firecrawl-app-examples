import { useCallback, useEffect, useRef, useState } from "react";

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function useActiveElementRect(selector = "[data-active]") {
  const containerRef = useRef<HTMLElement>(null);
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLElement>(selector);
    if (!active) {
      setRect(null);
      return;
    }
    setRect({
      left: active.offsetLeft,
      top: active.offsetTop,
      width: active.offsetWidth,
      height: active.offsetHeight,
    });
  }, [selector]);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(measure);
    observer.observe(container, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-active"],
    });

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return { containerRef, rect };
}
