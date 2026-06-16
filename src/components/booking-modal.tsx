import { useState } from "react";
import { X, Calendar } from "lucide-react";

interface BookingModalProps {
  trigger?: React.ReactNode;
}

export function BookingModal({ trigger }: BookingModalProps) {
  const [open, setOpen] = useState(false);

  const defaultTrigger = (
    <button
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
      style={{ background: "linear-gradient(135deg, #1E5BFF, #3B82F6)" }}
    >
      <Calendar size={15} />
      Book a Call
    </button>
  );

  return (
    <>
      <div onClick={() => setOpen(true)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(true); }}>
        {trigger ?? defaultTrigger}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(7,17,31,0.85)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-[#1E5BFF]" />
                <h2 className="font-bold text-[#0F172A]">Book a Project Call</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close booking modal"
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#64748B] hover:bg-slate-200 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-6">
              <div
                className="rounded-xl flex flex-col items-center justify-center text-center py-16 px-8"
                style={{ background: "#F8FAFC", border: "2px dashed #E2E8F0" }}
              >
                <Calendar size={40} className="text-[#1E5BFF] mb-4 opacity-60" />
                <p className="font-semibold text-[#0F172A] mb-2">Calendar Booking Is Being Connected</p>
                <p className="text-[#64748B] text-sm leading-relaxed max-w-sm mb-6">
                  We're connecting calendar booking. In the meantime, reach us directly:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:hello@aicoret.com?subject=Project Call Request"
                    className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                    style={{ background: "#1E5BFF" }}
                  >
                    Email Us
                  </a>
                  <a
                    href="https://wa.me/2347010729722?text=Hi%20AICORE%2C%20I%27d%20like%20to%20book%20a%20project%20call."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-slate-200 text-[#475569] hover:border-[#25D366]/50 hover:text-[#25D366] transition-all"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
