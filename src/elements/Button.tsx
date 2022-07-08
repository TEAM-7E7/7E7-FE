import "../styles/elements/button.scss";
import { ReactNode } from "react";

interface ButtonOptions {
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  color?: "default" | "primary" | "submit";
  fullWidth?: boolean;
  onClick?: () => void;
  type?: string;
  children: ReactNode;
  disabled?: boolean;
}

export function Button({
  size = "small",
  color = "default",
  variant = "filled",
  fullWidth = false,
  onClick,
  type,
  children,
  disabled = false,
}: ButtonOptions) {
  return (
    <button
      className={`button-${size} button-${color} button-${variant} ${fullWidth ? "button-fullWidth" : ""} ${
        disabled ? "button-disabled" : ""
      }`}
      type={type === "submit" ? "submit" : "button"}
      disabled={!!disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
