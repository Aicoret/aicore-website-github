import { useRef, useEffect, useState } from "react";
import { useInView } from "@/lib/use-in-view";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  color?: string;
  label: string;
  delay?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
  decimals = 0,
  color = "#1E5BFF",
  label,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now() + delay;
    const factor = Math.pow(10, decimals);

    function tick(now: number) {
      if (now < start) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target * factor) / factor);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration, delay, decimals]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color }}>
        {prefix}{display}{suffix}
      </p>
      <p className="text-[#64748B] text-sm font-medium">{label}</p>
    </div>
  );
}
