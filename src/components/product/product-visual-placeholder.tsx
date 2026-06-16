import { Bot, Boxes, Cpu, MessageSquareText, RadioTower, SunMedium } from "lucide-react";
import type { ProductVisualKind } from "@/lib/product-polish";

type ProductVisualPlaceholderProps = {
  kind: ProductVisualKind;
  label: string;
  caption?: string;
  compact?: boolean;
};

const iconMap = {
  pipeline: Bot,
  warehouse: Boxes,
  iot: RadioTower,
  fleet: Cpu,
  energy: SunMedium,
  assistant: MessageSquareText,
};

function Bars({ values }: { values: number[] }) {
  return (
    <div className="flex h-16 items-end gap-1.5">
      {values.map((value, index) => (
        <span
          key={index}
          className="w-full rounded-t bg-[#00D4FF]/70"
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  );
}

function Flow() {
  return (
    <div className="grid grid-cols-4 items-center gap-2 text-[10px] font-semibold text-slate-300">
      {["Sensor", "Gateway", "Cloud", "Dash"].map((item, index) => (
        <div key={item} className="flex items-center gap-2">
          <span className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#00D4FF]">
            {index + 1}
          </span>
          <span className="hidden sm:inline">{item}</span>
        </div>
      ))}
    </div>
  );
}

function VisualBody({ kind, compact }: { kind: ProductVisualKind; compact: boolean }) {
  if (kind === "pipeline") {
    return (
      <div className="grid grid-cols-3 gap-2">
        {["New", "Qualified", "Closing"].map((stage, index) => (
          <div key={stage} className="rounded-lg border border-white/10 bg-white/5 p-2">
            <p className="text-[10px] font-semibold text-slate-300">{stage}</p>
            <div className="mt-2 space-y-1.5">
              {[0, 1, 2].slice(0, compact && index === 2 ? 2 : 3).map((item) => (
                <span key={item} className="block h-2 rounded bg-[#1E5BFF]/50" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "warehouse") {
    return (
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="mb-2 grid grid-cols-3 gap-1 text-[9px] text-slate-400">
            <span>SKU</span><span>Zone</span><span>Status</span>
          </div>
          {[["A-204", "B2", "In"], ["C-118", "D1", "Out"], ["K-044", "A5", "Hold"]].map((row) => (
            <div key={row.join("-")} className="grid grid-cols-3 gap-1 border-t border-white/8 py-1.5 text-[10px] text-slate-200">
              <span>{row[0]}</span><span>{row[1]}</span><span className="text-[#00B894]">{row[2]}</span>
            </div>
          ))}
        </div>
        <Bars values={[38, 68, 52, 84, 45]} />
      </div>
    );
  }

  if (kind === "iot") {
    return (
      <div className="space-y-4">
        <Flow />
        <div className="grid grid-cols-3 gap-2">
          {["Temp", "Power", "Flow"].map((item, index) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="text-[10px] text-slate-400">{item}</p>
              <p className="mt-1 text-sm font-bold text-white">{[28, 81, 64][index]}%</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "fleet") {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className={`h-5 rounded ${index % 7 === 0 ? "bg-[#F59E0B]/70" : index % 5 === 0 ? "bg-[#1E5BFF]/70" : "bg-[#00B894]/70"}`}
            />
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-2">
          <div className="mb-1 flex justify-between text-[10px] text-slate-400">
            <span>OTA rollout</span><span>68%</span>
          </div>
          <span className="block h-2 rounded-full bg-white/10">
            <span className="block h-2 w-[68%] rounded-full bg-[#00D4FF]" />
          </span>
        </div>
      </div>
    );
  }

  if (kind === "energy") {
    return (
      <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
        <div className="space-y-2">
          {["Inverter online", "Battery 76%", "Fault: String B"].map((item, index) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-2 text-[10px] font-semibold text-slate-200">
              <span className={index === 2 ? "text-[#F59E0B]" : "text-[#00B894]"}>{item}</span>
            </div>
          ))}
        </div>
        <Bars values={[35, 48, 70, 88, 78, 58]} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_0.8fr] gap-3">
      <div className="space-y-2">
        <div className="rounded-lg bg-white/10 p-2 text-[10px] text-slate-200">What changed in Q2 operations?</div>
        <div className="rounded-lg bg-[#1E5BFF]/30 p-2 text-[10px] text-white">Summarised 4 reports and found 3 action items.</div>
      </div>
      <div className="space-y-2">
        {["Docs", "CRM", "Trigger"].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-2 text-[10px] font-semibold text-[#00D4FF]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductVisualPlaceholder({
  kind,
  label,
  caption,
  compact = false,
}: ProductVisualPlaceholderProps) {
  const Icon = iconMap[kind];

  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#07111F] ${compact ? "p-4" : "p-5 sm:p-6"}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1E5BFF]/20 text-[#00D4FF]">
            <Icon size={16} />
          </span>
          <p className="min-w-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            {label}
          </p>
        </div>
        <span className="hidden rounded-full border border-white/10 px-2 py-1 text-[10px] font-semibold text-slate-400 sm:inline-flex">
          Placeholder
        </span>
      </div>
      <VisualBody kind={kind} compact={compact} />
      {caption ? (
        <p className="mt-4 text-xs leading-relaxed text-slate-400">{caption}</p>
      ) : null}
    </div>
  );
}
