import os
from pathlib import Path

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from app.services import RiskService


ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

service = RiskService()
app = FastAPI(
    title="RISKPULSE API",
    version="1.0.0",
    description="Risk Tool Oversight Platform backend for non-model tool governance.",
)

if ENVIRONMENT == "production":
    allowed_origins = [
        "https://riskpulse.vercel.app",
        "http://localhost:3000",
    ]
else:
    allowed_origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://riskpulse.vercel.app",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, object]:
    return {
        "message": "Welcome to RISKPULSE API",
        "endpoints": [
            "/health",
            "/tools",
            "/summary",
            "/validate/{tool_id}",
            "/compliance",
        ],
    }


@app.get("/health")
def health_check() -> dict[str, bool | str]:
    data_path = Path(__file__).resolve().parent.parent / "data" / "tools" / "registry.csv"
    data_loaded = data_path.exists()
    if not data_loaded:
        raise HTTPException(status_code=500, detail="Tool registry not initialized")
    return {
        "status": "healthy",
        "service": "riskpulse-api",
        "data_loaded": data_loaded,
    }


@app.get("/tools")
def get_tools(
    risk_level: str | None = Query(default=None, description="Filter by High, Medium, or Low"),
    limit: int = Query(default=50, ge=1, le=100),
):
    try:
        return service.get_tools(risk_level=risk_level, limit=limit)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to load tools") from exc


@app.get("/summary")
def get_summary():
    try:
        return service.get_summary()
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to calculate summary") from exc


@app.post("/validate/{tool_id}")
def validate_tool(tool_id: str):
    try:
        return service.validate_tool(tool_id)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Validation failed") from exc


@app.get("/compliance")
def get_compliance():
    try:
        return service.get_compliance_score()
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to calculate compliance") from exc
