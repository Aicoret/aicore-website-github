import { useState } from "react";
import { Play, X } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function VideoDemo() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 bg-white" data-testid="video-demo-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-[#1E5BFF] text-xs font-bold tracking-widest uppercase mb-3">See It In Action</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              Watch How AICORE Builds Intelligent Systems
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed">
              A short walkthrough of how we move from requirements to a live system.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)", aspectRatio: "16/9" }}
            onClick={() => setOpen(true)}
            role="button"
            aria-label="Play AICORE demo video"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(true); }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <svg viewBox="0 0 480 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="vgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E5BFF" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#vgrid)" />
              </svg>

              <div className="relative z-10 text-center px-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: "rgba(30,91,255,0.3)", border: "2px solid rgba(30,91,255,0.5)" }}
                >
                  <Play size={32} className="text-white ml-1" fill="white" />
                </div>
                <p className="text-white font-semibold text-lg">AICORE Platform Walkthrough</p>
                <p className="text-[#94A3B8] text-sm mt-1">~3 min overview</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-all"
            >
              <X size={18} />
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="AICORE Platform Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
