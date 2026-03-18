import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import { Tool, ValidationStatus } from "../types";
import { Badge } from "./Badge";

interface ToolCardProps {
  tool: Tool;
  onClick?: () => void;
}

const statusIconMap = {
  [ValidationStatus.Passed]: (
    <CheckCircle2 className="h-5 w-5 text-status-passed" />
  ),
  [ValidationStatus.Failed]: (
    <AlertCircle className="h-5 w-5 text-status-failed" />
  ),
  [ValidationStatus.Overdue]: <Clock className="h-5 w-5 text-violet-500" />,
};

const riskVariantMap = {
  High: "high",
  Medium: "medium",
  Low: "low",
} as const;

const statusVariantMap = {
  [ValidationStatus.Passed]: "passed",
  [ValidationStatus.Failed]: "failed",
  [ValidationStatus.Overdue]: "overdue",
} as const;

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const clickable = Boolean(onClick);

  return (
    <article
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (clickable && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick?.();
        }
      }}
      className={`rounded-3xl border bg-white/90 p-5 shadow-md transition-all duration-300 dark:bg-dark-100/85 dark:shadow-lg ${
        clickable
          ? "cursor-pointer border-slate-200/70 hover:border-amex-blue hover:shadow-lg dark:border-white/5"
          : "border-slate-200/70 dark:border-white/5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {statusIconMap[tool.status]}
            <h3 className="truncate text-base font-semibold text-slate-950 dark:text-white">
              {tool.name}
            </h3>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant={riskVariantMap[tool.risk_level]}>{tool.risk_level}</Badge>
          </div>
        </div>
        <Badge variant={statusVariantMap[tool.status]}>{tool.status}</Badge>
      </div>

      <div className="mt-4 space-y-1 font-mono text-xs text-slate-500 dark:text-dark-100">
        <p>{tool.tool_id}</p>
        <p>{tool.category}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-100/80 p-3 dark:bg-dark-200/80">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-dark-100">
            Pass Rate
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
            {(tool.pass_rate * 100).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-2xl bg-slate-100/80 p-3 dark:bg-dark-200/80">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-dark-100">
            Days Since Validation
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
            {tool.days_since_validation}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-500 dark:text-dark-100">Critical issues</span>
        <span
          className={`font-medium ${
            tool.critical_issues > 0 ? "text-risk-critical" : "text-risk-safe"
          }`}
        >
          {tool.critical_issues}
        </span>
      </div>
    </article>
  );
}
