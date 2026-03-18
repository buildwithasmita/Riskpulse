/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#0f0f0f",
          100: "#1a1a1a",
          200: "#262626",
          300: "#404040",
          400: "#737373",
          500: "#a3a3a3",
        },
        light: {
          50: "#ffffff",
          100: "#f5f7fa",
          200: "#e5e9f0",
          300: "#cbd5e1",
          400: "#64748b",
          500: "#475569",
        },
        amex: {
          blue: "#006FCF",
          light: "#3b9eff",
        },
        risk: {
          critical: "#ef4444",
          high: "#f97316",
          medium: "#eab308",
          low: "#22c55e",
          safe: "#10b981",
        },
        status: {
          passed: "#22c55e",
          failed: "#ef4444",
          pending: "#f59e0b",
          overdue: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
