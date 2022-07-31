import "../styles/elements/input.scss";
import { ForwardedRef, forwardRef } from "react";

interface InputOptions {
  id?: string;
  size?: "small" | "medium" | "large";
  color?: "skyblue";
  placeholder?: string;
  fullWidth?: boolean;
  value?: any;
  onChange?: any;
  onClick?: any;
  onKeyPress?: any;
  name?: string;
  type?: string;
  disabled?: boolean;
}
// ref를 prop으로 받으려면 forwardRef를 이용해야함 ;
export const Input = forwardRef(function (
  {
    id,
    size = "medium",
    color,
    fullWidth = false,
    value,
    placeholder,
    onChange,
    onClick,
    onKeyPress,
    name,
    type,
    disabled = false,
  }: InputOptions,
  ref: ForwardedRef<any>,
) {
  return (
    <input
      id={id}
      className={`input-${size} ${fullWidth ? "input-fullWidth" : ""} input-${color} ${
        disabled ? "input-disabled" : ""
      }`}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
      onKeyPress={onKeyPress}
      name={name}
      type={type}
      disabled={!!disabled}
    />
  );
});
