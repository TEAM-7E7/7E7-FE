import "../styles/elements/button.scss";
import { ReactNode } from "react";

interface ButtonOptions {
  variant?: "outlined" | "filled" | "none";
  size?: "small" | "medium" | "large";
  color?: "default" | "primary" | "submit" | "primaryblue" | "lightblue";
  fullWidth?: boolean;
  halfWidth?: boolean;
  onClick?: () => void;
  type?: string;
  children: ReactNode;
}

export function Button({
  size = "small",
  color = "default",
  variant = "filled",
  fullWidth = false,
  halfWidth = false,
  onClick,
  type,
  children,
}: ButtonOptions) {
  return (
    <button
      className={`button-${size} button-${color} button-${variant} button-${fullWidth ? "fullWidth" : ""} button-${
        halfWidth ? "halfWidth" : ""
      }`}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
