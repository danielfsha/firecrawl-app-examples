import { RefObject, useEffect, useState } from "react";

export default function useMeasure({
  ref,
}: {
  ref: RefObject<HTMLElement | null>;
}) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        setHeight(rect.height);
        setWidth(rect.width);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return { height, width };
}
