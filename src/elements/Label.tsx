import { ReactNode } from "react";
import "../styles/elements/label.scss";

interface LabelOption {
  type: "category" | "sale" | "sold-out";
  size: "small" | "medium";
  children: ReactNode;
}

export function Label({ type, size = "small", children }: LabelOption) {
  return <div className={`label label-${type} label-${size}`}>{children}</div>;
}

export default Label;
