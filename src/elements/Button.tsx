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
}

export const Button = ({
  size = "small",
  color = "default",
  variant = "filled",
  fullWidth = false,
  onClick,
  type,
  children,
}: ButtonOptions) => {
  return (
    <button
      className={`button-${size} button-${color} button-${variant} button-${fullWidth ? "fullWidth" : ""}`}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
