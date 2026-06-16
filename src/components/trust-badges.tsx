import { ShieldCheck, Award, Globe, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";

const badges = [
  {
    icon: ShieldCheck,
    color: "#00B894",
    title: "CAC Registered",
    sub: "AICORE Technologies Limited — RC Number on file",
  },
  {
    icon: Award,
    color: "#1E5BFF",
    title: "8 Service Areas",
    sub: "AI · Automation · IoT · Robotics · SaaS · Mobile · Energy · Academy",
  },
  {
    icon: Globe,
    color: "#00D4FF",
    title: "14+ Industries Served",
    sub: "Manufacturing, Energy, Healthcare, Logistics and more",
  },
  {
    icon: Users,
    color: "#F59E0B",
    title: "Expert Technical Team",
    sub: "Senior specialists across hardware, software, and AI domains",
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 bg-white" data-testid="trust-badges">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 80}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-300 bg-slate-50 shadow-sm">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: b.color + "18" }}
                  >
                    <Icon size={18} style={{ color: b.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm leading-snug">{b.title}</p>
                    <p className="text-[#64748B] text-xs leading-relaxed mt-1">{b.sub}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
