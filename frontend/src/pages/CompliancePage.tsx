import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

import { Badge } from '../components/Badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getCompliance } from '../services/api';
import { ComplianceScore } from '../types';

export const CompliancePage: React.FC = () => {
  const [compliance, setCompliance] = useState<ComplianceScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompliance();
  }, []);

  const loadCompliance = async () => {
    try {
      setLoading(true);
      const data = await getCompliance();
      setCompliance(data);
      setError(null);
    } catch (err) {
      setError('Backend API is unavailable. Start the FastAPI server on http://localhost:8000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading compliance data..." />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!compliance) return null;

  const getStatusColor = (score: number) => {
    if (score >= 90) return 'text-risk-safe';
    if (score >= 70) return 'text-risk-medium';
    return 'text-risk-critical';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Compliant') return 'passed';
    if (status === 'Needs Improvement') return 'pending';
    return 'failed';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          BCBS 239 Compliance
        </h1>
        <p className="mt-1 text-light-400 dark:text-dark-400">
          Risk data aggregation and reporting principles
        </p>
      </div>

      <div className="rounded-lg border border-light-200 bg-white p-8 dark:border-dark-300 dark:bg-dark-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-light-400 dark:text-dark-400">
              Overall Compliance Score
            </p>
            <p className={`text-6xl font-bold ${getStatusColor(compliance.overall_score)}`}>
              {compliance.overall_score.toFixed(1)}%
            </p>
            <div className="mt-4">
              <Badge variant={getStatusBadge(compliance.status) as any}>
                {compliance.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            {compliance.overall_score >= 90 ? (
              <CheckCircle2 className="h-24 w-24 text-risk-safe" />
            ) : (
              <AlertCircle className="h-24 w-24 text-risk-medium" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Governance
            </h3>
            <span className={`text-2xl font-bold ${getStatusColor(compliance.governance)}`}>
              {compliance.governance.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-light-400 dark:text-dark-400">
            Risk data aggregation capabilities and reporting practices
          </p>
        </div>

        <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Accuracy
            </h3>
            <span className={`text-2xl font-bold ${getStatusColor(compliance.accuracy)}`}>
              {compliance.accuracy.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-light-400 dark:text-dark-400">
            Generation of accurate and reliable risk data
          </p>
        </div>

        <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Completeness
            </h3>
            <span
              className={`text-2xl font-bold ${getStatusColor(compliance.completeness)}`}
            >
              {compliance.completeness.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-light-400 dark:text-dark-400">
            Capture and aggregation of all material risk data
          </p>
        </div>

        <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Timeliness
            </h3>
            <span className={`text-2xl font-bold ${getStatusColor(compliance.timeliness)}`}>
              {compliance.timeliness.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-light-400 dark:text-dark-400">
            Timely generation of risk data
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-amex-blue bg-amex-blue/10 p-6">
        <div className="flex items-start gap-4">
          <TrendingUp className="mt-1 h-6 w-6 flex-shrink-0 text-amex-blue" />
          <div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Regulatory Requirement
            </h3>
            <p className="text-sm text-light-400 dark:text-dark-400">
              Basel Committee on Banking Supervision (BCBS) Principle 239 requires banks to maintain
              a minimum overall compliance score of <strong className="text-amex-blue">90%</strong> across
              all seven principles for effective risk data aggregation and reporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
