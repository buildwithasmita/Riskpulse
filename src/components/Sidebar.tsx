import React from 'react';
import {
  LayoutDashboard,
  CheckCircle2,
  FileCheck,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'tools', label: 'Tools', icon: <CheckCircle2 className="w-5 h-5" /> },
  { id: 'compliance', label: 'Compliance', icon: <FileCheck className="w-5 h-5" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside
      className="
      w-64
      bg-white dark:bg-dark-100
      border-r border-light-200 dark:border-dark-300
      flex flex-col
    "
    >
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              transition-all duration-200
              text-sm font-medium
              ${
                activeTab === item.id
                  ? 'bg-amex-blue text-white shadow-md'
                  : 'text-light-500 dark:text-dark-400 hover:bg-light-100 dark:hover:bg-dark-200'
              }
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-light-200 dark:border-dark-300">
        <p className="text-xs text-light-400 dark:text-dark-500">
          Version 1.0.0
        </p>
        <p className="text-xs text-light-400 dark:text-dark-500 mt-1">
          Risk Governance Platform
        </p>
      </div>
    </aside>
  );
};
