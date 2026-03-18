import { useEffect, useState } from "react";
import { AlertTriangle, Database, Gauge, ShieldCheck } from "lucide-react";

import { GaugeChart } from "../components/GaugeChart";
import { Badge } from "../components/Badge";
import { StatsCard } from "../components/StatsCard";
import { ToolCard } from "../components/ToolCard";
import { getCompliance, getSummary, getTools } from "../services/api";
import { ComplianceScore, Tool, ToolSummary } from "../types";

function LoadingSpinner() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-5 py-4 text-sm text-slate-600 shadow-md dark:border-white/5 dark:bg-dark-100/85 dark:text-dark-100 dark:shadow-lg">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-amex-blue/30 border-t-amex-blue" />
        Loading dashboard data...
      </div>
    </div>
  );
}

function ComplianceStatusBadge({ status }: { status: string }) {
  if (status === "Compliant") {
    return <Badge variant="passed">{status}</Badge>;
  }
  if (status === "Needs Improvement") {
    return <Badge variant="pending">{status}</Badge>;
  }
  return <Badge variant="failed">{status}</Badge>;
}

export function DashboardPage() {
  const [summary, setSummary] = useState<ToolSummary | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [compliance, setCompliance] = useState<ComplianceScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const [summaryData, toolsData, complianceData] = await Promise.all([
          getSummary(),
          getTools({ limit: 20 }),
          getCompliance(),
        ]);

        if (!cancelled) {
          setSummary(summaryData);
          setTools(toolsData);
          setCompliance(complianceData);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(
            "Backend API is unavailable. Start the FastAPI server on http://localhost:8000."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDashboardData();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-risk-critical/30 bg-risk-critical/10 p-6 text-risk-critical">
        {error}
      </div>
    );
  }

  if (!summary || !compliance) {
    return (
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 text-slate-600 shadow-md dark:border-white/5 dark:bg-dark-100/85 dark:text-dark-100 dark:shadow-lg">
        No data available
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <GaugeChart
          label="Total Tools"
          value={summary.total_tools}
          max={100}
          unit=""
          color="info"
        />
        <GaugeChart
          label="High Risk"
          value={summary.high_risk}
          max={50}
          unit=""
          color="critical"
        />
        <GaugeChart
          label="Avg Pass Rate"
          value={Math.round(summary.avg_pass_rate * 100)}
          max={100}
          unit="%"
          color="safe"
        />
        <GaugeChart
          label="Overdue"
          value={summary.overdue}
          max={20}
          unit=""
          color="warning"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard
            title="Total Tools"
            value={summary.total_tools}
            subtitle="Registered across governed teams"
            trend={{ value: 8.4, direction: "up" }}
            icon={<Database className="h-5 w-5 text-amex-blue" />}
          />
          <StatsCard
            title="Average Pass Rate"
            value={`${(summary.avg_pass_rate * 100).toFixed(1)}%`}
            subtitle="Based on the latest validation results"
            trend={{ value: 1.7, direction: "up" }}
            variant="safe"
            icon={<Gauge className="h-5 w-5 text-risk-safe" />}
          />
        </div>

        <article className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-md dark:border-white/5 dark:bg-dark-100/85 dark:shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-dark-100">
                BCBS 239 Score
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {compliance.overall_score.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <ShieldCheck className="h-6 w-6 text-amex-blue" />
              <ComplianceStatusBadge status={compliance.status} />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Governance", value: compliance.governance },
              { label: "Accuracy", value: compliance.accuracy },
              { label: "Completeness", value: compliance.completeness },
              { label: "Timeliness", value: compliance.timeliness },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-slate-100/80 p-4 dark:bg-dark-200/80"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-dark-100">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                  {item.value.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Tool Registry
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-dark-100">
              Top 20 tools from the live backend registry
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-status-overdue/10 px-3 py-2 text-sm font-medium text-status-overdue">
            <AlertTriangle className="h-4 w-4" />
            {summary.overdue} overdue tools
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.tool_id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
