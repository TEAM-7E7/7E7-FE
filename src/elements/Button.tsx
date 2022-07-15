import "../styles/elements/button.scss";
import { ReactNode } from "react";

interface ButtonOptions {
  variant?: "outlined" | "filled" | "none";
  size?: "small" | "medium" | "large";
  color?: "default" | "primary" | "submit" | "primaryblue" | "lightblue" | "skyblue";
  fullWidth?: boolean;
  halfWidth?: boolean;
  onClick?: () => void;
  type?: string;
  children: ReactNode;
  disabled?: boolean;
}

export function Button({
  size = "medium",
  color = "primary",
  variant = "filled",
  fullWidth = false,
  halfWidth = false,
  onClick,
  type,
  children,
  disabled = false,
}: ButtonOptions) {
  return (
    <button
      className={`button-${size} button-${color} button-${variant} button-${fullWidth ? "fullWidth" : ""} button-${
        halfWidth ? "halfWidth" : ""
      } ${disabled ? "button-disabled" : ""}`}
      type={type === "submit" ? "submit" : "button"}
      disabled={!!disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
