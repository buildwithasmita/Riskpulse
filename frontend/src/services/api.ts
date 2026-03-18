import axios from "axios";

import {
  ComplianceScore,
  Tool,
  ToolSummary,
  ValidationResult,
} from "../types";

const baseURL =
  process.env.REACT_APP_API_URL?.trim() || "http://localhost:8000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface GetToolsParams {
  risk_level?: string;
  limit?: number;
}

export async function checkHealth() {
  const response = await api.get<{ status: string }>("/health");
  return response.data;
}

export async function getTools(params?: GetToolsParams) {
  const response = await api.get<Tool[]>("/tools", { params });
  return response.data;
}

export async function getSummary() {
  const response = await api.get<ToolSummary>("/summary");
  return response.data;
}

export async function validateTool(toolId: string) {
  const response = await api.post<ValidationResult>(`/validate/${toolId}`);
  return response.data;
}

export async function getCompliance() {
  const response = await api.get<ComplianceScore>("/compliance");
  return response.data;
}

export default api;
