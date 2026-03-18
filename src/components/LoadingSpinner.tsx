import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Loading...',
}) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div
        className="
        w-12 h-12
        border-4 border-light-200 dark:border-dark-300 border-t-amex-blue
        rounded-full animate-spin
      "
      />
      {text && (
        <p className="text-sm text-light-400 dark:text-dark-400">
          {text}
        </p>
      )}
    </div>
  );
};
