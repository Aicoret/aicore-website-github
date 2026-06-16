import { useEffect, useRef, useState } from "react";

export function useInView(
  ref: React.RefObject<Element | null>,
  threshold = 0.12,
  once = true,
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return inView;
}
