import "../styles/elements/button.scss";
import { ReactNode } from "react";

interface ButtonOptions {
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  color?: "primary" | "submit" | "skyblue";
  fullWidth?: boolean;
  onClick?: (() => void) | (() => Promise<void>);
  type?: "submit" | "button";
  children: ReactNode;
  disabled?: boolean;
}

export function Button({
  size = "medium",
  color = "primary",
  variant = "filled",
  fullWidth = false,
  onClick,
  type = "button",
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
