import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight
                  size={13}
                  className={light ? "text-white/30" : "text-slate-300"}
                />
              )}
              {item.href && !isLast ? (
                <Link href={item.href}>
                  <span
                    className={`text-xs font-medium cursor-pointer transition-colors ${
                      light
                        ? "text-white/50 hover:text-white/80"
                        : "text-[#94A3B8] hover:text-[#1E5BFF]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span
                  className={`text-xs font-medium ${
                    light ? "text-white/80" : "text-[#64748B]"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
