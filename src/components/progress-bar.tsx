import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    setProgress(0);

    function onScroll() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(scrollTop / scrollHeight, 1));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  if (progress <= 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-0.5 transition-all duration-75"
      style={{
        width: `${progress * 100}%`,
        background: "linear-gradient(90deg, #1E5BFF, #00D4FF)",
      }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
