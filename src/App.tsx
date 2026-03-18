import React, { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeProvider } from './contexts/ThemeContext';
import { CompliancePage } from './pages/CompliancePage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { ToolsPage } from './pages/ToolsPage';
import { getSummary } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    getSummary()
      .then((data) => setOverdueCount(data.overdue))
      .catch((err) => console.error('Failed to load summary:', err));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'tools':
        return <ToolsPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-100 transition-colors duration-200 dark:bg-dark-50">
        <Header overdueCount={overdueCount} />
        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-auto p-8">{renderContent()}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
