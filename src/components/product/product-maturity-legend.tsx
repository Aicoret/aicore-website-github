import { productMaturityDefinitions } from "@/lib/product-polish";

export function ProductMaturityLegend() {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 mb-3">
        Product maturity
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {productMaturityDefinitions.map((item) => (
          <div key={item.status} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
            <p className="text-sm font-bold text-[#0F172A]">{item.status}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#64748B]">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
