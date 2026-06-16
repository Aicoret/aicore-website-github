import { Reveal } from "@/components/reveal";

const clients = [
  { name: "NovaTech Nigeria", abbr: "NT" },
  { name: "Meridian Energy", abbr: "ME" },
  { name: "EduTech Lagos", abbr: "EL" },
  { name: "PharmaLog Solutions", abbr: "PL" },
  { name: "Apex Manufacturing", abbr: "AM" },
  { name: "GreenGrid Power", abbr: "GG" },
  { name: "DataBridge Africa", abbr: "DB" },
  { name: "Horizon Logistics", abbr: "HL" },
  { name: "SmartFarm Co.", abbr: "SF" },
  { name: "CoreBank Systems", abbr: "CB" },
];

function LogoItem({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-3 mx-4 rounded-xl border border-slate-300 bg-white shadow-sm flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #1E5BFF, #00D4FF)" }}
      >
        {abbr}
      </div>
      <span className="text-[#475569] text-sm font-semibold whitespace-nowrap">{name}</span>
    </div>
  );
}

export function LogoStrip() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-14 bg-white border-b border-slate-100 overflow-hidden" data-testid="logo-strip">
      <Reveal>
        <p className="text-center text-[#94A3B8] text-xs font-semibold tracking-widest uppercase mb-8">
          Trusted by organisations across Africa
        </p>
      </Reveal>
      <div className="relative">
        <div className="flex aicore-marquee">
          {doubled.map((client, i) => (
            <LogoItem key={`${client.abbr}-${i}`} {...client} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
      </div>
    </section>
  );
}
