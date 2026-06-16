import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  const t = testimonials[active];

  return (
    <section className="py-24" style={{ background: "#F8FAFC" }} data-testid="testimonials-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[#1E5BFF] text-xs font-bold tracking-widest uppercase mb-3">Client Feedback</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">What Our Clients Say</h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: t.color }} />

            <Quote size={40} className="mb-6 opacity-15" style={{ color: t.color }} />

            <blockquote className="text-[#0F172A] text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-3xl">
              "{t.quote}"
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">{t.name}</p>
                  <p className="text-[#64748B] text-sm">{t.role} · {t.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#64748B] hover:border-[#1E5BFF]/40 hover:text-[#1E5BFF] transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{ background: i === active ? t.color : "#CBD5E1" }}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#64748B] hover:border-[#1E5BFF]/40 hover:text-[#1E5BFF] transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
