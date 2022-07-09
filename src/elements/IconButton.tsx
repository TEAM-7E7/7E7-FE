import "../styles/elements/iconbutton.scss";
import React, { ReactNode } from "react";

interface IconButtonOptions {
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  color?: "default" | "primary" | "submit";
  direction?: "left-right" | "top-bottom";
  icon: any;
  fullWidth?: boolean;
  iconSize?: "small" | "medium" | "large";
  onClick?: () => void;
  children?: ReactNode;
}

export function IconButton({
  variant = "filled",
  size = "small",
  color = "default",
  direction = "left-right",
  icon,
  fullWidth = false,
  iconSize = "small",
  onClick,
  children,
}: IconButtonOptions) {
  return (
    <button
      className={`iconbutton-${size} iconbutton-${color} ${direction} iconbutton-${variant} iconbutton-${
        fullWidth ? "fullWidth" : ""
      } iconbutton-icon-${iconSize}`}
      onClick={onClick}
    >
      <div className="iconbutton-text">{children}</div>
      {icon}
    </button>
  );
}