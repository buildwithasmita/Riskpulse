import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import { ToolCard } from '../components/ToolCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getTools } from '../services/api';
import { Tool } from '../types';

export const ToolsPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      const data = await getTools({ limit: 50 });
      setTools(data);
      setError(null);
    } catch (err) {
      setError('Backend API is unavailable. Start the FastAPI server on http://localhost:8000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter((tool) => {
    const matchesFilter = filter === 'all' || tool.risk_level === filter;
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.tool_id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <LoadingSpinner text="Loading tools..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tool Registry
          </h1>
          <p className="mt-1 text-light-400 dark:text-dark-400">
            {filteredTools.length} of {tools.length} tools
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-400 dark:text-dark-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full rounded-lg border border-light-200 bg-white py-2 pl-10 pr-4
              text-gray-900 placeholder-light-400
              focus:outline-none focus:ring-2 focus:ring-amex-blue
              dark:border-dark-300 dark:bg-dark-100 dark:text-white dark:placeholder-dark-400
            "
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-amex-blue text-white'
                : 'bg-light-100 text-light-500 dark:bg-dark-200 dark:text-dark-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('High')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'High'
                ? 'bg-risk-critical text-white'
                : 'bg-light-100 text-light-500 dark:bg-dark-200 dark:text-dark-400'
            }`}
          >
            High Risk
          </button>
          <button
            onClick={() => setFilter('Medium')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'Medium'
                ? 'bg-risk-medium text-white'
                : 'bg-light-100 text-light-500 dark:bg-dark-200 dark:text-dark-400'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('Low')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'Low'
                ? 'bg-risk-low text-white'
                : 'bg-light-100 text-light-500 dark:bg-dark-200 dark:text-dark-400'
            }`}
          >
            Low Risk
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.tool_id} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-12 text-center text-light-400 dark:text-dark-400">
          No tools found matching your criteria
        </div>
      )}
    </div>
  );
};
