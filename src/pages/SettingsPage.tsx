import React from 'react';
import { Bell, Database, Moon, Shield, Sun } from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-light-400 dark:text-dark-400">
          Manage your application preferences
        </p>
      </div>

      <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Sun className="h-5 w-5" />
          Appearance
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Theme</p>
            <p className="mt-1 text-sm text-light-400 dark:text-dark-400">
              Choose between light and dark mode
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="
              relative h-8 w-16 rounded-full transition-colors
              bg-light-200 dark:bg-dark-300
            "
          >
            <div
              className={`
                absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full
                bg-white transition-transform duration-200 dark:bg-amex-blue
                ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}
              `}
            >
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 text-white" />
              ) : (
                <Sun className="h-4 w-4 text-amex-blue" />
              )}
            </div>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-light-200 py-3 dark:border-dark-300">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Overdue validations</p>
              <p className="mt-1 text-sm text-light-400 dark:text-dark-400">
                Get notified when tools exceed validation deadline
              </p>
            </div>
            <div className="h-6 w-10 rounded-full bg-amex-blue"></div>
          </div>

          <div className="flex items-center justify-between border-b border-light-200 py-3 dark:border-dark-300">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Critical issues</p>
              <p className="mt-1 text-sm text-light-400 dark:text-dark-400">
                Alert on critical validation failures
              </p>
            </div>
            <div className="h-6 w-10 rounded-full bg-amex-blue"></div>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Compliance changes</p>
              <p className="mt-1 text-sm text-light-400 dark:text-dark-400">
                Updates when BCBS 239 score changes
              </p>
            </div>
            <div className="h-6 w-10 rounded-full bg-light-200 dark:bg-dark-300"></div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Database className="h-5 w-5" />
          Data Management
        </h2>

        <div className="space-y-3">
          <button className="w-full rounded-lg bg-light-100 px-4 py-3 text-left transition-colors hover:bg-light-200 dark:bg-dark-200 dark:hover:bg-dark-300">
            <p className="font-medium text-gray-900 dark:text-white">Export registry data</p>
            <p className="mt-1 text-sm text-light-400 dark:text-dark-400">
              Download tool registry as CSV
            </p>
          </button>

          <button className="w-full rounded-lg bg-light-100 px-4 py-3 text-left transition-colors hover:bg-light-200 dark:bg-dark-200 dark:hover:bg-dark-300">
            <p className="font-medium text-gray-900 dark:text-white">Refresh data</p>
            <p className="mt-1 text-sm text-light-400 dark:text-dark-400">
              Reload tool data from backend
            </p>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-light-200 bg-white p-6 dark:border-dark-300 dark:bg-dark-100">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Shield className="h-5 w-5" />
          About
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-light-400 dark:text-dark-400">Version</span>
            <span className="font-mono text-gray-900 dark:text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-400 dark:text-dark-400">Platform</span>
            <span className="text-gray-900 dark:text-white">Risk Governance</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-400 dark:text-dark-400">Framework</span>
            <span className="text-gray-900 dark:text-white">BCBS 239</span>
          </div>
        </div>
      </div>
    </div>
  );
};
