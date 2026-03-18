export enum RiskLevel {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum ValidationStatus {
  Passed = "Passed",
  Failed = "Failed",
  Overdue = "Overdue",
}

export interface Tool {
  tool_id: string;
  name: string;
  category: string;
  risk_level: RiskLevel;
  owner: string;
  days_since_validation: number;
  pass_rate: number;
  critical_issues: number;
  status: ValidationStatus;
}

export interface ToolSummary {
  total_tools: number;
  high_risk: number;
  medium_risk: number;
  low_risk: number;
  overdue: number;
  avg_pass_rate: number;
}

export interface ValidationResult {
  tool_id: string;
  total_tests: number;
  passed: number;
  failed: number;
  pass_rate: number;
  critical_findings: string[];
  status: string;
}

export interface ComplianceScore {
  overall_score: number;
  governance: number;
  accuracy: number;
  completeness: number;
  timeliness: number;
  status: string;
}
