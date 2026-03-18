from pathlib import Path

import numpy as np
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "tools"
REGISTRY_PATH = DATA_DIR / "registry.csv"


def generate_tools_data() -> pd.DataFrame:
    np.random.seed(42)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    total_tools = 50
    categories = ["Credit Card", "Risk Assessment", "Regulatory", "Operational", "Customer Service"]
    category_weights = [0.40, 0.25, 0.15, 0.15, 0.05]
    risk_levels = ["High", "Medium", "Low"]
    risk_weights = [0.30, 0.50, 0.20]
    owners = ["Card Ops", "Risk Team", "Compliance", "Tech Ops", "Customer Success"]
    name_templates = {
        "Credit Card": ["Limit Monitor", "Fraud Threshold Checker", "APR Calculator", "Portfolio Scorecard"],
        "Risk Assessment": ["Risk Rating Engine", "Stress Test Helper", "Exposure Analyzer", "Scenario Mapper"],
        "Regulatory": ["Basel Calculator", "Liquidity Reporter", "Capital Tracker", "Returns Compiler"],
        "Operational": ["Incident Estimator", "Control Tracker", "Loss Aggregator", "Workflow Assessor"],
        "Customer Service": ["Complaint Severity Checker", "Service Recovery Tracker", "Case Prioritizer", "Call Volume Planner"],
    }

    rows = []
    for index in range(total_tools):
        category = str(np.random.choice(categories, p=category_weights))
        risk_level = str(np.random.choice(risk_levels, p=risk_weights))
        days_since_validation = int(np.random.randint(0, 121))
        owner = str(np.random.choice(owners))
        template = str(np.random.choice(name_templates[category]))
        tool_id = f"RPT-{index + 1:03d}"
        name = f"{category} {template}"

        if risk_level == "High":
            pass_rate = float(np.round(np.random.uniform(0.90, 0.99), 3))
            critical_issues = int(np.random.randint(0, 6))
        elif risk_level == "Medium":
            pass_rate = float(np.round(np.random.uniform(0.95, 1.00), 3))
            critical_issues = int(np.random.randint(0, 3))
        else:
            pass_rate = float(np.round(np.random.uniform(0.98, 1.00), 3))
            critical_issues = int(np.random.randint(0, 2))

        if days_since_validation > 90:
            status = "Overdue"
        else:
            status = str(np.random.choice(["Failed", "Passed"], p=[0.15, 0.85]))

        rows.append(
            {
                "tool_id": tool_id,
                "name": name,
                "category": category,
                "risk_level": risk_level,
                "owner": owner,
                "days_since_validation": days_since_validation,
                "pass_rate": pass_rate,
                "critical_issues": critical_issues,
                "status": status,
            }
        )

    df = pd.DataFrame(rows)
    df.to_csv(REGISTRY_PATH, index=False)

    print("Generated RISKPULSE tool registry")
    print(f"Total tools: {len(df)}")
    print("Count by risk level:")
    print(df["risk_level"].value_counts().to_string())
    print("Count by status:")
    print(df["status"].value_counts().to_string())
    print(f"Average pass rate: {df['pass_rate'].mean():.3f}")

    return df
