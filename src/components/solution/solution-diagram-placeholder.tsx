import { ArrowRight } from "lucide-react";

const diagramSteps: Record<string, string[]> = {
  "ai-systems-and-tools": ["Data", "Model", "Tool", "Workflow"],
  "process-and-business-automation": ["Trigger", "Decision", "Action", "Audit"],
  "intelligent-platforms-and-saas": ["User", "App", "API", "Database"],
  "embedded-iot-edge-ai": ["Device", "Gateway", "Cloud", "Dashboard"],
  "robotics-intelligent-hardware": ["Sensor", "Controller", "Actuator", "Feedback"],
  "developer-tools-engineering-utilities": ["Firmware", "Test rig", "CI", "Report"],
  "mobile-cross-platform-applications": ["Field user", "Mobile app", "API", "Dashboard"],
  "aicore-academy": ["Learner", "Lab", "Project", "Outcome"],
};

export function SolutionDiagramPlaceholder({
  slug,
  color,
}: {
  slug: string;
  color: string;
}) {
  const steps = diagramSteps[slug] ?? ["Discovery", "Build", "Deploy", "Improve"];

  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">System shape</p>
          <h2 className="mt-1 text-xl font-bold text-[#0F172A]">How this solution typically connects</h2>
        </div>
        <span className="self-start rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
          Placeholder diagram
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className="relative rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: color }}>
              {index + 1}
            </span>
            <p className="text-sm font-bold text-[#0F172A]">{step}</p>
            {index < steps.length - 1 ? (
              <ArrowRight
                size={16}
                className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-slate-300 sm:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
