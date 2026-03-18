import { useMemo } from "react";

type GaugeColor = "critical" | "warning" | "safe" | "info";

interface GaugeChartProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  color: GaugeColor;
}

const COLOR_MAP: Record<GaugeColor, string> = {
  critical: "#F2495C",
  warning: "#FF9830",
  safe: "#73BF69",
  info: "#006FCF",
};

export function GaugeChart({
  label,
  value,
  max,
  unit = "",
  color,
}: GaugeChartProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const percentage = useMemo(() => {
    if (max <= 0) {
      return 0;
    }

    return Math.min((value / max) * 100, 100);
  }, [max, value]);
  const strokeDashoffset =
    circumference - (Math.max(percentage, 0) / 100) * circumference;

  return (
    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-[28px] border border-slate-200/70 bg-white/90 p-3 shadow-md transition-colors dark:border-white/5 dark:bg-dark-100/85 dark:shadow-lg">
      <div className="relative flex items-center justify-center">
        <svg
          className="-rotate-[210deg] overflow-visible"
          width="96"
          height="96"
          viewBox="0 0 96 96"
        >
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#3f3f46"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            opacity="0.35"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={COLOR_MAP[color]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            strokeDashoffset={strokeDashoffset + circumference * 0.25}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold text-slate-950 dark:text-white">
            {value}
            {unit}
          </span>
        </div>
      </div>

      <span className="mt-1 text-center text-xs font-medium text-slate-600 dark:text-dark-100">
        {label}
      </span>
    </div>
  );
}
