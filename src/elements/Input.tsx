import "../styles/elements/input.scss";

interface InputOptions {
  size?: string; // small, medium, large
  placeholder?: string;
  fullWidth?: boolean;
  value?: any;
  ref?: any;
  onChange?: any;
  name?: string;
  type?: string;
}

export const Input = ({
  size = "small",
  fullWidth = false,
  value,
  ref,
  placeholder,
  onChange,
  name,
  type,
}: InputOptions) => {
  return (
    <input
      className={`input-${size} input-${fullWidth ? "fullWidth" : ""}`}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      type={type}
    />
  );
};
