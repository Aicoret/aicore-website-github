import { Bot, Cpu, FileText, GitBranch, RadioTower, SunMedium } from "lucide-react";

const categoryStyle: Record<string, { icon: typeof Bot; color: string; nodes: string[] }> = {
  "AI for Business": { icon: Bot, color: "#1E5BFF", nodes: ["Docs", "Model", "Review"] },
  "IoT & Embedded Systems": { icon: RadioTower, color: "#00D4FF", nodes: ["Sensor", "MQTT", "Cloud"] },
  "Smart Energy Monitoring": { icon: SunMedium, color: "#F59E0B", nodes: ["Inverter", "Yield", "Alert"] },
  "Robotics & STEM": { icon: Cpu, color: "#00B894", nodes: ["Kit", "Lab", "Project"] },
  "Business Automation": { icon: GitBranch, color: "#00B894", nodes: ["Trigger", "Rule", "Action"] },
  "Developer Tools": { icon: FileText, color: "#1E5BFF", nodes: ["Test", "CI", "Report"] },
};

export function ArticleCoverPlaceholder({ category }: { category: string }) {
  const style = categoryStyle[category] ?? { icon: FileText, color: "#1E5BFF", nodes: ["Idea", "Build", "Learn"] };
  const Icon = style.icon;

  return (
    <div className="border-b border-slate-200 bg-[#07111F] p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${style.color}22`, color: style.color }}>
          <Icon size={18} />
        </span>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Field note
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {style.nodes.map((node, index) => (
          <div key={node} className="rounded-lg border border-white/10 bg-white/5 p-2">
            <span className="mb-2 block h-1.5 rounded-full" style={{ background: index === 1 ? style.color : `${style.color}80` }} />
            <p className="text-[10px] font-semibold text-slate-300">{node}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
