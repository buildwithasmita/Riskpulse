import { ReactNode } from "react";

type BadgeVariant =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "passed"
  | "failed"
  | "pending"
  | "overdue";

interface BadgeProps {
  children: ReactNode;
  variant: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  critical: "border-risk-critical/40 bg-risk-critical/10 text-risk-critical",
  high: "border-risk-critical/40 bg-risk-critical/10 text-risk-critical",
  medium: "border-risk-medium/40 bg-risk-medium/10 text-risk-medium",
  low: "border-risk-safe/40 bg-risk-safe/10 text-risk-safe",
  passed: "border-status-passed/40 bg-status-passed/10 text-status-passed",
  failed: "border-status-failed/40 bg-status-failed/10 text-status-failed",
  pending: "border-status-pending/40 bg-status-pending/10 text-status-pending",
  overdue: "border-violet-500/40 bg-violet-500/10 text-violet-500",
};

export function Badge({ children, variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
