import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

test('renders riskpulse heading', () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  const heading = screen.getByText(/risk tool oversight platform/i);
  expect(heading).toBeInTheDocument();
});
