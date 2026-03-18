from enum import Enum
from typing import List

from pydantic import BaseModel, ConfigDict, Field


class RiskLevel(str, Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class ToolStatus(str, Enum):
    PASSED = "Passed"
    FAILED = "Failed"
    OVERDUE = "Overdue"


class ComplianceStatus(str, Enum):
    COMPLIANT = "Compliant"
    NEEDS_IMPROVEMENT = "Needs Improvement"
    NON_COMPLIANT = "Non-Compliant"


class Tool(BaseModel):
    tool_id: str
    name: str
    category: str
    risk_level: RiskLevel
    owner: str
    days_since_validation: int
    pass_rate: float = Field(ge=0.0, le=1.0)
    critical_issues: int
    status: ToolStatus

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "tool_id": "RPT-001",
                "name": "Basel Capital Calculator",
                "category": "Regulatory",
                "risk_level": "High",
                "owner": "Compliance",
                "days_since_validation": 24,
                "pass_rate": 0.97,
                "critical_issues": 1,
                "status": "Passed",
            }
        }
    )


class ToolSummary(BaseModel):
    total_tools: int
    high_risk: int
    medium_risk: int
    low_risk: int
    overdue: int
    avg_pass_rate: float

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "total_tools": 50,
                "high_risk": 15,
                "medium_risk": 25,
                "low_risk": 10,
                "overdue": 11,
                "avg_pass_rate": 0.97,
            }
        }
    )


class ValidationResult(BaseModel):
    tool_id: str
    total_tests: int
    passed: int
    failed: int
    pass_rate: float
    critical_findings: List[str]
    status: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "tool_id": "RPT-001",
                "total_tests": 1000,
                "passed": 972,
                "failed": 28,
                "pass_rate": 0.972,
                "critical_findings": [
                    "Critical issue 1 identified during validation.",
                    "Critical issue 2 identified during validation.",
                ],
                "status": "Passed",
            }
        }
    )


class ComplianceScore(BaseModel):
    overall_score: float
    governance: float
    accuracy: float
    completeness: float
    timeliness: float
    status: ComplianceStatus

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "overall_score": 92.5,
                "governance": 100.0,
                "accuracy": 97.1,
                "completeness": 100.0,
                "timeliness": 72.9,
                "status": "Compliant",
            }
        }
    )
