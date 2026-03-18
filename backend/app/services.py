from pathlib import Path

import pandas as pd

from app.models import ComplianceScore, ComplianceStatus, Tool, ToolSummary, ToolStatus, ValidationResult


class RiskService:
    def __init__(self, data_path: Path | None = None) -> None:
        default_path = Path(__file__).resolve().parent.parent / "data" / "tools" / "registry.csv"
        self.data_path = data_path or default_path

    def load_tools(self) -> pd.DataFrame:
        if not self.data_path.exists():
            raise FileNotFoundError(f"Tool registry not found at {self.data_path}")
        return pd.read_csv(self.data_path)

    def get_summary(self) -> ToolSummary:
        df = self.load_tools()
        return ToolSummary(
            total_tools=int(len(df)),
            high_risk=int((df["risk_level"] == "High").sum()),
            medium_risk=int((df["risk_level"] == "Medium").sum()),
            low_risk=int((df["risk_level"] == "Low").sum()),
            overdue=int((df["status"] == "Overdue").sum()),
            avg_pass_rate=round(float(df["pass_rate"].mean()), 3),
        )

    def validate_tool(self, tool_id: str) -> ValidationResult:
        df = self.load_tools()
        match = df[df["tool_id"] == tool_id]
        if match.empty:
            raise ValueError(f"Tool {tool_id} not found")

        tool = match.iloc[0]
        total_tests = 1000
        passed = int(round(total_tests * float(tool["pass_rate"])))
        failed = total_tests - passed
        critical_issues = int(tool["critical_issues"])
        critical_findings = [
            f"Critical issue {index} identified during validation."
            for index in range(1, critical_issues + 1)
        ]

        return ValidationResult(
            tool_id=str(tool["tool_id"]),
            total_tests=total_tests,
            passed=passed,
            failed=failed,
            pass_rate=round(passed / total_tests, 3),
            critical_findings=critical_findings,
            status=str(tool["status"]),
        )

    def get_compliance_score(self) -> ComplianceScore:
        df = self.load_tools()

        governance = float((df["owner"].fillna("").str.strip() != "").mean() * 100)
        accuracy = min(float(df["pass_rate"].mean() * 100), 100.0)
        completeness = float((1 - (df.isnull().sum().sum() / df.size)) * 100)
        timeliness = float((df["days_since_validation"] <= 60).mean() * 100)
        overall_score = round((governance + accuracy + completeness + timeliness) / 4, 2)

        if overall_score >= 90:
            status = ComplianceStatus.COMPLIANT
        elif overall_score >= 70:
            status = ComplianceStatus.NEEDS_IMPROVEMENT
        else:
            status = ComplianceStatus.NON_COMPLIANT

        return ComplianceScore(
            overall_score=overall_score,
            governance=round(governance, 2),
            accuracy=round(accuracy, 2),
            completeness=round(completeness, 2),
            timeliness=round(timeliness, 2),
            status=status,
        )

    def get_tools(self, risk_level: str | None = None, limit: int = 50) -> list[Tool]:
        df = self.load_tools()
        if risk_level:
            df = df[df["risk_level"].str.lower() == risk_level.lower()]

        records = df.head(limit).to_dict(orient="records")
        return [Tool(**record) for record in records]
