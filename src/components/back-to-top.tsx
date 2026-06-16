import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      data-testid="btn-back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-[6.5rem] right-4 sm:bottom-[7.5rem] sm:right-8 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
      style={{
        background: "#1E5BFF",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <ArrowUp size={16} color="white" strokeWidth={2.5} className="sm:w-[18px] sm:h-[18px]" />
    </button>
  );
}
