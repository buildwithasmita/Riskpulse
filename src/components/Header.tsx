import { Bell, Moon, Shield, Sun } from "lucide-react";

import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./Button";

interface HeaderProps {
  overdueCount?: number;
}

export function Header({ overdueCount = 0 }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200/70 bg-white/95 backdrop-blur dark:border-white/5 dark:bg-dark-100/95">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amex-blue/10 text-amex-blue dark:bg-amex-blue/15">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="font-mono text-lg font-bold tracking-[0.18em] text-slate-950 dark:text-white">
              RISKPULSE
            </p>
            <p className="text-xs text-slate-500 dark:text-dark-100">
              Enterprise Risk Governance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {overdueCount > 0 ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-status-overdue/30 bg-status-overdue/10 px-3 py-2 text-sm font-medium text-status-overdue">
              <Bell className="h-4 w-4" />
              <span>{overdueCount} overdue</span>
            </div>
          ) : null}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            icon={
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            }
          >
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </div>
      </div>
    </header>
  );
}
