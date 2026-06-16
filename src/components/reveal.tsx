import { useRef } from "react";
import { useInView } from "@/lib/use-in-view";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  /** "up" (default) | "left" | "right" | "none" */
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

const offsets: Record<NonNullable<RevealProps["direction"]>, string> = {
  up:    "translateY(28px)",
  left:  "translateX(-28px)",
  right: "translateX(28px)",
  none:  "none",
};

export function Reveal({
  children,
  delay = 0,
  duration = 550,
  direction = "up",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : offsets[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
