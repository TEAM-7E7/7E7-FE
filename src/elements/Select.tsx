import "../styles/elements/select.scss";
import { ForwardedRef, forwardRef, ReactNode } from "react";

interface InputOptions {
  size?: "small" | "medium" | "large";
  placeholder?: string;
  fullWidth?: boolean;
  value?: any;
  onChange?: any;
  name?: string;
  children?: ReactNode;
}
// ref를 prop으로 받으려면 forwardRef를 이용해야함 ;
export const Select = forwardRef(function (
  { size = "medium", fullWidth = false, value, placeholder, onChange, name, children: children }: InputOptions,
  ref: ForwardedRef<any>,
) {
  return (
    <select
      className={`select-${size} ${fullWidth ? "select-fullWidth" : ""}`}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
    >
      {children}
    </select>
  );
});
