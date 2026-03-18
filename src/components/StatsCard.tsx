import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type CardVariant = "default" | "critical" | "warning" | "safe";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; direction: "up" | "down" };
  icon?: ReactNode;
  variant?: CardVariant;
}

const variantBorderClasses: Record<CardVariant, string> = {
  default: "border-l-amex-blue",
  critical: "border-l-risk-critical",
  warning: "border-l-risk-high",
  safe: "border-l-risk-safe",
};

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = "default",
}: StatsCardProps) {
  const trendUp = trend?.direction === "up";

  return (
    <article
      className={`rounded-3xl border border-slate-200/70 border-l-4 bg-white/90 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 dark:border-white/5 dark:bg-dark-100/85 dark:shadow-lg ${variantBorderClasses[variant]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-dark-100">
            {title}
          </p>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {value}
          </p>
        </div>
        {icon ? (
          <div className="rounded-2xl bg-slate-100 p-2 text-slate-600 dark:bg-dark-200 dark:text-dark-100">
            {icon}
          </div>
        ) : null}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500 dark:text-dark-100">{subtitle}</span>
          {trend ? (
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                trendUp ? "text-risk-safe" : "text-risk-critical"
              }`}
            >
              {trendUp ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(trend.value)}%
            </span>
          ) : null}
        </div>
      )}
    </article>
  );
}
