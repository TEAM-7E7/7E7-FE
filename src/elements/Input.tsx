import "../styles/elements/input.scss";

interface InputOptions {
  size?: string; // small, medium, large
  placeholder?: string;
  fullWidth?: boolean;
  value?: any;
  ref?: any;
  onChange?: any;
  onClick?: any;
  name?: string;
  type?: string;
  disabled?: boolean;
}

export function Input({
  size = "small",
  fullWidth = false,
  value,
  ref,
  placeholder,
  onChange,
  onClick,
  name,
  type,
  disabled = false,
}: InputOptions) {
  return (
    <input
      className={`input-${size} ${fullWidth ? "input-fullWidth" : ""} ${disabled ? "input-disabled" : ""}`}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
      name={name}
      type={type}
      disabled={!!disabled}
    />
  );
}
