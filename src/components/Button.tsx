import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-amex-blue text-white shadow-md hover:bg-[#005fb0] dark:shadow-lg",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 dark:bg-dark-200 dark:hover:bg-dark-300",
  danger: "bg-risk-critical text-white hover:bg-[#dc3e52]",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-dark-100 dark:hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? "cursor-not-allowed opacity-50" : "active:scale-[0.99]"
      }`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
